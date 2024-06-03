import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import agent from "../../api/agent";

interface BasketState {
    basket:Basket | null;
    status:string;
}


const initialState : BasketState = {
    basket:null,
    status:'idle'
     
}

export const addBasketItemAsync = createAsyncThunk<Basket,{productId: number, quantity?:number}>(
    "basket/addBasketItemAsync",
    async({productId,quantity},thunkAPI) => {
        try {
            return await agent.Basket.addItem(productId,quantity = 1);
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
 )

 
export const removeBasketItemAsync = createAsyncThunk<void,{productId: number, quantity:number,name?:string}>(
    "basket/removeBasketItemAsync",
    async({productId,quantity }, thunkAPI) => {
        try {
            return await agent.Basket.removeItem(productId,quantity );
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
 )


export const basketSlice = createSlice({
    name: "basket",
    initialState:initialState,
    reducers:{
        setBasket:(state,action) => { 
            state.basket = action.payload
        } 
    },
    extraReducers:(builder) => {
        builder.addCase(addBasketItemAsync.pending,(state,action) => {
            // console.log(action);
            state.status = 'pendingAddItem'+ action.meta.arg.productId;
        });
        builder.addCase(addBasketItemAsync.fulfilled,(state,action) => {
            state.status = "idle"
            state.basket = action.payload;
        });
        builder.addCase(addBasketItemAsync.rejected,(state) => {
            state.status = "idle"
        });

        //remove Item
        builder.addCase(removeBasketItemAsync.pending,(state,action) => {
            // console.log(action);
            state.status = 'pendingRemoveItem'+ action.meta.arg.productId+action.meta.arg.name;
        });
        builder.addCase(removeBasketItemAsync.fulfilled,(state,action) => {
          
            // state.basket = action.payload;
            const {productId,quantity} = action.meta.arg;
            const itemindex = state.basket?.items.findIndex(i => i.productId === productId);
            if (itemindex === -1 || itemindex === undefined )  return;
            state.basket!.items[itemindex].quantity -= quantity!;

            if(state.basket?.items[itemindex].quantity === 0) 
                {
                    state.basket.items.splice(itemindex,1);
                }
                state.status = "idle";
        });
        builder.addCase(removeBasketItemAsync.rejected,(state) => {
            state.status = "idle"
        });
    }

})


export const {setBasket } = basketSlice.actions;