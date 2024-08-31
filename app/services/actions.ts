import { apiUrl } from "@/auth";

export async function createCategory(category: string) {
  try {
    const result = await fetch(`${apiUrl}api/categories/create-category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: category,
      }),
    });

    if (!result.ok) {
      throw new Error("Error trying to create a new category");
    }

    return result.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}