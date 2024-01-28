import { config } from "../../config/api";
const { baseUrl } = config;
export async function addToCart(item) {
  try {
    const res = await fetch(`${baseUrl}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(item),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchItemsByUserID() {
  try {
    const res = await fetch(`${baseUrl}/cart`, { credentials: "include" });
    const data = await res.json();
    if (res.status === 200) return data;
  } catch (error) {
    console.log(error);
  }
}
export async function updateCartItem(item) {
  console.log(item);
  try {
    const res = await fetch(`${baseUrl}/cart?id=${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(item),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteCartItem(itemId) {
  try {
    const res = await fetch(`${baseUrl}/cart?id=${itemId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function clearCart() {
  try {
    const res = await fetch(`${baseUrl}/cart/clear`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
