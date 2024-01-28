const express = require("express");
const app = express();
const pdfRouter = require("./Routes/Pdfroutes");
const cors = require("cors");
const path = require("path");

app.use(
  express.static(
    path.join(__dirname, "vidyalai-task1/backend/Controllers/uploads")
  )
);
app.use(express.json());
app.use(cors({ credentials: true, origin: "*" }));

// app.options(
//   "/api/generatepdf",
//   cors({ credentials: true, origin: "http://127.0.0.1:3000" })
// );
app.use("/api", pdfRouter);

app.listen(5000, () => {
  console.log("Listening...");
});
