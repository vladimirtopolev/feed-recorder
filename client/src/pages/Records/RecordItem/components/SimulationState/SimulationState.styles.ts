import {createStyles, makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
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
