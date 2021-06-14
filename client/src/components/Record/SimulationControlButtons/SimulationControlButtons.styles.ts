import {createStyles, makeStyles} from '@material-ui/core/styles';


const button = {
    height: 50,
    width: 50,
    minWidth: 50,
    borderRadius: '50%'
};
export const useStyles = makeStyles((theme) =>
    createStyles({
        buttons: {
            display: 'flex',
            justifyContent: 'center',
            margin: theme.spacing(1, 0)
        },
        playButton: {
            ...button,
            border: '4px solid #4caf50',
            color: '#4caf50'
        },
        stopButton: {
            color: '#f44336'
        },
        pauseButton: {
            color: '#ffeb3b',
            fontSize: 48
        }
    })
);

export default useStyles;
