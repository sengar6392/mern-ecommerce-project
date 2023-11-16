export async function createUser(userData) {
  try {
    const res = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data=await res.json()
    console.log('user data',data);
    return data
  } catch (error) {
    console.log(error);
  }
}
export async function updateUser(user) {
  try {
    const res = await fetch(`http://localhost:8080/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function loginUser(loginInfo) {
  try {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });
    const data=await res.json()
    console.log('login user data',data);
    return data
  } catch (error) {
    console.log(error);
  }
}
