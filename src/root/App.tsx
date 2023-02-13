// components
import { Routes, Route, FallBack, Layout } from 'components';
// contexts
import { NotificationsContextProvider, ToastsContextProvider } from 'contexts';
// hooks
import { useLocation } from 'hooks';
// react
import { lazy, Suspense } from 'react';

// lazy loaded
const Customers = lazy(() => import(/* webpackChunkName: "Customers" */ 'features/Customers/Customers'));
const Customer = lazy(() => import(/* webpackChunkName: "Customer" */ 'features/Customer/Customer'));
const ViewCustomer = lazy(() => import(/* webpackChunkName: "ViewCustomer" */ 'features/ViewCustomer/ViewCustomer'));

const Invoices = lazy(() => import(/* webpackChunkName: "Invoices" */ 'features/Invoices/Invoices'));
const Invoice = lazy(() => import(/* webpackChunkName: "Invoice" */ 'features/Invoice/Invoice'));
const ViewInvoice = lazy(() => import(/* webpackChunkName: "ViewInvoice" */ 'features/ViewInvoice/ViewInvoice'));

const Home = lazy(() => import(/* webpackChunkName: "Home" */ 'features/Home/Home'));

type StateLocation = { backgroundLocation?: string } | undefined;

const App = () => {
  const location = useLocation();

  const state = location?.state as StateLocation;

  return (
    <ToastsContextProvider>
      <NotificationsContextProvider>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<FallBack />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="customers"
              element={
                <Suspense fallback={<FallBack />}>
                  <Customers />
                </Suspense>
              }
            >
              <Route
                path="new"
                element={
                  <Suspense fallback={<FallBack />}>
                    <Customer />
                  </Suspense>
                }
              />
              <Route
                path=":customerId/:action"
                element={
                  <Suspense fallback={<FallBack />}>
                    <Customer />
                  </Suspense>
                }
              />
              <Route
                path=":customerId"
                element={
                  <Suspense fallback={<FallBack />}>
                    <ViewCustomer />
                  </Suspense>
                }
              />
            </Route>

            <Route
              path="invoices"
              element={
                <Suspense fallback={<FallBack />}>
                  <Invoices />
                </Suspense>
              }
            >
              <Route
                path="new"
                element={
                  <Suspense fallback={<FallBack />}>
                    <Invoice />
                  </Suspense>
                }
              />
              <Route
                path=":invoiceId/:action"
                element={
                  <Suspense fallback={<FallBack />}>
                    <Invoice />
                  </Suspense>
                }
              />
              <Route
                path=":invoiceId"
                element={
                  <Suspense fallback={<FallBack />}>
                    <ViewInvoice />
                  </Suspense>
                }
              />
            </Route>

            <Route path="*" element={<div>No Match</div>} />
          </Route>
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route path="customers">
              <Route
                path="new"
                element={
                  <Suspense fallback={<FallBack />}>
                    <Customer />
                  </Suspense>
                }
              />
              <Route
                path=":customerId/:action"
                element={
                  <Suspense fallback={<FallBack />}>
                    <Customer />
                  </Suspense>
                }
              />
              <Route
                path=":customerId"
                element={
                  <Suspense fallback={<FallBack />}>
                    <ViewCustomer />
                  </Suspense>
                }
              />
            </Route>

            <Route path="invoices">
              <Route
                path="new"
                element={
                  <Suspense fallback={<FallBack />}>
                    <Invoice />
                  </Suspense>
                }
              />
              <Route
                path=":invoiceId/:action"
                element={
                  <Suspense fallback={<FallBack />}>
                    <Invoice />
                  </Suspense>
                }
              />
              <Route
                path=":invoiceId"
                element={
                  <Suspense fallback={<FallBack />}>
                    <ViewInvoice />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        )}
      </NotificationsContextProvider>
    </ToastsContextProvider>
  );
};
export default App;
