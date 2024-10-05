"use client"

import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconUsersGroup } from '@tabler/icons-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import DirectoryItem from '@/components/custom/dashboard/DirectoryItem';
import { ScrollBar } from '@/components/ui/scroll-area';
import { Category, Subcategory, User } from '@/lib/types';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { filterServicesProvidersSchema } from '@/lib/zodSchemas';
import { fetchCategories, fetchSubcategories } from '@/lib/fetch';
import { Button } from '@/components/ui/button';


interface Props {
  serviceProviders: User[]
}

const ServiceProvidersList: React.FC<Props> = ({ serviceProviders }) => {

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryField, setSelectedCategory] = useState<string>('');
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    subcategory: '',
  });

  useEffect(() => {
    const getData = async () => {
      const responseCategories = await fetchCategories();
      const responseSubcategories = await fetchSubcategories();

      if (responseCategories.data) {
        setCategories(responseCategories.data)
      }
      if (responseSubcategories.data) {
        setSubcategories(responseSubcategories.data)
      }
    }

    getData();
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleCategoryChange = (name: string, value: string) => {
    const selectedCategoryId = value;

    // Filtrar las subcategorías basadas en la categoría seleccionada
    const selectedCategory = categories.find(cat => cat.id === parseInt(selectedCategoryId));
    if (selectedCategory) {
      setFilteredSubcategories(selectedCategory.subcategories);
    } else {
      setFilteredSubcategories([]);
    }
  };

  useEffect(() => {
    const applyFilters = () => {
      const filtered = serviceProviders.filter((user) => {
        return (
          (filters.name === '' || user.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (filters.category === '' || user.categories?.some(category => category.id === parseInt(filters.category))) &&
          (filters.subcategory === '' || user.subcategories?.some(subcategory => subcategory.id === parseInt(filters.subcategory)))
        );
      });
      setFilteredUsers(filtered);
    };

    applyFilters();
  }, [filters, serviceProviders]);

  const clearFilters = () => {
    setFilters({
      name: '',
      category: '',
      subcategory: '',
    });

    setFilteredSubcategories([]);
    form.reset(); // Restablece los valores en el formulario
  };

  const form = useForm<z.infer<typeof filterServicesProvidersSchema>>({
    resolver: zodResolver(filterServicesProvidersSchema),
    defaultValues: {
      name: "",
      category: "",
      subcategory: ""
    },
  });

  console.log(filteredUsers)

  return (
    <Card>
      <CardHeader>
        <div className="px-2 pb-4">
          <div className='w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2 pb-2'>
            <h2 className="font-bold text-xl">Filters</h2>
            <div className="col-span-9">
              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </div>
          <Form {...form}>
            <form
              className="grid grid-cols-9 gap-3 w-fit"
            >
              <div className="md:col-span-3 col-span-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            handleInputChange(e)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-3 col-span-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        value={filters.category}
                        onValueChange={(value) => {
                          field.onChange(value)
                          handleSelectChange("category", value)
                          handleCategoryChange("category", value)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories && categories.map(item => (
                            <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:col-span-3 col-span-6">
                <FormField
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subcategory</FormLabel>
                      <Select
                        value={filters.subcategory}
                        onValueChange={(value) => {
                          field.onChange(value)
                          handleSelectChange("subcategory", value)
                        }}
                        defaultValue={field.value}
                        disabled={filteredSubcategories.length === 0}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Subcategory" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filteredSubcategories && filteredSubcategories.map(item => (
                            <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
        <CardTitle className="flex items-center gap-2">
          <IconUsersGroup size="24" />
          List of Service Providers
        </CardTitle>
        <CardDescription>A list of the most important Service Providers</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[490px]">
          <div className='h-max pr-4'>
            {filteredUsers && filteredUsers.map(item => (
              <DirectoryItem key={item.id} name={item.name} email={item.email} phone={item.phone} category={item.categories} subcategory={item.subcategories} />
            ))}
          </div>
          <ScrollBar />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default ServiceProvidersList