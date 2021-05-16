import {FC} from 'react';
import {Box} from '@material-ui/core';
import {TimestampLabel} from '../../../../../../../api/record';

type LabelDashboardProps = {
    step: number,
    labels: TimestampLabel[]
}
export const LabelDashboard: FC<LabelDashboardProps> = ({step}) => {
    return (
        <Box>
        </Box>
    );
};