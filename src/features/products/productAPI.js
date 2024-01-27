import { config } from "../../config/api";
const { baseUrl } = config;

export async function fetchAllProducts(filter, sort, pagination, search) {
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (search.length > 0) {
    queryString += `search=${search}`;
  }
  try {
    const res = await fetch(`${baseUrl}/products?${queryString}`);
    const products = await res.json();
    const totalProducts = await res.headers.get("x-total-count");

    return { products, totalProducts };
  } catch (error) {
    console.log(error);
  }
}
export async function fetchProductById(id) {
  try {
    const res = await fetch(`${baseUrl}/products/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllBrands() {
  try {
    const res = await fetch(`${baseUrl}/brands`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchAllCategories() {
  try {
    const res = await fetch(`${baseUrl}/categories`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
