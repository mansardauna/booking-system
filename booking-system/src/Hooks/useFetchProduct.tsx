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
  booking: any[];
}

interface FetchProductsResult {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: Error | null;
  filterByPrice: (minPrice: number, maxPrice: number) => void;
  filterByLocation: (location: string) => void;
  filterByFacilities: (selectedFacilities: string[]) => void;
  updateProduct: (productId: number, updatedProductData: any) => Promise<Product>;
  deleteProduct: (productId: number) => Promise<void>;
  addProduct: (newProduct: Product) => Promise<void>;
  fetchUserData: (user: User) => Promise<void>;
  login: (user: User) => Promise<void>;
  deleteTicket:(productId:number, ticketId:number) => Promise<void>;
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
        const response = await axios.get('http://localhost:3003/api/products'); 
        const data = response.data;

        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching product data:', error);
        console.log('Response Data:', error.response?.data);
        console.log('Status Code:', error.response?.status);
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  // Function to handle filtering based on price range
  const filterByPrice = (minPrice: number, maxPrice: number) => {
    const filtered = products.filter((product) => {
      const price = product.price;
      return price >= minPrice && price <= maxPrice;
    });
    setFilteredProducts(filtered);
  };

  const filterByLocation = (location: string) => {
    const filtered = products.filter((product) => {
      const productLocation = product.location.toLowerCase();
      return productLocation.includes(location.toLowerCase());
    });
    setFilteredProducts(filtered);
  };

  const filterByFacilities = (selectedFacilities: string[]) => {
    const filtered = products.filter((product) => {
      const productFacilities = product.facilities.map((facility) => facility.title);
      return selectedFacilities.every((facility) => productFacilities.includes(facility));
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
      const response = await axios.delete(`http://localhost:3003/api/products/${productId}`);

      if (!response.data) {
        console.error('No data received in response.');
        throw new Error('No data received in response');
      }

      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const addProduct = async (newProduct: Product) => {
    try {
      const response = await axios.post('http://localhost:3003/api/products', newProduct, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.data) {
        console.error('No data received in response.');
        throw new Error('No data received in response');
      }

      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const login = async (user: User) => {
    try {
      const response = await axios.get('http://localhost:3003/api/signup', {
        auth: {
          username: user.username,
          password: user.password,
        },
      });

      if (response.status === 200) {
        console.log('Login successful');
        setError(null);

        const userData = response.data;
        setUser(userData);

        if (userData && userData.accessToken) {
          window.location.href = '/';
        } else {
          setError(new Error('Invalid server response. Please try again.'));
        }
      } else if (response.status === 401) {
        setError(new Error('Invalid credentials. Please try again.'));
      } else {
        setError(new Error('Error logging in. Please try again.'));
      }
    } catch (error) {
      setError(new Error('Error logging in. Please try again.'));
      console.error(error);
      throw error;
    }
  };

  const deleteTicket = async (productId: number, ticketId: number) => {
    try {
      const response = await axios.delete(`http://localhost:3003/api/products/${productId}/booking/${ticketId}`);
  
      if (!response.data) {
        console.error('No data received in response.');
        throw new Error('No data received in response');
      }
  
      setProducts((prevProducts) => {
        return prevProducts.map((product) => {
          if (product.id === productId) {
            // Update the product with the ticket removed
            const updatedProduct = {
              ...product,
              booking: product.booking.filter((ticket: any) => ticket.id !== ticketId),
            };
            return updatedProduct;
          }
          return product;
        });
      });
    } catch (error) {
      console.error('Error deleting ticket:', error);
      throw error;
    }
  };
  
  const fetchUserData = (user: User) => {
    return axios
      .post('/api/userdata', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (!response.data) {
          console.error('Failed to fetch user data:', response.statusText);
          throw new Error('Failed to fetch user data');
        }
        return response.data;
      })
      .then((userData) => {
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
    deleteTicket,
  };
};

export default useFetchProducts;
