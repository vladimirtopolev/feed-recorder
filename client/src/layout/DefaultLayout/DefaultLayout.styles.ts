import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        },
        content: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            background: '#f5f5f5'
        },
        appBar: {
            height: 80,
            padding: theme.spacing(2, 0)
        },
        header:{
            display: 'flex'
        },
        logo:{
            fontSize: 48,
            marginRight: theme.spacing(2)
        },
        toolbar:{
            minHeight: 48,
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
        },
        links:{
            flexGrow: 1
        },
        linksContainer:{
            display: 'flex'
        },
        link:{
            width: 'auto'
        }
    })
);

export default useStyles;
