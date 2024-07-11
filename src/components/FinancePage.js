import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRevenue, addExpense, getRevenues, getExpenses, deleteRevenue, deleteExpense } from '../redux/actions/financeActions';
import { Button, Form, Input, List, Popconfirm } from 'antd';
import { generateFinanceReportPDF } from './pdfUtils';

const FinancePage = () => {
  const dispatch = useDispatch();
  const revenues = useSelector((state) => state.finance.revenues);
  const expenses = useSelector((state) => state.finance.expenses);

  const [revenueForm] = Form.useForm();
  const [expenseForm] = Form.useForm();

  useEffect(() => {
    dispatch(getRevenues());
    dispatch(getExpenses());
  }, [dispatch]);

  const onFinishRevenue = (values) => {
    dispatch(addRevenue(values));
    revenueForm.resetFields();
  };

  const onFinishExpense = (values) => {
    dispatch(addExpense(values));
    expenseForm.resetFields();
  };

  const handleGeneratePDF = () => {
    generateFinanceReportPDF(revenues, expenses);
  };

  const handleDeleteRevenue = (id) => {
    dispatch(deleteRevenue(id));
  };

  const handleDeleteExpense = (id) => {
    dispatch(deleteExpense(id));
  };

  return (
    <div>
      <h2>إدارة المالية</h2>
      <Button onClick={handleGeneratePDF}>تنزيل التقرير كملف PDF</Button>
      
      <h3>إضافة إيرادات</h3>
      <Form form={revenueForm} onFinish={onFinishRevenue}>
        <Form.Item name="date" rules={[{ required: true, message: 'الرجاء إدخال التاريخ' }]}>
          <Input type="date" placeholder="التاريخ" />
        </Form.Item>
        <Form.Item name="amount" rules={[{ required: true, message: 'الرجاء إدخال المبلغ' }]}>
          <Input type="number" placeholder="المبلغ" />
        </Form.Item>
        <Form.Item name="description" rules={[{ required: true, message: 'الرجاء إدخال الوصف' }]}>
          <Input placeholder="الوصف" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">إضافة</Button>
        </Form.Item>
      </Form>

      <h3>إضافة مصاريف</h3>
      <Form form={expenseForm} onFinish={onFinishExpense}>
        <Form.Item name="date" rules={[{ required: true, message: 'الرجاء إدخال التاريخ' }]}>
          <Input type="date" placeholder="التاريخ" />
        </Form.Item>
        <Form.Item name="amount" rules={[{ required: true, message: 'الرجاء إدخال المبلغ' }]}>
          <Input type="number" placeholder="المبلغ" />
        </Form.Item>
        <Form.Item name="description" rules={[{ required: true, message: 'الرجاء إدخال الوصف' }]}>
          <Input placeholder="الوصف" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">إضافة</Button>
        </Form.Item>
      </Form>

      <h3>الإيرادات</h3>
      <List
        dataSource={revenues}
        renderItem={(revenue) => (
          <List.Item>
            <div>{revenue.date}</div>
            <div>{revenue.amount}</div>
            <div>{revenue.description}</div>
            <Popconfirm
              title="هل أنت متأكد من الحذف؟"
              onConfirm={() => handleDeleteRevenue(revenue._id)}
              okText="نعم"
              cancelText="لا"
            >
              <Button type="danger">حذف</Button>
            </Popconfirm>
          </List.Item>
        )}
      />

      <h3>المصاريف</h3>
      <List
        dataSource={expenses}
        renderItem={(expense) => (
          <List.Item>
            <div>{expense.date}</div>
            <div>{expense.amount}</div>
            <div>{expense.description}</div>
            <Popconfirm
              title="هل أنت متأكد من الحذف؟"
              onConfirm={() => handleDeleteExpense(expense._id)}
              okText="نعم"
              cancelText="لا"
            >
              <Button type="danger">حذف</Button>
            </Popconfirm>
          </List.Item>
        )}
      />
    </div>
  );
};

export default FinancePage;
