import React, { useState } from 'react';
import Button from '../../../components/UI/Button';

interface SelectProductProps {
  products: any[];
  onSelectProduct: (productId: number) => void;
}

const SelectProduct: React.FC<SelectProductProps> = ({ products, onSelectProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false); // New state variable

  const handleSearch = () => {
    const newFilteredProducts = products
      ? products.filter((product) => {
          const searchLower = searchTerm.toLowerCase();
          return (
            product.name.toLowerCase().includes(searchLower) ||
            product.price.toString().includes(searchTerm) ||
            product.location.toLowerCase().includes(searchLower)
          );
        })
      : [];

    setFilteredProducts(newFilteredProducts);
    setShowResults(true); // Show results when searching
  };

  const handleProductSelect = (productId: number) => {
    onSelectProduct(productId);
    setShowResults(false); // Close the results when a product is selected
  };

  return (
    <div className="md:w-1/3 p-2 h-full m-auto overflow-auto">
      <div className="w-fit text-xl font-light m-auto text-center">Search for your hall</div>
      <input
        type="text"
        placeholder="Search by name, price, or location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded-md mt-2"
      />
      <Button variant="secondary" onClick={handleSearch} className="bg-slate-200 rounded-md">
        Search
      </Button>
      {showResults && filteredProducts.length > 0 && (
        <ul className="mt-2 absolute bg-white w-1/3">
          {filteredProducts.map((product: any) => (
            <li
              key={product.id}
              onClick={() => handleProductSelect(product.id)}
              className="hover:bg-slate-100 p-2 cursor-pointer"
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectProduct;
