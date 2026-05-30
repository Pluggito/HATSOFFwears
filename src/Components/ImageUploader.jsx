"use client"

import { useEffect, useState } from "react"
import { Edit, Plus, Trash, X, Loader2, Package, DollarSign, ShoppingCart } from "lucide-react"

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
    <div className="mx-auto py-10 relative overflow-hidden">
      {/* Subtle Background Mesh Glow */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(139,92,246,0.08),transparent_65%)] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-0 -z-10 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(251,191,36,0.08),transparent_65%)] pointer-events-none rounded-full" />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground outfit">HatsOff Dashboard</h1>
            <span className="text-[10px] font-bold tracking-widest bg-primary/10 text-primary px-2.5 py-1 rounded-full uppercase border border-primary/20 whitespace-nowrap">
              Admin Portal
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Manage your clothing models, product inventory, and shop statistics.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link to="/orders" className="flex-1 md:flex-none">
            <Button variant="secondary" className="w-full font-bold cursor-pointer border border-border/60 hover:bg-accent/15 transition-all rounded-xl gap-2 h-11 px-5">
              <ShoppingCart className="h-4 w-4 text-foreground" />
              Orders
            </Button>
          </Link>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 md:flex-none bg-foreground text-background font-semibold hover:opacity-90 transition-all duration-300 active:scale-[0.98] rounded-xl h-11 px-5 gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Add New Model
          </Button>
        </div>
      </header>

      {/* Add Model Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-background/80 animate-in fade-in duration-200">
          <div
            className="bg-card border border-border/60 rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-model-title"
          >
            <header className="flex justify-between items-start mb-6">
              <div>
                <h2 id="add-model-title" className="text-2xl font-bold tracking-tight text-foreground outfit">
                  Add New Clothing Model
                </h2>
                <p className="text-xs text-muted-foreground mt-1">Enter the details for the new product to list on the store.</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <main className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</Label>
                <Input
                  id="name"
                  value={newModel.name}
                  onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                  autoComplete="off"
                  className="bg-muted/30 border-border/60 focus:border-foreground focus:ring-0 rounded-xl px-4 py-2.5 transition-all text-foreground h-11"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Price (₦)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newModel.price}
                  onChange={(e) => setNewModel({ ...newModel, price: e.target.value })}
                  className="bg-muted/30 border-border/60 focus:border-foreground focus:ring-0 rounded-xl px-4 py-2.5 transition-all text-foreground h-11"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label id="availability-label" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Availability</Label>
                  <Select onValueChange={(value) => setNewModel({ ...newModel, availability: value })}>
                    <SelectTrigger className="bg-muted/30 border-border/60 focus:border-foreground rounded-xl h-11">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border/60 rounded-xl shadow-lg">
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      <SelectItem value="Discontinued">Discontinued</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label id="collection-label" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Collection</Label>
                  <Select
                    onValueChange={(value) => setNewModel({ ...newModel, collection: value })}
                    value={newModel.collection}
                    aria-labelledby="collection-label"
                  >
                    <SelectTrigger className="bg-muted/30 border-border/60 focus:border-foreground rounded-xl h-11">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border/60 rounded-xl shadow-lg">
                      <SelectItem value="Default">Default</SelectItem>
                      <SelectItem value="Limited">Limited</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label id="category-label" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</Label>
                  <Select
                    onValueChange={(value) => setNewModel({ ...newModel, category: value })}
                    value={newModel.category}
                    aria-labelledby="category-label"
                  >
                    <SelectTrigger className="bg-muted/30 border-border/60 focus:border-foreground rounded-xl h-11">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border/60 rounded-xl shadow-lg">
                      <SelectItem value="T-shirt">T-shirt</SelectItem>
                      <SelectItem value="Jeans">Jeans</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Polo">Polo</SelectItem>
                      <SelectItem value="Hood">Hood</SelectItem>
                      <SelectItem value="Jersey">Jersey</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</Label>
                <Textarea
                  id="description"
                  value={newModel.description}
                  onChange={(e) => setNewModel({ ...newModel, description: e.target.value })}
                  className="bg-muted/30 border-border/60 focus:border-foreground focus:ring-0 rounded-xl px-4 py-2.5 transition-all text-foreground min-h-[80px]"
                />
              </div>
              <div className="grid gap-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sizes Available</Label>
                <div className="flex flex-wrap gap-2 w-full">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleToggleSize(newModel, size, setNewModel)}
                      className={`h-10 w-12 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                        newModel.sizes.includes(size)
                          ? "bg-foreground text-background border-foreground shadow-sm scale-95"
                          : "bg-muted/20 hover:bg-muted/50 text-muted-foreground border-border/60"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Photos</Label>
                <div className="border border-dashed border-border/60 rounded-2xl p-4 bg-muted/10">
                  <Testing setFile={setFile} />
                </div>
              </div>
            </main>

            <footer className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 gap-2 sm:gap-0 border-t border-border/40 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsAddModalOpen(false)} 
                className="rounded-xl border-border/65 hover:bg-accent/15 cursor-pointer h-11"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddModel} 
                className="bg-foreground text-background font-semibold hover:opacity-90 rounded-xl h-11 px-5"
              >
                Add Model
              </Button>
            </footer>
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="models" className="w-full">
        <TabsList className="mb-8 bg-muted/40 backdrop-blur-md border border-border/40 p-1.5 rounded-2xl inline-flex">
          <TabsTrigger 
            value="models"
            className="px-6 py-2.5 rounded-xl font-semibold text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200 cursor-pointer"
          >
            Models
          </TabsTrigger>
          <TabsTrigger 
            value="stats"
            className="px-6 py-2.5 rounded-xl font-semibold text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200 cursor-pointer"
          >
            Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="models">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {isProduct ? (
              <>
                {models.map((model) => {
                  const isAvailable = model.availability === "Available";
                  const isOutOfStock = model.availability === "Out of Stock";
                  return (
                    <div 
                      key={model.id} 
                      className="bg-card/40 backdrop-blur-md border border-border/50 hover:border-border/90 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 rounded-3xl p-5 relative flex flex-col justify-between overflow-hidden"
                    >
                      <div>
                        {/* Upper row: Name & Actions */}
                        <div className="flex justify-between items-start gap-2 mb-4">
                          <div>
                            <span className="text-[9px] font-bold tracking-wider uppercase text-muted-foreground bg-secondary/80 border border-border/40 px-2 py-0.5 rounded">
                              {model.collection}
                            </span>
                            <h3 className="text-xl font-extrabold text-foreground outfit mt-1.5 leading-snug">{model.name}</h3>
                          </div>
                          <div className="flex gap-1.5">
                            <button 
                              onClick={() => startEditing(model)}
                              className="p-2 rounded-xl border border-border/40 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all duration-200 text-muted-foreground cursor-pointer"
                              title="Edit product"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteModel(model.id)}
                              className="p-2 rounded-xl border border-border/40 hover:border-destructive/30 hover:bg-destructive/5 hover:text-destructive transition-all duration-200 text-muted-foreground cursor-pointer"
                              title="Delete product"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Mid Row: Image & Details */}
                        <div className="flex gap-4 items-start mb-4">
                          <div className="h-28 w-28 rounded-2xl overflow-hidden border border-border/20 shadow-sm bg-muted/20 shrink-0">
                            <img
                              src={(model.imgUrls?.[0] ?? model.imgUrl) || "/placeholder.svg"}
                              alt={model.name}
                              className="h-full w-full object-cover aspect-square hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex flex-col justify-between h-28 py-0.5">
                            <div>
                              <p className="text-xl font-extrabold text-foreground tracking-tight">₦{model.price.toLocaleString()}</p>
                              <span className="text-xs font-semibold text-muted-foreground mt-1 block">Category: {model.category}</span>
                            </div>
                            
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Sizes</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {model.sizes?.map((size) => (
                                  <span key={size} className="text-[9px] font-bold px-1.5 py-0.5 bg-muted/40 border border-border/30 rounded text-foreground">
                                    {size}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        {model.description ? (
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1 mb-4 leading-relaxed">{model.description}</p>
                        ) : null}
                      </div>

                      {/* Footer: Availability Badge */}
                      <div className="border-t border-border/30 pt-3 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Status</span>
                        <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${
                          isAvailable
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : isOutOfStock
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                            : "bg-destructive/10 text-destructive border-destructive/20"
                        }`}>
                          {model.availability}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="col-span-full border border-dashed border-border/60 rounded-3xl p-16 text-center text-muted-foreground bg-muted/5">
                <Package className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
                <h3 className="text-lg font-bold text-foreground mb-1 outfit">No products found</h3>
                <p className="text-sm text-muted-foreground">Click "Add New Model" above to list your first clothing item.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Metric 1 */}
            <div className="bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-purple-500/10 p-6 rounded-3xl relative overflow-hidden">
              <div className="absolute top-4 right-4 text-purple-500/20">
                <Package className="h-16 w-16" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-purple-400">Total Models Listed</p>
              <h3 className="text-5xl font-extrabold text-foreground mt-3 outfit tracking-tight">{models.length}</h3>
              <p className="text-xs text-muted-foreground mt-4">Active and archived clothing products in store.</p>
            </div>

            {/* Metric 2 */}
            <div className="bg-gradient-to-br from-emerald-500/5 to-green-500/5 border border-green-500/10 p-6 rounded-3xl relative overflow-hidden">
              <div className="absolute top-4 right-4 text-emerald-500/20">
                <DollarSign className="h-16 w-16" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">Inventory Valuation</p>
              <h3 className="text-5xl font-extrabold text-foreground mt-3 outfit tracking-tight">
                ₦{models.reduce((sum, model) => sum + model.price, 0).toLocaleString()}
              </h3>
              <p className="text-xs text-muted-foreground mt-4">Calculated based on the single product price of each model.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Model Modal */}
      {isEditModalOpen && editingModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-background/80 animate-in fade-in duration-200">
          <div
            className="bg-card border border-border/60 rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-model-title"
          >
            <header className="flex justify-between items-start mb-6">
              <div>
                <h2 id="edit-model-title" className="text-2xl font-bold tracking-tight text-foreground outfit">
                  Edit Clothing Model
                </h2>
                <p className="text-xs text-muted-foreground mt-1">Modify information or manage photos for this product listing.</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <main className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="edit-name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</Label>
                <Input
                  id="edit-name"
                  value={editingModel.name}
                  onChange={(e) => setEditingModel({ ...editingModel, name: e.target.value })}
                  className="bg-muted/30 border-border/60 focus:border-foreground focus:ring-0 rounded-xl px-4 py-2.5 transition-all text-foreground h-11"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-price" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Price (₦)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingModel.price}
                  onChange={(e) =>
                    setEditingModel({
                      ...editingModel,
                      price: e.target.value,
                    })
                  }
                  className="bg-muted/30 border-border/60 focus:border-foreground focus:ring-0 rounded-xl px-4 py-2.5 transition-all text-foreground h-11"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label id="edit-availability-label" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Availability</Label>
                  <Select
                    onValueChange={(value) => setEditingModel({ ...editingModel, availability: value })}
                    value={editingModel.availability}
                  >
                    <SelectTrigger className="bg-muted/30 border-border/60 focus:border-foreground rounded-xl h-11">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border/60 rounded-xl shadow-lg">
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      <SelectItem value="Discontinued">Discontinued</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label id="edit-collection-label" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Collection</Label>
                  <Select
                    onValueChange={(value) => setEditingModel({ ...editingModel, collection: value })}
                    value={editingModel.collection}
                    aria-labelledby="edit-collection-label"
                  >
                    <SelectTrigger className="bg-muted/30 border-border/60 focus:border-foreground rounded-xl h-11">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border/60 rounded-xl shadow-lg">
                      <SelectItem value="Default">Default</SelectItem>
                      <SelectItem value="Limited">Limited</SelectItem>
                      <SelectItem value="New">New</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label id="edit-category-label" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</Label>
                  <Select
                    onValueChange={(value) => setEditingModel({ ...editingModel, category: value })}
                    value={editingModel.category}
                    aria-labelledby="edit-category-label"
                  >
                    <SelectTrigger className="bg-muted/30 border-border/60 focus:border-foreground rounded-xl h-11">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border/60 rounded-xl shadow-lg">
                      <SelectItem value="T-shirt">T-shirt</SelectItem>
                      <SelectItem value="Jeans">Jeans</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Polo">Polo</SelectItem>
                      <SelectItem value="Hood">Hood</SelectItem>
                      <SelectItem value="Jersey">Jersey</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingModel.description}
                  onChange={(e) =>
                    setEditingModel({
                      ...editingModel,
                      description: e.target.value,
                    })
                  }
                  className="bg-muted/30 border-border/60 focus:border-foreground focus:ring-0 rounded-xl px-4 py-2.5 transition-all text-foreground min-h-[80px]"
                />
              </div>
              <div className="grid gap-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sizes Available</Label>
                <div className="flex flex-wrap gap-2 w-full">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleToggleSize(editingModel, size, setEditingModel)}
                      className={`h-10 w-12 rounded-xl border text-sm font-semibold transition-all duration-200 cursor-pointer ${
                        editingModel.sizes?.includes(size)
                          ? "bg-foreground text-background border-foreground shadow-sm scale-95"
                          : "bg-muted/20 hover:bg-muted/50 text-muted-foreground border-border/60"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Photos</Label>
                <div className="border border-dashed border-border/60 rounded-2xl p-4 bg-muted/10">
                  <Testing setFile={setFile} imgSrc={editingModel.imgUrl} />
                </div>
              </div>
            </main>

            <footer className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 gap-2 sm:gap-0 border-t border-border/40 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsEditModalOpen(false)} 
                className="rounded-xl border-border/65 hover:bg-accent/15 cursor-pointer h-11"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleEditModel} 
                className="bg-foreground text-background font-semibold hover:opacity-90 rounded-xl h-11 px-5"
              >
                Save Changes
              </Button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}
