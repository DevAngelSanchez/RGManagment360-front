import { apiUrl } from "@/auth.config";

export async function CreateUser(fullname: string, email: string, password: string, address: string, phone: string, role: string) {
  try {
    const result = await fetch(`${apiUrl}api/users/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullname,
        email,
        password,
        address,
        phoneNumber: phone,
        role
      })
    });

    return result.json();
  } catch (error) {
    console.log(error);
    throw new Error("Error on delete user query");
  }
}

export async function DeleteUser(id: number) {
  try {
    const result = await fetch(`${apiUrl}api/users/delete-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
      })
    });


    return result.json();
  } catch (error) {
    console.log(error);
    throw new Error("Error on delete user query");
  }
}

export async function EditUser(id: number, fullname: string, email: string, phone: string, address: string, role: string, isActive: string) {
  try {
    const result = await fetch(`${apiUrl}api/users/update-user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        fullname: fullname,
        email: email,
        phone: phone,
        address: address,
        role: role,
        isActive: isActive,
      }),
    });

    return result.json();
  } catch (error) {
    console.log(error);
    throw new Error("Error on edit user query");
  }
}