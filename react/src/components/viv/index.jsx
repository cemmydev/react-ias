import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Avivator from './Avivator';
import { } from "../../reducers/modules/filesReducer";
// import sources from './source-info';
// import { useLocation } from 'react-router-dom';
// import { getNameFromUrl } from './utils';

const mapStateToProps = (state) => ({
    content: state.files.files
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

    const [source, setSource] = useState(props.content);

    useEffect(() => {
        console.log("Viv viewer index.js props.content : ", props.content);
        if (props.content) {
            let source = {
                urlOrFile: process.env.REACT_APP_BASE_API_URL + "static/" + props.content[0].file["name"],
                description: "",
            }
            setSource(source);
        }
    }, [props.content])
    // const query = useQuery();
    // const {
    //     routeProps: { history }
    // } = props;
    // return (
    //     <ThemeProvider theme={darkTheme}>
    //         <Avivator source={source} history={history} />
    //     </ThemeProvider>
    // );

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Avivator source={source} />
            </ThemeProvider>
        </>
    );
}

export default connect(mapStateToProps)(RoutedAvivator);