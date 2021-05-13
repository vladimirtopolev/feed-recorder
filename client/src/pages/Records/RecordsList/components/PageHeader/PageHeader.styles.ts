import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        wrapper: {
            background: '#ffffff',
            padding: theme.spacing(2, 0),
            boxShadow: '0 1px 3px 0 rgba(63, 63, 68, 0.15), 0 0 4px 0 rgba(63, 63, 68, 0.05);',
        },
        content: {
            display: 'flex'
        },
        buttons: {
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'flex-end'
        },
        button:{
            fontWeight: 500,
            padding: theme.spacing(1,3)
        },
        title: {
            color: theme.palette.grey[900],
            fontSize: '29px',
            lineHeight: 1.2,
            fontWeight: 500,
            textDecoration: 'none',
            padding: theme.spacing(1, 0),
            wordBreak: 'break-word',
        },
    })
);

export default useStyles;
