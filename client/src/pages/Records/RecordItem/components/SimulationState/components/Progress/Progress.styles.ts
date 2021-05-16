import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            position: 'relative',
            height: 40,
            background: '#efefef',
            width:'100%'
        },
        progress: {
            position: 'absolute',
            top:0,
            bottom: 0,
            background: 'green',
            transition: 'width 1s'
        },
        selectingProgress: {
            position: 'absolute',
            top:0,
            bottom: 0,
            background: 'rgba(0, 0, 255, 0.2)'
        }
    })
);

export default useStyles;
