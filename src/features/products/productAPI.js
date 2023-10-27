export async function fetchAllProducts(filter,sort) {
  let queryString=""
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  for(let key in sort){
    queryString+=`${key}=${sort[key]}&`
  }
  console.log('queryString',queryString);
  try {
    const res = await fetch(`http://localhost:8080/products?${queryString}`)
    const data=await res.json()
    return data
    
  } catch (error) {
    console.log(error);
  }
}
export async function fetchProductById(id) {
  try {
    const res = await fetch(`http://localhost:8080/products/${id}`)  
    const data=await res.json()
    return data
    
  } catch (error) {
    console.log(error);
  }
}


export async function fetchAllBrands() {
  try {
    const res = await fetch("http://localhost:8080/brands")
    const data=await res.json()
    return data
    
  } catch (error) {
    console.log(error);
  }
}
export async function fetchAllCategories() {
  try {
    const res = await fetch("http://localhost:8080/categories")
    const data=await res.json()
    return data
    
  } catch (error) {
    console.log(error);
  }
}


