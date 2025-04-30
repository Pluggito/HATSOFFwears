import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

// Function to fetch all orders from the "orders" collection in Firestore
export const getOrders = async () => {
  const orderRef = collection(db, "orders"); // Reference to the "orders" collection
  const querySnapshot = await getDocs(orderRef); // Fetch all documents in the collection
  const orders = querySnapshot.docs.map((doc) => doc.data()); // Map the documents to their data
  return orders; // Return the list of orders
};

// Function to add a new product to the "products" collection in Firestore
export const addProduct = async (productData) => {
  try {
    const productRef = collection(db, "products"); // Reference to the "products" collection
    const docRef = await addDoc(productRef, productData); // Add the new product data to the collection

    // Attempt to update the product with its generated ID (this part seems unnecessary as `addDoc` doesn't return the document reference directly)
    await updateDoc(docRef, {
      id: docRef.id,
    });
  } catch (error) {
    console.log("Add Product Error", error); // Log any errors that occur
  }
};

// Function to fetch all products from the "products" collection in Firestore
export const getProducts = async () => {
  const productRef = collection(db, "products"); // Reference to the "products" collection
  const querySnapshot = await getDocs(productRef); // Fetch all documents in the collection
  const products = querySnapshot.docs.map((doc) => doc.data()); // Map the documents to their data
  return products; // Return the list of products
};

// Function to update an existing product in the "products" collection
export const updateProduct = async (productData) => {
  try {
    if (!productData.id) {
      throw new Error("Product ID is required to update.");
    }
    const productDocRef = doc(db, "products", productData.id); // Reference to the specific product document
    await updateDoc(productDocRef, productData); // Update the product data in Firestore

    console.log("Product updated successfully");
  } catch (error) {
    console.log("Update Product Error", error); // Log any errors that occur
  }
};

// Function to delete a product from the "products" collection
export const deleteProduct = async (productId) => {
  try {
    if (!productId) {
      throw new Error("Product ID is required to delete.");
    }
    const productDocRef = doc(db, "products", productId);
    await deleteDoc(productDocRef);

    console.log("Product deleted successfully");
  } catch (error) {
    console.log("Delete Product Error", error);
  }
};
