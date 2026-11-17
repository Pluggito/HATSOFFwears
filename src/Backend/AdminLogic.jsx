import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { toast } from "sonner";
import { uploadFiles } from "../lib/uploadthing";

export const handleImageUpload = async (files) => {
  try {
    const res = await uploadFiles("imageUploader", { files });
    if (!res || res.length === 0) return null;

    return res.map((item) => ({
      secureUrl: item.ufsUrl,
      publicId: item.key,
    }));
  } catch (error) {
    console.error("UploadThing upload failed:", error);
    return null;
  }
};

export const addProduct = async (productData, files, setNewModel) => {
  try {
    if (!files || files.length === 0) {
      throw new Error("At least one image file is required.");
    }

    const uploadResults = await handleImageUpload(files);
    if (!uploadResults) {
      throw new Error("Image uploads failed. Aborting product addition.");
    }

    const imgUrls = uploadResults.map((result) => result.secureUrl);
    const imgPublicIds = uploadResults.map((result) => result.publicId);
    const docRef = await addDoc(collection(db, "products"), {
      ...productData,
      imgUrls,
      imgPublicIds,
      id: "",
    });

    await updateDoc(docRef, { id: docRef.id });

    if (typeof setNewModel === "function") {
      setNewModel({ ...productData, imgUrls, imgPublicIds, id: docRef.id });
    }

    toast.success("Model added successfully!");
  } catch (error) {
    toast.error("Add Product Error: " + error.message);
  }
};

export const getProducts = async () => {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    return snapshot.docs.map((productDoc) => productDoc.data());
  } catch (error) {
    console.error("Get Products Error:", error.message);
    return [];
  }
};

export const getOrders = async () => {
  try {
    const snapshot = await getDocs(collection(db, "orders"));
    return snapshot.docs.map((orderDoc) => orderDoc.data());
  } catch (error) {
    console.error("Get Orders Error:", error.message);
    return [];
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    if (!orderId) throw new Error("Order ID is required for update.");

    await updateDoc(doc(db, "orders", orderId), { status });
    toast.success("Order status updated successfully!");
  } catch (error) {
    toast.error("Update Order Status Error: " + error.message);
    console.error(error);
    throw error;
  }
};

export const updateProduct = async (productData, newFiles = [], retainedUrls = null) => {
  try {
    if (!productData?.id) throw new Error("Product ID is required for update.");

    let mergedUrls = retainedUrls !== null ? [...retainedUrls] : [...(productData.imgUrls ?? [])];
    let mergedPublicIds = [...(productData.imgPublicIds ?? [])];

    if (newFiles?.length > 0) {
      const uploadResults = await handleImageUpload(newFiles);
      if (!uploadResults) throw new Error("Image uploads failed during update.");

      mergedUrls = [...mergedUrls, ...uploadResults.map((result) => result.secureUrl)];
      mergedPublicIds = [...mergedPublicIds, ...uploadResults.map((result) => result.publicId)];
    }

    await updateDoc(doc(db, "products", productData.id), {
      ...productData,
      imgUrls: mergedUrls,
      imgPublicIds: mergedPublicIds,
    });
  } catch (error) {
    console.error("Update Product Error:", error.message);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    if (!productId) throw new Error("Product ID is required for deletion.");
    await deleteDoc(doc(db, "products", productId));
    console.log("Product deleted successfully");
  } catch (error) {
    console.error("Delete Product Error:", error.message);
    throw error;
  }
};

export const updateProductDiscount = async (productId, discountPercent, isOnSale) => {
  if (!productId) throw new Error("Product ID is required.");

  const percentage = Number(discountPercent);
  if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) {
    throw new Error("Discount must be between 0 and 100 percent.");
  }

  await updateDoc(doc(db, "products", productId), {
    discountPercent: percentage,
    isOnSale: Boolean(isOnSale) && percentage > 0,
  });
};
