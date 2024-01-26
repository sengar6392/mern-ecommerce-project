import { config } from "../../config/api";

  const {baseUrl}=config
  export async function fetchLoggedInUser(userID) {
    console.log('id',userID);
    try {
      const res = await fetch(`${baseUrl}/users/${userID}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function updateUser(user) {
    try {
        const response = await fetch(`${baseUrl}/users/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: { 'content-type': 'application/json' },
          });
          const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }