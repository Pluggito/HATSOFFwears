import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
//import axios from "axios";
import { db } from "./firebase";
import { toast } from "sonner";
import { uploadFiles } from "../lib/uploadthing";
//import { set } from "mongoose";

// 🔄 Uploads an image to Cloudinary and returns its URL
{
  /*export const handleImageUpload = async (file) => {
  const formData = new FormData();
  const presetName = import.meta.env.VITE_CLOUDINARY_PRESET;
  formData.append("file", file);
  formData.append("upload_preset", presetName); // Replace with your upload preset 

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    console.error("Cloudinary cloud name is not set in environment variables.");
    return null;
  }

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    const imgUrl = response.data?.secure_url;
    const publicId = response.data?.public_id;

    return { imgUrl, publicId };
  } catch (error) {
    console.error(
      "Cloudinary upload failed:",
      error.response?.data || error.message
    );
    return null;
  }
};*/
}

// 📤 Uploads an array of image files using UploadThing and returns their URLs
export const handleImageUpload = async (files) => {
  try {
    const res = await uploadFiles("imageUploader", { files });
   //console.log("UploadThing result:", res);

    if (!res || res.length === 0) {
      return null;
    }
    
    return res.map((item) => ({
      secureUrl: item.ufsUrl, // final CDN URL
      publicId: item.key, // UploadThing file identifier
    }));
  } catch (error) {
    console.error("UploadThing upload failed:", error);
    return null;
  }
};

// 📥 Adds a new product to Firestore with multiple image uploads
// files: File[]  (at least one required)
export const addProduct = async (productData, files, setNewModel) => {
  try {
    if (!files || files.length === 0) {
      throw new Error("At least one image file is required.");
    }

    // Upload all images in a single batch
    const uploadResults = await handleImageUpload(files);
    if (!uploadResults) {
      throw new Error("Image uploads failed. Aborting product addition.");
    }

    const imgUrls = uploadResults.map((r) => r.secureUrl);
    const imgPublicIds = uploadResults.map((r) => r.publicId);

    const productRef = collection(db, "products");

    const docRef = await addDoc(productRef, {
      ...productData,
      imgUrls,
      imgPublicIds,
      id: "", // Temporary placeholder
    });

    await updateDoc(docRef, { id: docRef.id });

    if (typeof setNewModel === "function") {
      setNewModel({
        ...productData,
        imgUrls,
        imgPublicIds,
        id: docRef.id,
      });
    }

    toast.success("Model added successfully!");
  } catch (error) {
    toast.error("Add Product Error: " + error.message);
  }
};

// 📦 Fetches all products from Firestore
export const getProducts = async () => {
  try {
    const productRef = collection(db, "products");
    const querySnapshot = await getDocs(productRef);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Get Products Error:", error.message);
    return [];
  }
};

// 📃 Fetches all orders from Firestore
export const getOrders = async () => {
  try {
    const orderRef = collection(db, "orders");
    const querySnapshot = await getDocs(orderRef);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Get Orders Error:", error.message);
    return [];
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    if (!orderId) {
      throw new Error("Order ID is required for update.");
    }

    const orderDocRef = doc(db, "orders", orderId);
    await updateDoc(orderDocRef, { status: status });

    toast.success("Order status updated successfully!");
  } catch (error) {
    toast.error("Update Order Status Error:", error.message);
    console.log(error);
  }
};

// ✏️ Updates a product in Firestore, optionally uploading additional images
// newFiles: File[]  — optional new images to add on top of retainedUrls
// retainedUrls: string[]  — existing URLs the user chose to keep
export const updateProduct = async (productData, newFiles = [], retainedUrls = null) => {
  try {
    if (!productData?.id) {
      throw new Error("Product ID is required for update.");
    }

    let mergedUrls = retainedUrls !== null ? [...retainedUrls] : (productData.imgUrls ?? []);
    let mergedPublicIds = [...(productData.imgPublicIds ?? [])];

    if (newFiles && newFiles.length > 0) {
      const uploadResults = await handleImageUpload(newFiles);
      if (!uploadResults) {
        throw new Error("Image uploads failed during update.");
      }
      mergedUrls = [...mergedUrls, ...uploadResults.map((r) => r.secureUrl)];
      mergedPublicIds = [...mergedPublicIds, ...uploadResults.map((r) => r.publicId)];
    }

    const productDocRef = doc(db, "products", productData.id);
    await updateDoc(productDocRef, {
      ...productData,
      imgUrls: mergedUrls,
      imgPublicIds: mergedPublicIds,
    });
  } catch (error) {
    console.error("Update Product Error:", error.message);
  }
};

// ❌ Deletes a product from Firestore
export const deleteProduct = async (productId) => {
  try {
    if (!productId) {
      throw new Error("Product ID is required for deletion.");
    }

    const productDocRef = doc(db, "products", productId);
    await deleteDoc(productDocRef);

    console.log("Product deleted successfully");
  } catch (error) {
    console.error("Delete Product Error:", error.message);
  }
};
