import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined, HistoryOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { getCliches, deleteCliche, deleteClicheHistoryRecord } from "../redux/actions/productActions";
import { generateClicheHistoryPDF, generateClicheListPDF } from "./pdfUtils";

const { confirm } = Modal;

const ClicheList = () => {
  const dispatch = useDispatch();
  const cliches = useSelector((state) => state.product.cliches);
  const navigate = useNavigate();

  const [historyVisible, setHistoryVisible] = useState(false);
  const [selectedCliche, setSelectedCliche] = useState(null);

  useEffect(() => {
    dispatch(getCliches());
  }, [dispatch]);

  const showHistoryModal = (cliche) => {
    setSelectedCliche(cliche);
    setHistoryVisible(true);
  };

  const handleCancel = () => {
    setHistoryVisible(false);
    setSelectedCliche(null);
  };

  const handleDeleteHistory = (clicheId, historyId) => {
    dispatch(deleteClicheHistoryRecord(clicheId, historyId));
  };

  const showDeleteConfirm = (clicheId) => {
    confirm({
      title: "هل أنت متأكد أنك تريد حذف القالب؟",
      okText: "نعم",
      okType: "خطر",
      cancelText: "لا",
      onOk() {
        dispatch(deleteCliche(clicheId));
      },
    });
  };

  const handleEdit = (cliche) => {
    navigate(`/edit-cliche/${cliche._id}`, {
      state: { initialValues: cliche, isEdit: true },
    });
  };

  const handleDelete = (clicheId) => {
    showDeleteConfirm(clicheId);
  };

  const handleGenerateHistoryPDF = () => {
    if (selectedCliche) {
      generateClicheHistoryPDF(selectedCliche);
    }
  };

  const handleGenerateListPDF = () => {
    generateClicheListPDF(cliches);
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>قائمة القوالب</h2>
        <Button type="primary">
          <Link to="/add-cliche">إضافة قالب جديد</Link>
        </Button>
        <Button type="primary" onClick={handleGenerateListPDF}>
          تحميل قائمة القوالب بصيغة PDF
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          borderBottom: "1px solid #ddd",
          padding: "8px 0",
        }}
      >
        <div style={{ flex: 1, textAlign: "center" }}>المرجع</div>
        <div style={{ flex: 1, textAlign: "center" }}>الاسم</div>
        <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid #ddd" }}>الموقع</div>
        <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid #ddd" }}>الكمية المعالجة</div>
        <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid #ddd" }}>الكمية المرسلة</div>
        <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid #ddd" }}>الكمية المتبقية</div>
        <div style={{ flex: 1, textAlign: "center", display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button icon={<EditOutlined />} onClick={(cliche) => handleEdit(cliche)} />
          <Button icon={<DeleteOutlined />} onClick={(cliche) => handleDelete(cliche._id)} />
          <Button icon={<HistoryOutlined />} onClick={(cliche) => showHistoryModal(cliche)} />
        </div>
      </div>
      <List
        dataSource={cliches}
        renderItem={(cliche) => (
          <List.Item key={cliche._id}>
            <div style={{ flex: 1, textAlign: "center" }}>{cliche.ref}</div>
            <div style={{ flex: 1, textAlign: "center" }}>{cliche.name}</div>
            <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid #ddd" }}>{cliche.location}</div>
            <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid #ddd" }}>{cliche.processedQuantity}</div>
            <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid #ddd" }}>{cliche.shippedQuantity}</div>
            <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid #ddd" }}>{cliche.processedQuantity - cliche.shippedQuantity}</div>
            <div style={{ flex: 1, textAlign: "center", display: "flex", justifyContent: "center", gap: "10px" }}>
              <Button icon={<EditOutlined />} onClick={() => handleEdit(cliche)} />
              <Button icon={<DeleteOutlined />} onClick={() => handleDelete(cliche._id)} />
              <Button icon={<HistoryOutlined />} onClick={() => showHistoryModal(cliche)} />
            </div>
          </List.Item>
        )}
      />

      <Modal
        title="تاريخ القالب"
        visible={historyVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            إلغاء
          </Button>,
          <Button key="generatePDF" type="primary" onClick={handleGenerateHistoryPDF}>
            تحميل تاريخ القالب بصيغة PDF
          </Button>,
        ]}
      >
        {selectedCliche && (
          <div>
            <h3>مرجع القالب: {selectedCliche.ref}</h3>
            <h4>سجل التحديث:</h4>
            <ul>
              {selectedCliche.history.map((record, index) => (
                <li key={index}>
                  <p>تاريخ التحديث: {new Date(record.updatedAt).toLocaleDateString()}</p>
                  <p>الحقل المحدث: {record.field}</p>
                  <p>القيمة القديمة: {record.oldValue}</p>
                  <p>القيمة الجديدة: {record.newValue}</p>
                  <Button type="danger" onClick={() => handleDeleteHistory(selectedCliche._id, record._id)}>
                    حذف
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ClicheList;