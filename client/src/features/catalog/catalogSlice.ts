import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../api/agent";
import { Rootstate } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductAsync',
    async (_,thunkAPI) => {
        try {
            return await agent.Catalog.list();
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchSingleProductAsync = createAsyncThunk<Product,number>(
    'catalog/fetchSingleProductAsync',
    async (productId  , thunkAPI) => {
        try {
            return await agent.Catalog.details(productId);
          
        } catch (error:any) {
 
           return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)


export const catalogSlice = createSlice({
    name:'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status:'idle'
    }),
    reducers:{},
    extraReducers : (builder => {

        builder.addCase(fetchProductAsync.pending, (state ) => {
            state.status="pendingFetchProducts";
        });
        builder.addCase(fetchProductAsync.fulfilled, (state,action) => {
            productsAdapter.setAll(state,action.payload);
            state.status="idle"
            state.productsLoaded = true
        });
        builder.addCase(fetchProductAsync.rejected, (state) => {
            state.status="idle";
        }) 

        /// Single product

        
        builder.addCase(fetchSingleProductAsync.pending, (state ) => {
            state.status="pendingFetchSingleProduct";
        });
        builder.addCase(fetchSingleProductAsync.fulfilled, (state,action) => {
            productsAdapter.upsertOne(state,action.payload);
            state.status="idle"
            // state.productsLoaded = true
        });
        builder.addCase(fetchSingleProductAsync.rejected, (state,action) => {
 
            state.status="idle";
        }) 
    })

})

export const productSelector = productsAdapter.getSelectors((state:Rootstate) => state.catalog)