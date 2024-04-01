const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.static("public"));

app.get("/stock-price", (req, res) => {
  const price = Math.random() * 10 + 800;
  res.json({
    price: price.toFixed(2),
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is started on PORT 3000");
});
