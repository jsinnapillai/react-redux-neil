import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../api/agent";
import { useState } from "react";
import { toast } from "react-toastify";

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState([]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const handleApiErrors = (errors: any) => {
    console.log(errors);
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes("Passwords")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }
      });
    }
  };

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data) =>
          agent.Account.register(data)
            .then(() => {
              toast.success("registration succefull - now you can login ");
              navigate("/login");
            })
            .catch((error) => handleApiErrors(error))
        )}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          autoFocus
          {...register("username", { required: "User Name Required" })}
          error={!!errors.username}
          helperText={errors.username?.message as string}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          {...register("email", {
            required: "email Required",
            pattern: {
              value: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
              message: "Not a valid Email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message as string}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register("password", {
            required: "Password Required",
            pattern: {
              value:
                /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
              message: "Password does not meet required  complexity ",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message as string}
        />

        <LoadingButton
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
          <Grid item>
            <Link to="/login" style={{ textDecoration: "none" }}>
              {"Already have an Account ? Sign in"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
