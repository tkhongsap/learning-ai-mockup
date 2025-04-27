import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { DEMOS } from '../i18n/keys';

const SkillGapHeader = () => {
  // Using the demos namespace
  const { t } = useTranslation('demos');
  
  return (
    <div className="max-w-screen-2xl mx-auto mb-6 px-4">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-xl md:text-2xl font-bold text-indigo-700">
          <i className="fas fa-chart-line mr-2"></i>
          <span>{t(DEMOS.SKILL_GAP.PAGE_TITLE)}</span>
        </h1>
        <LanguageSwitcher />
        <a 
          href="../index.html#features" 
          className="text-sm text-indigo-600 hover:underline"
        >
          {t(DEMOS.SKILL_GAP.BACK_LINK)}
        </a>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {t(DEMOS.SKILL_GAP.HEADER_TITLE)}
        </h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200">
            <i className="fas fa-download mr-1"></i> {t(DEMOS.SKILL_GAP.EXPORT_BUTTON)}
          </button>
          <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200">
            <i className="fas fa-print mr-1"></i> {t(DEMOS.SKILL_GAP.PRINT_BUTTON)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillGapHeader; 