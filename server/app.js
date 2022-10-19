const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config({ path: "./config.env" });

app.use("/api/user", require("./routes/userAuth"));
app.use("/api/vendor", require("./routes/vendorAuth"));

app.use(errorHandler);


app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
