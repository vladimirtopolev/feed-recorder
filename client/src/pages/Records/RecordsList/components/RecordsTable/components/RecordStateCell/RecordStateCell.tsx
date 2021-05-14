import {FC} from 'react';
import {RECORD_STATE} from '../../../../../api/record';
import {Box} from '@material-ui/core';
import { PlayArrow as PlayArrowIcon, Pause as PauseIcon, } from '@material-ui/icons';

type RecordStateCellProps = {
    state: RECORD_STATE,
    steps: number
}

export const RecordStateCell: FC = () => {
    return (
        <>
            <Box>

            </Box>
        </>
    );
};