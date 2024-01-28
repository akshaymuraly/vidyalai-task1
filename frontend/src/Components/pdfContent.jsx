import React, { useState, useRef } from "react";
import { Page, Document } from "react-pdf";
import { TiTick } from "react-icons/ti";
import "./pdfContent.css";

const PdfContent = ({ inputs, payload, handleselectPages }) => {
  const [numPages, setNumPages] = useState("");
  //   const [checkboxRef, setCheckboxRefs] = useState([]);
  const checkboxRef = useRef([]);
  checkboxRef.current = [];
  const addToRefArray = (e) => {
    if (e && !checkboxRef.current.includes(e)) checkboxRef.current.push(e);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  function onPageClick(index) {
    console.log(checkboxRef.current);
    checkboxRef.current[index].click();
  }

  return (
    <div><Document
        className="pdf-container"
        width={600 * numPages > window.innerWidth ? 600 * 3 : 600 * numPages}
        file={`http://localhost:5000/api/getpdf/${encodeURIComponent(
          inputs.file.name
        )}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from({ length: numPages }).map((page, index) => (
          <div className={`page-container`} onClick={() => onPageClick(index)}>
            <div
              className={`pagenumber-check-box ${
                payload.pagenumber.includes(index + 1)
                  ? "pagenumber-check-box-checked"
                  : ""
              }`}
            >
              <TiTick />
            </div>
            <Page
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              height={window.innerWidth < 700 ? 270 : 350} //350
              width={window.innerWidth < 700 ? 270 : 350}
            />
            <p>
              {index + 1} of {numPages}
            </p>
            <input
              className="page-checkbox"
              type="checkbox"
              name="pagenumber"
              value={index + 1}
              ref={addToRefArray}
              onChange={handleselectPages}
            />
          </div>
        ))}
      </Document>
      <p>{/* Page {pageNumber} of {numPages} */}</p>
    </div>
  );
};

export default PdfContent;
