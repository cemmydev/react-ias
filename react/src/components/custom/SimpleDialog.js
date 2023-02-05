import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Buffer } from 'buffer';
import { api } from '../../api/base';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initView } from '../../reducers/actions/vesselAction';
const SimpleDialog = (props) => {
    // const [imageSrc, setImageSrc] = useState(null)
    // const selectedImg = useSelector(state => state.files.selectedImage)
    // const auth = useSelector(state => state.auth)
    // console.log("ssssssss", selectedImg)
    // useEffect(() => {
    //     if (selectedImg!=null) {
    //         const imgsrc = process.env.REACT_APP_BASE_API_URL + "image/tile/get_image" + selectedImg.split(auth.user._id)[1];
    //         setImageSrc(imgsrc);
    //         console.log(imgsrc);
    //         fetch(imgsrc, {
    //         method: "GET",
    //         headers: { Authorization: auth.tokenType + ' ' + auth.token }
    //     }).then((response) => {
    //         console.log('image data', response.body)
    //         // const data = `data:${response.headers['content-type']};base64,${new Buffer(response.data).toString('base64')}`;
    //         // setImageSrc(response.body)
    //     });
    //     }

    // })
    const dispatch = useDispatch()
    const setView = () => {
        dispatch(initView())
    }
    const onCancel = (props) => {
        dispatch(initView())
        props.onCancel()
    }
    const handleClose = () => {
        console.log("click outside ok");
    };
    const newed = () => {
        console.log("newed");
    };
    const updated = () => {
        console.log("updated");
    };
    const removed = () => {
        console.log("removed");
    };
    const selected = () => {
        console.log("selected");
    };
    return (
        <>
            <Dialog open={true} onClose={props.click} fullWidth={true} maxWidth="md" >
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent style={{ padding: "0px 24px" }}>
                    <div>{props.children}</div>
                </DialogContent>
                <DialogActions style={{ padding: "12px 24px" }}>
                    <div className="spacer"></div>
                    {/* {props.checked.length != 0 && 
                        <Button variant="contained" color="info" onClick={setView}>
                            Set
                        </Button>
                    } */}
                    {props.newButton && <Button variant="contained" color="info" onClick={newed}
                        disabled={props.newDisable}
                    >
                        {/* {props.newTitle} */}
                    </Button>}
                    

                   
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SimpleDialog