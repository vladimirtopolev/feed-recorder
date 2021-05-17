import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            padding: theme.spacing(2, 0, 1)
        },
        label: {
            textAlign: 'center',
            fontWeight: 600,
            marginBottom: theme.spacing(1),
        }
    })
);

export default useStyles;
