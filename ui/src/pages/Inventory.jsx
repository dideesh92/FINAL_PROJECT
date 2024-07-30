import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import search from '../assets/searchbutton.png';
import Footer from "../components/Footer";
import DonutChart from "../pages/InventoryDonut";

const Inventory = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [GST, setGST] = useState("");
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const loadItems = async () => {
    try {
      const response = await fetch('/api/items'); 
      if (!response.ok) throw new Error("Network response was not ok");
      const items = await response.json();
      setItems(items);
    } catch (error) {
      console.error("Failed to load items:", error);
      toast.error("Failed to load items");
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (editingItem) {
      setId(editingItem.id || "");
      setName(editingItem.name || "");
      setQuantity(editingItem.quantity || "");
      setUnitPrice(editingItem.unitPrice || "");
      setGST(editingItem.GST || "");
    }
  }, [editingItem]);

  const submitForm = async (e) => {
    e.preventDefault();
    const itemDetails = { id, name, quantity, unitPrice, GST };

    try {
      if (editingItem) {
        const res = await fetch(`/api/items/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemDetails),
        });

        if (!res.ok) throw new Error("Network response was not ok");

        const updatedItem = await res.json();
        toast.success("Item updated successfully");
        setItems((prevItems) => prevItems.map(item => item.id === updatedItem.id ? updatedItem : item));
        setEditingItem(null);
      } else {
        const res = await fetch("/api/items", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemDetails),
        });

        if (!res.ok) throw new Error("Network response was not ok");

        const newItem = await res.json();
        toast.success("Item added successfully");
        setItems((prevItems) => [...prevItems, newItem]);
      }

      setId("");
      setName("");
      setQuantity("");
      setUnitPrice("");
      setGST("");
    } catch (error) {
      console.error("Failed to process item:", error);
      toast.error("Failed to process item");
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete item');
      toast.success('Item deleted successfully');
      setItems((prevItems) => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const editItem = (item) => {
    setEditingItem(item);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-green-500 to-yellow-500 min-h-screen p-6">
        <div className="container mx-auto">
          <div className="flex justify-center mb-8">
            <h1 className="text-3xl text-yellow-900 font-mono">Walmart</h1>
          </div>

          <div className="bg-yellow-300 rounded-lg shadow-lg mb-8">
            <h1 className="text-5px text-yellow-800 font-serif text-center">INVENTORY</h1>
          </div>

          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-2 border-yellow-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="flex gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 w-[20%]">
              <form id="itemForm" onSubmit={submitForm} className="space-y-6">
                <div>
                  <label className="text-yellow-800 mb-2 text-[14px]" htmlFor="id">ID</label>
                  <input
                    type="text"
                    id="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="w-[95%] border-2 border-yellow-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                    readOnly={!!editingItem}
                  />
                </div>
                <div>
                  <label className="text-[14px] text-yellow-800 mb-2" htmlFor="name">Name of Item</label>
                  <input
                    placeholder="Item"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-[95%] border-2 border-yellow-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[14px] text-yellow-800 mb-2" htmlFor="quantity">Quantity</label>
                  <input 
                    placeholder="Kg"
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-[95%] border-2 border-yellow-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[14px] text-yellow-800 mb-2" htmlFor="unitPrice">Unit Price</label>
                  <input
                    placeholder="Rupees"
                    type="number"
                    id="unitPrice"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    className="w-[95%] border-2 border-yellow-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[14px] text-yellow-800 mb-2" htmlFor="GST">GST</label>
                  <input
                    placeholder="Rupees"
                    type="number"
                    id="GST"
                    value={GST}
                    onChange={(e) => setGST(e.target.value)}
                    className="w-[95%] border-2 border-yellow-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition duration-300">
                  {editingItem ? "Update Item" : "Add Item"}
                </button>
              </form>
            </div>

            <div className="flex-grow bg-white rounded-lg shadow-lg p-6">
              <div className="flex">
                <div className="w-3/4 overflow-x-auto">
                  <table className="min-w-full bg-white border border-yellow-300">
                    <thead>
                      <tr className="bg-yellow-200">
                        <th className="text-[12px] border-yellow-300 px-4 py-2 text-yellow-800">ID</th>
                        <th className="text-[12px] border-yellow-300 px-4 py-2 text-yellow-800">Name of Item</th>
                        <th className="text-[12px] border-yellow-300 px-4 py-2 text-yellow-800">Quantity</th>
                        <th className="text-[12px] border-yellow-300 px-4 py-2 text-yellow-800">Unit Price</th>
                        <th className="text-[12px] border-yellow-300 px-4 py-2 text-yellow-800">GST</th>
                        <th className="text-[12px] border-yellow-300 px-4 py-2 text-yellow-800">Total</th>
                        <th className="text-[12px] border-yellow-300 px-4 py-2 text-yellow-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item) => (
                        <tr key={item.id} className="hover:bg-yellow-100">
                          <td className="border border-yellow-300 px-4 py-2 text-[12px]">{item.id}</td>
                          <td className="border border-yellow-300 px-4 py-2 text-[12px]">{item.name}</td>
                          <td className="border border-yellow-300 px-4 py-2 text-[12px]">{item.quantity}kg</td>
                          <td className="border border-yellow-300 px-4 py-2 text-[12px]">Rs.{item.unitPrice}</td>
                          <td className="border border-yellow-300 px-4 py-2 text-[12px]">Rs.{item.GST}</td>
                          <td className="border border-yellow-300 px-4 py-2 text-[12px]">Rs.{item.quantity * item.unitPrice + item.GST}</td>
                          <td className="border border-yellow-300 px-4 py-2 text-[12px]">
                            <button
                              onClick={() => deleteItem(item.id)}
                              className="bg-red-500 hover:bg-red-600 text-white py-1 px-5 rounded-lg mr-2 transition duration-300 ml-[28%]">
                              Delete
                            </button>
                            <button
                              onClick={() => editItem(item)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-5 rounded-lg mr-2  transition duration-300 ml-[28%]">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="w-1/4 ml-8">
                  <h2 className="text-center">Stock</h2>
                  <DonutChart items={filteredItems} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Inventory;
