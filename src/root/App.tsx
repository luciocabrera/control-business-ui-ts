import { lazy, Suspense } from 'react';
import { NotificationsContextProvider, ToastsContextProvider } from 'contexts';
import { useLocation } from 'hooks';

import { FallBack, Layout, Route, Routes } from 'components';

const Customers = lazy(
  () =>
    import(/* webpackChunkName: "Customers" */ 'features/Customers/Customers')
);
const Customer = lazy(
  () => import(/* webpackChunkName: "Customer" */ 'features/Customer/Customer')
);
const ViewCustomer = lazy(
  () =>
    import(
      /* webpackChunkName: "ViewCustomer" */ 'features/ViewCustomer/ViewCustomer'
    )
);

const Invoices = lazy(
  () => import(/* webpackChunkName: "Invoices" */ 'features/Invoices/Invoices')
);
const Invoice = lazy(
  () => import(/* webpackChunkName: "Invoice" */ 'features/Invoice/Invoice')
);
const ViewInvoice = lazy(
  () =>
    import(
      /* webpackChunkName: "ViewInvoice" */ 'features/ViewInvoice/ViewInvoice'
    )
);

const Home = lazy(
  () => import(/* webpackChunkName: "Home" */ 'features/Home/Home')
);

type StateLocation = { backgroundLocation?: string } | undefined;

const App = () => {
  const location = useLocation();

  const state = location?.state as StateLocation;

  return (
    <ToastsContextProvider>
      <NotificationsContextProvider>
        <Routes location={state?.backgroundLocation ?? location}>
          <Route
            element={<Layout />}
            path='/'
          >
            <Route
              index
              element={
                <Suspense fallback={<FallBack />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              element={
                <Suspense fallback={<FallBack />}>
                  <Customers />
                </Suspense>
              }
              path='customers'
            >
              <Route
                element={
                  <Suspense fallback={<FallBack />}>
                    <Customer />
                  </Suspense>
                }
                path='new'
              />
              <Route
                element={
                  <Suspense fallback={<FallBack />}>
                    <Customer />
                  </Suspense>
                }
                path=':customerId/:action'
              />
              <Route
                element={
                  <Suspense fallback={<FallBack />}>
                    <ViewCustomer />
                  </Suspense>
                }
                path=':customerId'
              />
            </Route>
            <Route
              element={
                <Suspense fallback={<FallBack />}>
                  <Invoices />
                </Suspense>
              }
              path='invoices'
            >
              <Route
                element={
                  <Suspense fallback={<FallBack />}>
                    <Invoice />
                  </Suspense>
                }
                path='new'
              />
              <Route
                element={
                  <Suspense fallback={<FallBack />}>
                    <Invoice />
                  </Suspense>
                }
                path=':invoiceId/:action'
              />
              <Route
                element={
                  <Suspense fallback={<FallBack />}>
                    <ViewInvoice />
                  </Suspense>
                }
                path=':invoiceId'
              />
            </Route>

            <Route
              element={<div>No Match</div>}
              path='*'
            />
          </Route>
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route path='customers'>
              <Route
                element={
                  <Suspense fallback={<FallBack />}>
                    <Customer />
                  </Suspense>
                }
                path='new'
              />
              <Route
                element={
                  <Suspense fallback={<FallBack />}>
                    <Customer />
                  </Suspense>
                }
                path=':customerId/:action'
              />
              <Route
                element={
                  <Suspense fallback={<FallBack />}>
                    <ViewCustomer />
                  </Suspense>
                }
                path=':customerId'
              />
            </Route>

            <Route path='invoices'>
              <Route
                element={
                  <Suspense fallback={<FallBack />}>
                    <Invoice />
                  </Suspense>
                }
                path='new'
              />
              <Route
                element={
                  <Suspense fallback={<FallBack />}>
                    <Invoice />
                  </Suspense>
                }
                path=':invoiceId/:action'
              />
              <Route
                element={
                  <Suspense fallback={<FallBack />}>
                    <ViewInvoice />
                  </Suspense>
                }
                path=':invoiceId'
              />
            </Route>
          </Routes>
        )}
      </NotificationsContextProvider>
    </ToastsContextProvider>
  );
};
export default App;
