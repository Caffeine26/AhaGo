const express = require("express");
const http = require("http");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const {
  drivers,
  notifications,
  incomingOrders,
  deliveryHistory,
  sections,
} = require("./mock");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Middleware to simulate driver login
app.use((req, res, next) => {
  req.driverId = 1;
  next();
});

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

// API Endpoints
app.get("/api/driver/profile", (req, res) => {
  const driver = drivers.find(d => d.id === req.driverId);
  if (!driver) return res.status(404).json({ error: "Driver not found" });
  res.json(driver);
});

app.put("/api/driver/profile", (req, res) => {
  const driver = drivers.find(d => d.id === req.driverId);
  if (!driver) return res.status(404).json({ error: "Driver not found" });
  Object.assign(driver, req.body);
  res.json(driver);
});

app.post("/api/driver/documents", upload.fields([
  { name: "idCardImage", maxCount: 1 },
  { name: "drivingLicenseImage", maxCount: 1 },
  { name: "vehicleRegistrationImage", maxCount: 1 },
]), (req, res) => {
  const driver = drivers.find(d => d.id === req.driverId);
  if (!driver) return res.status(404).json({ error: "Driver not found" });

  const docs = driver.documents || {};
  if (req.files["idCardImage"]) docs.idCardImage = req.files["idCardImage"][0].path;
  if (req.files["drivingLicenseImage"]) docs.drivingLicenseImage = req.files["drivingLicenseImage"][0].path;
  if (req.files["vehicleRegistrationImage"]) docs.vehicleRegistrationImage = req.files["vehicleRegistrationImage"][0].path;

  driver.documents = docs;
  res.json({ message: "Documents uploaded successfully", documents: docs });
});

app.get("/api/incoming-orders", (req, res) => {
  const now = new Date();
  const filter = req.query.filter || "All";
  let filtered = incomingOrders;

  if (filter === "Today") {
    filtered = incomingOrders.filter(o => new Date(o.createdAt).toDateString() === now.toDateString());
  } else if (filter === "This Week") {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    filtered = incomingOrders.filter(o => new Date(o.createdAt) >= startOfWeek);
  } else if (filter === "Last Month") {
    const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
    const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    filtered = incomingOrders.filter(o => {
      const d = new Date(o.createdAt);
      return d.getMonth() === lastMonth && d.getFullYear() === year;
    });
  }

  res.json(filtered);
});

app.get("/api/notifications", (req, res) => {
  const now = new Date();
  const filter = req.query.filter || "All";
  let filtered = notifications;

  if (filter === "Today") {
    filtered = notifications.filter(n => new Date(n.createdAt).toDateString() === now.toDateString());
  } else if (filter === "This Week") {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    filtered = notifications.filter(n => new Date(n.createdAt) >= startOfWeek);
  } else if (filter === "Last Month") {
    const lastMonth = now.getMonth() - 1;
    filtered = notifications.filter(n => {
      const d = new Date(n.createdAt);
      return d.getMonth() === lastMonth && d.getFullYear() === now.getFullYear();
    });
  }

  res.json(filtered);
});

app.patch("/api/notifications/:id", (req, res) => {
  const notification = notifications.find(n => n.id === parseInt(req.params.id));
  if (!notification) return res.status(404).json({ error: "Notification not found" });
  Object.assign(notification, req.body);
  res.json(notification);
});

app.get("/api/incoming-order/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = incomingOrders.find(o => o.id === orderId);

  if (!order) {
    return res.status(404).json({ error: "Incoming order not found" });
  }

  res.json(order);
});

app.patch("/api/incoming-orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = incomingOrders.find(o => o.id === orderId);

  if (!order) {
    return res.status(404).json({ error: "Incoming order not found" });
  }

  const { status } = req.body;
  if (!["pending", "accepted", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  order.status = status;
  res.json(order);
});

app.get("/api/delivery-history", (req, res) => {
  res.json(deliveryHistory);
});

app.get("/api/sections", (req, res) => {
  res.json(sections);
});

// Static file access
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
