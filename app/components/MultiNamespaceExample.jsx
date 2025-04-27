import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import FormErrorMessage from './FormErrorMessage';
import { COMMON, DEMOS } from '../i18n/keys';

const MultiNamespaceExample = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  
  // Using multiple namespaces
  const { t: tCommon } = useTranslation('common');
  const { t: tDemos } = useTranslation('demos');
  
  const validateEmail = () => {
    if (!email) {
      setError('required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('email');
      return false;
    }
    
    setError(null);
    return true;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      alert('Form submitted successfully!');
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {tCommon(COMMON.NAV.BRAND)}
        </h2>
        <span className="text-gray-500">
          {tDemos(DEMOS.SKILL_GAP.PAGE_TITLE)}
        </span>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <FormErrorMessage type={error} />}
        </div>
        
        <button 
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          {tDemos(DEMOS.SKILL_GAP.EXPORT_BUTTON)}
        </button>
      </form>
      
      <div className="mt-4 text-sm text-gray-600">
        <Trans i18nKey={COMMON.FOOTER.COPYRIGHT} ns="common">
          &copy; 2025 Your Company Name. Internal Use Only.
        </Trans>
      </div>
    </div>
  );
};

export default MultiNamespaceExample; 