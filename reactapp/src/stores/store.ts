import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { GetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { 
  authReducer, 
  bannerReducer, 
  categoryReducer, 
  cartReducer,
  feedbackReducer, 
  newsReducer, 
  orderReducer,
  productReducer,
  promotionReducer,
  shoppingSessionReducer,
  userReducer,
  dashboardReducer
} from 'stores/reducer';

const appReducer = combineReducers({
  auth: authReducer,
  banner: bannerReducer,
  category: categoryReducer,
  cart: cartReducer,
  feedback: feedbackReducer,
  news: newsReducer,
  order: orderReducer,
  product: productReducer,
  promotion: promotionReducer,
  shoppingSession: shoppingSessionReducer,
  user: userReducer,
  dashboard: dashboardReducer,
});

const rootPersistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
  whitelist: ["shoppingSession", "cart"],
  blacklist: [],
};

const persistedReducer = persistReducer(rootPersistConfig, appReducer);

const middlewareStore = (getDefaultMiddleware: GetDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: true,
    immutableCheck: true,
    serializableCheck: false,
    actionCreatorCheck: true,
  });

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewareStore,
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
