
import {createStyles, makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        input: {
            marginRight: theme.spacing(2)
        },
        section: {
            padding: theme.spacing(2 , 0)
        },
        title: {
            fontWeight: 'bold',
        },
        button: {
            marginLeft: theme.spacing(2)
        },
        tableRow: {
            '&:nth-of-type(odd)': {
                backgroundColor: '#efefef',
            },
        },
        secondaryTable:{
            margin: theme.spacing(1, 0)
        },
        secondaryTableCell: {
            border: 'none'
        },
        secondaryTitleCell: {
            border: 'none',
            width: '30px',
            fontWeight: 'bold'
        },
    })
);

export default useStyles;