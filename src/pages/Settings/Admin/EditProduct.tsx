import React, { useState } from 'react';
import useFetchProducts from '../../../Hooks/useFetchProduct';
import Authorization from './Authorize';
import SelectProduct from './SelectProduct';

function EditProduct() {
  const { products, loading, updateProduct } = useFetchProducts();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleSelectProduct = (productId: number) => {
    setSelectedProductId(productId);
  };

  const handleUpdateProduct = (updatedProduct: any) => {
    // You can use the `updateProduct` function to update the product
    updateProduct(updatedProduct);
  };

  return (
    <div>
      <div className="w-fit text-3xl font-light m-a m-auto">Product Management</div>
      <div className="md:flex">
        <SelectProduct products={products} onSelectProduct={handleSelectProduct} />
        {selectedProductId !== null && (
          <Authorization
            product={products.find((product) => product._id === selectedProductId)}
            onUpdateProduct={handleUpdateProduct}
          />
        )}
      </div>
    </div>
  );
}

export default EditProduct;
