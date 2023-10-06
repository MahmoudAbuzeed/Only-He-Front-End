import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
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
  CssBaseline,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/Inbox";
import MailIcon from "@material-ui/icons/Mail";
import { useStyles } from "./styles";
import { CategoriesPage } from "../../containers/Categories";
import { ProductsPage } from "../../containers/Products";
import { OrdersPage } from "../../containers/Orders";
import { OrderDetailsPage } from "../../containers/OrderDetails";

const Categories = () => <CategoriesPage />;
const Products = () => <ProductsPage />;
const Orders = () => <OrdersPage />;
const OrderDetails = () => <OrderDetailsPage />;

const Users = () => <div>Users Page</div>;

// Your page components

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
            {["Categories", "Products", "Orders", "Users"].map(
              (text, index) => (
                <ListItem
                  button
                  key={text}
                  selected={selectedIndex === index}
                  classes={
                    selectedIndex === index
                      ? { selected: classes.selected }
                      : {}
                  }
                  onClick={() => handleListItemClick(index)}
                  component={Link}
                  to={text.toLowerCase()}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    classes={{ primary: classes.boldText }}
                  />
                </ListItem>
              )
            )}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div style={{ marginTop: "64px" }}>
            <Switch>
              <Route path="/categories">
                <Categories />
              </Route>
              <Route path="/products">
                <Products />
              </Route>

              <Route path="/orders">
                <Orders />
              </Route>

              <Route path="/order/:orderId">
                <OrderDetailsPage />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default LayoutComponent;
