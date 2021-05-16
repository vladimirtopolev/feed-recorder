import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            position: 'relative',
            height: 30,
            width:'100%'
        },
        timestamp: {
            position: 'absolute',
        },
        timestampChip: {
            marginLeft: '-50%'
        }
    })
);

export default useStyles;
