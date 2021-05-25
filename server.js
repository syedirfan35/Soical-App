const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const path = require("path");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const config = require("config");
const app = express();

//connect DB
connectDB();

//initialize passport
require("./services/passport");

//init middleware
// app.use(express.json({ extended: false }));
// app.use(express.limit(100000000));
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);
app.use(
  cookieSession({
    maxAge: 10 * 24 * 60 * 60 * 1000,
    keys: [config.get("SECRET_KEY")]
  })
);
//initialise
app.use(passport.initialize());
app.use(passport.session());
// app.use(cors());

//routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/posts", require("./routes/postRoute"));

//serve static assets in prod
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
