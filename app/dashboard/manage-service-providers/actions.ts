import { apiUrl } from "@/auth";

export async function CreateServiceProvider(name: string, lastname: string, username: string, category: string, subcategory: string, email: string, address: string, phone: string, password: string) {
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
        category: category,
        subcategory: subcategory,
        email: email,
        address: address,
        phone: phone,
        password: password
      })
    });

    if (!result.ok) {
      alert("Error trying to create a supplier");
      return;
    }

    return result.json();
  } catch (error) {
    console.log(error);
    throw new Error("Error trying to create a new Service Provider")
  }
}