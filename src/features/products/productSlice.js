import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllBrands, fetchAllCategories, fetchAllProducts, fetchProductById } from "./productAPI";

const initialState = {
  products: [],
  totalProducts:0,
  brands: [],
  categories: [],
  status: "idle",
  selectedProduct: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async ({filter,sort,pagination,search}) => {
    const data = await fetchAllProducts(filter,sort,pagination,search);
    return data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const product = await fetchProductById(id);
    return product;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const brands = await fetchAllBrands();
    return brands;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const categories = await fetchAllCategories();
    return categories;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.pending, (state) => {
      state.status = "loading"
    });
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      state.status = "idle"
      state.products = action.payload.products;
      state.totalProducts=action.payload.totalProducts
    });
    builder.addCase(fetchBrandsAsync.fulfilled, (state, action) => {
      state.brands = action.payload;
    });
    builder.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    
    builder.addCase(fetchProductByIdAsync.pending, (state, action) => {
      state.status = "loading";
      
    });
    builder.addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
      state.status = "idle"
      state.selectedProduct = action.payload;
      
    });
  },
});

export default productSlice.reducer;
