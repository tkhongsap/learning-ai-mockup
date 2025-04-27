import React from 'react';
import { useTranslation } from 'react-i18next';
import { ERRORS } from '../i18n/keys';

const FormErrorMessage = ({ type, count }) => {
  // Using the errors namespace
  const { t } = useTranslation('errors');
  
  const getErrorMessage = () => {
    switch (type) {
      case 'required':
        return t(ERRORS.VALIDATION.REQUIRED);
      case 'email':
        return t(ERRORS.VALIDATION.EMAIL);
      case 'minLength':
        return t(ERRORS.VALIDATION.MIN_LENGTH, { count });
      case 'maxLength':
        return t(ERRORS.VALIDATION.MAX_LENGTH, { count });
      case 'passwordMatch':
        return t(ERRORS.VALIDATION.PASSWORD_MATCH);
      case 'networkError':
        return t(ERRORS.SYSTEM.NETWORK_ERROR);
      case 'serverError':
        return t(ERRORS.SYSTEM.SERVER_ERROR);
      case 'unauthorized':
        return t(ERRORS.SYSTEM.UNAUTHORIZED);
      case 'notFound':
        return t(ERRORS.SYSTEM.NOT_FOUND);
      default:
        return '';
    }
  };
  
  const errorMessage = getErrorMessage();
  
  if (!errorMessage) return null;
  
  return (
    <div className="text-red-500 text-sm mt-1">
      {errorMessage}
    </div>
  );
};

export default FormErrorMessage; 