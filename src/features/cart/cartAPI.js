export async function addToCart(item) {
    try {
      const res = await fetch("http://localhost:8080/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(item),
      });
      const data=await res.json()
      return data
    } catch (error) {
      console.log(error);
    }
  }


  export async function fetchItemsByUserID() {
    try {
      const res = await fetch(`http://localhost:8080/cart`,{credentials:"include"});
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  export async function updateCartItem(item) {
    console.log(item);
    try {
      const res = await fetch(`http://localhost:8080/cart?id=${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
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
      const res = await fetch(`http://localhost:8080/cart?id=${itemId}`, {
        method: "DELETE",
        credentials:"include",
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  export async function clearCart(userID) {
    try {
      const res = await fetch(`http://localhost:8080/cart/clear`, {
        method: "DELETE",
        credentials:"include",
      });
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }