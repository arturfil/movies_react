import { LoadingButton } from "@mui/lab";
import { Container, Grid, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loginUser } from "./accountSlice";

export default function LoginPage() {
  const { token, error } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (token !== "") navigate("/");
  }, [token]);

  async function handleSubmit(event: any) {
    event.preventDefault();
    await dispatch(loginUser({ email, password }));
  }

  return (
    <Container sx={{ marginTop: 10, display: "flex", flexDirection: "column" }}>
      <Grid
        sx={{
          textAlign: "center",
          maxWidth: 500,
          width: 400,
          justifyContent: "center",
          margin: "0 auto",
          backgroundColor: "lightgrey",
          padding: 5,
          borderRadius: 5,
        }}
      >
        <Typography sx={{ fontWeight: 600, marginBottom: 2 }} variant="h4">
          Log In
        </Typography>
        <Grid className="form" container spacing={3}>
          <Grid item xs={12}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              fullWidth
              label="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              fullWidth
              label="password"
            />
          </Grid>
          <Grid item xs={12}>
              <Typography>
                  {error}
              </Typography>
          </Grid>
          <Grid item sx={{ textAlign: "left" }} xs={12}>
            <LoadingButton onClick={handleSubmit} variant="contained">
              Log In
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
