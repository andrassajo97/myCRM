const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const studentProfile = require("./routes/api/studentProfile");
const companyProfile = require("./routes/api/companyProfile");
const research = require("./routes/api/research");
const task = require("./routes/api/task");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/studentProfile", studentProfile);
app.use("/api/companyProfile", companyProfile);
app.use("/api/research", research);
app.use("/api/task", task);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`));
