const express = require("express");
const pool = require("./src/db/connection");
const productsRoutes = require("./src/routes/products");

const app = express();

app.use(express.json());
app.use("/products", productsRoutes);

app.get("/", (req, res) => {
  res.json({
    service: "CodeVector Product API",
    status: "running",
    endpoints: {
      products: "/products",
    },
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});