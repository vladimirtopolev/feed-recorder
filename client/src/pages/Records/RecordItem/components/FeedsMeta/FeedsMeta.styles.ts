import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        wrapper: {
            background: '#ffffff',
            boxShadow: '0 1px 3px 0 rgba(63, 63, 68, 0.15), 0 0 4px 0 rgba(63, 63, 68, 0.05);',
        },
        tableContainer: {
            position: 'relative'
        },
        loaderHolder: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        tableHead: {
            background: '#fafafa',
            borderTop: '1px solid rgba(224, 224, 224, 1)'
        },
        tableHeadCell: {
            fontWeight: 600,
            textTransform: 'uppercase'
        },
        tableHeadActions: {
            width: 130,
            fontWeight: 600,
            textTransform: 'uppercase'
        },
        header: {
            padding: theme.spacing(2),
            display: 'flex'
        },
        header__title:{
            flexGrow: 1,
            fontWeight: 600
        }
    })
);

export default useStyles;
