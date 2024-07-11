import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, deleteProduct, deleteHistoryRecord, getCliches } from "../redux/actions/productActions";
import { List, Button, Modal } from "antd";
import { DeleteOutlined, EditOutlined, HistoryOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { generateProductListPDF, generateProductHistoryPDF } from "./pdfUtils"; 

const { confirm } = Modal;

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const cliches = useSelector((state) => state.product.cliches);
  const navigate = useNavigate();

  const [historyVisible, setHistoryVisible] = useState(false);
  const [clicheModalVisible, setClicheModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCliche, setSelectedCliche] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCliches());
  }, [dispatch]);

  const showHistoryModal = useCallback((product) => {
    setSelectedProduct(product);
    setHistoryVisible(true);
  }, []);

  const showClicheModal = useCallback((cliche) => {
    setSelectedCliche(cliche);
    setClicheModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setHistoryVisible(false);
    setSelectedProduct(null);
  }, []);

  const handleClicheCancel = useCallback(() => {
    setClicheModalVisible(false);
    setSelectedCliche(null);
  }, []);

  const handleDeleteHistory = useCallback((productId, historyId) => {
    dispatch(deleteHistoryRecord(productId, historyId));
  }, [dispatch]);

  const showDeleteConfirm = useCallback((productId) => {
    confirm({
      title: "هل أنت متأكد أنك تريد حذف المنتج؟",
      okText: "نعم",
      okType: "danger",
      cancelText: "لا",
      onOk() {
        dispatch(deleteProduct(productId));
      },
    });
  }, [dispatch]);

  const handleEdit = useCallback((product) => {
    navigate(`/edit-product/${product._id}`, {
      state: { initialValues: product, isEdit: true },
    });
  }, [navigate]);

  const handleDelete = useCallback((productId) => {
    showDeleteConfirm(productId);
  }, [showDeleteConfirm]);

  const handleGeneratePDF = useCallback(() => {
    generateProductListPDF(products, cliches);
  }, [products, cliches]);

  const handleGenerateHistoryPDF = useCallback(() => {
    if (selectedProduct) {
      generateProductHistoryPDF(selectedProduct);
    }
  }, [selectedProduct]);

  const handleManageCliches = useCallback((productId) => {
    navigate(`/add-cliche/${productId}`, { state: { productId } });
  }, [navigate]);

  const handleEditCliche = useCallback((cliche) => {
    navigate(`/edit-cliche/${cliche._id}`, { state: { initialValues: cliche, isEdit: true } });
  }, [navigate]);

  const handleDeleteCliche = useCallback((clicheId) => {
    // Implement the function to delete the cliche
    console.log('معرف الكليشيه المحذوف:', clicheId);
  }, []);

  const renderClicheRefs = useCallback((clicheIds) => {
    const clicheRefs = cliches
      .filter(cliche => clicheIds.includes(cliche._id))
      .map(cliche => (
        <Button key={cliche._id} onClick={() => showClicheModal(cliche)}>
          {cliche.ref}
        </Button>
      ));
    return clicheRefs.length ? clicheRefs : "لا توجد مراجع";
  }, [cliches, showClicheModal]);

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
        <h2>تفاصيل المنتج</h2>
        <Button type="primary">
          <Link to="/add-product">إضافة منتج جديد</Link>
        </Button>
        <Button type="primary" onClick={handleGeneratePDF}>
          تنزيل قائمة المنتجات بصيغة PDF
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
        <div style={{ flex: 1, textAlign: "center" }}>الاسم</div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            borderRight: "1px solid #ddd",
          }}
        >
          الموقع
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            borderRight: "1px solid #ddd",
          }}
        >
          تاريخ الوصول
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            borderRight: "1px solid #ddd",
          }}
        >
          الكمية
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            borderRight: "1px solid #ddd",
          }}
        >
          الوزن
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            borderRight: "1px solid #ddd",
          }}
        >
          المقاس
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            borderRight: "1px solid #ddd",
          }}
        >
          الكمية المعالجة
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            borderRight: "1px solid #ddd",
          }}
        >
          مراجع الكليشيه
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Button
            icon={<EditOutlined />}
            onClick={(product) => handleEdit(product)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={(product) => handleDelete(product._id)}
          />
          <Button
            icon={<HistoryOutlined />}
            onClick={(product) => showHistoryModal(product)}
          />
          <Button
            icon={<AppstoreOutlined />}
            onClick={(product) => handleManageCliches(product._id)}
          />
        </div>
      </div>
      <List
        dataSource={products}
        renderItem={(product) => (
          <List.Item key={product._id}>
            <div style={{ flex: 1, textAlign: "center" }}>{product.name}</div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                borderRight: "1px solid #ddd",
              }}
            >
              {product.location}
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                borderRight: "1px solid #ddd",
              }}
            >
              {new Date(product.arrivalDate).toLocaleDateString()}
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                borderRight: "1px solid #ddd",
              }}
            >
              {product.quantity}
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                borderRight: "1px solid #ddd",
              }}
            >
              {product.weight}
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                borderRight: "1px solid #ddd",
              }}
            >
              {product.measurementUnit}
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                borderRight: "1px solid #ddd",
              }}
            >
              {product.processedQuantity}
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                borderRight: "1px solid #ddd",
              }}
            >
              {renderClicheRefs(product.clicheReferences)}
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEdit(product)}
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(product._id)}
              />
              <Button
                icon={<HistoryOutlined />}
                onClick={() => showHistoryModal(product)}
              />
              <Button
                type="link"
                icon={<AppstoreOutlined />}
                onClick={() => handleManageCliches(product._id)}
              />
            </div>
          </List.Item>
        )}
      />

      <Modal
        title="تاريخ المنتج"
        visible={historyVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            إلغاء
          </Button>,
          <Button key="generatePDF" type="primary" onClick={handleGenerateHistoryPDF}>
            تنزيل تاريخ المنتج بصيغة PDF
          </Button>,
        ]}
      >
        {selectedProduct && (
          <div>
            <h3>اسم المنتج: {selectedProduct.name}</h3>
            <h4>سجل التحديثات:</h4>
            <ul>
              {selectedProduct.history.map((record, index) => (
                <li key={index}>
                  <p>تاريخ التحديث: {new Date(record.updatedAt).toLocaleDateString()}</p>
                  <p>الحقل المحدث: {record.field}</p>
                  <p>القيمة القديمة: {record.oldValue}</p>
                  <p>القيمة الجديدة: {record.newValue}</p>
                  <Button
                    type="danger"
                    onClick={() => handleDeleteHistory(selectedProduct._id, record._id)}
                  >
                    حذف
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>

      <Modal
        title="تفاصيل الكليشيه"
        visible={clicheModalVisible}
        onCancel={handleClicheCancel}
        footer={[
          <Button key="cancel" onClick={handleClicheCancel}>
            إلغاء
          </Button>,
          <Button key="edit" type="primary" onClick={() => handleEditCliche(selectedCliche)}>
            تعديل
          </Button>,
          <Button key="delete" type="danger" onClick={() => handleDeleteCliche(selectedCliche._id)}>
            حذف
          </Button>,
        ]}
      >
        {selectedCliche && (
          <div>
            <h3>مرجع الكليشيه: {selectedCliche.ref}</h3>
            <h3>اسم الكليشيه: {selectedCliche.name}</h3>
            <p>الموقع: {selectedCliche.location}</p>
            <p>الكمية المعالجة: {selectedCliche.processedQuantity}</p>
            <p>الكمية المرسلة: {selectedCliche.shippedQuantity}</p>
            <h4>سجل التحديثات:</h4>
            <ul>
              {selectedCliche.history.map((record, index) => (
                <li key={index}>
                  <p>تاريخ التحديث: {new Date(record.updatedAt).toLocaleDateString()}</p>
                  <p>الحقل المحدث: {record.field}</p>
                  <p>القيمة القديمة: {record.oldValue}</p>
                  <p>القيمة الجديدة: {record.newValue}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductList;
