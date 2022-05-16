import React, { useState, useEffect, useRef } from 'react';
// import { useDropzone } from 'react-dropzone'
// import { borderBottom } from '@mui/system';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { Row, Container } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import SearchBar from "material-ui-search-bar";
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';

import OpenCloudDialog from "./OpenCloudDialog";
import Tiling from "./Tiling";

const rows1 = [{ "id": 1, "filename": "0.jpg", "series": "", "frame": "", "c": "", "size_c": "", "size_t": "", "size_x": "", "size_y": "", "size_z": "" },
{ "id": 2, "filename": "0.jpg", "series": "", "frame": "", "c": "", "size_c": "", "size_t": "", "size_x": "", "size_y": "", "size_z": "" },
{ "id": 3, "filename": "0input.png", "series": "", "frame": "", "c": "", "size_c": "", "size_t": "", "size_x": "", "size_y": "", "size_z": "" },
{ "id": 4, "filename": "1EDSR.png", "series": "", "frame": "", "c": "", "size_c": "", "size_t": "", "size_x": "", "size_y": "", "size_z": "" },
{ "id": 5, "filename": "2GANSR.png", "series": "", "frame": "", "c": "", "size_c": "", "size_t": "", "size_x": "", "size_y": "", "size_z": "" },
{ "id": 6, "filename": "3WDSR.png", "series": "", "frame": "", "c": "", "size_c": "", "size_t": "", "size_x": "", "size_y": "", "size_z": "" }];

const columns = [
    { headerName: 'No', field: 'id', sortable: false },
    { headerName: 'FileName', field: 'filename', sortable: false },
    { headerName: 'Series', field: 'series', sortable: false },
    { headerName: 'Frame', field: 'frame', sortable: false },
    { headerName: 'C', field: 'c', sortable: false },
    { headerName: 'SizeC', field: 'size_c', sortable: false },
    { headerName: 'SizeT', field: 'size_t', sortable: false },
    { headerName: 'SizeX', field: 'size_x', sortable: false },
    { headerName: 'SizeY', field: 'size_y', sortable: false },
    { headerName: 'SizeZ', field: 'size_z', sortable: false }
];

