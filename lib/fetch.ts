import { apiUrl } from "@/auth";
import { headers } from "next/headers";
const headersList = headers();

export const fetchSuppliers = async () => {
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
  try {
    const response = await fetch(`${apiUrl}api/users`, {
      method: "GET",
      headers: headersList
    })
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export const fetchServicesProviders = async () => {

  try {
    const response = await fetch(`${apiUrl}api/users/by-role/SERVICE_PROVIDER`, {
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

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${apiUrl}api/categories`, {
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

export const fetchSubcategories = async () => {
  try {
    const response = await fetch(`${apiUrl}api/subcategories`, {
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

export const fetchCustomers = async () => {
  try {
    const response = await fetch(`${apiUrl}api/users/by-role/CUSTOMER`, {
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

export const fetchProperties = async () => {
  try {
    const response = await fetch(`${apiUrl}api/properties`, {
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