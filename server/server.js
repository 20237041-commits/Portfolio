const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");

const app = express();
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
app.use(express.json());

// ── Admin credentials ──────────────────────────────────────────
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123"; // change this

mongoose.connect("mongodb+srv://20237041_db_user:67ZZX1SRKjgJj12i@cluster0.vmfoxeo.mongodb.net/Testing?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const contactSchema = new mongoose.Schema({
  firstName : String,
  lastName  : String,
  email     : String,
  subject   : String,
  message   : String,
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

// ── POST /contact — save message ───────────────────────────────
app.post("/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;
    const newContact = new Contact({ firstName, lastName, email, subject, message });
    await newContact.save();
    res.status(201).json({ message: "Message submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// ── POST /admin/login — verify credentials ─────────────────────
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials." });
  }
});

// ── GET /admin/messages — fetch all messages ───────────────────
app.get("/admin/messages", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

// ── DELETE /admin/messages/:id — delete a message ─────────────
app.delete("/admin/messages/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));