import React, { useState } from 'react';
import { Row, Col, Typography, Form, Input, Button, Table, DatePicker } from 'antd';
import { Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

const { Text } = Typography;
const { RangePicker } = DatePicker;

const ProductStatistics = () => {
  const [formData, setFormData] = useState({
    monday: { name: '', quantity: '', color: '#FF6384' },
    tuesday: { name: '', quantity: '', color: '#36A2EB' },
    wednesday: { name: '', quantity: '', color: '#FFCE56' },
    thursday: { name: '', quantity: '', color: '#7FFFD4' },
    friday: { name: '', quantity: '', color: '#FF6347' },
    saturday: { name: '', quantity: '', color: '#008080' },
    sunday: { name: '', quantity: '', color: '#FFA500' }
  });

  const [dateRange, setDateRange] = useState([]);

  const handleFormSubmit = () => {
    console.log('Form data:', formData);
  };

  const handleInputChange = (e) => {
    const { name, value, dataset } = e.target;
    setFormData({
      ...formData,
      [dataset.day]: { ...formData[dataset.day], [name]: value }
    });
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const doughnutData = {
    labels: [
      formData.monday.name,
      formData.tuesday.name,
      formData.wednesday.name,
      formData.thursday.name,
      formData.friday.name,
      formData.saturday.name,
      formData.sunday.name
    ],
    datasets: [
      {
        label: 'Produits traités',
        data: [
          parseInt(formData.monday.quantity) || 0,
          parseInt(formData.tuesday.quantity) || 0,
          parseInt(formData.wednesday.quantity) || 0,
          parseInt(formData.thursday.quantity) || 0,
          parseInt(formData.friday.quantity) || 0,
          parseInt(formData.saturday.quantity) || 0,
          parseInt(formData.sunday.quantity) || 0
        ],
        backgroundColor: [
          formData.monday.color,
          formData.tuesday.color,
          formData.wednesday.color,
          formData.thursday.color,
          formData.friday.color,
          formData.saturday.color,
          formData.sunday.color
        ],
      },
    ],
  };

  const barData = {
    labels: [
      formData.monday.name,
      formData.tuesday.name,
      formData.wednesday.name,
      formData.thursday.name,
      formData.friday.name,
      formData.saturday.name,
      formData.sunday.name
    ],
    datasets: [
      {
        label: 'Produits traités',
        data: [
          parseInt(formData.monday.quantity) || 0,
          parseInt(formData.tuesday.quantity) || 0,
          parseInt(formData.wednesday.quantity) || 0,
          parseInt(formData.thursday.quantity) || 0,
          parseInt(formData.friday.quantity) || 0,
          parseInt(formData.saturday.quantity) || 0,
          parseInt(formData.sunday.quantity) || 0
        ],
        backgroundColor: [
          formData.monday.color,
          formData.tuesday.color,
          formData.wednesday.color,
          formData.thursday.color,
          formData.friday.color,
          formData.saturday.color,
          formData.sunday.color
        ],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: 'black',
        align: 'end',
        anchor: 'end',
        font: {
          weight: 'bold',
          size: 16
        },
        formatter: (value) => {
          return value;
        }
      }
    }
  };

  const columns = [
    {
      title: 'Nom du produit',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantité',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Jour',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'Couleur',
      dataIndex: 'color',
      key: 'color',
      render: (color) => <div style={{ backgroundColor: color, width: '20px', height: '20px', borderRadius: '50%' }}></div>,
    },
  ];

  const dataSource = [
    { key: '1', name: formData.monday.name, quantity: formData.monday.quantity, day: 'Lundi', color: formData.monday.color },
    { key: '2', name: formData.tuesday.name, quantity: formData.tuesday.quantity, day: 'Mardi', color: formData.tuesday.color },
    { key: '3', name: formData.wednesday.name, quantity: formData.wednesday.quantity, day: 'Mercredi', color: formData.wednesday.color },
    { key: '4', name: formData.thursday.name, quantity: formData.thursday.quantity, day: 'Jeudi', color: formData.thursday.color },
    { key: '5', name: formData.friday.name, quantity: formData.friday.quantity, day: 'Vendredi', color: formData.friday.color },
    { key: '6', name: formData.saturday.name, quantity: formData.saturday.quantity, day: 'Samedi', color: formData.saturday.color },
    { key: '7', name: formData.sunday.name, quantity: formData.sunday.quantity, day: 'Dimanche', color: formData.sunday.color },
  ];

  const handleDownloadPdf = async () => {
    const inputDoughnut = document.getElementById('doughnut-chart');
    const inputBar = document.getElementById('bar-chart');
  
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
  
    const startDate = dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : 'N/A';
    const endDate = dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : 'N/A';
  
    // Title and Date Range
    pdf.setFontSize(18);
    pdf.text('Statistiques des Produits', pdfWidth / 2, 20, { align: 'center' });
    pdf.setFontSize(12);
    pdf.text(`Période: ${startDate} - ${endDate}`, pdfWidth / 2, 30, { align: 'center' });
  
    // Doughnut Chart
    const canvasDoughnut = await html2canvas(inputDoughnut, { scale: 2 });
    const imgDataDoughnut = canvasDoughnut.toDataURL('image/png');
    pdf.addImage(imgDataDoughnut, 'PNG', 10, 40, pdfWidth - 20, (canvasDoughnut.height * (pdfWidth - 20)) / canvasDoughnut.width);
  
    // Product Names and Quantities
    let currentY = (canvasDoughnut.height * (pdfWidth - 20)) / canvasDoughnut.width + 50;
    pdf.setFontSize(10);
    pdf.text('Produits et Quantités (Doughnut) :', 10, currentY);
    currentY += 10;
    doughnutData.labels.forEach((label, index) => {
      const quantity = doughnutData.datasets[0].data[index];
      pdf.text(`${label}: ${quantity}`, 10, currentY);
      currentY += 10;
    });
  
    pdf.addPage();
  
    // Bar Chart
    const canvasBar = await html2canvas(inputBar, { scale: 2 });
    const imgDataBar = canvasBar.toDataURL('image/png');
    pdf.addImage(imgDataBar, 'PNG', 10, 10, pdfWidth - 20, (canvasBar.height * (pdfWidth - 20)) / canvasBar.width);
  
    // Product Names and Quantities
    currentY = (canvasBar.height * (pdfWidth - 20)) / canvasBar.width + 20;
    pdf.setFontSize(10);
    pdf.text('Produits et Quantités (Bar) :', 10, currentY);
    currentY += 10;
    barData.labels.forEach((label, index) => {
      const quantity = barData.datasets[0].data[index];
      pdf.text(`${label}: ${quantity}`, 10, currentY);
      currentY += 10;
    });
  
    pdf.addPage();
  
    // Function to convert hex color to RGB array
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b];
    };
  
    // Table with colored squares
    const tableData = dataSource.map((item) => [
      item.name,
      item.quantity,
      item.day,
      item.color,
    ]);
  
    pdf.autoTable({
      head: [['Nom du produit', 'Quantité', 'Jour', 'Couleur']],
      body: tableData,
      startY: 10,
      didDrawCell: (data) => {
        if (data.column.index === 3) {
          const rgb = hexToRgb(data.cell.raw);
          pdf.setFillColor(...rgb);
          pdf.rect(data.cell.x + 2, data.cell.y + 2, data.cell.height - 4, data.cell.height - 4, 'F');
        }
      }
    });
  
    pdf.save('statistiques_produits.pdf');
  };
  

  return (
    <Row gutter={16}>
      <Col span={24}>
        <Form layout="inline" onFinish={handleFormSubmit}>
          <Form.Item label="Période">
            <RangePicker onChange={handleDateChange} />
          </Form.Item>
          {[
            { day: 'monday', french: 'Lundi' },
            { day: 'tuesday', french: 'Mardi' },
            { day: 'wednesday', french: 'Mercredi' },
            { day: 'thursday', french: 'Jeudi' },
            { day: 'friday', french: 'Vendredi' },
            { day: 'saturday', french: 'Samedi' },
            { day: 'sunday', french: 'Dimanche' }
          ].map(({ day, french }) => (
            <div key={day}>
              <Form.Item label={`Nom ${french}`}>
                <Input
                  name="name"
                  data-day={day}
                  value={formData[day].name}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item label={`Quantité ${french}`}>
                <Input
                  name="quantity"
                  data-day={day}
                  value={formData[day].quantity}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item label={`Couleur ${french}`}>
                <Input
                  name="color"
                  type="color"
                  data-day={day}
                  value={formData[day].color}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </div>
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Mettre à jour
            </Button>
            <Button type="default" onClick={handleDownloadPdf} style={{ marginLeft: '10px' }}>
              Télécharger PDF
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={24} id="charts-container">
        <Row gutter={16} style={{ marginBottom: '20px' }}>
          <Col span={24} id="doughnut-chart">
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              {doughnutData.labels.map((label, index) => (
                <Text key={index} style={{ display: 'block', fontSize: '16px' }}>
                  {label} - {doughnutData.datasets[0].data[index]}
                </Text>
              ))}
            </div>
            <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', height: '600px', width: '600px', margin: 'auto' }}>
              <Doughnut data={doughnutData} options={options} plugins={[ChartDataLabels]} />
            </div>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: '20px' }}>
          <Col span={24} id="bar-chart">
            <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', height: '600px', width: '800px', margin: 'auto' }}>
              <Bar data={barData} options={options} plugins={[ChartDataLabels]} />
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              {barData.labels.map((label, index) => (
                <Text key={index} style={{ display: 'block', fontSize: '16px' }}>
                  {label} - {barData.datasets[0].data[index]}
                </Text>
              ))}
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} id="data-table">
            <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', margin: 'auto' }}>
              <Table dataSource={dataSource} columns={columns} pagination={false} />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductStatistics;

