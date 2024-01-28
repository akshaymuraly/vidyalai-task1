const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

const pdfUpload = async (req, res, next) => {
  const file = req.file;
  const filepath = path.join(__dirname, "uploads", file.originalname);
  console.log(filepath);
  try {
    await fs.promises.writeFile(filepath, file.buffer);
    return res.json({ nessage: "uploaded" });
  } catch (err) {
    console.log(err);
    return res.json({ nessage: "can not save" });
  }
};

const getPdf = async (req, res, next) => {
  const file_name = decodeURIComponent(req.params.filename);
  // console.log(file_name);
  const filepath = path.resolve(__dirname, "uploads", file_name);
  console.log("file path ", filepath);
  if (fs.existsSync(filepath)) {
    console.log("exists");
  } else {
    console.log("no");
  }
  console.log("file pathe : ", filepath);
  res.setHeader("Content-Type", "application/pdf");
  return res.sendFile(filepath);
};

const generateNewPdf = async (req, res, next) => {
  const { originalfile } = req.params;
  const { pagenumber } = req.body;
  // const array = JSON.parse(pagenumber);
  console.log(pagenumber);
  const fullpath = path.join(__dirname, "uploads", originalfile);
  try {
    const pdfchunk = await fs.promises.readFile(fullpath);
    const originalPdf = await PDFDocument.load(pdfchunk);
    const newPdf = await PDFDocument.create();
    for (const page of pagenumber) {
      // const originalPage = await originalPdf.getPage(page);
      const [copyPage] = await newPdf.copyPages(originalPdf, [page - 1]);
      newPdf.addPage(copyPage);
    }

    const newPDFBytes = await newPdf.save();
    const newpdfpath = path.join(
      __dirname,
      "uploads",
      "NewPdfs",
      `${Math.random().toString(36).substring(2, 7)}.pdf`
    );
    await fs.promises.writeFile(newpdfpath, newPDFBytes);
    // Convert ArrayBuffer to Buffer (Node.js Buffer)
    // const newPDFBuffer = Buffer.from(newPDFBytes);

    // Set the appropriate headers for the file download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=pdf.pdf");

    // Stream the new PDF content to the response
    res.sendFile(newpdfpath, {}, async (err) => {
      if (err) {
        console.log("File not being send!");
      } else {
        await fs.promises.unlink(newpdfpath);
      }
    });
    // await fs.promises.unlink(newpdfpath)
  } catch (err) {
    console.log("Error : ", err);
    return res.json({ message: "Error..." });
  }

  // array.forEach((item) => {
  //   console.log(typeof item);
  // });
  // return res.json({ message: "Received" });
};

module.exports = {
  pdfUpload,
  getPdf,
  generateNewPdf,
};
