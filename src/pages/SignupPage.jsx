import Header from "../components/Header";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { signup } from "../utils/api_users";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

const SignupPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    //check if any field empty
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Fill in all the fields");

      // check if password = confirm password
    } else if (password !== confirmPassword) {
      toast.error("Passwords should match");
    } else {
      try {
        const userData = await signup(name, email, password);
        // set cookie
        setCookie("currentuser", userData, {
          maxAge: 60 * 60 * 8, // expire in 8 hours
        });
        // toast and navigate
        toast.success("Account has been created!");
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Header current="signup" title="Signup" />
      <Container maxWidth="md">
        <Card variant="outlined" sx={{ p: 4 }}>
          <CardContent>
            <Box mb={2}>
              <Typography>Name</Typography>
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <Typography>Email</Typography>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <Typography>Password</Typography>
              <TextField
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box mb={2}>  
              <Typography>Confirm password</Typography>
              <TextField
                type="password"
                label="Confirm password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                handleSignup();
              }}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};

export default SignupPage;
