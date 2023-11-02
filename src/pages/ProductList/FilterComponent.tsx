import React from 'react';

interface FilterComponentProps {
  minPrice: number;
  maxPrice: number;
  location: string;
  selectedFacilities: string[];
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onLocationChange: (value: string) => void;
  onFacilitiesChange: (value: string[]) => void;
  onFilter: () => void;
  onClose: () => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  minPrice,
  maxPrice,
  location,
  selectedFacilities,
  onMinPriceChange,
  onMaxPriceChange,
  onLocationChange,
  onFacilitiesChange,
  onFilter,
  onClose,
}) => {
  return (
    <div className="filter-component">
      <div className="filter-section">
        <label>Min Price:</label>
        <input
          type="text"
          value={minPrice}
          onChange={(e) => onMinPriceChange(Number(e.target.value))}
        />
      </div>
      <div className="filter-section">
        <label>Max Price:</label>
        <input
          type="text"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
        />
      </div>
      <div className="filter-section">
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
        />
      </div>
      <div className="filter-section">
        <label>Facilities:</label>
        <input
          type="text"
          value={selectedFacilities.join(',')}
          onChange={(e) => onFacilitiesChange(e.target.value.split(','))}
        />
      </div>
      <button onClick={onFilter}>Filter</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FilterComponent;

