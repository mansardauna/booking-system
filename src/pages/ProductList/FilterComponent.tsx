import { CloseSquare } from 'iconsax-react';
import React, { useState } from 'react';
import Button from '../../components/UI/Button';

interface FilterComponentProps {
  onPriceFilter: (minPrice: number, maxPrice: number) => void;
  onLocationFilter: (location: string) => void;
  onFacilitiesFilter: (facilities: string[]) => void;
  onClose:any;
}

function FilterComponent({ onPriceFilter, onLocationFilter, onFacilitiesFilter, onClose }: FilterComponentProps) {
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [location, setLocation] = useState<string>('');
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const handlePriceFilter = () => {
    if (minPrice === '' || maxPrice === '') return;
    onPriceFilter(Number(minPrice), Number(maxPrice));
  };

  const handleLocationFilter = () => {
    onLocationFilter(location);
  };

  const handleFacilitiesFilter = () => {
    onFacilitiesFilter(selectedFacilities);
  };

  return (
    <div className="filter-container fixed right-0 md:w-2/12  w-3/6 h-full bg-white border p-4  md:top-16 top-28">
      <div className="flex cursor-pointer gap-4">
        <CloseSquare onClick={onClose}/>
      <div className='w-fit m-auto text-xl mb-3'>Filter Products</div>
      </div>
      {/* Price Range Filter */}
      <div className='p-2 rounded-md flex flex-col '>
        <label className='w-fit m-auto mb-3 text-2xl font-light'>Price Range</label>
        <div className="flex justify-between gap-3">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e:any) => setMinPrice(e.target.value)}
          className='w-1/2 border  border-gray-400 p-2 rounded-md bg-transparent'
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e:any) => setMaxPrice(e.target.value)}
          className='w-1/2 border border-gray-400 p-2 rounded-md bg-transparent'
        />
        </div>
        <Button onClick={handlePriceFilter}
        variant="secondary" className='w-fit mt-2 m-auto shadow-md rounded-xl'>Filter</Button>
      </div>

      {/* Location Filter */}
      <div className=' p-2 rounded-md mt-4 flex-col flex'>
        <label className='w-fit text-2xl font-light m-auto'>Location</label>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border border-gray-400 rounded-md bg-transparent"
        />
       <Button onClick={handleLocationFilter}
        variant="secondary" className='w-fit mt-2 m-auto shadow-md rounded-xl'>Filter</Button>
      </div>

      {/* Facilities Filter */}
      <div className='p-2 rounded-md mt-4 flex flex-col'>
        <label className='w-fit m-auto text-2xl font-light '>Facilities</label>
        <select
          multiple
          value={selectedFacilities}
          onChange={(e) => {
            const selectedOptions = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            setSelectedFacilities(selectedOptions);
          }}
          className="border rounded-md p-2 overflow-y-auto bg-transparent border-gray-400"
        >
          <option value="Swimming Pool">Swimming Pool</option>
          <option value="Gym">Gym</option>
          <option value="WiFi">WiFi</option>
          {/* Add more facility options here */}
        </select>
       <Button onClick={handleFacilitiesFilter}
        variant="secondary" className='w-fit mt-2 m-auto shadow-md rounded-xl'>Filter</Button>
      </div>
    </div>
  );
}

export default FilterComponent;