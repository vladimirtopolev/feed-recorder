import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        step: {
            color: 'red',
            fontWeight: 600,
            textAlign: 'center',
            fontSize: 42,
            lineHeight: '42px',
        },
        description: {
            color: '#7c7c7c'
        }
    })
);

export default useStyles;
