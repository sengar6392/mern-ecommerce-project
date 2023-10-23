export async function fetchAllProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products")
    const data=await res.json()
    return data
    
  } catch (error) {
    console.log(error);
  }
}
export async function fetchAllCategories() {
  try {
    const res = await fetch("https://dummyjson.com/products")
    const data=await res.json()
    return data
    
  } catch (error) {
    console.log(error);
  }
}
