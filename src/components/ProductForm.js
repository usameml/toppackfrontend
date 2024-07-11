import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../redux/actions/productActions'; 
import { getBlocks } from '../redux/actions/blockActions';
import { Form, Input, Button, Select } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';

const { Option } = Select;

const ProductForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const initialValues = useMemo(() => location.state?.initialValues || {}, [location.state?.initialValues]);
  const isEdit = location.state?.isEdit || false;
  const blocks = useSelector((state) => state.block.blocks);

  useEffect(() => {
    dispatch(getBlocks());

    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form, dispatch]);

  const onFinish = (formData) => {
    if (!formData.name || !formData.location || !formData.quantity || !formData.weight || !formData.measurementUnit) {
      console.error('Error: Missing required fields');
      return;
    }

    const updatedData = {
      ...formData,
      editDate: moment().format('YYYY-MM-DD'),
      history: [...(initialValues.history || []), { date: moment().format('YYYY-MM-DD'), description: 'Product updated' }]
    };

    if (isEdit) {
      if (initialValues._id) {
        dispatch(updateProduct({ id: initialValues._id, ...updatedData }));
      } else {
        console.error('Error: Missing product ID for update', initialValues);
      }
    } else {
      dispatch(addProduct(updatedData));
    }
    form.resetFields();
    navigate('/');
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="اسم المنتج" name="name" rules={[{ required: true, message: 'اسم المنتج مطلوب' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="الموقع" name="location" rules={[{ required: true, message: 'الموقع مطلوب' }]}>
        <Select>
          {blocks.map((block) => (
            <Option key={block.id} value={block.name}>{block.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="تاريخ الوصول" name="arrivalDate" rules={[{ required: true, message: 'تاريخ الوصول مطلوب' }]}>
        <Input type="date" disabled={isEdit} />
      </Form.Item>
      {isEdit && (
        <Form.Item label="تاريخ التعديل" name="editDate">
          <Input type="date" value={moment().format('YYYY-MM-DD')} readOnly />
        </Form.Item>
      )}
      <Form.Item label="الكمية" name="quantity" rules={[{ required: true, message: 'الكمية مطلوبة' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item label="الوزن" name="weight" rules={[{ required: true, message: 'الوزن مطلوب' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item label="المقاس" name="measurementUnit" rules={[{ required: true, message: 'وحدة القياس مطلوبة' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="الكمية المعالجة" name="processedQuantity">
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEdit ? 'تحديث المنتج' : 'إضافة المنتج'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
