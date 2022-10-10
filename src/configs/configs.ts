// Environment
export const env = {
  mode: process.env.NODE_ENV,
};

// Endpoints
export const endpoints = {
  countries: '/geo/countries',
  regions: '/geo/regions',
  cities: '/geo/cities',
  companies: '/companies',
  invoices: '/invoices',
  customers: '/api/customers',
  documentTypes: '/api/documentTypes',
  titles: '/api/titles',
  auth: { login: `/auth/login` },
};
