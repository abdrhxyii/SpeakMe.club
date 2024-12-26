import { getLocales } from 'expo-localization';
import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
/**
 * Gets the user's country name based on the device's locale settings.
 * @returns {string} - The full country name (e.g., "United States", "India") or "Earth" if unavailable.
 */
export const getCountry = (): string => {
  const locale = getLocales()[0];

  if (!locale || !locale.regionCode) {
    return 'Earth';
  }

  const countryName = countries.getName(locale.regionCode, 'en');
  return countryName || 'Earth';
};
