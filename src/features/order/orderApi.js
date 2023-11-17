export async function createOrder(order) {
  console.log({order});
  try {
    const res = await fetch("http://localhost:8080/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchOrders(userID) {
  console.log('id',userID);
  try {
    const res = await fetch(`http://localhost:8080/orders/user/${userID}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
