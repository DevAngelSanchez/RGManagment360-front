import { apiUrl } from "@/auth.config";
import { Category, Property, Subcategory, Supplier, Task, User } from "./types";
import { SubcategoryType } from "@/app/(protected)/service-provider/tasks/data/schema";
import { UserType } from "./schemas/userSchema";

interface FetchResult<Type> {
  data?: Type;
  error?: string;
}

const fetchData = async <Type>(url: string): Promise<FetchResult<Type>> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data: Type = await response.json();

    if (data && Object.keys(data).length === 0) {
      return { error: "Data is empty" }
    }

    return { data }

  } catch (error: any) {
    console.error("Fetch Error: ", error.message);
    return { error: error.message }
  }
}

export const fetchUsers = () => fetchData<UserType[]>(`${apiUrl}api/users`);
export const fetchCategories = () => fetchData<Category[]>(`${apiUrl}api/categories`);
export const fetchSuppliers = () => fetchData<Supplier[]>(`${apiUrl}api/suppliers`);
export const fetchSubcategories = () => fetchData<SubcategoryType[]>(`${apiUrl}api/subcategories`);
export const fetchProperties = () => fetchData<Property[]>(`${apiUrl}api/properties`);
export const fetchServiceProviders = () => fetchData<User[]>(`${apiUrl}api/users/by-role/SERVICE_PROVIDER`);
export const fetchCustomers = () => fetchData<User[]>(`${apiUrl}api/users/by-role/CUSTOMER`);
export const fetchTasks = () => fetchData<Task[]>(`${apiUrl}api/tasks`);
export const fetchTasksByProvider = (id: string) => {
  if (!id) {
    return null;
  }

  return fetchData<Task[]>(`${apiUrl}api/tasks/${id}`)
};

