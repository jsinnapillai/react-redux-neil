 
import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/counterSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlice } from "../../features/Basket/BasketSlice";
import { catalogSlice } from "../../features/catalog/catalogSlice";

// export function configureStore() {
//     return createStore(counterReducer);
// }


export const store = configureStore({
    reducer:{
        counter:counterSlice.reducer,
        basket: basketSlice.reducer,
        catalog:catalogSlice.reducer
    }
})

export type Rootstate = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch


export const useAppDispatch = () => useDispatch<appDispatch>();
export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector;