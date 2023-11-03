import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Facility {
  icon: string;
  title: string;
}

interface User {
  username: string;
  password: string;
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

interface FetchProductsResult {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: Error | null;
  filterByPrice: (minPrice: number, maxPrice: number) => void;
  filterByLocation:(location : string) => void;
  filterByFacilities:(selectedFacilities: string[])=>void;
  updateProduct: (productId: number, updatedProductData: any) => Promise<Product>;
  deleteProduct: (productId: number) => Promise<void>;
  addProduct: (newProduct: Product) => Promise<void>;
  fetchUserData: (user: User) => Promise<void>;
  login: (user: User) => Promise<void>;
}

const useFetchProducts = (): FetchProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/products');
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();

        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching product data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle filtering based on price range
  const filterByPrice = (minPrice: number, maxPrice: number) => {
    const filtered = products.filter((product) => {
      const price = product.price; // Assuming the price is a property of the product
      return price >= minPrice && price <= maxPrice;
    });
    setFilteredProducts(filtered);
  };

  const filterByLocation = (location: string) => {
    const filtered = products.filter((product) => {
      const productLocation = product.location; // Assuming the location is a property of the product
      return productLocation === location;
    });
    setFilteredProducts(filtered);
  };

  // Function to handle filtering based on facilities
  const filterByFacilities = (selectedFacilities: string[]) => {
    const filtered = products.filter((product) => {
      const productFacilities = product.facilities; 
      
      return selectedFacilities.every((facility:any) => productFacilities.includes(facility));
    });
    setFilteredProducts(filtered);
  };

  const updateProduct = async (productId: number, updatedProductData: any) => {
    try {
      const response = await axios.put(`http://localhost:3003/api/products/${productId}`, updatedProductData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.data) {
        console.error('No data received in response.');
        throw new Error('No data received in response');
      }

      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      const response = await fetch(`http://localhost:3003/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const addProduct = async (newProduct: Product) => {
    try {
      const response = await fetch('http://localhost:3003/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        setProducts((prevProducts) => [...prevProducts, addedProduct]);
      } else {
        console.error('Failed to add product:', response.statusText);
        throw new Error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };


const login = async (user: User) => {
  try {
    const response = await fetch('http://localhost:3003/api/signup', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      
      console.log('Login successful');
      setError(null); 


      const userData = await response.json();
      setUser(userData);

      
      if (userData && userData.accessToken) {
        
        window.location.href = '/';
      } else {
        setError(new Error('Invalid server response. Please try again.'));
      }
    } else if (response.status === 401) {
      setError(new Error('Invalid credentials. Please try again.'));
    } else {
      // Error handling
      setError(new Error('Error logging in. Please try again.')); // Set an Error object
    }
  } catch (error) {
    setError(new Error('Error logging in. Please try again.')); 
    console.error(error);
    throw error;
  }
};

// ...


  const fetchUserData = (user: User) => {
    return fetch('http://localhost:3003/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Failed to fetch user data:', response.statusText);
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((userData) => {
        // Set the user data in the state
        setUser(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        throw error;
      });
  };

  return {
    products,
    filteredProducts,
    loading,
    error,
    filterByPrice,
    filterByLocation,
    filterByFacilities,
    updateProduct,
    deleteProduct,
    addProduct,
    login,
    fetchUserData,
  };
};

export default useFetchProducts;
