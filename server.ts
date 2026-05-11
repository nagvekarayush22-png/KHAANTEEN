import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const PORT = 3000;

  app.use(express.json());

  // In-memory "database"
  const orders: any[] = [];
  const inventory: any[] = [
    { id: 1, name: "Tea", price: 10, category: "Tea & Beverages", stock: 100 },
    { id: 2, name: "Coffee", price: 20, category: "Tea & Beverages", stock: 100 },
    { id: 3, name: "Samosa (2Pcs)", price: 30, category: "Snacks & Light Bites", stock: 50 },
    // more will be added via frontend logic or expanded here
  ];

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "PU Goa Smart E-Canteen API is live" });
  });

  app.get("/api/orders", (req, res) => {
    res.json(orders);
  });

  app.post("/api/orders", (req, res) => {
    const newOrder = {
      ...req.body,
      id: `ORD-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    io.emit("orderUpdated", newOrder);
    res.status(201).json(newOrder);
  });

  app.patch("/api/orders/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const orderIndex = orders.findIndex(o => o.id === id);
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      io.emit("orderUpdated", orders[orderIndex]);
      res.json(orders[orderIndex]);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  });

  // Socket connection
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
