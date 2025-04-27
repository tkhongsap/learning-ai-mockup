import React from 'react';
import { useTranslation } from 'react-i18next';
import { COMMON } from '../i18n/keys';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation('common');
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div className="lang-switcher flex items-center">
      <button 
        id="lang-en-desktop" 
        onClick={() => changeLanguage('en')} 
        className={i18n.language === 'en' ? 'active' : ''}
      >
        {t(COMMON.LANGUAGE_SWITCHER.EN)}
      </button>
      <span className="mx-1 text-gray-400">|</span>
      <button 
        id="lang-th-desktop" 
        onClick={() => changeLanguage('th')} 
        className={i18n.language === 'th' ? 'active' : ''}
      >
        {t(COMMON.LANGUAGE_SWITCHER.TH)}
      </button>
    </div>
  );
};

export default LanguageSwitcher; 