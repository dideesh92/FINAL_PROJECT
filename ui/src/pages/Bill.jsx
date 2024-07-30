import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Bill = () => {
  const { id } = useParams();
  const [billingItems, setBillingItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Digital payment");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [invoiceNumber, setInvoiceNumber] = useState("");

  useEffect(() => {
    const fetchBillingItems = async () => {
      try {
        const response = await fetch('/api/items');
        if (!response.ok) throw new Error("Network response was not ok");
        const items = await response.json();
        setBillingItems(items);
      } catch (error) {
        console.error("Failed to fetch billing items:", error);
      }
    };

    fetchBillingItems();

    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    setInvoiceNumber(`INV-${Date.now()}`);

    return () => clearInterval(intervalId);
  }, []);

  const addItemToBill = async (itemId) => {
    try {
      const response = await fetch(`/api/items/${itemId}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const item = await response.json();
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    } catch (error) {
      console.error("Failed to fetch item details:", error);
    }
  };

  const updateItemQuantity = (index, newQuantity) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].quantity = newQuantity;

    setSelectedItems(updatedItems);
  };

  const removeItem = (index) => {
    const updatedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(updatedItems);
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => {
      return total + (item.unitPrice * item.quantity) + item.GST;
    }, 0);
  };

  const submitBill = async () => {
    const total = calculateTotal();
    let temp=[];
    try {
      const billResponse = await fetch('/api/savedbills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceNumber,
          customerName,
          mobileNo,
          email,
          paymentMethod,
          items: selectedItems,
          total,
        })
      });
      // if(billResponse.ok){
      //   console.log()
      //   selectedItems.map()
      //   const updatebill=await fetch('/api/updatebill',{
      //     method: 'PUT',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({
      //       name: selectedItems[0].name ,
      //       quantity:selectedItems[0].quantity
            
      //     }),
      //   })
      // }
       if (!billResponse.ok) throw new Error("Failed to submit bill");

      await Promise.all(
        selectedItems.map(item =>
          fetch(`/api/updatebill/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name:item.name,quantity: item.quantity}),
          })
        )
      );
      toast.success("Bill submitted successfully and inventory updated");
    } catch (error) {
      console.error("Failed to submit bill or update inventory:", error);
      toast.error("Failed to submit bill or update inventory");
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-violet-900 font-mono">Walmart</h1>
          <div className="text-right">
            <p className="text-xs">Address: Walmart, Thiruvanathapuram, Kerala</p>
            <p className="text-xs">Reach us @ shop@walmart.com</p>
            <p className="text-xs">GST-22AAAAA0000A1Z5</p>
          </div>
        </div>
        <h3 className="text-violet-900 text-xs font-mono">Shop better..Live better</h3>
        <div className="bg-yellow-200 p-3 mt-4 rounded-md">
          <input className="rounded-lg px-2 py-1 mr-2" type="text" placeholder="Name of Customer" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          <input className="rounded-lg px-2 py-1 mr-2" type="text" placeholder="Mobile no" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
          <input className="rounded-lg px-2 py-1" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div className="flex items-center justify-between bg-violet-500 p-3 rounded-md mx-4 my-2">
        <div className="flex items-center">
          <h1 className="text-white font-mono mr-2">Add Items:</h1>
          <select className="rounded-md" onChange={(e) => addItemToBill(e.target.value)}>
            <option value="">Select from here</option>
            {billingItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <h1 className="text-white font-mono mr-2">Payment Method:</h1>
          <select className="rounded-md font-mono" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="Digital payment">Digital payment</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
        <div className="text-white font-mono">
          <h1>Date & Time: {currentDateTime.toLocaleString()}</h1>
        </div>
        <div className="text-white font-mono">
          <h1>Invoice Number: {invoiceNumber}</h1>
        </div>
      </div>
      <div className="bg-gray-100 shadow-lg p-4 mx-4 my-2 rounded-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase">Price Total</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase">GST</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase">Net Total</th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedItems.map((item, index) => (
              <tr key={index}>
                <td className="px-2 py-1 text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-2 py-1 text-sm text-gray-500">
                  <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => updateItemQuantity(index, parseFloat(e.target.value))}
                    min="1"
                    className="border border-gray-300 rounded-md px-2 py-1"
                    
                  />
                </td>
                <td className="px-2 py-1 text-sm text-gray-500">{item.unitPrice.toFixed(2)}</td>
                <td className="px-2 py-1 text-sm text-gray-500">{(item.unitPrice * item.quantity).toFixed(2)}</td>
                <td className="px-2 py-1 text-sm text-gray-500">{item.GST.toFixed(2)}</td>
                <td className="px-2 py-1 text-sm text-gray-500">{((item.unitPrice * item.quantity) + item.GST).toFixed(2)}</td>
                <td className="px-2 py-1 text-sm font-medium">
                  <button className='bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600' onClick={() => removeItem(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center bg-green-300 p-3 mx-4 my-2 rounded-md">
        <div>
          Grand Total: <input className="bg-white py-1 px-2 rounded-lg" type="text" value={calculateTotal().toFixed(2)} readOnly />
        </div>
        <div className="flex space-x-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={submitBill}>Save Bill</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => { window.print() }}>Print Invoice</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md"><a href='/bill'>New Bill</a></button>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Bill;
