import React, { useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import Fab from '@material-ui/core/Fab';
import FileSaver from "file-saver";
import CV from "../../static/cv.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const downloadFile = () => {
    FileSaver.saveAs(CV, "kcatalsakal_cv.pdf")
}

const PdfRender = (props) => {

    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            marginTop: "5%",
            display: "flex",
            width: "80%",
            justifyContent: "center",
            marginLeft: "5%",
            marginRight: "5%",
            textAlign: "center",
        },
        fab: {
            margin: "0px",
            top: "auto",
            right: "20px",
            bottom: "20px",
            left: "auto",
            position: "fixed",
        }
    }));
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Document
                file={CV}
                options={{ workerSrc: "/pdf.worker.js" }}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <Page size="A4" key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
            </Document>
            <Tooltip title="Download me!" aria-label="add">
                <Fab color="primary" aria-label="add" className={classes.fab} onClick={downloadFile}>
                    <GetAppIcon />
                </Fab>
            </Tooltip>
        </div>

    );
};

export default PdfRender