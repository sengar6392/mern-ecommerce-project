import {config} from '../../config/api'
const {baseUrl}=config
export async function createOrder(order) {
  try {
    const res = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
      body: JSON.stringify(order),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchOrders() {
  try {
    const res = await fetch(`${baseUrl}/orders`,{credentials:"include",});
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
