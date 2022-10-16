export const getLanguage = () =>
  (navigator.languages && navigator.languages.length && navigator.languages[0]) || navigator.language || 'en';
