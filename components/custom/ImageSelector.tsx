"use client"
import React, { useState } from "react";

const ImageSelector = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedFiles = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="image-upload"
        className="flex items-center justify-center w-64 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
      >
        <span className="text-gray-500">Click to select images</span>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-32 h-32 border rounded-lg overflow-hidden"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Selected ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full p-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSelector;
