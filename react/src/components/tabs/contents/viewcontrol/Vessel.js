import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import Card from '@mui/material/Card';
import { getVesselById } from '../../../../utils/vessel-types';
import { useElementSize } from 'usehooks-ts';
import Dishes from '../../../vessels/Dishes';
import Slides from '../../../vessels/Slides';
import WellPlates from '../../../vessels/WellPlates';
import Wafers from '../../../vessels/Wafers';
import {
    mdiSyncAlert,
    mdiImageFilterCenterFocus,
} from '@mdi/js';
import { SelectDialog } from '../../../vessels/SelectDialog';
import { ExpansionDialog } from '../../../vessels/ExpansionDialog';
import CustomButton from '../../../custom/CustomButton';

export default function Vessel(props) {

    const [currentVesselId, setCurrentVesselId] = useState(1);
    const [currentVessel, setCurrentVessel] = useState(getVesselById(1));
    const [showSelectDialog, setShowSelectDialog] = useState(false);
    const [showExpansionDialog, setShowExpansionDialog] = useState(false);

    const [ref, { width, height }] = useElementSize();

    useEffect(() => {
        setCurrentVessel(getVesselById(currentVesselId));
    }, [currentVesselId]);

    if (currentVessel == null) {
        return (
            <></>
        );
    }

    const renderVessel = () => {
        if (currentVessel) {
            switch (currentVessel.type) {
                case 'Slide':
                    return <Slides width={width} count={currentVessel.count} />;
                case 'WellPlate':
                    return <WellPlates width={width} rows={currentVessel.rows} cols={currentVessel.cols} showName={currentVessel.showName} />;
                case 'Dish':
                    return <Dishes width={width} size={currentVessel.size} />;
                case 'Wafer':
                    return <Wafers width={width} size={currentVessel.size} />;
            }
        }
    }

    return (
        <Card ref={ref}>
            <div>
                <h5>{currentVessel.title}</h5>
            </div>
            {renderVessel()}
            <Row className="mt-1 d-flex justify-content-around common-border">
                {/* <SyncAltIcon role="button" className="primary--text" onClick={() => { setShowSelectDialog(true) }} />
                <CenterFocusStrongIcon role="button" className="primary--text" onClick={() => { setShowExpansionDialog(true) }} /> */}
                <CustomButton icon={mdiSyncAlert} onClick={() => { setShowSelectDialog(true) }}></CustomButton>
                <CustomButton icon={mdiImageFilterCenterFocus} onClick={() => { setShowExpansionDialog(true) }}></CustomButton>
            </Row>
            <SelectDialog currentVessel={currentVesselId} open={showSelectDialog} closeDialog={() => { setShowSelectDialog(false) }} changeVessel={(id) => { setCurrentVesselId(id); setCurrentVessel(getVesselById(id)); }} />
            <ExpansionDialog currentVessel={currentVesselId} open={showExpansionDialog} closeDialog={() => { setShowExpansionDialog(false) }} />
        </Card>
    );
}