const TabContainer = (props) => {
    return (
        <Typography component="div" style={{ padding: 0 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

var acceptedFiles = [
    // { id: 1, errors: [], name: "LiveDead2_Plate_R_p00_0_H12f03d1.TIF", valid: true },
    // { id: 2, errors: [], name: "LiveDead2_Plate_R_p00_0_H12f03d0.TIF", valid: true },
    // { id: 3, errors: [], name: "LiveDead2_Plate_R_p00_0_H12f02d1.TIF", valid: true },
    // { id: 4, errors: [], name: "LiveDead2_Plate_R_p00_0_H12f02d0.TIF", valid: true },
]

// const ImageDropzone = () => {
//     const [files, setFiles] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const updateFiles = (incommingFiles) => {
//         console.log(incommingFiles, "props.files, files");
//         setFiles(incommingFiles);
//         acceptedFiles = incommingFiles;
//     };
//     const onDrop = useCallback((acceptedFiles) => {
//         console.log(acceptedFiles);
//         setLoading(true);
//         setFiles(acceptedFiles)
//     }, []);

//     const backgroundText = loading ? "Loading..." : "Drag and drop files or a folder";
//     const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
//     return (
//         <div {...getRootProps()}>
//             {files.length === 0 ?
//                 <div className="d-flex align-center justify-center fill-height">
//                     <p className="text-h4 grey--text text--lighten-2">
//                         {backgroundText}
//                     </p>
//                 </div> :
//                 <div>
//                     <Row className="align-center">
//                         {files.map((file, idx) =>
//                             <Col
//                                 key={idx}
//                                 cols="2"
//                                 className="px-4"
//                             >
//                                 {file.thumbnailData && <img
//                                     id={'images_' + idx}
//                                     src={file.thumbnailData}
//                                     className="mx-auto"
//                                     style={{ width: 120 }}
//                                 />}
//                                 <p className="ma-2 text-center text-caption">
//                                     {file.name}
//                                 </p>
//                                 <FileItem {...file} preview />
//                             </Col>
//                         )}
//                     </Row>
//                 </div>
//             }
//         </div>
//     )
// }

const ImageDropzone = () => {

    const [files, setFiles] = useState(acceptedFiles);
    const updateFiles = (incommingFiles) => {
        // console.log(incommingFiles, "props.files, files");
        setFiles(incommingFiles);
        acceptedFiles = incommingFiles;
    };
    useEffect(() => {
        if (acceptedFiles !== null && acceptedFiles !== []) {
            // console.log(acceptedFiles[0].id, "props.files, files");
            setFiles(acceptedFiles);
        }
    }, []);
    return (
        <Dropzone onChange={updateFiles} value={files}>
            {files.map((file) => (
                <FileItem {...file} k={file.id.toString()} info preview />
            ))}
        </Dropzone>
    );
}

const DropzoneMetaData = () => {

    // Pagination
    const [pageSize, setPageSize] = useState(5);
    // Table Rows
    const [contents, setContent] = useState([]);
    // Drag & Drop files
    const [files, setFiles] = useState(acceptedFiles);
    const [loading, setLoading] = useState(false);
    // Search
    const [searchrows, setRows] = useState([]);
    // console.log("contents=====>" + JSON.stringify(contents));
    // Search Bar
    const [searched, setSearched] = useState("");
    const requestSearch = (searchedVal) => {
        const filteredRows = contents.filter((content) => {
            return content.filename.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };
    // console.log("searchrows=====>" + JSON.stringify(searchrows));
    const backgroundText = loading ? "Loading..." : "Drag and drop files or a folder";
    const get_metadata = () => {
        setLoading(true);
        let rows = [];
        for (let i = 0; i < acceptedFiles.length; i++) {
            let file_content = acceptedFiles[i].file;
            // console.log(file_content, file_content["name"],"openPositionDlg get_metadata");
            if (acceptedFiles[i].valid) {
                rows.push({
                    id: (i + 1).toString(),
                    // filename: acceptedFiles[i].name.toString(),
                    filename: file_content["name"].toString(),
                    series: '',
                    frame: '',
                    c: '',
                    size_c: '',
                    size_t: '',
                    size_x: '',
                    size_y: '',
                    size_z: ''
                });
            }
        }
        setContent(rows);
        setRows(rows);
        // console.log(rows, "openPositionDlg get_metadata");
    }
    useEffect(() => {
        get_metadata();
    }, []);

    return (
        <div style={{ minHeight: "200px" }}>
            {/* <input {...getInputProps()} /> */}
            {files.length === 0 ?
                <div className="d-flex align-center justify-center pt-5">
                    {backgroundText}
                </div> :
                <Card>
                    <CardContent>
                        <SearchBar
                            value={searched}
                            onChange={(searchVal) => requestSearch(searchVal)}
                            onCancelSearch={() => cancelSearch()}
                        />
                    </CardContent>
                    <div className="border ml-1 mr-1" style={{ height: "400px", width: "auto" }}>
                        <DataGrid
                            className='cell--textCenter'
                            style={{ textAlign: "center", width: "100%" }}
                            rows={searchrows}
                            columns={columns}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 20]}
                            pagination
                        />
                    </div>
                </Card>
            }
        </div>
    )
}

const DropzoneNamesFiles = () => {
    // Names & Files Tab
    const exampleBox = useRef(null);

    const nameTypeTableHeaders = [
        { headerName: "No", field: "id" },
        { headerName: "FileName", field: "filename" },
        { headerName: "Series", field: "series" },
        { headerName: "Row", field: "row" },
        { headerName: "Column", field: "col" },
        { headerName: "Field", field: "field" },
        { headerName: "Channel", field: "channel" },
        { headerName: "Z Position", field: "z" },
        { headerName: "Time Point", field: "timeline" }
    ];
    // Pagination
    const [pageSize, setPageSize] = useState(5);
    // Table Rows
    const [contents, setContent] = useState([]);
    // Drag & Drop files
    const [files, setFiles] = useState(acceptedFiles);

    const [loading, setLoading] = useState(false);
    const backgroundText = loading ? "Loading..." : "Drag and drop files or a folder";
    // Search
    const [searchrows, setRows] = useState([]);
    // Search Bar
    const [searched, setSearched] = useState("");

    const [fileName, setFileName] = useState("");

    const [selectionRange, setSelectionRange] = useState(null);
    const namePatternsPrimaryValue = [
        { label: "Series", text: "", start: 0, end: 17, color: "#4caf50" },
        { label: "Row", text: "", start: 24, end: 25, color: "#1976d2" },
        { label: "Column", text: "", start: 25, end: 27, color: "#ff5722" },
        { label: "Field", text: "", start: 27, end: 30, color: "#fb8c00" },
        { label: "Channel", text: "", start: 30, end: 32, color: "#9c27b0" },
        { label: "Z Position", text: "", start: 22, end: 23, color: "#607d8b" },
        { label: "Time Point", text: "", start: 18, end: 21, color: "#ff5252" }
    ];
    const [namePatterns, setNamePatterns] = useState(namePatternsPrimaryValue);

    const requestSearch = (searchedVal) => {
        const filteredRows = contents.filter((content) => {
            return content.filename.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };
    
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const selectExampleString = () => {
        if (typeof window.getSelection !== "undefined") {
            try {
                let sel = window.getSelection(), range = sel.getRangeAt(0);
                let selectionRect = range.getBoundingClientRect(), fullRect = exampleBox.current.getBoundingClientRect();
                let startOffset = Math.round(((selectionRect.left - fullRect.left) / selectionRect.width) * range.toString().length)
                let selectionRangeValue = {
                    text: range.toString(),
                    startOffset: startOffset,
                    endOffset: startOffset + range.toString().length
                }
                setSelectionRange(selectionRangeValue);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const clickNamePattern = (index) => {
        let selectedText = getSelectionText();
        if (selectionRange !== null && selectedText !== "") {
            let text = selectionRange.text;
            let startOffset = selectionRange.startOffset;
            let endOffset = selectionRange.endOffset;
            if (text === selectedText) {
                if (startOffset > -1 && endOffset > -1) {
                    let namePatternsPrimaryValue = namePatterns;
                    for (var i = 0; i < namePatternsPrimaryValue.length; i++) {
                        if (index === i) {
                            namePatternsPrimaryValue[index].text = text;
                            namePatternsPrimaryValue[index].start = startOffset;
                            namePatternsPrimaryValue[index].end = endOffset;
                        }
                    }
                    // console.log(namePatternsPrimaryValue, selectionRange, "openposition dlg , clickNamePattern   getSelectionText");
                    setNamePatterns(namePatternsPrimaryValue);
                }
            }
        }
    };

    const getSelectionText = () => {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type !== "Control") {
            text = document.selection.createRange().text;
        }
        return text.replaceAll("\n", "");
    };

    const get_nametype = () => {
        let rows = [];
        for (let i = 0; i < acceptedFiles.length; i++) {
            let file_content = acceptedFiles[i].file;
            if (acceptedFiles[i].valid) {
                rows.push({
                    id: (i + 1).toString(),
                    // filename: acceptedFiles[i].name.toString(),
                    filename: file_content["name"].toString(),
                    series: '',
                    frame: '',
                    c: '',
                    size_c: '',
                    size_t: '',
                    size_x: '',
                    size_y: '',
                    size_z: ''
                });
            }
        }
        setContent(rows);
        setRows(rows);
        setFileName(rows[0].filename);
        setLoading(true);
    }

    useEffect(() => {
        get_nametype();
    }, [namePatterns]);

    return (
        <div style={{ minHeight: "200px" }}>
            {/* <input {...getInputProps()} /> */}
            {files.length === 0 ?
                <div className="d-flex align-center justify-center pt-5">
                    {backgroundText}
                </div> :
                <div className='border'>
                    <Row className="align-center justify-center m-0 border">
                        <p className="mb-0 mr-3">Example :</p>
                        {/* <input className='mb-0 showFileName form-control shadow-none' ref={exampleBox} onMouseUp={selectExampleString} value={fileName} defaultValue={fileName} /> */}
                        <div className='showFileName form-control shadow-none mb-0 pb-0' ref={exampleBox} onMouseUp={selectExampleString}>{fileName}</div>
                        <NativeSelect value={fileName} onChange={setFileName} className="mb-0 showOnlyDropDownBtn" disableUnderline>
                            {contents.map((c) => (
                                <option key={c.filename} value={c}>
                                    {c.filename}
                                </option >
                            ))}
                        </NativeSelect>
                    </Row>
                    <Row className="align-center justify-center name-type-input m-0 border">
                        {namePatterns.map((pattern, idx) => {
                            return (<div key={idx} className="pattern-section border">
                                <Button className="pattern-item-button"
                                    variant="contained"
                                    onClick={() => { clickNamePattern(idx) }}
                                    style={{ backgroundColor: pattern.color, borderRadius: "8px" }}
                                >{pattern.label}</Button>
                                <TextField
                                    id={pattern.label}
                                    value={namePatterns[idx].text}
                                    size="small"
                                    variant="standard"
                                    className="pattern-item-button"
                                />
                            </div>)
                        })}
                    </Row>
                    <Container className='pl-1 pr-1 border'>
                        <div className="d-flex">
                            <Button
                                className="common"
                                // disabled={!canUpdate}
                                depressed="true"
                                style={{ backgroundColor: "#1976d2", borderRadius: "8px" }}
                            // onClick={updateNameType}
                            >Update</Button>
                            <div className="spacer type-spacer"></div>
                            <Button
                                className="common"
                                // disabled={!canClear}
                                depressed="true"
                                style={{ backgroundColor: "#1976d2", borderRadius: "8px" }}
                            // onClick={clearNameType}
                            >Clear </Button>
                            <div className="spacer"></div>
                            <SearchBar
                                value={searched}
                                onChange={(searchVal) => requestSearch(searchVal)}
                                onCancelSearch={() => cancelSearch()}
                            />
                        </div>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={searchrows}
                                columns={nameTypeTableHeaders}
                                pageSize={pageSize}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                rowsPerPageOptions={[5, 10, 20]}
                                pagination
                            />
                        </div>
                    </Container>
                </div>
            }
        </div>
    )
}

const DropzoneGroup = () => {

    const [loading, setLoading] = useState(false);
    const backgroundText = loading ? "Loading..." : "Drag and drop files or a folder";
    return (
        <div style={{ minHeight: "200px" }}>
            <div className="d-flex align-center justify-center pt-5">
                {backgroundText}
            </div>
        </div>
    )
}

const OpenPositionDialog = (props) => {

    const [selectedTab, setSelectedTab] = useState(0);
    const [cloudDialog, setCloudDialog] = useState(false);
    const [progressBarMaxValue, setProgressBarMaxValue] = useState(0);
    const [progressBarValue, setProgressBarValue] = useState(0);

    const onTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    const handleCloudDialog = () => {
        setCloudDialog(!cloudDialog);
    }
    const handleCloseOpenDlg = () => {
        props.handleClose();
        acceptedFiles = [];
    }

    const handleDrag = (e) => {
        e.preventDefault();
        console.log("e.dataTransfer.items");
    };
    const setProgressMax = (maxValue) => {
        console.log("in setProgressMax: " + maxValue);
        setProgressBarMaxValue(maxValue);
    };
    const setProgressCurrent = (currValue) => {
        setProgressBarValue(currValue);
    };
    return (
        <>
            <Dialog open={true} onClose={handleCloseOpenDlg} maxWidth={"1010"} className="m-0" style={{ top: "5%", bottom: "auto" }}>
                <div className="d-flex border-bottom">
                    <DialogTitle>Position Select</DialogTitle>
                    <button className="dialog-close-btn" color="primary" size="small" onClick={handleCloseOpenDlg}>&times;</button>
                </div>
                <DialogContent className='p-0' style={{ width: "1000px" }}>
                    <Tabs className="border" variant="fullWidth" value={selectedTab} onChange={onTabChange} aria-label="scrollable auto tabs example" >
                        <Tab className="common-tab-button font-16 primary--text" label="Images" />
                        <Tab className="common-tab-button font-16 primary--text" label="Tiling" />
                        <Tab className="common-tab-button font-16 primary--text" label="Metadata" />
                        <Tab className="common-tab-button font-16 primary--text" label="Names &amp; Files" />
                        <Tab className="common-tab-button font-16 primary--text" label="Groups" />
                    </Tabs>
                    {selectedTab === 0 &&
                        <TabContainer>
                            <ImageDropzone />
                        </TabContainer>}
                    {selectedTab === 1 &&
                        <TabContainer>
                            <Tiling set-progress-max={setProgressMax} set-progress-current={setProgressCurrent} />
                        </TabContainer>
                    }
                    {selectedTab === 2 &&
                        <TabContainer>
                            <DropzoneMetaData />
                        </TabContainer>
                    }
                    {selectedTab === 3 &&
                        <TabContainer>
                            <DropzoneNamesFiles />
                        </TabContainer>
                    }
                    {selectedTab === 4 &&
                        <TabContainer>
                            <DropzoneGroup />
                        </TabContainer>
                    }
                </DialogContent>
                <DialogActions style={{ display: "-webkit-box !important" }} className="border">
                    {
                        selectedTab === 0 && <div>
                            <Button className="cloud-btn" variant="contained" onClick={handleCloudDialog} color="primary" style={{ marginLeft: "-800px" }}>Cloud</Button>
                            {cloudDialog && <OpenCloudDialog handleClose={handleCloudDialog} />}
                        </div>
                    }
                    <Button size="medium" color="primary" variant="contained" onClick={handleCloseOpenDlg}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

OpenPositionDialog.propTypes = { handleClose: PropTypes.func.isRequired };
export default OpenPositionDialog;