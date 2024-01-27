import { config } from "../../config/api";
const { baseUrl } = config;

export async function registerUser(userData) {
  try {
    const res = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    console.log("user data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function updateUser(user) {
  try {
    const res = await fetch(`${baseUrl}/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
    const res = await fetch(`${baseUrl}/users/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loginInfo),
    });
    const data = await res.json();
    return data
  } catch (error) {
    console.log(error);
  }
}
export async function logoutUser() {
  try {
    const res = await fetch(`${baseUrl}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
