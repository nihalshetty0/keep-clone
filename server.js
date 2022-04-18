const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./config/db");

connectDB();
const PORT = process.env.PORT || 4000;

app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/labels", require("./routes/labels"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`Server up and running @ ${PORT}`);
});
