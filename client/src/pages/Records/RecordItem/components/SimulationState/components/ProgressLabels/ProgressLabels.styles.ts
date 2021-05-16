import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            position: 'relative',
            height: 20,
            width:'100%'
        },
        label: {
            position: 'absolute',
            width: 10,
            height: 10,
            marginLeft: -5,
            background: 'red',
            borderRadius: '50%'
        },
        startLabel: {
            position: 'absolute',
            left: 0,
            fontSize: 12
        },
        endLabel: {
            position: 'absolute',
            right: 0,
            fontSize: 12
        }


    })
);

export default useStyles;
