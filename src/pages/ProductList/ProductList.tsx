import { Filter } from 'iconsax-react';
import React, { useState, useEffect } from 'react';
import Product from '../../components/Product/Product';
import FilterComponent from './FilterComponent';

function ProductList() {
  const [showDetail, setShowDetail] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]); // State for filtered products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3003/products');
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();

        setProducts(data);
        setFilteredProducts(data); // Initially, set the filtered products to all products
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
      
      return selectedFacilities.every((facility) => productFacilities.includes(facility));
    });
    setFilteredProducts(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col relative p-4">
      <div className="flex p-2 my-4 border  cursor-pointer rounded-md w-fit" onClick={() => setIsShow(true)}>
      <Filter />
      <div className="">Filter Hall</div>
      </div>
      <div className="flex">
     {isShow &&(
        <FilterComponent
          onPriceFilter={filterByPrice}
          onLocationFilter={filterByLocation}
          onFacilitiesFilter={filterByFacilities}
          onClose={()=> setIsShow(false)}
        />)}
        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5 md:w-11/12 w-10/12 p-2 m-auto">
            {filteredProducts.map((product: any) => (
              <Product key={product.id} productInfo={product} show={showDetail} />
            ))}
          </div>
        ) : (
          <div>No products available.</div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
