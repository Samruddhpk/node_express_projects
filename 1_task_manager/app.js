const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const tasks = require("./routes/tasks");

// middlewares
app.use(express.static("./public"));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/v1/tasks", tasks);

// own middlewares
app.use(notFound);
app.use(errorHandler);

// port and db connection and start of server
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
