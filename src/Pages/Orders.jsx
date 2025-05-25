"use client";

import { useState } from "react";
import { ArrowLeft, Check, Filter, Search, X } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Badge } from "@/Components/ui/badge";
import { toast } from "sonner"; // Assuming this function exists
import { useNavigate } from "react-router-dom";
import { getOrders, updateOrderStatus } from "../Backend/AdminLogic";

// Mock function for updating order status
// async function updateOrderStatus(orderId, status) {
//   await updateOrderStatus(orderId, status);
// }

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleUpdateOrderStatus = async (orderId, status) => {
    await updateOrderStatus(orderId, status);
  };
  const fetchOrders = async () => {
    try {
      const ordersFromDB = await getOrders();
      setOrders(ordersFromDB);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  // Initialize orders with dummy data if no initialOrders are provided
  useState(() => {
    fetchOrders();
  }, []);
  const [isUpdating, setIsUpdating] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Apply filters and search
  const filteredOrders = orders.filter((order) => {
    // Filter by status
    if (filterStatus !== "all" && order.status !== filterStatus) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.orderNumber?.toString().includes(query) ||
        order.name?.toLowerCase().includes(query) ||
        order.totalAmount?.toString().includes(query)
      );
    }

    return true;
  });

  const handleStatusChange = async (value) => {
    if (!selectedOrder) return;

    setIsUpdating(true);

    try {
      // Update in database
      await handleUpdateOrderStatus(selectedOrder.id, value);

      // Update in state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder.id ? { ...order, status: value } : order
        )
      );

      // Update selected order
      setSelectedOrder((prev) => ({
        ...prev,
        status: value,
      }));

      toast.success(
        `Order #${selectedOrder.orderNumber} status updated to ${value}`
      );
    } catch (error) {
      toast.error(`Failed to update status: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

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

  const navigate = useNavigate();

  console.log(orders.timestamp);
  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-1.5">
          <ArrowLeft
            className="mr-2 h-7 w-7"
            onClick={() => window.history.back()}
          />{" "}
          Orders
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search orders..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-40">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>
                  {filterStatus === "all" ? "All Orders" : filterStatus}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Status Controller */}
      {selectedOrder && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border p-4 rounded-md bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              Order #{selectedOrder.orderNumber}
            </span>
            <Badge
              variant="outline"
              className={getStatusColor(selectedOrder.status)}
            >
              {selectedOrder.status || "Pending"}
            </Badge>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <Select
              onValueChange={handleStatusChange}
              value={selectedOrder.status || "Pending"}
              disabled={isUpdating}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Change status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedOrder(null)}
            >
              <X className="h-4 w-4 mr-1" /> Clear
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto border rounded-md">
        {filteredOrders.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm text-gray-600">
                <th className="py-3 px-2 font-medium">Order Number</th>
                <th className="py-3 px-2 font-medium">Date</th>
                <th className="py-3 px-2 font-medium">Total</th>
                <th className="py-3 px-2 font-medium">Status</th>
                <th className="py-3 px-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className={`border-t border-gray-200 text-sm hover:bg-gray-50 ${
                    selectedOrder?.id === order.id ? "bg-blue-50" : ""
                  }`}
                >
                  <td
                    className="py-3 px-2 font-medium cursor-pointer text-blue-600 hover:underline"
                    onClick={() => navigate(`/order-items/${order.id}`)}
                  >
                    #{order.orderNumber}
                  </td>
                  <td className="py-3 px-2">
                    {order.timestamp && !isNaN(new Date(order.timestamp))
                    ? order.timestamp.toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-2 font-medium">
                    ₦{order.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-2">
                    <Badge
                      variant="outline"
                      className={getStatusColor(order.status)}
                    >
                      {order.status || "Pending"}
                    </Badge>
                  </td>
                  <td className="py-3 px-2">
                    <Button
                      variant={
                        selectedOrder?.id === order.id ? "secondary" : "ghost"
                      }
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      {selectedOrder?.id === order.id ? (
                        <>
                          <Check className="h-4 w-4 mr-1" /> Selected
                        </>
                      ) : (
                        "Select"
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-sm text-gray-500">
            {searchQuery || filterStatus !== "all"
              ? "No orders match your search or filter criteria."
              : "No orders available at the moment."}
          </div>
        )}
      </div>

      {/* Dialog for Billing Address */}
      {/*{selectedOrder && (
          <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-lg flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h3 className="text-lg font-bold mb-4">Billing Address</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span> John Doe
                </p>
                <p>
                  <span className="font-medium">Address:</span> 123 Main Street, Lagos, Nigeria
                </p>
                <p>
                  <span className="font-medium">Email:</span> johndoe@example.com
                </p>
                <p>
                  <span className="font-medium">Phone Number:</span> +234 812 345 6789
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )} */}
      {orders.length > 0 && (
        <div className="text-sm text-gray-500">
          Showing {filteredOrders.length} of {orders.length} orders
          {filterStatus !== "all" && ` (filtered by ${filterStatus})`}
          {searchQuery && ` (search: "${searchQuery}")`}
        </div>
      )}
    </div>
  );
}
