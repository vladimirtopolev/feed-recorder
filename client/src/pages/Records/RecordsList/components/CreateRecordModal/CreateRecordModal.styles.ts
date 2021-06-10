
import {createStyles, makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        modal: {
            minWidth: '600px'
        }
    })
);

export default useStyles;
