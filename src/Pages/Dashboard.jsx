"use client"

import { useState } from "react"
import { Edit, Plus, Trash, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialModels = [
  {
    id: "1",
    name: "Summer Dress",
    price: 199.99,
    description: "A beautiful floral summer dress",
    image: "/placeholder.svg?height=100&width=100",
    collection: "Summer",
  },
  {
    id: "2",
    name: "Denim Jacket",
    price: 149.99,
    description: "Classic denim jacket for all seasons",
    image: "/placeholder.svg?height=100&width=100",
    collection: "Spring",
  },
  {
    id: "3",
    name: "Winter Coat",
    price: 299.99,
    description: "Warm winter coat with fur lining",
    image: "/placeholder.svg?height=100&width=100",
    collection: "Winter",
  },
]

export default function ClothingDashboard() {
  const [models, setModels] = useState(initialModels)
  const [editingModel, setEditingModel] = useState(null)
  const [newModel, setNewModel] = useState({
    name: "",
    price: "",
    description: "",
    image: "/placeholder.svg?height=100&width=100",
    collection: "",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleAddModel = () => {
    const modelToAdd = {
      ...newModel,
      id: Date.now().toString(),
      price: parseFloat(newModel.price),
    }
    setModels([...models, modelToAdd])
    setNewModel({
      name: "",
      price: "",
      description: "",
      image: "/placeholder.svg?height=100&width=100",
      collection: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditModel = () => {
    setModels(models.map((model) => (model.id === editingModel.id ? editingModel : model)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteModel = (id) => {
    setModels(models.filter((model) => model.id !== id))
  }

  const startEditing = (model) => {
    setEditingModel({ ...model })
    setIsEditDialogOpen(true)
  }

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
              <DialogDescription>Enter the details for the new clothing model.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newModel.name}
                  onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                  autocomplete="off"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newModel.price}
                  onChange={(e) => setNewModel({ ...newModel, price: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="collection">Collection</Label>
                <Select
                  onValueChange={(value) => setNewModel({ ...newModel, collection: value })}
                  value={newModel.collection}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select collection" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Summer">Default</SelectItem>
                    <SelectItem value="Winter">Limited</SelectItem>
                    <SelectItem value="Spring">New</SelectItem>

                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newModel.description}
                  onChange={(e) => setNewModel({ ...newModel, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Image</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded border overflow-hidden">
                    <img
                      src={newModel.image || "/placeholder.svg"}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" /> Upload
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
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
        </TabsList>
        <TabsContent value="models">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <Card key={model.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{model.name}</CardTitle>
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
                  <div className="flex gap-4">
                    <div className="h-24 w-24 rounded overflow-hidden">
                      <img
                        src={model.image || "/placeholder.svg"}
                        alt={model.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold">${model.price.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">{model.collection}</p>
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
                    <p className="text-sm text-muted-foreground">Total Models</p>
                    <p className="text-3xl font-bold">{models.length}</p>
                  </div>
                  <div className="border rounded p-4 text-center">
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-3xl font-bold">
                      ${models.reduce((sum, model) => sum + model.price, 0).toFixed(2)}
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
      </Tabs>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Clothing Model</DialogTitle>
            <DialogDescription>Update the details for this clothing model.</DialogDescription>
          </DialogHeader>
          {editingModel && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editingModel.name}
                  onChange={(e) => setEditingModel({ ...editingModel, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price ($)</Label>
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
                  onValueChange={(value) => setEditingModel({ ...editingModel, collection: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Summer">Summer</SelectItem>
                    <SelectItem value="Winter">Winter</SelectItem>
                    <SelectItem value="Spring">Spring</SelectItem>
                    <SelectItem value="Fall">Fall</SelectItem>
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
              <div className="grid gap-2">
                <Label>Image</Label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded border overflow-hidden">
                    <img
                      src={editingModel.image || "/placeholder.svg"}
                      alt="Preview"
                      className="h-full w-full object-cover"
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
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditModel}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
