export async function addToCart(item) {
    try {
      const res = await fetch("http://localhost:8080/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const data=await res.json()
      return data
    } catch (error) {
      console.log(error);
    }
  }


  export async function fetchItemsByUserID(userID) {
    try {
      const res = await fetch(`http://localhost:8080/cart?user=${userID}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  export async function updateCartItem(item) {
    try {
      const res = await fetch(`http://localhost:8080/cart/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  export async function deleteCartItem(itemID) {
    try {
      const res = await fetch(`http://localhost:8080/cart/${itemID}`, {
        method: "DELETE"
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  export async function clearCart(userID) {
    try {
      const res = await fetch(`http://localhost:8080/cart?user=${userID}`, {
        method: "DELETE"
      });
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }