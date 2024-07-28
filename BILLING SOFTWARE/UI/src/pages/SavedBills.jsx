import React, { useState, useEffect } from 'react';

const SavedBills = () => {
  const [billdetails, setBilldetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await fetch('/api/billdetails');
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setBilldetails(data);
        } else {
          console.log("Failed to fetch");
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchBill();
  }, []);

  const calculateGrandTotal = (items) => {
    return items.reduce((total, item) => total + (item.unitPrice * item.quantity + item.GST), 0).toFixed(2);
  };

  const calculateSumOfGrandTotals = (bills) => {
    return bills.reduce((sum, bill) => sum + parseFloat(calculateGrandTotal(bill.items)), 0).toFixed(2);
  };

  const filteredBills = billdetails.filter(bill => {
    const searchLower = searchTerm.toLowerCase();
    return (
      bill.customerName.toLowerCase().includes(searchLower) ||
      bill.mobileNo.toLowerCase().includes(searchLower) ||
      bill.email.toLowerCase().includes(searchLower) ||
      bill.paymentMethod.toLowerCase().includes(searchLower) ||
      bill.items.some(item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.quantity.toString().includes(searchLower) ||
        item.unitPrice.toString().includes(searchLower) ||
        item.GST.toString().includes(searchLower)
      )
    );
  });

  const sumOfGrandTotals = calculateSumOfGrandTotals(filteredBills);

  return (
    <div className="p-8 bg-cover bg-center bg-gradient-to-r from-pink-500 via-red-500 to-violet-600 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full">
        <div className="m-4 p-2 border-b border-gray-300 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-md w-full mr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="font-bold bg-yellow-200 hover:bg-violet-300 rounded-lg text-center animate-pulse px-5 py-3 text-lg text-green-600">
            Credit: {sumOfGrandTotals}
          </div>
        </div>
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-5 text-left">Name of the Customer</th>
              <th className="py-3 px-5 text-left">Mobile Number</th>
              <th className="py-3 px-5 text-left">Email</th>
              <th className="py-3 px-5 text-left">Payment Method</th>
              <th className="py-3 px-5 text-left">Item Name</th>
              <th className="py-3 px-5 text-left">Quantity</th>
              <th className="py-3 px-5 text-left">Unit Price</th>
              <th className="py-3 px-5 text-left">GST</th>
              <th className="py-3 px-5 text-left">Total</th>
              <th className="py-3 px-5 text-left">Grand Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.map((bill, index) => {
              const grandTotal = calculateGrandTotal(bill.items);
              return (
                <React.Fragment key={index}>
                  {bill.items.map((item, itemIndex) => (
                    <tr key={itemIndex} className={`border-b ${itemIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                      <td className="py-3 px-5">{bill.customerName}</td>
                      <td className="py-3 px-5">{bill.mobileNo}</td>
                      <td className="py-3 px-5">{bill.email}</td>
                      <td className="py-3 px-5">{bill.paymentMethod}</td>
                      <td className="py-3 px-5">{item.name}</td>
                      <td className="py-3 px-5">{item.quantity}</td>
                      <td className="py-3 px-5">{item.unitPrice.toFixed(2)}</td>
                      <td className="py-3 px-5">{item.GST.toFixed(2)}</td>
                      <td className="py-3 px-5">{(item.unitPrice * item.quantity + item.GST).toFixed(2)}</td>
                      {itemIndex === 0 && (
                        <td rowSpan={bill.items.length} className="py-3 px-5 text-right bg-yellow-100 font-bold text-green-700 border-1 border-black">
                          {grandTotal}
                        </td>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedBills;
