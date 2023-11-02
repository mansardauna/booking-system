import React, { ChangeEvent, useEffect, useState } from 'react';
import Button from '../../../components/UI/Button';
import useFetchProducts from '../../../Hooks/useFetchProduct';

interface EditProductFormProps {
  productId: number;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ productId }) => {
  const { products, loading, error, updateProduct, deleteProduct } = useFetchProducts();
  const editedProduct = products.find((product: any) => product._id === productId);
  const [editProductData, setEditProductData] = useState(editedProduct || null);

  useEffect(() => {
    if (editedProduct) {
      setEditProductData(editedProduct);
    }
  }, [editedProduct]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editProductData) {
      const { name, value } = e.target;
      setEditProductData({
        ...editProductData,
        [name]: value,
      });
    }
  };

  const handleUpdate = () => {
    // Call the updateProduct function from the hook
    if (editProductData) {
      updateProduct(editProductData);
    }
  };

  const handleDelete = () => {
    // Call the deleteProduct function from the hook
    if (editProductData) {
      deleteProduct(editProductData._id);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editProductData) {
      setEditProductData({
        ...editProductData,
        [name]: value,
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2 md:p-0">
      <div className="w-fit m-auto text-2xl font-light">Edit Product</div>
      <img src={editProductData?.images[0]} alt={editProductData?.name} className="w-80 h-60 m-auto rounded-md" />
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex items-center gap-2">
          <label className="w-20">Name</label>
          <input type="text" name="name" value={editProductData?.name} onChange={handleChange} className="border p-2 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-20">Price</label>
          <input type="number" name="price" value={editProductData?.price} onChange={handleChange} className="border p-2 rounded-md" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex items-center gap-2">
          <label className="w-20">Rate</label>
          <input type="text" name="rate" value={editProductData?.rate} onChange={handleChange} className="border p-2 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <label className="w-20">Location</label>
          <input type="text" name="location" value={editProductData?.location} onChange={handleChange} className="border p-2 rounded-md" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <label className="w-20">Category</label>
        <select name="category" value={editProductData?.category} onChange={handleSelectChange} className="border p-2 rounded-md">
          <option value="Near me">Near me</option>
          <option value="Recommended">Recommended</option>
          <option value="Popular">Popular</option>
        </select>
      </div>
      <div className="flex items-center gap-2 w-11/12">
        <label className="w-20">Description</label>
        <textarea name="des" value={editProductData?.des} onChange={handleChange} className="border p-2 rounded-md w-full h-20" />
      </div>
      <Button variant="primary" onClick={handleUpdate} className="w-fit text-white m-auto rounded-md">
        Update
      </Button>
      <Button variant="secondary" onClick={handleDelete} className="w-fit bg-slate-200 m-auto rounded-md">
        Delete
      </Button>
    </div>
  );
};

export default EditProductForm;
