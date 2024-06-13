import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/models/product";
import agent from "../../api/agent";
import { Rootstate } from "../../app/store/configureStore";
import { MetaData } from "../../app/models/pagination";

const productsAdapter = createEntityAdapter<Product>();

interface CatalogState {
  productsLoaded : boolean;
  filtersLoaded : boolean;
  status:string;
  brands:string[];
  types:string[];
  productParams:ProductParams;
  metaData: MetaData | null;
}

const getAxiosParams = (productParams: ProductParams) => {
  const params = new URLSearchParams();
  params.append("pageNumber" ,productParams.pageNumber.toString());
  params.append("pageSize" ,productParams.pageSize.toString());
  params.append("orderBy" ,productParams.orderBy.toString());

  if (productParams.searchTerm) params.append("searchTerm",productParams.searchTerm.toString());
  if (productParams.brands) params.append("brands",productParams.brands.toString());
  if (productParams.types) params.append("types",productParams.types.toString());


  return params;

}


export const fetchProductAsync = createAsyncThunk<Product[],void,{state : Rootstate}>(
  "catalog/fetchProductAsync",
  async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
    try {
      const response = await agent.Catalog.list(params);
      thunkAPI.dispatch(setMetaData(response.metaData));
      return response.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchSingleProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchSingleProductAsync",
  async (productId, thunkAPI) => {
    try {
      return await agent.Catalog.details(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchFilters = createAsyncThunk(
  "catalog/fetchFilters",
  async (_, thunkAPI) => {
    try {
      return await agent.Catalog.fetchFilters();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

 

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: "idle",
    brands: [],
    types: [],
    productParams: {
      pageNumber: 1,
      pageSize:  6,
      orderBy: 'name'
    },
    metaData:null

  }),
  reducers: {
    setProductParams:(state,action) => {
      state.productsLoaded = false;
      state.productParams = {...state.productParams, ...action.payload,pageNumber:1}
    },
    setPageNumber:(state,action) => {
      state.productsLoaded = false;
      state.productParams = {...state.productParams, ...action.payload}
    },

    setMetaData:(state,action) => {
      state.metaData = action.payload;
    },
    resetProductParams:(state) => {
      state.productParams  = {
        pageNumber: 1,
      pageSize:  6,
      orderBy: 'name'
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductAsync.rejected, (state) => {
      state.status = "idle";
    });

    /// Single product

    builder.addCase(fetchSingleProductAsync.pending, (state) => {
      state.status = "pendingFetchSingleProduct";
    });
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
      // state.productsLoaded = true
    });
    builder.addCase(fetchSingleProductAsync.rejected, (state, action) => {
      state.status = "idle";
    });

    /// Filters area

    builder.addCase(fetchFilters.pending, (state,action) => {
     console.log(action)
      state.status = "pendingfetchFilters";
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
     state.brands  = action.payload.brands;
     state.types  = action.payload.types;
     state.filtersLoaded = true;
     state.status = "idle";
 
      // state.productsLoaded = true
    });
    builder.addCase(fetchFilters.rejected, (state, action) => {
      state.status = "idle";
    });
  },
});

export const productSelector = productsAdapter.getSelectors(
  (state: Rootstate) => state.catalog
);

export const {setProductParams,resetProductParams,setMetaData,setPageNumber} = catalogSlice.actions;