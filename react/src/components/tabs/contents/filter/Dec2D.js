import SmallCard from '../../../custom/SmallCard'
import CustomButton from '../../../custom/CustomButton'
import {
    mdiPlayCircle,
    mdiCog
} from '@mdi/js'
import * as React from 'react';
import Dec2dDialog from "./dialog/Dec2dDialog";
import { useFlagsStore } from "../../../../components/state";

export default function Dec2D() {

    const dialogFlag = useFlagsStore(store => store.dialogFlag);

    const select2 = () => {
        console.log("Select-2")
    }
    const show2Ddialog = () => {
        useFlagsStore.setState({ dialogFlag: true });
    };

    return (
        <div className=''>
            <SmallCard title="2D Deconvolution">
                <CustomButton icon={mdiPlayCircle} label="2DGo" click={show2Ddialog} />
                <CustomButton icon={mdiCog} label="2DSet" click={select2} />
            </SmallCard>
            {dialogFlag && <Dec2dDialog />}
        </div>
    )
}