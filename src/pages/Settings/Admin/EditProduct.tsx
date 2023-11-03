import React, { useState, useEffect } from 'react';
import useFetchProducts from '../../../Hooks/useFetchProduct'; // Import the hook
import Authorization from './Authorize';
import SelectProduct from './SelectProduct';

function EditProduct() {
  const { products, loading, updateProduct } = useFetchProducts(); // Access the updateProduct function

  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleSelectProduct = (productId: any) => {
    setSelectedProductId(productId);
  };

  const handleUpdateProduct = (updatedProducts: any) => {
   
  };

  return (
    <div>
      <div className='w-fit text-3xl font-light m-a m-auto'>Product Management</div>
      <div className="md:flex">
        <SelectProduct products={products} onSelectProduct={handleSelectProduct} />
        {selectedProductId && (
          <Authorization
            product={products.find((product: any) => product.id === selectedProductId)}
            onUpdateProduct={handleUpdateProduct}
          />
        )}
      </div>
    </div>
  );
}

export default EditProduct;
