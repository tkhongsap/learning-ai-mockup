// Common namespace keys
export const COMMON = {
  NAV: {
    BRAND: 'nav.brand',
    FEATURES: 'nav.features',
    REQUEST_ACCESS: 'nav.requestAccess'
  },
  FOOTER: {
    TAGLINE: 'footer.tagline',
    QUICK_LINKS: {
      TITLE: 'footer.quickLinks.title',
      FEATURES: 'footer.quickLinks.features',
      DOCS: 'footer.quickLinks.docs',
      REQUEST_ACCESS: 'footer.quickLinks.requestAccess'
    },
    COMPLIANCE: {
      TITLE: 'footer.compliance.title',
      PRIVACY: 'footer.compliance.privacy',
      USE_POLICY: 'footer.compliance.usePolicy',
      AI_ETHICS: 'footer.compliance.aiEthics'
    },
    SUPPORT: {
      TITLE: 'footer.support.title',
      CONTACT: 'footer.support.contact'
    },
    COPYRIGHT: 'footer.copyright'
  },
  LANGUAGE_SWITCHER: {
    EN: 'languageSwitcher.en',
    TH: 'languageSwitcher.th'
  }
};

// Demos namespace keys
export const DEMOS = {
  SKILL_GAP: {
    PAGE_TITLE: 'skillGap.pageTitle',
    BACK_LINK: 'skillGap.backLink',
    HEADER_TITLE: 'skillGap.headerTitle',
    EXPORT_BUTTON: 'skillGap.exportButton',
    PRINT_BUTTON: 'skillGap.printButton',
    
    FILTERS: {
      DEPARTMENT_LABEL: 'skillGap.filtersDepartmentLabel',
      DEPARTMENT_OPTION_ALL: 'skillGap.filtersDepartmentOptionAll',
      DEPARTMENT_OPTION_ENG: 'skillGap.filtersDepartmentOptionEng',
      DEPARTMENT_OPTION_MKT: 'skillGap.filtersDepartmentOptionMkt',
      DEPARTMENT_OPTION_SALES: 'skillGap.filtersDepartmentOptionSales',
      DEPARTMENT_OPTION_SUPPORT: 'skillGap.filtersDepartmentOptionSupport',
      
      PERIOD_LABEL: 'skillGap.filtersPeriodLabel',
      PERIOD_OPTION_CURRENT_Q: 'skillGap.filtersPeriodOptionCurrentQ',
      PERIOD_OPTION_LAST_Q: 'skillGap.filtersPeriodOptionLastQ',
      PERIOD_OPTION_YTD: 'skillGap.filtersPeriodOptionYTD',
      PERIOD_OPTION_LAST_12M: 'skillGap.filtersPeriodOptionLast12M',
      
      CATEGORY_LABEL: 'skillGap.filtersCategoryLabel',
      CATEGORY_OPTION_ALL: 'skillGap.filtersCategoryOptionAll',
      CATEGORY_OPTION_TECH: 'skillGap.filtersCategoryOptionTech',
      CATEGORY_OPTION_SOFT: 'skillGap.filtersCategoryOptionSoft',
      CATEGORY_OPTION_LEAD: 'skillGap.filtersCategoryOptionLead'
    }
  },
  PROFILE_ENRICHER: {
    PAGE_TITLE: 'profileEnricher.pageTitle',
    BACK_LINK: 'profileEnricher.backLink'
  }
};

// Errors namespace keys
export const ERRORS = {
  VALIDATION: {
    REQUIRED: 'validation.required',
    EMAIL: 'validation.email',
    MIN_LENGTH: 'validation.minLength',
    MAX_LENGTH: 'validation.maxLength',
    PASSWORD_MATCH: 'validation.passwordMatch'
  },
  SYSTEM: {
    NETWORK_ERROR: 'system.networkError',
    SERVER_ERROR: 'system.serverError',
    UNAUTHORIZED: 'system.unauthorized',
    NOT_FOUND: 'system.notFound'
  }
}; 