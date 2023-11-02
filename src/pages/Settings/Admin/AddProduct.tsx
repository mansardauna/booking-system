import React, { useState, ChangeEvent } from 'react';
import Button from '../../../components/UI/Button';

interface Facility {
  icon: string;
  title: string;
}

interface NewProduct {
  name: string;
  price: number;
  rate: string;
  images: File[];
  videos: File[];
  location: string;
  category: string;
  des: string;
  facilities: Facility[];
}

const AddProductForm: React.FC = () => {
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: '',
    price: 0,
    rate: '0',
    images: [],
    videos: [],
    location: '',
    category: 'Near me',
    des: '',
    facilities: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const images = Array.from(e.target.files);
      setNewProduct({
        ...newProduct,
        images,
      });
    }
  };

  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const videos = Array.from(e.target.files);
      setNewProduct({
        ...newProduct,
        videos,
      });
    }
  };

  const handleAddFacility = () => {
    const newFacility: Facility = {
      icon: '',
      title: '',
    };

    setNewProduct({
      ...newProduct,
      facilities: [...newProduct.facilities, newFacility],
    });
  };

  const handleFacilityChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedFacilities = [...newProduct.facilities];
    updatedFacilities[index] = {
      ...updatedFacilities[index],
      [name]: value,
    };

    setNewProduct({
      ...newProduct,
      facilities: updatedFacilities,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3003/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        // Reset the form
        setNewProduct({
          name: '',
          price: 0,
          rate: '0',
          images: [],
          videos: [],
          location: '',
          category: 'Near me',
          des: '',
          facilities: [],
        });
      } else {
        console.error('Failed to add product:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setNewProduct({
      ...newProduct,
      category: value,
    });
  };

  return (
    <div className='p-2 md:w-9/12 m-auto items-center flex flex-col gap-3 border mt-2'>
      <div className='w-fit m-auto p-2 text-3xl font-light'>Add New Event Hall</div>
      <div className="grid md:grid-cols-2 gap-2">
        <div className='flex gap-3 items-center'>
          <label className='w-20 text-center'>Name</label>
          <input type="text" name="name" value={newProduct.name} onChange={handleChange} className="p-2 border rounded-md" />
        </div>
        <div className='flex gap-3 items-center'>
          <label className='w-20 text-center'>Price</label>
          <input type="number" name="price" value={newProduct.price} onChange={handleChange} className="p-2 border rounded-md" />
        </div>
        <div className='flex gap-3 items-center'>
          <label className='w-20 text-center'>Location</label>
          <input type="text" name="location" value={newProduct.location} onChange={handleChange} className="p-2 border rounded-md" />
        </div>
        <div className='flex gap-3 items-center'>
          <label className='w-20 text-center'>Rate</label>
          <input type="text" name="rate" value={newProduct.rate} onChange={handleChange} className="p-2 border rounded-md" />
        </div>
      </div>
      <div className="md:flex justify-between gap-2">
        <div className='flex gap-2 items-center'>
          <label>Images</label>
          <input type="file" name="images" multiple onChange={handleImageUpload} className="border p-2" />
        </div>
        <div className='flex gap-2 items-center'>
          <label>Videos</label>
          <input type="file" name="videos" multiple onChange={handleVideoUpload} className="border p-2" />
        </div>
      </div>
      <div className='flex gap-2 items-center'>
        <label>Category</label>
        <select name="category" value={newProduct.category} onChange={handleCategoryChange} className="p-2">
          <option value="Near me">Near me</option>
          <option value="Recommended">Recommended</option>
          <option value="Popular">Popular</option>
        </select>
      </div>
      <div className='flex gap-2 items-center'>
        <label>Description:</label>
        <textarea name="des" value={newProduct.des} onChange={handleChange} className="border rounded-md" />
      </div>
      <div className="flex gap-2 items-center">
        <label>Facilities:</label>
        {newProduct.facilities.map((facility, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              name="icon"
              value={facility.icon}
              placeholder="Facility Icon"
              onChange={(e) => handleFacilityChange(e, index)}
              className="border p-2 rounded-md"
            />
            <input
              type="text"
              name="title"
              value={facility.title}
              placeholder="Facility Title"
              onChange={(e) => handleFacilityChange(e, index)}
              className="border p-2 rounded-md"
            />
          </div>
        ))}
        <Button
          variant="secondary"
          onClick={handleAddFacility}
          className="p-2"
        >
          Add Facility
        </Button>
      </div>

      <Button variant='primary' onClick={handleSubmit} className="m-auto w-fit hover:text-white">Add Product</Button>
    </div>
  );
};

export default AddProductForm;
