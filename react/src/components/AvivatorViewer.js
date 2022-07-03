import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { FullScreen } from '@chiragrupani/fullscreen-react';
// import sources from './source-info';
// import { useLocation } from 'react-router-dom';
// import { getNameFromUrl } from './utils';
import {
    mdiFullscreen,
    mdiMinus,
    mdiPlus
} from '@mdi/js';
import Icon from '@mdi/react';
import { Stage, Layer, Image } from "react-konva";

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

export default function AvivatorViewer(props) {

    const source = {
        urlOrFile: "https://viv-demo.storage.googleapis.com/Vanderbilt-Spraggins-Kidney-MxIF.ome.tif",
        description: "OME-TIFF Covid-19 Primary Gut Epithelial Stem Cells"
    }
    const [urlSource, setUrlSource] = useState(null);
    // ZoomContol + FullScreen
    let [isFullScreen, setFullScreen] = useState(false);
    let [mouseFlag, setMouseFlag] = useState(0);
    const zoomControl = (type) => {
        if (type === "fullScreen") {
            setFullScreen(!isFullScreen);
        } else if (type === "zoomIn") {
            setMouseFlag(1);
        } else if (type === "zoomOut") {
            setMouseFlag(-1);
        }

    }
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
        console.log(props.openedImageSource, "viv index : image file");
        if (props.openedImageSource !== undefined) {
            console.log(props.openedImageSource, "2 viv index : image file");
            setUrlSource(props.openedImageSource);
        }
    }, [props.openedImageSource]);

    return (
        <>
            <FullScreen isFullScreen={isFullScreen} onChange={(isFullScreen) => { setFullScreen(isFullScreen) }} className="bg-light">
                <div className='leaf_control'>
                    <button className='leaf_control_btn border-bottom' onClick={() => { zoomControl("zoomIn") }} style={{ borderRadius: "5px 5px 0px 0px" }}>
                        <Icon size={1}
                            horizontal
                            vertical
                            rotate={180}
                            color="#212529"
                            path={mdiPlus}>
                        </Icon>
                    </button>
                    <button className='leaf_control_btn border-bottom' onClick={() => { zoomControl("zoomOut") }} >
                        <Icon size={1}
                            horizontal
                            vertical
                            rotate={180}
                            color="#212529"
                            path={mdiMinus}>
                        </Icon>
                    </button>
                    <button className="leaf_control_btn" onClick={() => { zoomControl("fullScreen") }} style={{ borderRadius: "0px 0px 5px 5px" }}>
                        <Icon size={1}
                            horizontal
                            vertical
                            rotate={180}
                            color="#212529"
                            path={mdiFullscreen}>
                        </Icon>
                    </button>
                </div>
                <div className="bg-light h-100">
                    <ThemeProvider theme={darkTheme}>
                      <Stage width={props.width} height={props.height}>
                              <Layer>
                                <Image image={props.image} />
                              </Layer>
                          </Stage>
                    </ThemeProvider>
                </div>
            </FullScreen>
        </>
    );
}
