import { useState, useEffect } from 'react';

interface Product {
  _id: number;
  images: string;
  name: string;
  price: number;
  location: string;
  facilities: string[];
  rate: string;
  des: string;
  category: string;
}

const useFetchProducts = (): {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: Error | null;
  filterProducts: (minPrice: number, maxPrice: number, location: string, selectedFacilities: string[]) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: number) => void;
  addProduct: (newProduct: Product) => void;
} => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace the API URL with your actual API endpoint
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

  // Function to handle filtering based on price range, location, and facilities
  const filterProducts = (minPrice: number, maxPrice: number, location: string, selectedFacilities: string[]) => {
    const filtered = products.filter((product: Product) => {
      const price = product.price;
      const productLocation = product.location;
      const productFacilities = product.facilities;

      return (
        price >= minPrice &&
        price <= maxPrice &&
        (location === '' || productLocation === location) &&
        (selectedFacilities.length === 0 ||
          selectedFacilities.every((facility: string) => productFacilities.includes(facility))
        )
      );
    });

    setFilteredProducts(filtered);
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      const response = await fetch(`http://localhost:3003/products/${updatedProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const updatedProductData = await response.json();
        const updatedProducts = products.map((product: Product) =>
          product._id === updatedProductData._id ? updatedProductData : product
        );
        setProducts(updatedProducts);
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      const response = await fetch(`http://localhost:3003/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedProducts = products.filter((product: Product) => product._id !== productId);
        setProducts(updatedProducts);
      } else {
        throw new Error('Failed to delete product');
      }
      }  catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const addProduct = async (newProduct: Product) => {
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
        // Reset the form or perform other actions if needed
      } else {
        console.error('Failed to add product:', response.statusText);
        throw new Error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  return { products, filteredProducts, loading, error, filterProducts, updateProduct, deleteProduct, addProduct };
};

export default useFetchProducts;
