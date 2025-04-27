// Ensure the initialization function is globally accessible
window.initializeAnimations = function() {
  console.log('Initializing animations...');
  
  // Animate skill gap bars
  const skillGapFills = document.querySelectorAll('.skill-gap-fill');

  skillGapFills.forEach(fill => {
    const percentage = fill.getAttribute('data-percentage');
    // Apply animation directly
    fill.style.width = `${percentage}%`;
  });

  // Animate progress bars
  const progressFills = document.querySelectorAll('.progress-fill, .skill-progress'); // Include skill-progress

  progressFills.forEach(fill => {
    const percentage = fill.getAttribute('data-percentage') || (fill.style.width ? fill.style.width.replace('%', '') : '0'); // Get percentage or use existing style
    // Apply animation directly
    fill.style.width = `${percentage}%`; 
  });
  
  console.log('Animations initialized.');
};

// Debug function to log translation issues
window.debugTranslation = function() {
  console.log('Debugging translations...');
  console.log('Current language:', i18nextInstance?.language);
  console.log('i18next initialized:', i18nextInstance?.isInitialized);
  
  // Check if translation files are loaded properly
  if (i18nextInstance?.isInitialized) {
    // Test some translations
    console.log('Test translation for demos.skillGap.pageTitle:', i18nextInstance.t('demos.skillGap.pageTitle'));
    console.log('Test translation for demos.skillGap.filtersDepartmentLabel:', i18nextInstance.t('demos.skillGap.filtersDepartmentLabel'));
    console.log('Test translation for demos.skillGap.applyFiltersButton:', i18nextInstance.t('demos.skillGap.applyFiltersButton'));
    
    // Log namespaces and resource store info
    console.log('Available namespaces:', i18nextInstance.options.ns);
    console.log('Resource store:', i18nextInstance.store?.data);
    
    // Check if translations exist for common elements
    const testKeys = [
      'demos.skillGap.pageTitle',
      'demos.skillGap.backLink',
      'demos.skillGap.headerTitle',
      'demos.skillGap.exportButton',
      'demos.skillGap.printButton',
      'demos.skillGap.statsCriticalGaps',
      'demos.skillGap.filtersDepartmentLabel',
      'demos.skillGap.filtersDepartmentOptionSales',
      'demos.skillGap.tableHeaderCurrentRole',
      'demos.skillGap.roleAreaSalesManager',
      'demos.skillGap.applyFiltersButton',
      'demos.skillGap.departmentViewTab'
    ];
    
    console.log('Translation test for specific keys:');
    testKeys.forEach(key => {
      console.log(`${key}: '${i18nextInstance.t(key)}'`);
      console.log(`Has translation: ${i18nextInstance.exists(key)}`);
    });
  }
  
  // Check DOM elements with data-i18n attributes
  const i18nElements = document.querySelectorAll('[data-i18n]');
  console.log('Number of elements with data-i18n:', i18nElements.length);
  
  // Log first 5 elements with their keys
  console.log('Sample elements with data-i18n:');
  for (let i = 0; i < Math.min(5, i18nElements.length); i++) {
    const el = i18nElements[i];
    console.log(`Element ${i}:`, {
      key: el.getAttribute('data-i18n'),
      currentText: el.innerHTML,
      element: el
    });
  }
}