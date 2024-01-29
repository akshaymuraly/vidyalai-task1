const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const cookieparser = require("cookie-parser");
const ErrorHandlerBlock = require("./Middleware/ErrorHandler");
const { mongooseConnection } = require("./Utils/MongodbConnection");

const pdfRouter = require("./Routes/Pdfroutes");
const UserRouter = require("./Routes/USerRoutes");

//-------------------Mongo db connection----------------------------

mongooseConnection();

// ------------------Middlewares------------------------------------
app.use(
  express.static(
    path.join(__dirname, "vidyalai-task1/backend/Controllers/uploads")
  )
);
// app.use(ErrorHandlerBlock);
app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieparser());
// app.use(ErrorHandlerBlock);

//-------------------Routes-----------------------------------------
app.use("/api", pdfRouter);
app.use("/api/user", UserRouter);
app.use(ErrorHandlerBlock);

//-------------------Server Initializing----------------------------
app.listen(5000, () => {
  console.log("Listening...");
});
