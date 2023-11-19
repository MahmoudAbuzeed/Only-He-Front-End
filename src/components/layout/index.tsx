import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
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
import { UsersPage } from "../../containers/Users";
import ProductDetailsPage from "../../containers/ProductDetails";
import LoginComponent from "../../containers/Login/loginComponent";

const ProductDetails = () => <ProductDetailsPage />;
const OrderDetails = () => <OrderDetailsPage />;
const Categories = () => <CategoriesPage />;
const Products = () => <ProductsPage />;
const Login = () => <LoginComponent />;
const Orders = () => <OrdersPage />;
const Users = () => <UsersPage />;

// Define a mapping between sidebar item text and their corresponding paths
const sidebarItemPaths: Record<string, string> = {
  Categories: "/categories",
  Products: "/products",
  Orders: "/orders",
  Users: "/users",
  Login: "/login",
};

const LayoutComponent: React.FC = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const history = useHistory();

  const handleListItemClick = (index: number, text: string) => {
    setSelectedIndex(index);
    const destinationPath = sidebarItemPaths[text];
    if (destinationPath && window.location.pathname !== destinationPath) {
      history.push(destinationPath);
    }
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
            {Object.keys(sidebarItemPaths).map((text, index) => (
              <ListItem
                button
                key={text}
                selected={selectedIndex === index}
                classes={
                  selectedIndex === index ? { selected: classes.selected } : {}
                }
                onClick={() => handleListItemClick(index, text)}
                component={Link}
                to={sidebarItemPaths[text]}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  classes={{ primary: classes.boldText }}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div style={{ marginTop: "64px" }}>
            <Switch>
              <Route exact path="/categories">
                <Categories />
              </Route>
              <Route exact path="/products">
                <Products />
              </Route>
              <Route exact path="/products/:productId">
                <ProductDetails />
              </Route>
              <Route exact path="/orders">
                <Orders />
              </Route>
              <Route exact path="/order/:orderId">
                <OrderDetails />
              </Route>
              <Route exact path="/users">
                <Users />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default LayoutComponent;
