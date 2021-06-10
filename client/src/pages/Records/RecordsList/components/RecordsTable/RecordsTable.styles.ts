import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            background: '#ffffff',
            boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
        },
        tableHead: {
            background: '#fafafa',

        },
        tableHeadCell: {
            fontWeight: 600
        },
        tableBodyCellActions: {
            width: 130
        },
        tablePagination:{
            border: 'none'
        }
    })
);