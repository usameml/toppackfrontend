import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBlocks } from '../redux/actions/blockActions';
import { getProducts, getCliches } from '../redux/actions/productActions';
import { Modal } from 'antd';

const WarehouseMap = () => {
  const dispatch = useDispatch();
  const blocks = useSelector((state) => state.block.blocks);
  const products = useSelector((state) => state.product.products);
  const cliches = useSelector((state) => state.product.cliches);
  const [visible, setVisible] = React.useState(false);
  const [selectedBlock, setSelectedBlock] = React.useState(null);

  useEffect(() => {
    dispatch(getBlocks());
    dispatch(getProducts());
    dispatch(getCliches());
  }, [dispatch]);

  const showModal = (block) => {
    setSelectedBlock(block);
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    setSelectedBlock(null);
  };

  const handleCancel = () => {
    setVisible(false);
    setSelectedBlock(null);
  };

  const getBlockItems = useCallback((blockName) => {
    const blockProducts = products.filter(product => product.location === blockName);
    const blockCliches = cliches.filter(cliche => cliche.location === blockName);
    return { blockProducts, blockCliches };
  }, [products, cliches]);

  if (!blocks || blocks.length === 0) {
    return <div>Bloklar yükleniyor...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '800%', alignItems: 'center', marginBottom: '20px' }}>
        <div onClick={() => showModal(blocks.find(b => b.name === 'Block L'))} style={{ backgroundColor: 'lightblue', width: '12%', height: '10vh', marginBottom: '10px', cursor: 'pointer' }}>Block L</div>
        <div onClick={() => showModal(blocks.find(b => b.name === 'Block M'))} style={{ backgroundColor: 'darkgray', width: '9%', height: '10vh', cursor: 'pointer' }}>Block M</div>
      </div>
      <div style={{ display: 'flex', width: '90%', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '342%', marginRight: '10px' }}>
          <div onClick={() => showModal(blocks.find(b => b.name === 'Block F'))} style={{ backgroundColor: 'cyan', width: '100%', height: '10vh', cursor: 'pointer' }}>Block F</div>
          <div onClick={() => showModal(blocks.find(b => b.name === 'Block G'))} style={{ backgroundColor: 'brown', width: '100%', height: '10vh', cursor: 'pointer' }}>Block G</div>
          <div style={{ height: '20px' }}></div> {/* Araya mesafe bırakma */}
          <div onClick={() => showModal(blocks.find(b => b.name === 'Block H'))} style={{ backgroundColor: 'gray', width: '100%', height: '10vh', cursor: 'pointer' }}>Block H</div>
          <div onClick={() => showModal(blocks.find(b => b.name === 'Block I'))} style={{ backgroundColor: 'purple', width: '100%', height: '10vh', cursor: 'pointer' }}>Block I</div>
          <div style={{ height: '20px' }}></div> {/* Araya mesafe bırakma */}
          <div onClick={() => showModal(blocks.find(b => b.name === 'Block J'))} style={{ backgroundColor: 'lightgreen', width: '100%', height: '10vh', cursor: 'pointer' }}>Block J</div>
          <div onClick={() => showModal(blocks.find(b => b.name === 'Block K'))} style={{ backgroundColor: 'navy', width: '100%', height: '10vh', cursor: 'pointer' }}>Block K</div>
        </div>
        <div style={{ display: 'flex', width: '90%', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '242%' }}>
            <div onClick={() => showModal(blocks.find(b => b.name === 'Block A'))} style={{ backgroundColor: 'red', width: '78%', height: '10vh', cursor: 'pointer' }}>Block A</div>
            <div onClick={() => showModal(blocks.find(b => b.name === 'Block B'))} style={{ backgroundColor: 'blue', width: '78%', height: '10vh', cursor: 'pointer' }}>Block B</div>
            <div onClick={() => showModal(blocks.find(b => b.name === 'Block C'))} style={{ backgroundColor: 'green', width: '78%', height: '10vh', cursor: 'pointer' }}>Block C</div>
            <div onClick={() => showModal(blocks.find(b => b.name === 'Block D'))} style={{ backgroundColor: 'orange', width: '78%', height: '10vh', cursor: 'pointer' }}>Block D</div>
            <div onClick={() => showModal(blocks.find(b => b.name === 'Block E'))} style={{ backgroundColor: 'pink', width: '78%', height: '10vh', cursor: 'pointer' }}>Block E</div>
          </div>
        </div>
      </div>
  
      <Modal
        title={selectedBlock?.name}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedBlock && (
           <div>
           <h3>Products</h3>
           <ul>
             {getBlockItems(selectedBlock.name).blockProducts.map((item) => (
               <li key={item._id}>{item.name}: {item.quantity - item.processedQuantity}</li>
             ))}
           </ul>
           <h3>Clichés</h3>
           <ul>
             {getBlockItems(selectedBlock.name).blockCliches.map((cliche) => (
               <li key={cliche._id}>{cliche.name}: {cliche.processedQuantity - cliche.shippedQuantity}</li>
             ))}
           </ul>
         </div>
        )}
      </Modal>
    </div>
  );
  
};

export default WarehouseMap;