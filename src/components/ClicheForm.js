import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCliche, updateCliche, getCliches } from '../redux/actions/productActions';
import { getBlocks } from '../redux/actions/blockActions';
import { Form, Input, Button, Select } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';

const ClicheForm = ({ initialValues = {}, isEdit = false }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.state?.productId;
  const cliches = useSelector((state) => state.product.cliches);
  const blocks = useSelector((state) => state.block.blocks);
  const [selectedCliche, setSelectedCliche] = useState(null);

  // Initial fetch of clichés and blocks
  useEffect(() => {
    dispatch(getCliches());
    dispatch(getBlocks());
  }, [dispatch]);

  // Populate form with initial values or selected cliche
  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length) {
      form.setFieldsValue(initialValues);
    } else if (selectedCliche) {
      form.setFieldsValue({
        name: selectedCliche.name,
        ref: selectedCliche.ref,
        location: selectedCliche.location,
        processedQuantity: selectedCliche.processedQuantity,
        shippedQuantity: selectedCliche.shippedQuantity,
      });
    }
  }, [initialValues, selectedCliche, form]);

  const onClicheChange = (value) => {
    const selected = cliches.find(cliche => cliche._id === value);
    setSelectedCliche(selected);
  };

  const onFinish = (formData) => {
    const requiredFields = ['name', 'ref', 'location', 'processedQuantity', 'shippedQuantity'];

    for (const field of requiredFields) {
      if (formData[field] == null || formData[field] === '') {
        console.error(`Error: Missing required field ${field}`);
        return;
      }
    }

    const updatedData = {
      ...formData,
      editDate: moment().format('YYYY-MM-DD'),
      history: [...(initialValues.history || []), { date: moment().format('YYYY-MM-DD'), description: 'Cliche updated' }]
    };

    if (isEdit) {
      if (initialValues._id) {
        dispatch(updateCliche({ id: initialValues._id, ...updatedData }));
      } else {
        console.error('Error: Missing cliche ID for update', initialValues);
      }
    } else {
      dispatch(addCliche(updatedData, productId));
    }
    form.resetFields();
    navigate('/');
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="اختر الكليشيه الحالي" name="existingCliche">
        <Select onChange={onClicheChange} allowClear>
          {cliches.map((cliche) => (
            <Select.Option key={cliche._id} value={cliche._id}>
              {cliche.name} ({cliche.ref})
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="اسم الكليشيه" name="name" rules={[{ required: true, message: 'اسم الكليشيه مطلوب' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="المرجع" name="ref" rules={[{ required: true, message: 'المرجع مطلوب' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="الموقع" name="location" rules={[{ required: true, message: 'الموقع مطلوب' }]}>
        <Select>
          {blocks.map((block) => (
            <Select.Option key={block.id} value={block.name}>
              {block.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="الكمية المعالجة" name="processedQuantity" rules={[{ required: true, message: 'الكمية المعالجة مطلوبة' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item label="الكمية المرسلة" name="shippedQuantity" rules={[{ required: true, message: 'الكمية المرسلة مطلوبة' }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEdit ? 'تحديث الكليشيه' : 'إضافة الكليشيه'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ClicheForm;
