"use client"

import { fetchCategories } from "@/lib/fetch";
import { Category } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

// Define el contexto
const CategoriesContext = createContext<Category[]>([]);

// Hook para acceder al contexto de categorías
export const useCategories = () => useContext(CategoriesContext);

// Componente proveedor que carga las categorías desde la base de datos
export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true); // Inicia la carga
      setError(null); // Resetea cualquier error anterior
      try {
        const response = await fetchCategories(); // Cambia la URL según tu endpoint

        const data = await response.data;

        if (data) {
          setCategories(data);
        } else {
          throw new Error("Error trying to get categories.");
        }
      } catch (error) {
        setError("Error on get categories"); // Manejo de error
        console.error(error);
      } finally {
        setIsLoading(false); // Finaliza la carga
      }
    };

    fetch();
  }, []);

  return (
    <CategoriesContext.Provider value={categories}>
      {isLoading ? (
        <p>Cargando categorías...</p> // Mostrar un mensaje de carga
      ) : error ? (
        <p>{error}</p> // Mostrar el mensaje de error si hay un problema
      ) : (
        children
      )}
    </CategoriesContext.Provider>
  );
};