import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#02897bff",
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
    backgroundColor: "#02897bff !important",
    color: "white",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#02897bff !important",
    },
  },
  boldText: {
    fontWeight: "bold",
  },
}));
