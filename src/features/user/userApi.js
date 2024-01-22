
  
  export async function fetchLoggedInUser(userID) {
    console.log('id',userID);
    try {
      const res = await fetch(`http://localhost:8080/users/${userID}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function updateUser(user) {
    try {
        const response = await fetch(`http://localhost:8080/users/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify(user),
            headers: { 'content-type': 'application/json' },
          });
          const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }