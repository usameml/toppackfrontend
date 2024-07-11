import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generateProductListPDF = async (products, cliches) => {
  const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
  const totalWeight = products.reduce((sum, product) => sum + product.weight * product.quantity, 0) / 1000; // gramdan kiloya çevirme
  const totalProcessedQuantity = products.reduce((sum, product) => sum + product.processedQuantity, 0);
  const totalRemainingQuantity = products.reduce((sum, product) => sum + (product.quantity - product.processedQuantity), 0);

  const pageSize = 20;
  const pageCount = Math.ceil(products.length / pageSize);

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();

  for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    const pageProducts = products.slice(startIndex, endIndex);

    const input = document.createElement("div");
    input.innerHTML = `
      <style>
        h1, h2, p, table {
          font-family: 'Arial', sans-serif;
        }
        h1 {
          font-size: 30px;
          text-align: center;
        }
        h2 {
          font-size: 28px;
          margin-bottom: 10px;
          text-align: center;
        }
        p {
          font-size: 26px;
          text-align: center;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: center;
          font-size: 22px;
        }
        th {
          background-color: #f0f0f0;
        }
      </style>
      <h1>Liste des produits</h1>
      <h2>Totaux:</h2>
      <p>Quantité totale: ${totalQuantity}</p>
      <p>Poids total: ${totalWeight.toFixed(3)} kg</p>
      <p>Quantité totale traitée: ${totalProcessedQuantity}</p>
      <p>Quantité totale restante: ${totalRemainingQuantity}</p>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Emplacement</th>
            <th>Quantité</th>
            <th>Poids</th>
            <th>Unité de mesure</th>
            <th>Quantité traitée</th>
            <th>Quantité restante</th>
            <th>Référence</th>
          </tr>
        </thead>
        <tbody>
          ${pageProducts
            .map(
              (product) => `
            <tr>
              <td>${product.name}</td>
              <td>${product.location}</td>
              <td>${product.quantity}</td>
              <td>${product.weight}</td>
              <td>${product.measurementUnit}</td>
              <td>${product.processedQuantity}</td>
              <td>${product.quantity - product.processedQuantity}</td>
              <td>${product.clicheReferences.map(ref => cliches.find(c => c._id === ref)?.ref).join(", ")}</td>
            </tr>`
            )
            .join("")}
          <tr>
            <td colspan="2"><strong>Totaux</strong></td>
            <td><strong>${totalQuantity}</strong></td>
            <td><strong>${totalWeight.toFixed(3)} kg</strong></td>
            <td></td>
            <td><strong>${totalProcessedQuantity}</strong></td>
            <td><strong>${totalRemainingQuantity}</strong></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    `;
    document.body.appendChild(input);

    await new Promise(resolve => setTimeout(resolve, 500)); // Bekleme süresi 500ms

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    if (pageIndex > 0) {
      pdf.addPage();
    }

    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    document.body.removeChild(input);
  }

  pdf.save("liste_des_produits.pdf");
};

export const generateProductHistoryPDF = async (product) => {
  const input = document.createElement("div");
  input.innerHTML = `
    <style>
      h1, h2, p, table {
        font-family: 'Arial', sans-serif;
      }
      h1 {
        font-size: 30px;
        text-align: center;
      }
      h2 {
        font-size: 28px;
        margin-bottom: 10px;
        text-align: center;
      }
      p {
        font-size: 26px;
        text-align: center;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: center;
        font-size: 22px;
      }
      th {
        background-color: #f0f0f0;
      }
    </style>
    <h1>Historique du produit: ${product.name}</h1>
    <table>
      <thead>
        <tr>
          <th>Date de mise à jour</th>
          <th>Champ modifié</th>
          <th>Ancienne valeur</th>
          <th>Nouvelle valeur</th>
        </tr>
      </thead>
      <tbody>
        ${product.history
          .map(
            (record) => `
          <tr>
            <td>${new Date(record.updatedAt).toLocaleDateString()}</td>
            <td>${record.field}</td>
            <td>${record.oldValue}</td>
            <td>${record.newValue}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;
  document.body.appendChild(input);

  await new Promise(resolve => setTimeout(resolve, 500)); // Bekleme süresi 500ms

  const canvas = await html2canvas(input);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const imgProps = pdf.getImageProperties(imgData);
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  document.body.removeChild(input);

  pdf.save(`historique_produit_${product.name}.pdf`);
};

export const generateFinanceReportPDF = (revenues, expenses) => {
  const doc = new jsPDF();
  doc.text('Rapport financier', 14, 20);

  const revenueRows = revenues.map((rev) => [rev.date, rev.amount, rev.description]);
  const expenseRows = expenses.map((exp) => [exp.date, exp.amount, exp.description]);

  doc.autoTable({
    head: [['Date', 'Montant', 'Description']],
    body: revenueRows,
    startY: 30,
    theme: 'striped',
    headStyles: { fillColor: [0, 255, 0] },
  });

  doc.autoTable({
    head: [['Date', 'Montant', 'Description']],
    body: expenseRows,
    startY: doc.autoTable.previous.finalY + 10,
    theme: 'striped',
    headStyles: { fillColor: [255, 0, 0] },
  });

  const totalRevenue = revenues.reduce((acc, rev) => acc + rev.amount, 0);
  const totalExpense = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const netIncome = totalRevenue - totalExpense;

  doc.text(`Revenu total: ${totalRevenue}`, 14, doc.autoTable.previous.finalY + 20);
  doc.text(`Dépense totale: ${totalExpense}`, 14, doc.autoTable.previous.finalY + 30);
  doc.text(`Revenu net: ${netIncome}`, 14, doc.autoTable.previous.finalY + 40);

  doc.save('RapportFinancier.pdf');
};

export const generateClicheListPDF = async (cliches) => {
  const input = document.createElement("div");
  input.innerHTML = `
    <style>
      h1, h2, p, table {
        font-family: 'Arial', sans-serif;
      }
      h1 {
        font-size: 30px;
        text-align: center;
      }
      h2 {
        font-size: 28px;
        margin-bottom: 10px;
        text-align: center;
      }
      p {
        font-size: 26px;
        text-align: center;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: center;
        font-size: 22px;
      }
      th {
        background-color: #f0f0f0;
      }
    </style>
    <h1>Liste des clichés</h1>
    <table>
      <thead>
        <tr>
          <th>Référence</th>
          <th>Nom</th>
          <th>Emplacement</th>
          <th>Quantité traitée</th>
          <th>Quantité expédiée</th>
          <th>Quantité restante</th>
        </tr>
      </thead>
      <tbody>
        ${cliches
          .map(
            (cliche) => `
          <tr>
            <td>${cliche.ref}</td>
            <td>${cliche.name}</td>
            <td>${cliche.location}</td>
            <td>${cliche.processedQuantity}</td>
            <td>${cliche.shippedQuantity}</td>
            <td>${cliche.processedQuantity - cliche.shippedQuantity}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

  document.body.appendChild(input); // Append to body to ensure it's rendered

  await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for rendering, adjust timing as needed

  const canvas = await html2canvas(input);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("liste_des_clichés.pdf");

  document.body.removeChild(input); // Remove from body after rendering
};

export const generateClicheHistoryPDF = async (cliche) => {
  const input = document.createElement("div");
  input.innerHTML = `
    <style>
      h1, h2, p, table {
        font-family: 'Arial', sans-serif;
      }
      h1 {
        font-size: 30px;
        text-align: center;
      }
      h2 {
        font-size: 28px;
        margin-bottom: 10px;
        text-align: center;
      }
      p {
        font-size: 26px;
        text-align: center;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: center;
        font-size: 22px;
      }
      th {
        background-color: #f0f0f0;
      }
    </style>
    <h1>Historique du cliché</h1>
    <h2>Référence du cliché: ${cliche.ref}</h2>
    <table>
      <thead>
        <tr>
          <th>Date de mise à jour</th>
          <th>Champ modifié</th>
          <th>Ancienne valeur</th>
          <th>Nouvelle valeur</th>
        </tr>
      </thead>
      <tbody>
        ${cliche.history
          .map(
            (record) => `
          <tr>
            <td>${new Date(record.updatedAt).toLocaleDateString()}</td>
            <td>${record.field}</td>
            <td>${record.oldValue}</td>
            <td>${record.newValue}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

  document.body.appendChild(input); // Append to body to ensure it's rendered

  await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for rendering, adjust timing as needed

  const canvas = await html2canvas(input);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`historique_cliche_${cliche.ref}.pdf`);

  document.body.removeChild(input); // Remove from body after rendering
};
