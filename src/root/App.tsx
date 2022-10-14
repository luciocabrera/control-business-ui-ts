// components
import { Routes, Route, FallBack, Layout } from 'components';
// contexts
import { AuthContextProvider, NotificationContextProvider, ToastContextProvider } from 'contexts';
// hooks
import { useLocation } from 'hooks';
// react
import { lazy, Suspense } from 'react';

// lazy loaded
const Customers = lazy(() => import(/* webpackChunkName: "Customers" */ 'features/Customers/Customers'));
const Customer = lazy(() => import(/* webpackChunkName: "Customer" */ 'features/Customer/Customer'));
const ViewCustomer = lazy(() => import(/* webpackChunkName: "ViewCustomer" */ 'features/ViewCustomer/ViewCustomer'));

type StateLocation = { backgroundLocation?: string } | undefined;

const App = () => {
  const location = useLocation();

  const state = location?.state as StateLocation;

  return (
    <AuthContextProvider>
      <ToastContextProvider>
        <NotificationContextProvider>
          <Routes location={state?.backgroundLocation || location}>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <Suspense fallback={<FallBack />}>
                    <p>Welcome!!!</p>
                  </Suspense>
                }
              />

              {/* <Route path="customers">
              <Route
                path=":customerId"
                element={
                  <Suspense fallback={<FallBack />}>
                    <Customer />
                  </Suspense>
                }
              />
              <Route path="" element={<Page />} />
            </Route> */}
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
              <Route path="*" element={<div>No Match</div>} />
            </Route>
          </Routes>
          {state?.backgroundLocation && (
            <Routes>
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
            </Routes>
          )}
        </NotificationContextProvider>
      </ToastContextProvider>
    </AuthContextProvider>
  );
};
export default App;
