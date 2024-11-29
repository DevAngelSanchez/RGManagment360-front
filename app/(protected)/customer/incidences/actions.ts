import { apiUrl } from "@/auth.config";
import { fileToBase64 } from "@/lib/utils";

export async function createIncident(subject: string, description: string, propertyId: string, image: File | string, clientId: string) {
  try {

    const base64Image = typeof image === "string" ? image : await fileToBase64(image);

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

export async function editIncident(id: string | number, subject: string, description: string, propertyId: string, image: File | string) {
  try {

    const base64Image = typeof image === "string" ? image : await fileToBase64(image);

    const result = await fetch(`${apiUrl}api/incidents/update-incident`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name: subject,
        description,
        propertyId,
        image: base64Image,
      }),
    });

    const data = await result.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function DeleteIncident(id: number) {
  try {
    const result = await fetch(`${apiUrl}api/incidents/delete-incident`, {
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
    throw new Error("Error trying to delete this Incident");
  }
}
