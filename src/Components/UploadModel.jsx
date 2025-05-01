// src/components/ImageUploader.jsx
import React from 'react';
import { UploadButton } from "@uploadthing/react";
import { generateUploadThingUrl } from "../utils/uploadthing";

const ImageUploader = () => {
  return (
    <div>
      <h2>Upload an Image</h2>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Upload complete:", res);
        }}
        onUploadError={(error) => {
          console.error("Upload error:", error);
        }}
      />
    </div>
  );
};

export default ImageUploader;
