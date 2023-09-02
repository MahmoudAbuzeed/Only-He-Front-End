// ** React Imports
import { useState, Fragment, ChangeEvent, MouseEvent, ReactNode } from "react";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
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
import { Link } from "react-router-dom";
import BlankLayout from "../../@core/layouts/BlankLayout";

interface State {
  password: string;
  showPassword: boolean;
  email: string;
  firstname: string;
  lastname: string;
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
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(4),
    "& .MuiFormControlLabel-label": {
      fontSize: "0.875rem",
      color: theme.palette.text.secondary,
    },
  })
);

const RegisterComponent = () => {
  // ** States
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
    email: "",
    firstname: "",
    lastname: "",
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

  console.log({values})
  return (
    <Box
      className="content-center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Card sx={{ width: 4, textAlign: "center" }}>
        <CardContent
        >
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
              Adventure starts here 🚀
            </Typography>
            <Typography variant="body2">
              Make your journey easy and fun!
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
              id="firstname"
              label="Firstname"
              onChange={handleChange("firstname")}
              sx={{ marginBottom: 4 }}
            />
            <TextField
              autoFocus
              fullWidth
              id="lastname"
              label="Lastname"
              onChange={handleChange("lastname")}
              sx={{ marginBottom: 4 }}
            />
            <TextField
              fullWidth
              type="email"
              label="Email"
              onChange={handleChange("email")}
              sx={{ marginBottom: 4 }}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="auth-register-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                value={values.password}
                id="auth-register-password"
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
                      {values.showPassword ? (
                        <EyeOutline fontSize="small" />
                      ) : (
                        <EyeOffOutline fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Fragment>
                  <span>I agree to </span>
                  <Link href="/" to={undefined}>
                    <LinkStyled
                      onClick={(e: MouseEvent<HTMLElement>) =>
                        e.preventDefault()
                      }
                    >
                      privacy policy & terms
                    </LinkStyled>
                  </Link>
                </Fragment>
              }
            />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ marginBottom: 7 }}
            >
              Sign up
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
                Already have an account?
              </Typography>
              <Typography variant="body2">
                <Link href="/" to={undefined}>
                  <LinkStyled>Sign in instead</LinkStyled>
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

RegisterComponent.getLayout = (page: ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
);

export default RegisterComponent;