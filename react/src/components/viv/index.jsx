import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {ThemeProvider, createTheme} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import Avivator from './Avivator';
// import * as api from '../../api/tiles';
// import sources from './source-info';
// import { useLocation } from 'react-router-dom';
// import { getNameFromUrl } from './utils';

const mapStateToProps = (state) => ({
    files: state.files.files,
    content: state.files.content,
    selectedVesselHole: state.vessel.selectedVesselHole,
    selectedVesselZ: state.vessel.selectedVesselZ,
})

const darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: grey,
        secondary: grey
    },
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    }
});


const RoutedAvivator = (props) => {

    const [source, setSource] = useState(null);

    const displayFiles = (contents, files, row, col, z) => {
        console.log("index.jsx : displayFiles : Parameters : -------- : ", contents, files, row, col, z);
        // if (files.N_images !== null && files.N_images !== undefined) {
        if (contents.length > 1) {
            let hole_files = [];
            let layer_files = []; let layer_contents = []; let field_files = []; let field_contents = [];
            // let topZ = contents[0].z;
            for (let i = 0; i < contents.length; i++) {
                if (contents[i].row === row && contents[i].col === col && contents[i].z === z) {
                    // let fileURL = process.env.REACT_APP_BASE_API_URL + files.path.substring(1) + "/" + contents[i].filename;
                    // current_files.push(fileURL);
                    // current_files.push([{ c: contents[i].channel, z: 0, t: 0 }, files[i]]);
                    hole_files.push({content: contents[i], file: files[i]});
                }
            }
            console.log("index.jsx : displayFiles : hole_files : -------- : ", hole_files);
            let minField = hole_files[0].content.field;
            for (let i = 0; i < hole_files.length; i++) {
                if (hole_files[i].content.field < minField) {
                    minField = hole_files[i].content.field;
                }
                // if (hole_files[i].content.z === topZ) {
                //     layer_files.push(hole_files[i].file);
                //     layer_contents.push(hole_files[i].content);                    
                // }
            }
            // console.log("index.jsx : displayFiles : layer_files, layer_contents : -------- : ", layer_files, layer_contents);
            for (let i = 0; i < hole_files.length; i++) {
                if (hole_files[i].content.field === minField) {
                    field_files.push(hole_files[i].file);
                    field_contents.push(hole_files[i].content);
                }
            }
            console.log("index.jsx : displayFiles : field_files, field_contents : -------- : ", field_files, field_contents);
            setSource({urlOrFile: field_files, contents: field_contents, description: ''});
        }
        // // }
    }

    useEffect(() => {
        // console.log("index.jsx : props.content -------- : ", props);
        if (props.content) {
            if (props.selectedVesselHole !== undefined && props.selectedVesselHole !== null) {
                displayFiles(props.content, props.files, props.selectedVesselHole.row, props.selectedVesselHole.col, props.selectedVesselZ);
            } else {
                displayFiles(props.content, props.files, props.content[0].row, props.content[0].col, props.selectedVesselZ);
            }
        }
    }, [props.content, props.selectedVesselHole, props.selectedVesselZ]);

    return (
        <ThemeProvider theme={darkTheme}>
            <Avivator source={source} isDemoImage />
        </ThemeProvider>
    );
}

export default connect(mapStateToProps)(RoutedAvivator);