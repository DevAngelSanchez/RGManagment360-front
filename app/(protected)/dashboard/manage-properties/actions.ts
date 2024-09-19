import { apiUrl } from "@/auth.config";

export async function CreateProperty(name: string, address: string, phone: string, city: string, state: string, zipPostalCode: string, ownerId: string) {
  try {
    const result = await fetch(`${apiUrl}api/properties/create-property`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        address: address,
        phone: phone,
        city: city,
        state: state,
        zipPostalCode: zipPostalCode,
        ownerId: Number(ownerId)
      })
    });

    return result.json();
  } catch (error) {
    console.log(error);
    throw new Error("Error trying to create a new property");
  }
}

export async function EditProperty(id: number, name: string, address: string, city: string, state: string, zipPostalCode: string, ownerId: string) {
  try {
    const result = await fetch(`${apiUrl}api/properties/update-property`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        name: name,
        address: address,
        city: city,
        state: state,
        zipPostalCode: zipPostalCode,
        ownerId: Number(ownerId)
      })
    });

    return result.json();
  } catch (error) {
    console.log(error);
    throw new Error("Error trying to edit this property");
  }
}

export async function DeleteProperty(id: number) {
  try {
    const result = await fetch(`${apiUrl}api/properties/delete-property`, {
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
    throw new Error("Error trying to delete this property");
  }
}