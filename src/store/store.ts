import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { authReducer } from "../redux/auth/auth";
import { searchListingReducer } from "@/redux/listings/listings";
import { menuReducer } from "@/redux/menu/menu";

export const store = configureStore({
  reducer: { 
    auth: authReducer, 
    searchListings: searchListingReducer, 
    menuState: menuReducer 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;