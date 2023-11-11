import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { FaLanguage } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { LanguageSquare } from 'iconsax-react';

const Language: React.FC = () => {
  const { t, i18n } = useTranslation('layout');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdownName: string | null) => {
    setShowDropdown(dropdownName);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    toggleDropdown(null);
  };

  return (
    <div className='relative'>
      <div onClick={() => toggleDropdown('lang')} className="flex justify-center items-center gap-2 relative">
      <LanguageSquare/>
      <div className=' hidden md:block '>Language</div>
      </div>
      {showDropdown === 'lang' && (
        <motion.ul
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute md:top-6 bottom-5 left-0 z-10 bg-black w-32 text-[#767676] h-fit p-4  pb-6"
        >
          <li
            onClick={() => changeLanguage('en')}
            className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
          >
            {t('English', { ns: 'layout' })}
          </li>
          <li
            onClick={() => changeLanguage('es')}
            className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
          >
            {t('Spanish', { ns: 'layout' })}
          </li>
          <li
            onClick={() => changeLanguage('ar')}
            className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
          >
            {t('Arabic', { ns: 'layout' })}
          </li>
          <li
            onClick={() => changeLanguage('fr')}
            className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
          >
            {t('French', { ns: 'layout' })}
          </li>
        </motion.ul>
      )}
    </div>
  );
};

export default Language;
