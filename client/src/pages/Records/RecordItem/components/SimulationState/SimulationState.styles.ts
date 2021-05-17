import {createStyles, makeStyles} from '@material-ui/core/styles';


const button = {
    height: 50,
    width: 50,
    minWidth: 50,
    borderRadius: '50%'
};
export const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            background: '#ffffff',
            boxShadow: '0 1px 3px 0 rgba(63, 63, 68, 0.15), 0 0 4px 0 rgba(63, 63, 68, 0.05);',

        },
        content: {
            padding: theme.spacing(2),
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        },
        titleContainer: {
            background: '#fafafa',
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
            width: '100%',
            padding: theme.spacing(1, 3),
            boxSizing: 'border-box'
        },
        title: {
            fontWeight: 600,
            fontSize: 18
        },
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
        },
        description: {
            textAlign: 'center'
        },
        progress: {
            width: '100%',
            margin: theme.spacing(1, 0)
        }
    })
);

export default useStyles;
