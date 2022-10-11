// components
import { Layout } from './components';
import { FallBack } from 'components';
// contexts
import { AuthContextProvider } from 'contexts/AuthContext';
// react
import { lazy, Suspense } from 'react';
// router
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContextProvider } from 'contexts/ToastContext';

// lazy loaded
const Customers = lazy(() => import(/* webpackChunkName: "Customers" */ 'features/Customers/Customers'));
const Customer = lazy(() => import(/* webpackChunkName: "Customer" */ 'features/Customer/Customer'));

type StateLocation = { backgroundLocation?: string } | undefined;

const App = () => {
  const location = useLocation();

  const state = location?.state as StateLocation;

  return (
    <AuthContextProvider>
      <ToastContextProvider>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<FallBack />}>
                  <Customers />
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
                path=":customerId"
                element={
                  <Suspense fallback={<FallBack />}>
                    <Customer />
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
              path="/customers/:customerId"
              element={
                <Suspense fallback={<FallBack />}>
                  <Customer />
                </Suspense>
              }
            />
          </Routes>
        )}
      </ToastContextProvider>
    </AuthContextProvider>
  );
};
export default App;
