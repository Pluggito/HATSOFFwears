import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import axios from "axios";
import { db } from "./firebase";
import { toast } from "sonner";

// 🔄 Uploads an image to Cloudinary and returns its URL
const handleImageUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "model_uploads"); // Replace with your upload preset 

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

    return response.data?.secure_url || null;
  } catch (error) {
    console.error("Cloudinary upload failed:", error.response?.data || error.message);
    return null;
  }
};

// 📥 Adds a new product to Firestore with image upload
export const addProduct = async (productData, file, setNewModel) => {
  try {
    if (!file) {
      throw new Error("Image file is required.");
    }

    const imgUrl = await handleImageUpload(file);
    if (!imgUrl) {
      throw new Error("Image upload failed. Aborting product addition.");
    }

    const productRef = collection(db, "products");

    const docRef = await addDoc(productRef, {
      ...productData,
      imgUrl,
      id: "", // Temporary placeholder
    });

    await updateDoc(docRef, { id: docRef.id });

    if (typeof setNewModel === "function") {
      setNewModel({ ...productData, imgUrl, id: docRef.id });
    }

    toast.success("Model added successfully!");
    console.log("Product added successfully");
  } catch (error) {
    console.error("Add Product Error:", error.message);
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

// ✏️ Updates a product in Firestore
export const updateProduct = async (productData) => {
  try {
    if (!productData?.id) {
      throw new Error("Product ID is required for update.");
    }

    const productDocRef = doc(db, "products", productData.id);
    await updateDoc(productDocRef, productData);

    console.log("Product updated successfully");
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
