// Environment
export const env = {
  mode: process.env.NODE_ENV,
};

// Endpoints
export const endpoints = {
  auth: { login: `/auth/login` },
  cities: '/geo/cities',
  companies: '/companies',
  countries: '/geo/countries',
  customers: '/api/people',
  documentTypes: '/api/document_types',
  invoices: '/api/invoices',
  products: '/api/products',
  regions: '/geo/regions',
  titles: '/api/titles',
};
