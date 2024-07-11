import React from 'react';
import ClicheForm from './ClicheForm';
import { useLocation } from 'react-router-dom';

const EditClichePage = () => {
  const location = useLocation();
  const initialValues = location.state?.initialValues || {};

  return (
    <div>
      <h1>Klişeyi Düzenle</h1>
      <ClicheForm initialValues={initialValues} isEdit={true} />
    </div>
  );
};

export default EditClichePage;
