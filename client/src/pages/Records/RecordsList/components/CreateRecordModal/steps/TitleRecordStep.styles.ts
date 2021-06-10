
import {createStyles, makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        input: {
            width: '100%',
            marginBottom: theme.spacing(3)
        },
        createTypeContainer: {
            display: 'flex',
            justifyContent: 'center'
        },
        button: {
            marginLeft: theme.spacing(2)
        }
    })
);

export default useStyles;