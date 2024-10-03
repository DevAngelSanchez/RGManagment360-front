export interface User {
  id: number;
  name: string;
  lastname: string;
  username?: string;
  email: string;
  role: string;
  isActive: string;
  address?: string;
  phone?: string;
  tasks?: Task[];
  category?: Category;
  subcategory?: Subcategory;
  properties?: Property[];
  status?: string;
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
  subcategories: Subcategory[];
  users: User[];
}

export interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
  mayorCategory: Category;
  users: User[]
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
  invoice?: string;
  comments: string[];
  category: Category;
  subcategory: Subcategory;
  property: Property;
  serviceProvider: User;
  datetimeAssigment: Date;
  datetimeEnd: Date;
}

export interface Event {
  id: number,
  title: string;
  start: Date,
  end: Date,
  allDay?: Boolean,
  resource?: any,
}