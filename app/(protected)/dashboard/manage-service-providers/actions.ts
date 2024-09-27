import { apiUrl } from "@/auth.config";

export async function CreateServiceProvider(name: string, lastname: string, username: string, email: string, password: string, phone: string, address: string, category: string, subcategory: string,) {
  try {
    const result = await fetch(`${apiUrl}api/users/create-service-provider`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
        phone: phone,
        address: address,
        category: category,
        subcategory: subcategory,
      })
    });

    return result.json();
  } catch (error) {
    console.log(error);
    throw new Error("Error trying to create a new Service Provider")
  }
}