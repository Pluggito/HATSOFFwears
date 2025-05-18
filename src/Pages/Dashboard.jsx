"use client"

import { useEffect, useState } from "react"
import { Edit, Plus, Trash, X } from "lucide-react"

import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Textarea } from "@/Components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Toggle } from "@/Components/ui/toggle"
import {
  addProduct,
  deleteProduct,
  getOrders,
  getProducts,
  handleImageUpload,
  updateProduct,
} from "../Backend/AdminLogic"

import Testing from "../Components/Testing"
import { toast } from "sonner"
import { Link } from "react-router-dom"

export default function ClothingDashboard() {
  const [models, setModels] = useState([])
  const [editingModel, setEditingModel] = useState(null)
  const [newModel, setNewModel] = useState({
    name: "",
    price: "",
    description: "",
    collection: "",
    sizes: [],
    availability: "",
    category: [],
    type: "",
  })
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [isProduct, setIsProduct] = useState(null)
  const [orderCount, setOrderCount] = useState(0)
  const [pendingOrderCount, setPendingOrderCount] = useState(0)
  const [completedOrderCount, setCompletedOrderCount] = useState(0)
  const [orders, setOrders] = useState([]) // State to hold orders
  const [selectedOrder, setSelectedOrder] = useState(null)

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        if (isAddModalOpen) setIsAddModalOpen(false)
        if (isEditModalOpen) setIsEditModalOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscapeKey)
    return () => window.removeEventListener("keydown", handleEscapeKey)
  }, [isAddModalOpen, isEditModalOpen])

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isAddModalOpen || isEditModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isAddModalOpen, isEditModalOpen])

  const handleAddModel = async () => {
    if (!validateModel(newModel)) {
      toast.error("Validation failed. Please fill in all fields.")
      return
    }
    if (file == null || file == undefined) {
      toast.error("Image file is required.")
      return
    }

    const modelToAdd = {
      ...newModel,
      price: Number.parseFloat(newModel.price),
    }
    setModels([...models, modelToAdd])
    setIsAddModalOpen(false)
    await addProduct(modelToAdd, file, setNewModel) // Assuming addProduct is a function that adds the model to your database
    fetchModels() // Refresh the models after adding
    setNewModel({
      name: "",
      price: "",
      description: "",
      collection: "",
      sizes: [],
      availability: "",
      category: [],
      type: "",
    })
  }

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
      return false
    }
    return true
  }

  const handleToggleSize = (model, size, setter) => {
    const sizes = model.sizes || []
    const newSizes = sizes.includes(size) ? sizes.filter((s) => s !== size) : [...sizes, size]
    setter({ ...model, sizes: newSizes })
  }

  const handleEditModel = async () => {
    if (file != null || file != undefined) {
      const imgData = await handleImageUpload(file)
      if (!imgData) {
        toast.error("Image upload failed. Aborting product update.")
        return
      }
      editingModel.imgUrl = imgData.imgUrl // Update the image URL in the model
      editingModel.imgPublicId = imgData.publicId // Update the public ID in the model
    }

    await updateProduct(editingModel)
    fetchModels() // Refresh the models after editing
    setModels(models.map((model) => (model.id === editingModel.id ? editingModel : model)))
    setIsEditModalOpen(false)
    toast.success("Model updated successfully")
  }

  const handleDeleteModel = async (productId) => {
    setModels(models.filter((model) => model.id !== productId))
    await deleteProduct(productId)
    toast.success("Model deleted successfully")
    fetchModels() // Refresh the models after deletion
  }

  const startEditing = (model) => {
    setEditingModel({ ...model })
    setIsEditModalOpen(true)
  }

  const fetchModels = async () => {
    const modelsFromDB = await getProducts() // Assuming getProducts is a function that fetches models from your database
    if (modelsFromDB.length === 0) {
      setIsProduct(false)
    } else {
      setIsProduct(true)
    }
    setModels(modelsFromDB)
  }

  const fetchOrders = async () => {
    const ordersFromDB = await getOrders()
    setOrderCount(ordersFromDB.length) // Assuming getOrders is a function that fetches orders from your database
    setPendingOrderCount(ordersFromDB.filter((order) => order.status === "Pending").length)
    setCompletedOrderCount(ordersFromDB.filter((order) => order.status === "completed").length)
    setOrders(ordersFromDB) // Assuming getOrders is a function that fetches orders from your database
  }

  useEffect(() => {
    fetchModels()
    fetchOrders() // Fetch orders when the component mounts
  }, [])

  // Images uploading
  // This is a placeholder for the image upload logic. You can replace it with your actual upload logic.

  return (
    <div className="mx-auto py-10">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">HatsOff Dashboard</h1>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="font-bold cursor-pointer">
            <Link to="/orders" className="text-black">
              Orders
            </Link>
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Model
          </Button>
        </div>
      </header>

      {/* Add Model Modal - Using semantic HTML */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-opacity-50">
          <div
            className="bg-white rounded-lg shadow-lg w-full sm:w-full  sm:max-w-lg max-h-[85vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-model-title"
          >
            <header className="mb-4">
              <div className="flex justify-between items-center">
                <h2 id="add-model-title" className="text-lg font-semibold">
                  Add New Clothing Model
                </h2>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-gray-500">Enter the details for the new clothing model.</p>
            </header>

            <main className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newModel.name}
                  onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                  autoComplete="off"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price (₦)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newModel.price}
                  onChange={(e) => setNewModel({ ...newModel, price: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label id="availability-label">Availability</Label>
                  <Select onValueChange={(value) => setNewModel({ ...newModel, availability: value })}>
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
                    onValueChange={(value) => setNewModel({ ...newModel, collection: value })}
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
                    onValueChange={(value) => setNewModel({ ...newModel, category: value })}
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
                  onChange={(e) => setNewModel({ ...newModel, description: e.target.value })}
                />
              </div>
              <div className="grid gap-3">
                <p>Sizes Available</p>
                <div className="flex flex-wrap gap-2 w-full">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <Toggle
                      key={size}
                      pressed={newModel.sizes.includes(size)}
                      onPressedChange={() => handleToggleSize(newModel, size, setNewModel)}
                      className="flex-1 min-w-[40px] max-w-[60px]"
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
            </main>

            <footer className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddModel}>Add Model</Button>
            </footer>
          </div>
        </div>
      )}

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
                        <CardTitle className="text-2xl font-bold">{model.name}</CardTitle>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => startEditing(model)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteModel(model.id)}>
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
                          <p className="text-sm text-muted-foreground">{model.collection}</p>
                          <p className="text-sm text-black">{model.sizes?.join(", ") || "N/A"}</p>
                          <p className="text-sm mt-2">{model.description}</p>
                        </div>
                        <div>
                          <p className="text-md text-muted-foreground">
                            Availability: <span className="font-medium">{model.availability}</span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              <div className="flex items-center justify-center">No Products Available</div>
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
                    <p className="text-sm text-muted-foreground">Total Models</p>
                    <p className="text-3xl font-bold">{models.length}</p>
                  </div>
                  <div className="border rounded p-4 text-center">
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="md:text-3xl text-xl font-bold">
                      ₦{models.reduce((sum, model) => sum + model.price, 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Simple statistics dashboard. More detailed analytics coming soon.
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
                  if (!selectedOrder) return

                  setOrders((prevOrders) =>
                    prevOrders.map((order) => (order.id === selectedOrder.id ? { ...order, status: value } : order)),
                  )

                  setSelectedOrder((prev) => ({
                    ...prev,
                    status: value,
                  }))
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

      {/* Edit Model Modal - Using semantic HTML */}
      {isEditModalOpen && editingModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white rounded-lg shadow-lg w-[95vw] sm:w-full max-w-[95vw] sm:max-w-lg max-h-[85vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-model-title"
          >
            <header className="mb-4">
              <div className="flex justify-between items-center">
                <h2 id="edit-model-title" className="text-lg font-semibold">
                  Edit Clothing Model
                </h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-gray-500">Update the details for this clothing model.</p>
            </header>

            <main className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  className="w-full"
                  value={editingModel.name}
                  onChange={(e) => setEditingModel({ ...editingModel, name: e.target.value })}
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
                      price: Number.parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label id="edit-availability-label">Availability</Label>
                  <Select
                    onValueChange={(value) => setEditingModel({ ...editingModel, availability: value })}
                    value={editingModel.availability}
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
                  <Label id="edit-collection-label">Collection</Label>
                  <Select
                    onValueChange={(value) => setEditingModel({ ...editingModel, collection: value })}
                    value={editingModel.collection}
                    aria-labelledby="edit-collection-label"
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
                  <Label id="edit-category-label">Category</Label>
                  <Select
                    onValueChange={(value) => setEditingModel({ ...editingModel, category: value })}
                    value={editingModel.category}
                    aria-labelledby="edit-category-label"
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
              <div className="grid gap-3">
                <p>Sizes Available</p>
                <div className="flex flex-wrap gap-2 w-full">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <Toggle
                      key={size}
                      pressed={editingModel.sizes.includes(size)}
                      onPressedChange={() => handleToggleSize(editingModel, size, setEditingModel)}
                      className="flex-1 min-w-[40px] max-w-[60px]"
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
            </main>

            <footer className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditModel}>Save Changes</Button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}
