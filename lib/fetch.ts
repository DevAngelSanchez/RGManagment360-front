import { apiUrl } from "@/auth";
import { headers } from "next/headers";

export const fetchSuppliers = async () => {
  const headersList = headers();
  try {
    const response = await fetch(`${apiUrl}api/suppliers`, {
      method: "GET",
      headers: headersList
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export const fetchUsers = async () => {
  const headersList = headers();
  try {
    const response = await fetch(`${apiUrl}api/users`, {
      method: "GET",
      headers: headersList
    })
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}