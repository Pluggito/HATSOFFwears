import { useEffect, useState, useRef,  } from "react";
import { Edit, Plus, Trash, Upload } from "lucide-react";

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
  getProducts,
  updateProduct,
} from "../Backend/AdminLogic";

import Testing from "../Components/Testing";

export default function ClothingDashboard() {
  const [models, setModels] = useState([]);
  const [editingModel, setEditingModel] = useState(null);
  const [newModel, setNewModel] = useState({
    name: "",
    price: "",
    description: "",
    collection: "",
    sizes: [],
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [file , setFile] = useState()


  const handleAddModel = async () => {
    const modelToAdd = {
      ...newModel,
      price: parseFloat(newModel.price),
    };
    setModels([...models, modelToAdd]);
    setIsAddDialogOpen(false);
    await addProduct(modelToAdd,file,setNewModel); // Assuming addProduct is a function that adds the model to your database
    fetchModels(); // Refresh the models after adding
    setNewModel({
      name: "",
      price: "",
      description: "",
      collection: "",
      sizes: [],
    });
  };

  const handleToggleSize = (model, size, setter) => {
    const sizes = model.sizes || [];
    const newSizes = sizes.includes(size)
      ? sizes.filter((s) => s !== size)
      : [...sizes, size];
    setter({ ...model, sizes: newSizes });
  };

  const handleEditModel = async () => {
    await updateProduct(editingModel);
    fetchModels(); // Refresh the models after editing
    setModels(
      models.map((model) =>
        model.id === editingModel.id ? editingModel : model
      )
    );
    setIsEditDialogOpen(false);
  };

  const handleDeleteModel = async (productId) => {
    setModels(models.filter((model) => model.id !== productId));
    await deleteProduct(productId);
    fetchModels(); // Refresh the models after deletion
  };

  const startEditing = (model) => {
    setEditingModel({ ...model });
    setIsEditDialogOpen(true);
  };

  const fetchModels = async () => {
    const modelsFromDB = await getProducts(); // Assuming getProducts is a function that fetches models from your database
    setModels(modelsFromDB);
  };

  useEffect(() => {
    fetchModels();
  }, []);

  // Images uploading
  // This is a placeholder for the image upload logic. You can replace it with your actual upload logic.

  const fileInputRef = useRef();

  const handleImageClick = () => {
    fileInputRef.current?.click(); // Trigger the hidden input
  };



  return (
    <div className="container mx-auto py-10">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">HatsOff Dashboard</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Model
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Clothing Model</DialogTitle>
              <DialogDescription>
                Enter the details for the new clothing model.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
              <div className="grid gap-2">
                <Label  id="collection-label">Collection</Label>
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
                   <Testing setFile={setFile}/>
              </div>
            </div>
          </div> {/* Closing the missing div */}
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
            {models.map((model) => (
              <Card key={model.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{model.name}</CardTitle>
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
                  <div className="flex gap-4">
                    <div className="h-24 w-24 rounded overflow-hidden">
                      <img
                        src={model.imgUrl || "/placeholder.svg"}
                        alt={model.name}
                        className="h-full w-full object-cover"
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
                  </div>
                </CardContent>
              </Card>
            ))}
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
                    <p className="text-3xl font-bold">
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2 md:col-span-1 lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="border rounded p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Total Orders
                    </p>
                    <p className="text-3xl font-bold">0</p>
                  </div>
                  <div className="border rounded p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Pending Orders
                    </p>
                    <p className="text-3xl font-bold">0</p>
                  </div>
                  <div className="border rounded p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Completed Orders
                    </p>
                    <p className="text-3xl font-bold">0</p>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  No orders available at the moment. Orders will be displayed
                  here once they are placed.
                </p>
              </CardContent>
            </Card>
            <Card className="col-span-2 md:col-span-1 lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="border rounded p-4 text-center">
                    <p className="text-sm text-muted-foreground">Last Order</p>
                    <p className="text-3xl font-bold">No orders yet</p>
                  </div>
                  <div className="border rounded p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Total Orders
                    </p>
                    <p className="text-3xl font-bold">0</p>
                  </div>
                  <div className="border rounded p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Total Revenue
                    </p>
                    <p className="text-3xl font-bold">₦0.00</p>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  No order history available. Orders will be displayed here once
                  they are placed.
                </p>
              </CardContent>
            </Card>
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
              <div className="grid gap-2">
                <Label htmlFor="edit-collection">Collection</Label>
                <Select
                  value={editingModel.collection}
                  onValueChange={(value) =>
                    setEditingModel({ ...editingModel, collection: value })
                  }
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
                      pressed={newModel.sizes.includes(size)}
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
                  <div className="h-20 w-20 rounded border overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      
                    />
                    <img
                      src={editingModel.image || "/placeholder.svg"}
                      alt="Preview"
                      className="h-full w-full object-cover cursor-pointer"
                      onClick={handleImageClick}
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" /> Upload
                  </Button>
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
