import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const getProducts = async () => {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    return snapshot.docs.map((productDoc) => productDoc.data());
  } catch (error) {
    console.error("Get Products Error:", error.message);
    return [];
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
