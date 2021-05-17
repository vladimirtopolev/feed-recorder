import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container:{
            border: '1px solid #efefef',
            padding: theme.spacing(1, 6),
            background: '#fafafa',

        },
        step: {
            color: 'red',
            fontWeight: 600,
            textAlign: 'center',
            fontSize: 42,
            lineHeight: '42px',
        },
        description: {
            color: '#7c7c7c',
            fontSize: 14,
            textAlign: 'center'
        }
    })
);

export default useStyles;
