import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Avivator from './Avivator';
// import sources from './source-info';
// import { useLocation } from 'react-router-dom';
// import { getNameFromUrl } from './utils';

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

// function getRandomSource() {
//     return sources[Math.floor(Math.random() * sources.length)];
// }
// https://reactrouter.com/web/example/query-parameters
// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }

export default function RoutedAvivator(props) {

    // const source = {
    //     urlOrFile: "https://viv-demo.storage.googleapis.com/Vanderbilt-Spraggins-Kidney-MxIF.ome.tif",
    //     // urlOrFile: "http://localhost:8000/static/LiveDead2_Plate_R_p00_0_D03f00d3.TIF",
    //     description: "OME-TIFF Covid-19 Primary Gut Epithelial Stem Cells"
    // }
    const [urlSource, setUrlSource] = useState(null);
    // const [urlSource, setUrlSource] = useState(source);

    // const query = useQuery();
    // const url = query.get('image_url');
    // const {
    //   routeProps: { history }
    // } = props;
    // if (url) {
    //   const urlSrouce = {
    //     urlOrFile: url,
    //     description: getNameFromUrl(url)
    //   };
    //   return (
    //     <ThemeProvider theme={darkTheme}>
    //       <Avivator source={urlSrouce} history={history} />
    //     </ThemeProvider>
    //   );
    // }
    // const source = getRandomSource();
    // const history = [];

    useEffect(() => {
        if (props.openedImageSource !== undefined && props.openedImageSource !== null) {
            console.log(props.openedImageSource, "2 viv index : image file");
            setUrlSource(props.openedImageSource);
        }
    }, [props.openedImageSource]);

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Avivator source={urlSource} />
            </ThemeProvider>
        </>
    );
}
