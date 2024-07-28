const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/auth");
const BillingCollection = require("./models/Billings");
const Bill = require("./models/Bill");
const { ObjectId } = mongoose.Types;

// Convert string to ObjectId
//const objectId = ObjectId("_id");

// Use the ObjectId in your query
//const item = await .findById(objectId);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true // Add this line to allow cookies to be sent
}));

app.use("/", authRoute);

app.post('/billDbUpdate', (req, res) => {
  const response = req.body;
  console.log("response", response);
});

app.get('/api/bills/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).send('Bill not found');
    }
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie("Authtoken");
  res.status(200).json({ message: "Logout successful" });
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect("mongodb://localhost:27017/billing-react", {});

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.post('/items', async (req, res) => {
  try {
    const { id, name, quantity, unitPrice, GST } = req.body;
    const newItem = new BillingCollection({
      id,
      name,
      quantity,
      unitPrice,
      GST
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/items', async (req, res) => {
  try {
    const items = await BillingCollection.find();
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/items/:id', async (req, res) => {
  try {
    const item = await BillingCollection.findOne({ id: req.params.id });
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete("/items/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedItem = await BillingCollection.findOneAndDelete({ id });
    if (deletedItem) {
      res.status(200).json({ message: "Deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    next(error);
  }
});

app.put('/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedItem = await BillingCollection.findOneAndUpdate({ id }, { $set: data }, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/savedbills', async (req, res) => {
  try {
    const { customerName, mobileNo, email, paymentMethod, items, total } = req.body;
    const newBill = new Bill({
      customerName,
      mobileNo,
      email,
      paymentMethod,
      items,
      total,
    });

    await newBill.save();
    // const quantityUpdate = await BillingCollection.find({items});
    // await BillingCollection.findOneAndUpdate({ items }, { $set: {quantity:items.quantity} });

    res.status(200).json({ message: "Bill saved successfully" });
    //res.json(newBill)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put('/updatebill', async(req,res)=>{
  try {
    console.log('re')
    const {name, quantity} =req.body;
    console.log(name, quantity)
    // items.quantity
    //const updatedBill=await BillingCollection.findByIdAndUpdate(name,{ $set: quantity });
    const bills=await BillingCollection.findOne({name:name})
    bills.quantity=bills.quantity-quantity
    await bills.save()
    // if(!updatedBill){
    //   return res.status(404).json({message:"Bill not found"});
    //   }
     res.status(200).json(bills);
     } catch (error) {
       console.error(error);
        res.status(500).json({message:"Server error"});
       }
})

app.get('/billdetails', async (req, res) => {
  try {
    const billDetails = await Bill.find();
    console.log(billDetails)
    if (!billDetails) {
      return res.status(404).json({ message: 'No bill details found' });
    }
    res.status(200).json(billDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// In your Express.js server file

// Route to update item quantity
app.patch('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Ensure quantity is valid
    if (item.quantity < 0) {
      return res.status(400).json({ error: 'Insufficient inventory' });
    }

    // Update the item quantity
    item.quantity = quantity;
    await item.save();

    res.json(item);
  } catch (error) {
    console.error('Error updating item quantity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = app;


