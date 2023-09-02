// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from "react";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import MuiCard, { CardProps } from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import MuiFormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";

// ** Icons Imports
import Google from "mdi-material-ui/Google";
import Github from "mdi-material-ui/Github";
import Twitter from "mdi-material-ui/Twitter";
import Facebook from "mdi-material-ui/Facebook";
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

// ** Demo Imports
import { Link } from "react-router-dom";
import themeConfig from "../../configs/themeConfig";
import BlankLayout from "../../@core/layouts/BlankLayout";

interface State {
  password: string;
  showPassword: boolean;
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { width: "28rem" },
}));

const LinkStyled = styled("a")(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
  ({ theme }) => ({
    "& .MuiFormControlLabel-label": {
      fontSize: "0.875rem",
      color: theme.palette.text.secondary,
    },
  })
);

const LoginComponent = () => {
  // ** State
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      className="content-center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Card sx={{ width: 4, textAlign: "center" }}>
        <CardContent sx={{ mb: 8 }}>
          <Box
            sx={{
              mb: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                lineHeight: 1,
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "1.5rem !important",
                marginTop: "2rem",
              }}
            >
              Only He
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: 1.5 }}
            >
              Welcome to Only He! 👋🏻
            </Typography>
            <Typography variant="body2">
              Please sign-in to your account and start the adventure
            </Typography>
          </Box>
          <form
            noValidate
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              autoFocus
              fullWidth
              id="email"
              label="Email"
              sx={{ marginBottom: 4 }}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="auth-login-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                value={values.password}
                id="auth-login-password"
                onChange={handleChange("password")}
                type={values.showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility"
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                mb: 4,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel control={<Checkbox />} label="Remember Me" />
              <Link href="/" to={undefined}>
                <LinkStyled onClick={(e) => e.preventDefault()}>
                  Forgot Password?
                </LinkStyled>
              </Link>
            </Box>
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginBottom: 7 }}
              onClick={() => console.log("clicked")}
            >
              Login
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant="body2">
                <Link href="/" to={undefined}>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box>
            <Divider sx={{ my: 5 }}>or</Divider>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link href="/" to={undefined}>
                <IconButton
                  component="a"
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <Facebook sx={{ color: "#497ce2" }} />
                </IconButton>
              </Link>
              <Link href="/" to={undefined}>
                <IconButton
                  component="a"
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <Twitter sx={{ color: "#1da1f2" }} />
                </IconButton>
              </Link>
              <Link href="/" to={undefined}>
                <IconButton
                  component="a"
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <Github
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === "light"
                          ? "#272727"
                          : theme.palette.grey[300],
                    }}
                  />
                </IconButton>
              </Link>
              <Link href="/" to={undefined}>
                <IconButton
                  component="a"
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  <Google sx={{ color: "#db4437" }} />
                </IconButton>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

LoginComponent.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default LoginComponent;