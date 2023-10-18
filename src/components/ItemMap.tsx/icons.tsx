import { Car, Security, Wifi } from 'iconsax-react';
import React from 'react';
import { FaRunning, FaStore, FaSwimmingPool } from 'react-icons/fa';

type FacilityIconsProps = {
  iconName: string;
};

const FacilityIcons: React.FC<FacilityIconsProps> = ({ iconName }) => {
  const iconMapping: { [key: string]: JSX.Element } = {
    'Free Wi-Fi': <Wifi />,
    'Swimming Pool': <FaSwimmingPool />,
    'Restaurant': <FaStore />,
    "Free Parking": <Car />,
    "Gym" : <FaRunning />,
    "24/7 Security": <Security />
  };

  const selectedIcon = iconMapping[iconName];

  return (
    <div className=" items-center flex p-2 border w-10 h-10 m-auto justify-center shadow-md rounded-md">
      {selectedIcon}
      
    </div>
  );

};

export default FacilityIcons;
