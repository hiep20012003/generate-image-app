import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Container, Grid2, Box } from "@mui/material";
import { useSelector } from "react-redux";
import Alerts from "../components/Alerts";

const DefaultLayout = ({ children }) => {
  const [isOpenAlert, setOpenAlert] = useState(true);
  const alerts = useSelector((state) => state.alerts);

  useEffect(() => {
    if (alerts) setOpenAlert(true);
  }, [alerts]);

  return (
    <Box
      component="div"
      sx={{
        padding: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Alerts queue={alerts} open={isOpenAlert} />

      <Header />
      <Grid2 container sx={{ flexGrow: 1 }}>
        {children}
      </Grid2>
    </Box>
  );
};

export default DefaultLayout;
