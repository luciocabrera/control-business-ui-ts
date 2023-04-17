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
  invoices: '/api/invoices',
  customers: '/api/people',
  products: '/api/products',
  documentTypes: '/api/document_types',
  titles: '/api/titles',
  auth: { login: `/auth/login` },
};
