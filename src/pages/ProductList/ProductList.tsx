import React, { useState } from 'react';
import Product from '../../components/Product/Product';
import useFetchProducts from '../../Hooks/useFetchProduct';
import FilterComponent from './FilterComponent';

function ProductList() {
  const [showDetail, setShowDetail] = useState(false);
  const { products, filteredProducts, loading, error, filterProducts } = useFetchProducts();
  const [isShow, setIsShow] = useState(false);
  const [minPrice, setMinPrice] = useState(Number);
  const [maxPrice, setMaxPrice] = useState(Number);
  const [location, setLocation] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleFilter = () => {
    filterProducts(minPrice, maxPrice, location, selectedFacilities);
  };

  return (
    <div className="product-list">
      <div className="flex p-2 my-4 border cursor-pointer rounded-md w-fit" onClick={() => setIsShow(true)}>
        Filter
      </div>
      <div className="flex">
        {isShow && (
          <FilterComponent
            minPrice={minPrice}
            maxPrice={maxPrice}
            location={location}
            selectedFacilities={selectedFacilities}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onLocationChange={setLocation}
            onFacilitiesChange={setSelectedFacilities}
            onFilter={handleFilter}
            onClose={() => setIsShow(false)}
          />
        )}
        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5 md:w-11/12 w-10/12 p-2 m-auto">
            {filteredProducts.map((product) => (
              <Product key={product._id} productInfo={product} show={showDetail} />
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
