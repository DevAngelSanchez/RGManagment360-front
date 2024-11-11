import { SubcategoryType } from "@/app/(protected)/service-provider/tasks/data/schema";

export interface User {
  id: number;
  fullname: string;
  companyName?: string;
  email: string;
  role: string;
  isActive: string;
  address?: string;
  phone?: string;
  tasks?: Task[];
  categories?: Category[];
  subcategories?: Subcategory[];
  properties?: Property[];
  statusAccount?: string;
  emailVerified?: string;
}

export interface Supplier {
  id: number;
  name: string;
  description: string;
  email?: string;
  phone?: string;
}

export interface Category {
  id: number;
  name: string;
  subcategories: SubcategoryType[];
  users: User[];
}

export interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
  mayorCategory: Category;
  users: User[];
  category?: string;
}

export interface Property {
  id: number;
  name: string;
  address: string;
  phone: string;
  city: string;
  state: string;
  zipPostalCode: string;
  owner?: User;
  ownerId?: string;
}

export interface Task {
  id: number;
  name: string;
  priority: string;
  status: string;
  observations?: string;
  invoiceFile?: string;
  comments?: string[];
  category?: Category;
  subcategory?: Subcategory;
  property?: Property;
  taskProvider?: User;
  taskProviderId?: number;
  categoryId?: number;
  subcategoryId?: number;
  propertyId?: number;
  createdBy?: User;
  createdById?: number;
  User?: User;
  userId?: number;
  datetimeAssigment: Date;
  datetimeEnd?: Date;
}

export interface Event {
  id: number,
  title: string;
  start: Date,
  end: Date,
  allDay?: Boolean,
  resource?: any,
}