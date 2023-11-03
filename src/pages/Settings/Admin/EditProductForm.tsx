import React, { useState, ChangeEvent, useEffect } from 'react';
import Button from '../../../components/UI/Button';
import useFetchProducts from '../../../Hooks/useFetchProduct';

interface Facility {
  icon: string;
  title: string;
}
interface Product {
  id: number;
  images: string[];
  name: string;
  price: number;
  location: string;
  facilities: Facility[];
  rate: string;
  des: string;
  category: string;
}


interface EditProductFormProps {
  product: Product;
  onUpdateProduct: any;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product, onUpdateProduct }) => {
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const { updateProduct, deleteProduct } = useFetchProducts();

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedProduct = await updateProduct(editedProduct.id, editedProduct);
      onUpdateProduct(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      onUpdateProduct(null);
    }
  };
  

  const handleDelete = async () => {
    try {
      await deleteProduct(editedProduct.id);
      onUpdateProduct(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  return (
    <div className='flex flex-col gap-2 p-2 md:p-0'>
      <div className='w-fit m-auto text-2xl font-light'>Edit Product</div>
      <img src={editedProduct.images[0]} alt={editedProduct.name} className="w-80 h-60 m-auto rounded-md" />
      <div className="flex flex-col md:flex-row gap-2">
        <div className='flex items-center gap-2'>
          <label className='w-20'>Name</label>
          <input type="text" name="name" value={editedProduct.name} onChange={handleChange} className="border p-2 rounded-md" />
        </div>
        <div className='flex items-center gap-2'>
          <label className='w-20'>Price</label>
          <input type="number" name="price" value={editedProduct.price} onChange={handleChange} className="border p-2 rounded-md" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <div className='flex items-center gap-2'>
          <label className='w-20'>Rate</label>
          <input type="text" name="rate" value={editedProduct.rate} onChange={handleChange} className="border p-2 rounded-md" />
        </div>
        <div className='flex items-center gap-2'>
          <label className='w-20'>Location</label>
          <input type="text" name="location" value={editedProduct.location} onChange={handleChange} className="border p-2 rounded-md" />
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <label className='w-20'>Category</label>
        <select name="category" value={editedProduct.category} onChange={handleSelectChange} className="border p-2 rounded-md">
          <option value="Near me">Near me</option>
          <option value="Recommended">Recommended</option>
          <option value="Popular">Popular</option>
        </select>
      </div>
      <div className='flex items-center gap-2 w-11/12'>
        <label className='w-20'>Description</label>
        <textarea name="des" value={editedProduct.des} onChange={handleChange} className="border p-2 rounded-md w-full h-20" />
      </div>
      <Button variant='primary' onClick={handleUpdate} className="w-fit text-white m-auto rounded-md">Update</Button>
      <Button variant='secondary' onClick={handleDelete} className="w-fit bg-slate-200 m-auto rounded-md">Delete</Button>
    </div>
  );
};

export default EditProductForm;
