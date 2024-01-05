require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const express = require("express");

/* setting up express app */

const app = express();
app.use(express.json()); // allows to read and send json

const notes = require("./routes/note");
const auth = require("./routes/auth");
/* Routing */
app.use("/api", notes);
app.use("/api", auth);

/*connecting to  mongoose */
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

/* listen at port */
const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
  console.log(`Server running at ${PORT}`);
});
