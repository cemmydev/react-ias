import React, {useState, useEffect, useRef} from "react";
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import SimpleDialog from "../../../custom/SimpleDialog";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import * as api_tiles from "../../../../api/tiles";
import * as api_experiment from "../../../../api/experiment"
import store from "../../../../reducers";
import { cancelImage } from "../../../../reducers/actions/filesAction";
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from '@mui/material/DialogContentText';
import { setNullView , initView } from "../../../../reducers/actions/vesselAction";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import CloudPlan from '../../../custom/CloudPlan';
import Previews from '../../../custom/Previews';
import TreeViewFoldersExp from "./TreeViewFolders";
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import MailIcon from '@mui/icons-material/Mail';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdChevronRight,
  MdKeyboardArrowDown,
  MdAddBox,
  MdIndeterminateCheckBox,
  MdFolder,
  MdFolderOpen,
  MdInsertDriveFile
} from "react-icons/md";
import { mdiAlertRemove, mdiChevronDoubleLeft } from "@mdi/js";
import { $CombinedState } from "redux";
import TreeViewFolders from "./TreeViewFolders";
import { amber } from "@mui/material/colors";


function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

const DeleteSureDialog = (props) => {
    const handleClose = () => {
        props.setDialogStatus(false)
    };
    const handleDelete = () => {
        props.setDialogStatus(false)
        props.sureDelete();
    }

    return (
        <>
            <Dialog open={props.open}>
                <DialogTitle>Delete {props.selectedNum} files </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deleted files cannot be recovered forever, are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="error" onClick={handleDelete}>Yes, sure</Button>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const SuccessDialog = (props) => {
    const handleClose = () => {
        props.setsuccessStatus(false)
    };
        return (
        <>
            <Dialog open={props.open}>
                <DialogTitle>Uploading files </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Uploading is Successful
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const OpenFileDialog = (props) => {
    const fileInput = React.useRef();

    // const expName = "experiement_" + new Date().toISOString().replaceAll(':', '-')
    const upFName = "upload_" + new Date().toISOString().replaceAll(':', '-')

    const [experimentName, setExperimentName] = useState('');
    const [uploadFolderName, setUploadFolderName] = useState(upFName);
    const [fileName, setFileName] = useState(null);
    const [checked, setChecked] = useState('');
    const [expanded, setExpanded] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [sureDialog, setSureDialog] = useState(false);
    const [successDialog, setsuccessDialog] = useState(false);
    const [photo123, setphoto123] = useState(null);
    const [image, setFiles] = useState([]);
    const [showMother, setShowMother] = useState('');
    const [imageSrc, setImageSrc] = useState(null);
    const [addFolderName, setAddFolderName] = useState(null);
    const [addedFiles, setAddedFiles] = useState([]);
    const [addedFolder, setAddedFolder] = useState([]);

    const selectedImg = useSelector(state => state.files.selectedImage);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const handleInputChange = (event) => {
      setphoto123(URL.createObjectURL(event.target.files[0]));
      setFiles(event.target.files)
    }
    const getTree = async () => {
        console.log("This is gettree")
        let response = await api_experiment.getExperimentDatas()
        let data = response.data;

        if(data.error) {
            console.log("Error occured while invoking getImageTree api")
            //alert("Error occured while getting the tree")
        } else {
            store.dispatch({type: "set_experiment_data", content: data.data});
        }
        setUploading(false)
    }
    const onSetShowMother = (e) => {
        if (showMother == e.target.id) {
            setShowMother('')
        } else {
            setShowMother(e.target.id)
        }
        
    }
    const deleteFiles = async () => {
        setUploading(true)
        try {
            let response = await api_experiment.deleteImageFiles(checked)
            let data = response.data
            if(data.success) {
                getTree()
            } else {
                console.log(response.error)    
            }
        } catch(err) {
            setUploading(false)
            console.log("Error occured while deleting image files")
            throw err;
        }
    }
    const registerExperimentData = async () => {
        try {
            let response = await api_experiment.registerExperiment(experimentName, checked)
            let data = response.data

            if(data.success) {
                alert("Successfully registered")
            } else {
                alert("Failed to register")
            }
            props.handleClose()
        } catch(err) {
            props.handleClose()
            console.log("Error occured while registering experiment")
            throw err
        }
    }

    // const registerExperimentData = async () => {
    //     try {
    //         let response = await api_experiment.registerExperiment(experimentName, checked)
    //         let data = response.data

    //         if(data.success) {
    //             alert("Successfully registered")
    //         } else {
    //             alert("Failed to register")
    //         }
    //         props.handleClose()
    //     } catch(err) {
    //         props.handleClose()
    //         console.log("Error occured while registering experiment")
    //         throw err
    //     }
    // }
    // console.log("this is upload file data --------------------", image);
    const onsetChecked = (e) => {
        // dispatch(selectImage(e.target.id))
        setChecked(e.target.id)
    }
    useEffect(() => {
        if (selectedImg!=null) {
            const imgsrc = process.env.REACT_APP_BASE_API_URL + "image/tile/get_image" + selectedImg.split(auth.user._id)[1];
            setImageSrc(imgsrc);
            console.log(imgsrc);
            fetch(imgsrc, {
            method: "GET",
            headers: { Authorization: auth.tokenType + ' ' + auth.token }
        }).then((response) => {
            console.log('image data', response.body)
            // const data = `data:${response.headers['content-type']};base64,${new Buffer(response.data).toString('base64')}`;
            // setImageSrc(response.body)
        });
        }

    }, [selectedImg, setImageSrc])
    useEffect(() => {
        setUploading(true)

        const expName = "experiement_" + new Date().toISOString().replaceAll(':', '-')
        const upFName = "upload_" + new Date().toISOString().replaceAll(':', '-')

        setExperimentName('')
        setUploadFolderName('')

        getTree()
        setUploading(false)
    }, [])

    const icons = {
      check: <MdCheckBox className="rct-icon rct-icon-check" />,
      uncheck: <MdCheckBoxOutlineBlank className="rct-icon rct-icon-uncheck" />,
      halfCheck: (
        <MdIndeterminateCheckBox className="rct-icon rct-icon-half-check" />
      ),
      expandClose: (
        <MdChevronRight className="rct-icon rct-icon-expand-close" />
      ),
      expandOpen: (
        <MdKeyboardArrowDown className="rct-icon rct-icon-expand-open" />
      ),
      expandAll: <MdAddBox className="rct-icon rct-icon-expand-all" />,
      collapseAll: (
        <MdIndeterminateCheckBox className="rct-icon rct-icon-collapse-all" />
      ),
      parentClose: <MdFolder className="rct-icon rct-icon-parent-close" />,
      parentOpen: <MdFolderOpen className="rct-icon rct-icon-parent-open" />,
      leaf: <MdInsertDriveFile className="rct-icon rct-icon-leaf-close" />
    };

    const handleSelectFile = async () => {
        if (image.length > 0) {
            setUploading(true)

            const incommingFiles = [...image];
            let files = [];
            let newAcceptedFiles = [];
            let acceptedFileCount = 0;

            for (let i = 0; i < incommingFiles.length; i++) {

                if (!files.includes(incommingFiles[i])) {
                    files.push(incommingFiles[i]);
                }

                let file = incommingFiles[i]
                let newName = file.name.replace(/\s+/g, '');
                incommingFiles[i] = new File([file], newName, {type: file.type});
                incommingFiles[i]["path"] = file.name.replace(/\s+/g, "");
                newAcceptedFiles.push(incommingFiles[i]);
            }

            if (newAcceptedFiles.length > 0) {
                // console.log(newAcceptedFiles)
                //************************************************************************** */
                let resUpload = await api_tiles.uploadImages(newAcceptedFiles, uploadFolderName);
                if (resUpload.status==200)
                setsuccessDialog(true)
                setFiles([])
                setphoto123(null)
                getTree()
            }
            // setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }
    }
    const removeImage = (e) => {
        setSureDialog(true)
    }
    const sureDelete = () => {
        deleteFiles()
    }
    const registerExperiment = () => {
        registerExperimentData()
    }
    const cancelBtn = () => {
        dispatch(cancelImage())
        props.handleClose()
        dispatch(setNullView())
        setImageSrc(null)
    }
    const setItem = () => {
        console.log("clicked setbtn")
        dispatch(initView())
    }

    const addFiles = (files) => {
        console.log("this is selected files", files)
        
        if (files.length == 0) {
            alert("choose at least one file");
        } else {
            setAddedFiles(files);
        }
    }

    const onClickSelectBtn = () => {
        document.getElementById('file_upload').click();
    }

    const onClickTreeSelectBtn = () => {
        console.log(props.experiments);
        const selectedImage = process.env.REACT_APP_BASE_API_URL + "static/" + auth.user._id + "/";
        store.dispatch({type: "Select_Image", content: selectedImage})
        props.handleClose()
    }

    const uploadExpData = async () => {
        if (experimentName==''||addedFiles.length==0) {
            alert("Select experiment and folder")
        } else {
            setUploading(true)
            let response = await api_experiment.setExperiment_folder(experimentName, addedFiles)
            console.log("This is uploading result", response)
            if (response.status==200 && response.data==true) {
                setUploading(false)
                setsuccessDialog(true)
                setAddedFiles([])
                setExperimentName('')
               
                getTree()
            } else if (response.data.error) {
                alert(response.data.error)
                setUploading(false)
            } else if (response.status!=200) {
                alert("Server connection is error")
                setUploading(false)
            }
        }
    }
    
    const eraseFolder = () => {
        setAddedFiles([]);
    }

    return (
        <>
            <SimpleDialog
                title="Files"
                checked={checked}
                singleButton={false}
                fullWidth={true}
                newTitle=""
                register={registerExperiment}
                onCancel={cancelBtn}
                set = {setItem}
            >
                <div className="container border">
                    <div className="row">
                        <div className="col-6 border">
                            <h6 className="mt-2">Upload Data Select</h6>
                            <div className="mt-2 mb-4">
                                <p className="mt-4">New Experiment Name</p>
                                <div className="row">
                                    <div className="col-4">
                                    </div>
                                    <div className="col-8">
                                        <TextField
                                            variant="outlined"
                                            label="Experiment Name"
                                            size="small"
                                            fullWidth
                                            value={experimentName}
                                            onChange={e => setExperimentName(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 mb-4">
                                <p className="mt-4">Select Upload Data</p>
                                <Dropzone onDrop={files => addFiles(files)}>
                                    {({getRootProps, getInputProps}) => (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} id="file_upload" multiple/>
                                            {
                                                addedFiles.length==0?<p className="border rounded p-4 text-center">Drag 'n' drop some files here, or click to select files</p>:<p className="border rounded p-4 text-center">Selected {addedFiles.length} files</p>
                                            }
                                        </div>
                                    )}
                                </Dropzone>
                                <div className="row">
                                    <div className="col-3">
                                    </div>
                                    <div className="col-3">
                                        <Button
                                            label="Click Here"
                                            variant="outlined"
                                            color="success"
                                            className="mt-3 mb-3"
                                            fullWidth
                                            value={fileName}
                                            onClick={onClickSelectBtn}
                                        >
                                            Select
                                        </Button>
                                    </div>
                                    <div className="col-1">

                                    </div>
                                    <div className="col-3">
                                    {addedFiles.length!=0? 
                                        <Button
                                            label="Click Here"
                                            variant="outlined"
                                            color="primary"
                                            className="mt-3 mb-3"
                                            fullWidth
                                            onClick={eraseFolder}
                                        >
                                            Erase
                                        </Button>:
                                        <Button
                                            label="Click Here"
                                            disabled
                                            variant="outlined"
                                            color="primary"
                                            className="mt-3 mb-3"
                                            fullWidth
                                        >
                                        Erase
                                        </Button>
                                    }
                                    </div>
                                    <div className="col-2">
                                    </div>
                                   
                                </div>
                            </div>
                            <div className="row mt-5 mb-3">
                                <div className="col-2">
                                </div>
                                <div className="col-4">
                                    <Button
                                        label="Click Here"
                                        variant="outlined"
                                        color="error"
                                        className="mt-3"
                                        fullWidth
                                        value={fileName}
                                        onClick={uploadExpData}
                                    >
                                        Upload
                                    </Button>
                                </div>
                                <div className="col-1">

                                </div>
                                <div className="col-4">
                                <Button
                                    label="Click Here"
                                    variant="outlined"
                                    color="info"
                                    className="mt-3"
                                    fullWidth
                                    onClick={() => props.handleClose()}
                                >
                                    Cancel
                                </Button>
                                </div>
                                <div className="col-1">
                                </div>
                                
                            </div>
                            
                        </div>
                        <div className="col-6 border">
                        <div>
                            <Typography component="div" className="mb-2 p-2"><h6>Server Data View</h6></Typography>
                                <TreeView
                                    aria-label="file system navigator"
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                    sx={{ height: 440, flexGrow: 1, maxWidth: 400, overflowY: 'auto', overflowX: 'hidden' }}
                                    >
                                    {props.experiments.length ?
                                        <TreeViewFoldersExp data={props.experiments} />
                                        : <label>No data found, please upload..</label>
                                    }
                                </TreeView>
                                <Button
                                    label="Click Here"
                                    variant="outlined"
                                    color="success"
                                    className="mt-3 mb-3"
                                    fullWidth
                                    onClick={onClickTreeSelectBtn}
                                >
                                SELECT
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="mt-2 mb-2">
                            {uploading && <LinearProgress />}
                        </div>
                    </div>
                    <div className="col-6">
                        {/* <div className="row mt-2 mb-2">
                            <div className="col-2">
                            </div>
                            <div className="col-4">
                                <Button
                                    label="Click Here"
                                    variant="outlined"
                                    color="error"
                                    className="mt-3"
                                    fullWidth
                                    value={fileName}
                                    onClick={uploadExpData}
                                >
                                    Set
                                </Button>
                            </div>
                            <div className="col-1">

                            </div>
                            <div className="col-4">
                            <Button
                                label="Click Here"
                                variant="outlined"
                                color="info"
                                className="mt-3"
                                fullWidth
                                onClick={() => props.handleClose()}
                            >
                                Cancel
                            </Button>
                            </div>
                            <div className="col-1">
                            </div>
                            
                        </div> */}
                    </div>
                </div>
            </SimpleDialog>
            <DeleteSureDialog 
                open={sureDialog}
                setDialogStatus={setSureDialog}
                sureDelete={sureDelete}
                selectedNum={checked.length}
            />
            <SuccessDialog 
                open={successDialog}
                setsuccessStatus={setsuccessDialog}
            />
        </>
    );
};

const mapStateToProps = (state) => ({
    experiments: state.experiment.experiments,
    uploading: state.experiment.uploading,
});
OpenFileDialog.propTypes = {handleClose: PropTypes.func.isRequired};

export default connect(mapStateToProps)(OpenFileDialog);

