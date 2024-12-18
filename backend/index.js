import express from "express";

import pdfRoute from "./route/pdfRoute.js";

const port = 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/", (req, res) => {
  res.send("Welcome to the backend");
});

app.use("/pdf", pdfRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
