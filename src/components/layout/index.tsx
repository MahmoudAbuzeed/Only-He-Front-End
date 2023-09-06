import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  CssBaseline,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/Inbox";
import MailIcon from "@material-ui/icons/Mail";

// Your page components
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#3f51b5",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    paddingTop: "64px",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    paddingTop: "64px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  selected: {
    backgroundColor: "#3f51b5 !important",
    color: "white",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#3f51b5 !important",
    },
  },
  boldText: {
    fontWeight: 'bold',
  },
}));

const LayoutComponent: React.FC = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Only-He Dashboard</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={`${classes.drawer} ${
            drawerOpen ? classes.drawerOpen : classes.drawerClose
          }`}
          classes={{
            paper: `${drawerOpen ? classes.drawerOpen : classes.drawerClose}`,
          }}
        >
         <List>
          {["Categories", "Products", "Orders", "Users"].map((text, index) => (
            <ListItem
              button
              key={text}
              selected={selectedIndex === index}
              classes={selectedIndex === index ? { selected: classes.selected } : {}}
              onClick={() => handleListItemClick(index)}
              component={Link}
              to={text.toLowerCase()}
            >
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} classes={{ primary: classes.boldText }} />
            </ListItem>
          ))}
        </List>
        </Drawer>
      </div>
    </Router>
  );
};

export default LayoutComponent;
