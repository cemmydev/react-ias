import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import shallow from 'zustand/shallow';

import {
    useChannelsStore,
    useImageSettingsStore,
    useViewerStore
} from '../../../state';

function LensSelect() {
    const selections = useChannelsStore(store => store.selections);
    const [lensEnabled, toggleLensEnabled, lensSelection] = useImageSettingsStore(
        store => [store.lensEnabled, store.toggleLensEnabled, store.lensSelection],
        shallow
    );
    const channelOptions = useViewerStore(store => store.channelOptions);
    const currChannelIndices = selections.map(sel => sel.c);

    const checkboxColor = `rgb(${[0, 0, 0]})`;
    return (
        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <Grid item xs={2}>
                Lens:
            </Grid>
            <Grid item xs={2}>
                <Checkbox
                    onChange={toggleLensEnabled}
                    checked={lensEnabled}
                    style={{
                        color: checkboxColor,
                        '&$checked': {
                            color: checkboxColor
                        }
                    }}
                />
            </Grid>
            <Grid item xs={7}>
                <Select
                    native
                    variant="standard"
                    value={lensSelection}
                    onChange={e =>
                        useImageSettingsStore.setState({ lensSelection: e.target.value })
                    }
                >
                    {currChannelIndices.map((channelIndex, relativeIndex) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option
                            key={channelOptions[channelIndex] + String(relativeIndex)}
                            value={relativeIndex}
                        >
                            {channelOptions[channelIndex]}
                        </option>
                    ))}
                </Select>
            </Grid>
        </Grid>
    );
}

export default LensSelect;