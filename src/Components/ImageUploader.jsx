import { useEffect, useState } from "react";
import { Edit, Plus, Trash } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Textarea } from "@/Components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Toggle } from "@/Components/ui/toggle";
import {
  addProduct,
  deleteProduct,
  getOrders,
  getProducts,
  handleImageUpload,
  updateProduct,
} from "../Backend/AdminLogic";

import Testing from "../Components/Testing";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function ClothingDashboard() {
  const [models, setModels] = useState([]);
  const [editingModel, setEditingModel] = useState(null);
  const [newModel, setNewModel] = useState({
    name: "",
    price: "",
    description: "",
    collection: "",
    sizes: [],
    availability: "",
    category: [],
    type: "",
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [isProduct, setIsProduct] = useState(null);
  const [orderCount, setOrderCount] = useState(0);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [completedOrderCount, setCompletedOrderCount] = useState(0);
  const [orders, setOrders] = useState([]); // State to hold orders
const [selectedOrder, setSelectedOrder] = useState(null);


  const handleAddModel = async () => {
    if (!validateModel(newModel)) {
      toast.error("Validation failed. Please fill in all fields.");
      return;
    }
    if (file == null || file == undefined) {
      toast.error("Image file is required.");
      return;
    }

    const modelToAdd = {
      ...newModel,
      price: parseFloat(newModel.price),
    };
    setModels([...models, modelToAdd]);
    setIsAddDialogOpen(false);
    await addProduct(modelToAdd, file, setNewModel); // Assuming addProduct is a function that adds the model to your database
    fetchModels(); // Refresh the models after adding
    setNewModel({
      name: "",
      price: "",
      description: "",
      collection: "",
      sizes: [],
      availability: "",
      category: [],
      type: "",
    });
  };

  // you have to validate before adding a model
  const validateModel = (model) => {
    if (
      !model.name ||
      !model.price ||
      !model.description ||
      !model.collection ||
      !model.sizes.length ||
      !model.availability ||
      !model.category.length ||
      file == null
    ) {
      return false;
    }
    return true;
  };

  const handleToggleSize = (model, size, setter) => {
    const sizes = model.sizes || [];
    const newSizes = sizes.includes(size)
      ? sizes.filter((s) => s !== size)
      : [...sizes, size];
    setter({ ...model, sizes: newSizes });
  };

  const handleEditModel = async () => {
    if (file != null || file != undefined) {
      const imgData = await handleImageUpload(file);
      if (!imgData) {
        toast.error("Image upload failed. Aborting product update.");
        return;
      }
      editingModel.imgUrl = imgData.imgUrl; // Update the image URL in the model
      editingModel.imgPublicId = imgData.publicId; // Update the public ID in the model
    }

    await updateProduct(editingModel);
    fetchModels(); // Refresh the models after editing
    setModels(
      models.map((model) =>
        model.id === editingModel.id ? editingModel : model
      )
    );
    setIsEditDialogOpen(false);
    toast.success("Model updated successfully");
  };

  const handleDeleteModel = async (productId) => {
    setModels(models.filter((model) => model.id !== productId));
    await deleteProduct(productId);
    toast.success("Model deleted successfully");
    fetchModels(); // Refresh the models after deletion
  };

  const startEditing = (model) => {
    setEditingModel({ ...model });
    setIsEditDialogOpen(true);
  };

  const fetchModels = async () => {
    const modelsFromDB = await getProducts(); // Assuming getProducts is a function that fetches models from your database
    if (modelsFromDB.length === 0) {
      setIsProduct(false);
    } else {
      setIsProduct(true);
    }
    setModels(modelsFromDB);
  };

  const fetchOrders = async () => {
    const ordersFromDB = await getOrders();
    setOrderCount(ordersFromDB.length); // Assuming getOrders is a function that fetches orders from your database
    setPendingOrderCount(
      ordersFromDB.filter((order) => order.status === "Pending").length
    );
    setCompletedOrderCount(
      ordersFromDB.filter((order) => order.status === "completed").length
    );
    setOrders(ordersFromDB); // Assuming getOrders is a function that fetches orders from your database
  };

  useEffect(() => {
    fetchModels();
    fetchOrders(); // Fetch orders when the component mounts
  }, []);

  // Images uploading
  // This is a placeholder for the image upload logic. You can replace it with your actual upload logic.

  return (
    <div className=" mx-auto py-10">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">HatsOff Dashboard</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Model
            </Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <DialogHeader>
              <DialogTitle>Add New Clothing Model</DialogTitle>
              <DialogDescription>
                Enter the details for the new clothing model.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 ">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newModel.name}
                  onChange={(e) =>
                    setNewModel({ ...newModel, name: e.target.value })
                  }
                  autoComplete="off"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price (₦)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newModel.price}
                  onChange={(e) =>
                    setNewModel({ ...newModel, price: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-5 items-center">
                <div className="grid gap-2">
                  <Label id="availability-label">Availability</Label>
                  <Select
                    onValueChange={(value) =>
                      setNewModel({ ...newModel, availability: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      <SelectItem value="Discontinued">Discontinued</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label id="collection-label">Collection</Label>
                  <Select
                    onValueChange={(value) =>
                      setNewModel({ ...newModel, collection: value })
                    }
                    value={newModel.collection}
                    aria-labelledby="collection-label"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select collection" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Default">Default</SelectItem>
                      <SelectItem value="Limited">Limited</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label id="category-label">Category</Label>
                  <Select
                    onValueChange={(value) =>
                      setNewModel({ ...newModel, category: value })
                    }
                    value={newModel.category}
                    aria-labelledby="category-label"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="T-shirt">T-shirt</SelectItem>
                      <SelectItem value="Jeans">Jeans</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newModel.description}
                  onChange={(e) =>
                    setNewModel({ ...newModel, description: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-4">
                <p>Sizes Available</p>
                <div className="flex gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <Toggle
                      key={size}
                      pressed={newModel.sizes.includes(size)}
                      onPressedChange={() =>
                        handleToggleSize(newModel, size, setNewModel)
                      }
                    >
                      {size}
                    </Toggle>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Image</Label>
                <div className="flex items-center gap-4">
                  <Testing setFile={setFile} />
                </div>
              </div>
            </div>{" "}
            {/* Closing the missing div */}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddModel}>Add Model</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>
      <Tabs defaultValue="models">
        <TabsList className="mb-4">
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="models">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isProduct ? (
              <>
                {models.map((model) => (
                  <Card key={model.id} className="border-2 border-gray-300">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-2xl font-bold">
                          {model.name}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => startEditing(model)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteModel(model.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 sm:gap-8">
                        <div className="h-28 w-28 rounded overflow-hidden">
                          <img
                            src={model.imgUrl || "/placeholder.svg"}
                            alt={model.name}
                            className="h-full w-full object-cover aspect-square"
                          />
                        </div>
                        <div>
                          <p className="font-bold">₦{model.price.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">
                            {model.collection}
                          </p>
                          <p className="text-sm text-black">
                            {model.sizes?.join(", ") || "N/A"}
                          </p>
                          <p className="text-sm mt-2">{model.description}</p>
                        </div>
                        <div>
                          <p className="text-md text-muted-foreground">
                            Availability:{" "}
                            <span className="font-medium">
                              {model.availability}
                            </span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              <div className="flex items-center justify-center">
                No Products Available
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Total Models
                    </p>
                    <p className="text-3xl font-bold">{models.length}</p>
                  </div>
                  <div className="border rounded p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Total Revenue
                    </p>
                    <p className="md:text-3xl text-xl font-bold">
                      ₦
                      {models
                        .reduce((sum, model) => sum + model.price, 0)
                        .toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Simple statistics dashboard. More detailed analytics coming
                  soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
           <div className="space-y-4">
    <h2 className="text-xl font-bold">Orders</h2>

    {/* Status Controller Outside */}
    <div className="flex items-center gap-4 border p-4 rounded-md w-fit">
      <Select
        onValueChange={(value) => {
          if (!selectedOrder) return;

          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === selectedOrder.id
                ? { ...order, status: value }
                : order
            )
          );

          setSelectedOrder((prev) => ({
            ...prev,
            status: value,
          }));
        }}
        disabled={!selectedOrder}
        value={selectedOrder?.status || "Pending"}
      >
        <SelectTrigger className="border border-gray-300 rounded px-2 py-1 min-w-[120px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Delivered">Delivered</SelectItem>
          <SelectItem value="Canceled">Canceled</SelectItem>
        </SelectContent>
      </Select>

      {/* Show Current Status */}
      <span className="text-sm text-gray-700">
        Status: <strong>{selectedOrder?.status || "None selected"}</strong>
      </span>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <div className="flex justify-center items-center">
         <Link to="/orders" className="text-blue-600 underline">
           View All Orders
         </Link>
       </div>

    </div>
  </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Clothing Model</DialogTitle>
            <DialogDescription>
              Update the details for this clothing model.
            </DialogDescription>
          </DialogHeader>
          {editingModel && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  className="w-full"
                  value={editingModel.name}
                  onChange={(e) =>
                    setEditingModel({ ...editingModel, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price (₦)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingModel.price}
                  onChange={(e) =>
                    setEditingModel({
                      ...editingModel,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex gap-5 items-center">
                <div className="grid gap-2">
                  <Label id="availability-label">Availability</Label>
                  <Select
                    onValueChange={(value) =>
                      setEditingModel({ ...editingModel, availability: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                      <SelectItem value="discontinued">Discontinued</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label id="collection-label">Collection</Label>
                  <Select
                    onValueChange={(value) =>
                      setEditingModel({ ...editingModel, collection: value })
                    }
                    value={editingModel.collection}
                    aria-labelledby="collection-label"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select collection" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Default">Default</SelectItem>
                      <SelectItem value="Limited">Limited</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label id="category-label">Category</Label>
                  <Select
                    onValueChange={(value) =>
                      setEditingModel({ ...editingModel, category: value })
                    }
                    value={editingModel.category}
                    aria-labelledby="category-label"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="T-shirt">T-shirt</SelectItem>
                      <SelectItem value="Jeans">Jeans</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingModel.description}
                  onChange={(e) =>
                    setEditingModel({
                      ...editingModel,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-4">
                <p>Sizes Available</p>
                <div className="flex gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <Toggle
                      key={size}
                      pressed={editingModel.sizes.includes(size)}
                      onPressedChange={() =>
                        handleToggleSize(editingModel, size, setEditingModel)
                      }
                    >
                      {size}
                    </Toggle>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Image</Label>
                <div className="flex items-center gap-4">
                  <Testing setFile={setFile} imgSrc={editingModel.imgUrl} />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditModel}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
// ClothingDashboard.propTypes = {
//   models: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       price: PropTypes.number.isRequired,
//       description: PropTypes.string.isRequired,
//       collection: PropTypes.string.isRequired,
//       sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
//       status: PropTypes.string.isRequired,
//       imgUrl: PropTypes.string,
//     })
