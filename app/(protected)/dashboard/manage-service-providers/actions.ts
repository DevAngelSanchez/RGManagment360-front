import { apiUrl } from "@/auth.config";

export async function CreateServiceProvider(fullname: string, companyName: string, email: string, password: string, phone: string, address: string, category: string, subcategory: string,) {
  try {
    const result = await fetch(`${apiUrl}api/users/create-service-provider`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullname: fullname,
        companyName: companyName,
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