import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column'
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
