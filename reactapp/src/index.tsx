import "./styles/index.scss";
import App from './App';
import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FacebookProvider } from "react-facebook";
import { store, persistor } from 'stores/store';
import AppToastProvider from "contexts/Toast";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <StrictMode>
    <Suspense>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
        <FacebookProvider appId={process.env.REACT_APP_FACEBOOK_APP_ID as string}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AppToastProvider>
                <App />
              </AppToastProvider>
            </PersistGate>
          </Provider>
        </FacebookProvider>
      </GoogleOAuthProvider>
    </Suspense>
  // </StrictMode>
);

