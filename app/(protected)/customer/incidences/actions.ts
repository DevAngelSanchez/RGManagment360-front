import { apiUrl } from "@/auth.config";
import { fileToBase64 } from "@/lib/utils";

export async function createIncident(subject: string, description: string, propertyId: string, image: File, clientId: string) {
  try {

    const base64Image = await fileToBase64(image);

    const result = await fetch(`${apiUrl}api/incidents/create-incident`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: subject,
        description,
        propertyId,
        image: base64Image,
        clientId
      }),
    });

    const data = await result.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function EditCategory(id: number, name: string) {
  try {
    const result = await fetch(`${apiUrl}api/incidents/update-category`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name
      }),
    });

    const data = await result.json();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error trying to edit this category");
  }
}

export async function DeleteCategory(id: number) {
  try {
    const result = await fetch(`${apiUrl}api/incidents/delete-category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id
      })
    });

    return result.json();
  } catch (error) {
    console.log(error);
    throw new Error("Error trying to delete this category");
  }
}
