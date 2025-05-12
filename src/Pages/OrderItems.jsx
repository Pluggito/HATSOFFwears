"use client";

import { useParams } from "react-router-dom";
import { User, MapPin, Mail, Phone, ShoppingBag, Calendar } from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { useEffect, useState } from "react";
import { getOrders } from "../Backend/AdminLogic";
import { toast } from "sonner";

const OrderItems = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const ordersFromDB = await getOrders();
      const order = ordersFromDB.find((order) => order.id === orderId);
      if (order) {
        setOrder(order);
      } else {
        toast.error("Order not found");
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (order === null) {
    return <div>Loading OrderDetails.....</div>;
  }
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Canceled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order Details</h1>
          {/* Add the order number here */}
          <p className="text-gray-500">Order #{order.orderNumber}</p>
        </div>
        <div className="mt-2 md:mt-0">
          {/*it gets the status from the orders page and updates here */}
          <Badge variant="outline" className={getStatusColor(order.status)}>
            {order.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Summary */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 px-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center">
                      <img src={item.image} />
                    </div>

                    <div className="ml-4">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity} • Sizes:{" "}
                        {Array.isArray(item.size)
                          ? item.size.join(", ")
                          : item.size}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₦{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="flex items-center ">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Order Date: {new Date(order.timestamp).toLocaleDateString()}
                </span>

                <span>Total Amount : {order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card className="px-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <User className="mr-2 h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start">
                <User className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                <div>
                  <p className="font-medium">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                <div>
                  <p className="text-sm">{order.customer.email}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                <div>
                  <p className="text-sm">{order.customer.phone}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Shipping Address</p>
                  <p className="text-sm text-gray-500">
                    {order.customer.address}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
};

export default OrderItems;
