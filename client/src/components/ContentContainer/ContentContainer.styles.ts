import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1
        },
        header: {

        },
        content: {
            flexGrow: 1,
            position: 'relative',
            padding: theme.spacing(4, 0),
        },
        loaderContainer: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',


        }
    })
);

export default useStyles;
