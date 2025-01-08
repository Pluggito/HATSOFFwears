import { db, addDoc, collection } from "./firebase"; // Ensure correct Firebase imports
import { products } from "../assets/asset"; // Import your product details
import emailjs from "@emailjs/browser";

// Function to process cartItems into a structured order
export const processOrderDetails = (cartItems, userDetails, trns_id) => {
  const orderItems = [];

  // Loop through cartItems and match with product details
  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      if (cartItems[productId][size] > 0) {
        const product = products.find((p) => p._id === productId);
        if (product) {
          orderItems.push({
            productId: product._id,
            name: product.name,
            size: size,
            quantity: cartItems[productId][size],
            price: product.price,
            image: product.image[0],
          });
        }
      }
    }
  }

  const totalAmount = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const orderNumber = Math.floor(Math.random() * 1000000);
  return {
    customer: {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      phone: userDetails.phone,
      address: userDetails.address,
    },
    items: orderItems,
    totalAmount,
    status: "Pending",
    orderNumber: orderNumber,
    trns_id: trns_id,
    timestamp: new Date(),
  };
};

const sendOrderEmail = async (orderDetails) => {
  const templateParams = {
    customer_name: `${orderDetails.customer.firstName} ${orderDetails.customer.lastName}`,
    customer_email: orderDetails.customer.email,
    customer_phone: orderDetails.customer.phone,
    customer_address: orderDetails.customer.address,
    orderNumber: orderDetails.orderNumber,
    trns_id: orderDetails.trns_id,
    order_summary: orderDetails.items
      .map(
        (item) =>
          `<tr>
            <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${item.size}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${item.price}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${item.price * item.quantity}</td>
          </tr>`
      )
      .join(""),
    total_amount: orderDetails.totalAmount,
  };

  try {
    await emailjs.send(
      "service_gx8rbik", // Replace with your EmailJS service ID
      "template_iojecih", // Replace with your EmailJS template ID
      templateParams,
      "AyUIdWYKZpdfCippf" // Replace with your EmailJS public key
    );
    console.log("Order confirmation email sent!");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

// Function to save order details to Firebase
export const saveOrderToFirebase = async (orderDetails) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), orderDetails);
    return docRef.id; // Returning the order ID if needed
  } catch (error) {
    console.error("Error saving order:", error);
    throw error;
  }
};

// Function to handle complete order placement logic
export const placeOrder = async (cartItems, userDetails, trns_id) => {
  try {
    // Process order details
    const orderDetails = processOrderDetails(cartItems, userDetails, trns_id);

    // Save to Firebase
    const orderId = await saveOrderToFirebase(orderDetails);

   // console.log("Order placed successfully with ID:", orderId);

    await sendOrderEmail(orderDetails);
   // console.log("Order confirmation email sent!");

    return orderId; // Returning orderId for reference
  } catch (error) {
    console.error("Failed to place order:", error);
    throw error;
  }
};

export const handlePlaceOrder = async (cartItems, userDetails, trns_id) => {
  await placeOrder(cartItems, userDetails, trns_id);
};
