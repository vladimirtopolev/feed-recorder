import {FC} from 'react';
import {Container, AppBar, Box, Toolbar, SvgIcon, List, ListItem, ListItemText} from '@material-ui/core';
import {AllInclusive} from '@material-ui/icons';
import {useStyles} from './DefaultLayout.styles';
import {NavLink} from 'react-router-dom';

export const DefaultLayout: FC = ({children})=> {
    const classes = useStyles();
    return (
        <>
            <AppBar className={classes.appBar} position="static">
                <Container className={classes.header}>
                    <AllInclusive className={classes.logo}/>
                    <Toolbar className={classes.toolbar}>
                        <Box className={classes.links}>
                            <List component="nav" aria-label="header main navigation" disablePadding className={classes.linksContainer}>
                                <ListItem button component={NavLink}  to={'/patterns'} className={classes.link}>
                                    Patterns
                                </ListItem>
                                <ListItem button component={NavLink}  to={'/records'} className={classes.link}>
                                    Records
                                </ListItem>
                            </List>
                        </Box>
                        <Box>
                            <SvgIcon>
                                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                            </SvgIcon>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box component="main">
                {children}
            </Box>
        </>
    )
}