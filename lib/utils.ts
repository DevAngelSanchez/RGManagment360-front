import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const phoneNumberValidation = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/;

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Convierte el archivo a Base64
    reader.onload = () => resolve(reader.result as string); // Retorna la cadena Base64
    reader.onerror = (error) => reject(error);
  });
}

export function base64ToBlob(base64: string): Blob {
  const [metadata, base64Data] = base64.split(",");
  const contentType = metadata.match(/data:(.*?);base64/)?.[1] || "";
  const binaryString = atob(base64Data); // Decodificar Base64
  const byteArray = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  return new Blob([byteArray], { type: contentType });
}

export function base64ToFile(base64: string, fileName: string): File {
  const blob = base64ToBlob(base64);
  return new File([blob], fileName, { type: blob.type });
}
