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

    const data = await result.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function EditCategory(id: number, name: string) {
  try {
    const result = await fetch(`${apiUrl}api/categories/update-category`, {
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
    const result = await fetch(`${apiUrl}api/categories/delete-category`, {
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

export async function CreateSubcategory(name: string, categoryId: string) {
  try {
    const result = await fetch(
      `${apiUrl}api/subcategories/create-subcategory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          categoryId: Number(categoryId),
        }),
      }
    );

    return result.json();
  } catch (error) {
    console.log(error);
    throw new Error("Error trying to create this subcategory");
  }
}

export async function EditSubcategory(id: number, name: string, categoryId: string) {
  try {
    const result = await fetch(
      `${apiUrl}api/subcategories/update-subcategory`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name: name,
          categoryId: Number(categoryId),
        }),
      }
    );

    return result.json();
  } catch (error) {
    console.log(error);
    throw new Error("Error trying to edit this subcategory");
  }
}

export async function DeleteSubcategory(id: number) {
  try {
    const result = await fetch(
      `${apiUrl}api/subcategories/delete-subcategory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      }
    );

    return result.json();
  } catch (error) {
    console.log(error);
    throw new Error("Error trying to delete this subcategory");
  }
}