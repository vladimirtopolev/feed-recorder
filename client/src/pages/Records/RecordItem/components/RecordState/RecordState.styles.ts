import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        wrapper: {
            background: '#ffffff',
            boxShadow: '0 1px 3px 0 rgba(63, 63, 68, 0.15), 0 0 4px 0 rgba(63, 63, 68, 0.05);',
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing(2),
        },
        buttons: {
            display: 'flex',
            justifyContent: 'center'
        },
        playButton: {
            color: '#4caf50'
        },
        stopButton: {
            color: '#f44336'
        },
        pauseButton: {
            color: '#ffeb3b'
        },
        description:{
            textAlign: 'center'
        }

    })
);

export default useStyles;
