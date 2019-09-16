import * as React from "react";
import xml from "../../assets/images/xml.svg";
import xls from "../../assets/images/xls.svg";
import doc from "../../assets/images/doc.svg";
import rtf from "../../assets/images/rtf.svg";
import pdf from "../../assets/images/pdf.svg";
const xmlfile = require("../../assets/files/xmlfile.xml");
const xlsfile = require("../../assets/files/xlsfile.xls");
const docfile = require("../../assets/files/docfile.doc");
const rtffile = require("../../assets/files/rtffile.rtf");
const pdffile = require("../../assets/files/pdffile.pdf");

const ReportComponent: React.FC = () => {
  let height = 72;
  let width = 72;
  let openUserXML = () => {
    window.open(xmlfile, "_none");
  };
  let openUserXLS = () => {
    window.open(xlsfile, "_none");
  };
  let openUserDOC = () => {
    window.open(docfile, "_none");
  };
  let openUserRTF = () => {
    window.open(rtffile, "_none");
  };
  let openUserPDF = () => {
    window.open(pdffile, "_none");
  };
  return (
    <div className="container">
      <div className="my-4">
        <h3>View &amp; Download</h3>
      </div>
      <div className="d-flex justify-content-between row">
        <div className="col">
          <button
            type="button"
            className="btn btn-light border p-4 px-5"
            onClick={openUserXML}
          >
            <div className="mb-2">
              <img
                src={xml}
                alt="xml icon"
                style={{ height: height, width: width }}
              />
            </div>
            <div>
              <h4>Users</h4>
            </div>
          </button>
        </div>
        <div className="col m-2">
          <button
            type="button"
            className="btn btn-light border p-4 px-5"
            onClick={openUserXLS}
          >
            <div className="mb-2">
              <img
                src={xls}
                alt="xls icon"
                style={{ height: height, width: width }}
              />
            </div>
            <div>
              <h4>Charts</h4>
            </div>
          </button>
        </div>
        <div className="col m-2">
          <button
            type="button"
            className="btn btn-light border p-4 px-5"
            onClick={openUserDOC}
          >
            <div className="mb-2">
              <img
                src={doc}
                alt="xml icon"
                style={{ height: height, width: width }}
              />
            </div>
            <div>
              <h4>Forms</h4>
            </div>
          </button>
        </div>
        <div className="col m-2">
          <button
            type="button"
            className="btn btn-light border p-4 px-5"
            onClick={openUserRTF}
          >
            <div className="mb-2">
              <img
                src={rtf}
                alt="xml icon"
                style={{ height: height, width: width }}
              />
            </div>
            <div>
              <h4>Leaves</h4>
            </div>
          </button>
        </div>
        <div className="col m-2">
          <button
            type="button"
            className="btn btn-light border py-4 px-5"
            onClick={openUserPDF}
          >
            <div className="mb-2">
              <img
                src={pdf}
                alt="xml icon"
                style={{ height: height, width: width }}
              />
            </div>
            <div>
              <h4>Table</h4>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReportComponent;
