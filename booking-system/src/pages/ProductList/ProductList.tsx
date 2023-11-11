import { Filter } from 'iconsax-react';
import React, { useState } from 'react';
import Product from '../../components/Product/Product';
import useFetchProducts from '../../Hooks/useFetchProduct';
import FilterComponent from './FilterComponent';

function ProductList() {
  const [showDetail, setShowDetail] = useState(false);
  const {
    filteredProducts,
    loading,
    error,
    filterByPrice,
    filterByLocation,
    filterByFacilities,
  } = useFetchProducts(); // Use the hook

  const [isShow, setIsShow] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col relative p-4">
      <div className="flex p-2 my-4 border cursor-pointer rounded-md w-fit" onClick={() => setIsShow(true)}>
        <Filter />
        <div className="">Filter Hall</div>
      </div>
      <div className="flex">
        {isShow && (
          <FilterComponent
            onPriceFilter={filterByPrice}
            onLocationFilter={filterByLocation}
            onFacilitiesFilter={filterByFacilities}
            onClose={() => setIsShow(false)}
          />
        )}
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
