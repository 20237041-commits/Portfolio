// ============================================================
//  server.js  — Backend (Node.js + Express + MongoDB)
//  Following the same pattern from your professor's module.
//
//  HOW TO RUN:
//    1. Open a NEW terminal (separate from your React terminal)
//    2. cd into this server folder
//    3. npm init -y
//    4. npm install express mongoose cors
//    5. node server.js
//    6. You should see "MongoDB Connected" and "Server running on port 5000"
// ============================================================

const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ── MongoDB Connection ────────────────────────────────────────
// ↓ Replace this with YOUR MongoDB Atlas connection string
// (same way your professor showed in Step 6 of the module)
mongoose
  .connect("mongodb+srv://20237041_db_user:20237041@cluster0.vmfoxeo.mongodb.net/portfolio?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Connected"))
  .catch(console.error);

// ── Schema + Model ────────────────────────────────────────────
// This defines what each contact message looks like in MongoDB.
// Same concept as userSchema in your professor's module.
const contactSchema = new mongoose.Schema({
  firstName : String,
  lastName  : String,
  email     : String,
  subject   : String,
  message   : String,
  sentAt    : { type: Date, default: Date.now }, // auto-records the time
});

// "contacts" = the collection name in MongoDB
const Contact = mongoose.model("contacts", contactSchema, "contacts");

// ── Route: POST /contact ──────────────────────────────────────
// Same pattern as POST /register in your professor's module.
// Receives form data from Contact.tsx and saves it to MongoDB.
app.post("/contact", async (req, res) => {
  try {
    const message = await Contact.create(req.body);
    res.json({ message: "Message sent successfully!", data: message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Start Server ──────────────────────────────────────────────
app.listen(5000, () => console.log("Server running on port 5000"));
