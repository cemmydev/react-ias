import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Logout from '@mui/icons-material/Logout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SchoolIcon from '@mui/icons-material/School';
import TuneIcon from '@mui/icons-material/Tune';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import BiotechIcon from '@mui/icons-material/Biotech';
import EditOffIcon from '@mui/icons-material/EditOff';
import PollIcon from '@mui/icons-material/Poll';
import EngineeringIcon from '@mui/icons-material/Engineering';
// import LinearProgress from '@mui/material/LinearProgress';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import RoutedAvivator from "../components/viv";
import DLMLTab from "../components/tabs/DLMLTab";
import AdjustTab from "../components/tabs/AdjustTab";
import FilterTab from "../components/tabs/FilterTab";
import FileTab from "../components/tabs/FileTab";
import ViewTab from "../components/tabs/ViewTab";
import MeasureTab from "../components/tabs/MeasureTab";
import ReportTab from "../components/tabs/ReportTab";
import SettingsTab from "../components/tabs/SettingsTab";
import store from "../reducers";
import { connect } from "react-redux";
import { getWindowDimensions } from "../components/helpers";

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 0 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
    files: state.files.files,
    isFilesAvailable: state.files.isFilesAvailable,
    filesChosen: state.files.filesChosen,
    isFilesChosenAvailable: state.files.isFilesChosenAvailable,

})

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

const MainFrame = (props) => {

    const imageViewAreaRef = useRef(null);
    const { height } = getWindowDimensions();
    const handleResize = () => {
        localStorage.setItem("imageViewSizeWidth", imageViewAreaRef.current.offsetWidth);
        localStorage.setItem("imageViewSizeHeight", imageViewAreaRef.current.offsetHeight);
    };
    const [rightTabVal, setRightTabVal] = useState(0);
    const [leftTabVal, setLeftTabVal] = useState(3);
    const handleRightTabChange = (event, newValue) => {
        setRightTabVal(newValue);
    };
    const handleLeftTabChange = (event, newValue) => {
        setLeftTabVal(newValue);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        store.dispatch({ type: "auth_logOut" });
    };

    const [filesChosen, setFilesChosen] = useState(props.filesChosen);
    const [filesDisplayed, setFilesDisplayed] = useState([]);
    const [files, setFiles] = useState(props.files);
    const [widthImage, setWidthImage] = useState(window.innerWidth);
    const [heightImage, setHeightImage] = useState(window.innerHeight);

    useEffect(() => {
        handleResize();
    }, [imageViewAreaRef]);

    useEffect(() => {
        if (props.files) {
            setFiles(files);
        }
    }, [props.files])

    const HeaderContent = () => {
        return (
            <Box sx={{ flexGrow: 1, height: "65px" }}>
                <ThemeProvider theme={darkTheme}>
                    <AppBar className="main-header" position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit" >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <img
                                    width="116"
                                    height="48"
                                    src='./assets/images/logo75.png'
                                    alt="Logo"
                                />
                            </Typography>
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                </Menu>
                                <IconButton size="large">
                                    <Avatar sx={{ width: 30, height: 30, bgcolor: blue[500] }}> JM </Avatar>
                                </IconButton>

                                <IconButton
                                    size="large"
                                    onClick={handleLogout}
                                    color="inherit"
                                >
                                    <Logout />
                                </IconButton>

                            </div>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
        );
    }

    return (
        <>
            <HeaderContent />
            <Container fluid={true} className="p-0" style={{ height: (height - 65).toString() + "px" }}>
                <Row noGutters>
                    <Col xs={2} className='p-2 border-right' style={{ height: (height - 65).toString() + "px", overflowY: "auto" }}> {/* Left Panel */}
                        <div className='card border'>
                            <Tabs
                                // variant="scrollable"
                                value={leftTabVal} onChange={handleLeftTabChange}
                                aria-label="tabs example"
                                TabIndicatorProps={{
                                    style: {
                                        flexDirection: "row-right",
                                        justifyContent: "flex-start"
                                    }
                                }}
                            >
                                <Tab className='tab-button' icon={<SchoolIcon />} aria-label="school" />
                                <Tab className='tab-button' icon={<TuneIcon />} aria-label="tune" />
                                <Tab className='tab-button' icon={<FilterAltIcon />} aria-label="filter" />
                                <Tab className='tab-button' icon={<InsertDriveFileIcon />} aria-label="file" />
                            </Tabs>
                            {leftTabVal === 0 && <TabContainer ><DLMLTab /></TabContainer>}
                            {leftTabVal === 1 && <TabContainer><AdjustTab /></TabContainer>}
                            {leftTabVal === 2 && <TabContainer><FilterTab /></TabContainer>}
                            {leftTabVal === 3 && <TabContainer><FileTab/></TabContainer>}
                        </div>
                    </Col>
                    <Col xs={8} ref={imageViewAreaRef} style={{ backgroundColor: "#ddd", height: (height - 65).toString() + "px", overflowY: "auto" }}> {/* Central Panel, Viv Image Viewer */}
                        <RoutedAvivator />
                    </Col>
                    <Col xs={2} className='border-left p-2' style={{ height: (height - 65).toString() + "px", overflowY: "auto" }}>
                        <div className='card border'>
                            <Tabs
                                allowScrollButtonsMobile
                                value={rightTabVal} onChange={handleRightTabChange}
                                aria-label="scrollable auto tabs example">
                                <Tab className='tab-button' variant="fullWidth" icon={<BiotechIcon />} aria-label="BiotechIcon" />
                                <Tab className='tab-button' variant="fullWidth" icon={<EditOffIcon />} aria-label="EditOffIcon" />
                                <Tab className='tab-button' variant="fullWidth" icon={<PollIcon />} aria-label="PollIcon" />
                                <Tab className='tab-button' variant="fullWidth" icon={<EngineeringIcon />} aria-label="EngineeringIcon" />
                            </Tabs>
                            {rightTabVal === 0 && <TabContainer><ViewTab /></TabContainer>}
                            {rightTabVal === 1 && <TabContainer><MeasureTab /></TabContainer>}
                            {rightTabVal === 2 && <TabContainer><ReportTab /></TabContainer>}
                            {rightTabVal === 3 && <TabContainer><SettingsTab /></TabContainer>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default connect(mapStateToProps)(MainFrame);
