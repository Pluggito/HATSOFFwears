import { db, addDoc, collection } from "./firebase";
import emailjs from "@emailjs/browser";
import { updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { getProductEffectivePrice } from "../lib/productPricing";

export const processOrderDetails = (cartItems, userDetails, trns_id, products) => {
  const orderItems = [];
  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      const quantity = Number(cartItems[productId][size]);
      if (quantity > 0) {
        const product = products.find((entry) => entry.id === productId);
        if (!product) continue;
        orderItems.push({
          productId: product.id,
          name: product.name,
          size,
          quantity,
          price: getProductEffectivePrice(product),
          originalPrice: Number(product.price ?? 0),
          discountPercent: Number(product.discountPercent ?? 0),
          image: product.imgUrl || product.imgUrls?.[0] || "",
        });
      }
    }
  }
  const totalAmount = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  return {
    customer: { firstName: userDetails.firstName, lastName: userDetails.lastName, email: userDetails.email, phone: userDetails.phone, address: userDetails.address },
    items: orderItems,
    totalAmount,
    status: "Pending",
    orderNumber: Math.floor(Math.random() * 1000000),
    trns_id,
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
    order_summary: orderDetails.items.map((item) => `<tr><td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td><td style="padding: 8px; border: 1px solid #ddd;">${item.size}</td><td style="padding: 8px; border: 1px solid #ddd;">${item.quantity}</td><td style="padding: 8px; border: 1px solid #ddd;">${item.price}</td><td style="padding: 8px; border: 1px solid #ddd;">${item.price * item.quantity}</td></tr>`).join(""),
    total_amount: orderDetails.totalAmount,
  };
  try {
    await emailjs.send("service_gx8rbik", "template_iojecih", templateParams, "AyUIdWYKZpdfCippf");
    toast.success("Order confirmation email sent!");
  } catch (error) { console.error("Failed to send email:", error); }
};

export const saveOrderToFirebase = async (orderDetails) => {
  const docRef = await addDoc(collection(db, "orders"), { ...orderDetails, id: "" });
  await updateDoc(docRef, { id: docRef.id });
  return orderDetails.orderNumber;
};

export const placeOrder = async (cartItems, userDetails, trns_id, products, setCartItems) => {
  try {
    const orderDetails = processOrderDetails(cartItems, userDetails, trns_id, products);
    const orderId = await saveOrderToFirebase(orderDetails);
    await sendOrderEmail(orderDetails);
    setCartItems({});
    return orderId;
  } catch (error) { console.error("Failed to place order:", error); throw error; }
};

export const handlePlaceOrder = async (cartItems, userDetails, trns_id, products, setCartItems) => placeOrder(cartItems, userDetails, trns_id, products, setCartItems);
