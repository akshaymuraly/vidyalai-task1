const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const {
  pdfUpload,
  getPdf,
  generateNewPdf,
} = require("../Controllers/Pdfcontrollers");

router.post("/pdfupload", upload.single("file"), pdfUpload);
router.get("/getpdf/:filename", getPdf);
router.post("/generatepdf/:originalfile", generateNewPdf);

module.exports = router;
