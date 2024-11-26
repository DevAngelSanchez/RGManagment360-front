"use client"

import { fetchProperties } from "@/lib/fetch";
import { Property } from "@/lib/types";
import React, { createContext, useContext, useEffect, useState } from "react";

// Define el contexto
const propertiesContext = createContext<Property[]>([]);

// Hook para acceder al contexto de categorías
export const useProperties = () => useContext(propertiesContext);

// Componente proveedor que carga las categorías desde la base de datos
export const PropertiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true); // Inicia la carga
      setError(null); // Resetea cualquier error anterior
      try {
        const response = await fetchProperties(); // Cambia la URL según tu endpoint

        const data = await response.data;

        if (data) {
          setProperties(data);
        } else {
          throw new Error("Error trying to get properties.");
        }
      } catch (error) {
        setError("Error on get properties"); // Manejo de error
        console.error(error);
      } finally {
        setIsLoading(false); // Finaliza la carga
      }
    };

    fetch();
  }, []);

  return (
    <propertiesContext.Provider value={properties}>
      {isLoading ? (
        <p>Cargando properties...</p> // Mostrar un mensaje de carga
      ) : error ? (
        <p>{error}</p> // Mostrar el mensaje de error si hay un problema
      ) : (
        children
      )}
    </propertiesContext.Provider>
  );
};