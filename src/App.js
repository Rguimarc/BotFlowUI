
import './App.css';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import { Button, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import BookIcon from '@material-ui/icons/Book';
import ForumIcon from '@material-ui/icons/Forum';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import Drawer from '@material-ui/core/Drawer';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Container from '@material-ui/core/Container';
import DialogBuilder from './dialogBuilder';
 

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  appBar: {
    // Make the app bar z-index always one more than the drawer z-index
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
        <AppBar className={classes.appBar} >
          <Toolbar>
            <IconButton>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              BotFlowUI
            </Typography>
            <Button></Button>
          </Toolbar>
        </AppBar>
      </header>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Histórias', 'Intenções'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{text === 'Histórias' ? <BookIcon /> : <ForumIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Entidades', 'Ações'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{text === 'Entidades' ? <EmojiObjectsIcon /> : <FlashOnIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Container>
      <div style={{ padding: 200 }}>
         <DialogBuilder></DialogBuilder>
      </div>

      </Container>
      
    </div>
  );
}

export default App;
