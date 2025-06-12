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
app.use(express.json());
app.use(cors());

// Setup multer storage (store files in /uploads folder locally)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // ensure this folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});
const upload = multer({ storage });

const PORT = 4000;

// Middleware to simulate logged-in driver
app.use((req, res, next) => {
  req.driverId = 1;
  next();
});

// GET driver profile
app.get("/api/driver/profile", (req, res) => {
  const driver = drivers.find((d) => d.id === req.driverId);
  if (!driver) return res.status(404).json({ error: "Driver not found" });
  res.json(driver);
});

// PUT update driver profile
app.put("/api/driver/profile", (req, res) => {
  const driver = drivers.find((d) => d.id === req.driverId);
  if (!driver) return res.status(404).json({ error: "Driver not found" });

  Object.assign(driver, req.body);
  res.json(driver);
});

// POST upload driver documents (idCardImage, drivingLicenseImage, vehicleRegistrationImage)
app.post(
  "/api/driver/documents",
  upload.fields([
    { name: "idCardImage", maxCount: 1 },
    { name: "drivingLicenseImage", maxCount: 1 },
    { name: "vehicleRegistrationImage", maxCount: 1 },
  ]),
  (req, res) => {
    const driver = drivers.find((d) => d.id === req.driverId);
    if (!driver) return res.status(404).json({ error: "Driver not found" });

    if (!driver.documents) driver.documents = {};

    if (req.files["idCardImage"]) {
      driver.documents.idCardImage = req.files["idCardImage"][0].path;
    }
    if (req.files["drivingLicenseImage"]) {
      driver.documents.drivingLicenseImage = req.files["drivingLicenseImage"][0].path;
    }
    if (req.files["vehicleRegistrationImage"]) {
      driver.documents.vehicleRegistrationImage = req.files["vehicleRegistrationImage"][0].path;
    }

    res.json({
      message: "Documents uploaded successfully",
      documents: driver.documents,
    });
  }
);

// GET incoming orders with optional time filter
app.get("/api/incoming-orders", (req, res) => {
  const filter = req.query.filter || "All";
  const now = new Date();

  let filtered = incomingOrders;

  if (filter === "Today") {
    filtered = incomingOrders.filter((order) => {
      const created = new Date(order.createdAt);
      return created.toDateString() === now.toDateString();
    });
  } else if (filter === "This Week") {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    filtered = incomingOrders.filter(
      (order) => new Date(order.createdAt) >= startOfWeek
    );
  } else if (filter === "Last Month") {
    const lastMonth = (now.getMonth() === 0) ? 11 : now.getMonth() - 1;
    const lastMonthYear = (now.getMonth() === 0) ? now.getFullYear() - 1 : now.getFullYear();
    filtered = incomingOrders.filter(order => {
      const created = new Date(order.createdAt);
      return created.getMonth() === lastMonth && created.getFullYear() === lastMonthYear;
    });
  }

  res.json(filtered);
});

// GET notifications with optional time filter
app.get("/api/notifications", (req, res) => {
  const filter = req.query.filter || "All";
  const now = new Date();

  let filtered = notifications;

  if (filter === "Today") {
    filtered = notifications.filter((n) => {
      const created = new Date(n.createdAt);
      return created.toDateString() === now.toDateString();
    });
  } else if (filter === "This Week") {
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    filtered = notifications.filter(
      (n) => new Date(n.createdAt) >= startOfWeek
    );
  } else if (filter === "Last Month") {
    const lastMonth = now.getMonth() - 1;
    filtered = notifications.filter((n) => {
      const created = new Date(n.createdAt);
      return (
        created.getMonth() === lastMonth &&
        created.getFullYear() === now.getFullYear()
      );
    });
  }

  res.json(filtered);
});

// PATCH notification status
app.patch("/api/notifications/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const notification = notifications.find((n) => n.id === id);
  if (!notification)
    return res.status(404).json({ error: "Notification not found" });

  Object.assign(notification, req.body);
  res.json(notification);
});

// PATCH incoming order status
app.patch("/api/incoming-orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const order = incomingOrders.find((o) => o.id === id);
  if (!order)
    return res.status(404).json({ error: "Incoming order not found" });

  if (req.body.details) {
    order.details = {
      ...order.details,
      ...req.body.details,
    };
  }

  for (const key in req.body) {
    if (key !== "details") {
      order[key] = req.body[key];
    }
  }

  res.json(order);
});

// GET delivery history
app.get("/api/delivery-history", (req, res) => {
  const { status, date } = req.query;
  let results = deliveryHistory;

  if (status) {
    results = results.filter((entry) => entry.status === status);
  }

  if (date) {
    results = results.filter((entry) => entry.date === date);
  }

  res.json(results);
});

// GET sections for basics page
app.get("/api/sections", (req, res) => {
  res.json(sections);
});

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
