# Internationalization (i18n) Architecture

This document explains the internationalization (i18n) architecture used in our application.

## Overview

We use i18next with React to provide multilingual support in our application. Our approach separates translations into namespaces for better organization and maintainability.

## Project Structure

```
app/
├── i18n/
│   ├── keys.js            # Centralized translation keys constants
│   ├── index.js           # i18next configuration
│   └── README.md          # This documentation
├── components/            # React components
├── ...
locales/
├── en/                    # English translations
│   ├── common.json        # Shared translations (header, footer, etc.)
│   ├── demos.json         # Demo-specific translations
│   └── errors.json        # Error messages
└── th/                    # Thai translations
    ├── common.json
    ├── demos.json
    └── errors.json
```

## Translation Files

We organize translations into multiple namespaces to improve maintainability:

1. **common.json**: Shared translations like navigation, footer, and general UI elements
2. **demos.json**: Translations specific to demos and features
3. **errors.json**: Error messages for validation and system errors

## Key Structure

Translation keys follow a hierarchical structure. For example:

```json
{
  "nav": {
    "brand": "LearnSphere AI",
    "features": "AI Features"
  }
}
```

We access this with the translation key: `nav.brand`

## Using Constant Keys

In `keys.js`, we define constants for all translation keys to maintain consistency and enable IDE auto-completion:

```javascript
export const COMMON = {
  NAV: {
    BRAND: 'nav.brand'
  }
};
```

Use these constants in components:

```javascript
import { COMMON } from '../i18n/keys';

// ...
t(COMMON.NAV.BRAND)
```

## Namespaces

When using multiple namespaces in a component:

```javascript
// Load multiple namespaces
const { t: tCommon } = useTranslation('common');
const { t: tErrors } = useTranslation('errors');

// Use translations from different namespaces
tCommon(COMMON.NAV.BRAND)
tErrors(ERRORS.VALIDATION.REQUIRED)
```

## Formatted Values

We have custom formatters for numbers and dates:

```javascript
// Date formatting
t('date', { date: new Date(), context: 'DATE_LONG' })

// Number formatting
t('price', { value: 1000, context: 'CURRENCY', currency: 'USD' })
```

## Adding New Languages

To add a new language:

1. Create a new folder under `locales/` with the language code (e.g., `fr/` for French)
2. Copy all JSON files from `en/` to the new folder
3. Translate all values in the copied files
4. Add the new language code to the `supportedLngs` array in `i18n/index.js`

## Adding New Translations

1. Add the new key to the appropriate namespace JSON file for each language
2. Add the key constant to `keys.js`
3. Use the key constant in your components

## Best Practices

1. Always use namespace-specific translation functions when accessing keys
2. Use key constants instead of hardcoded strings
3. For complex content with HTML, use the `<Trans>` component
4. Add appropriate context for keys that have multiple meanings
5. Keep translation files organized by logical groups 