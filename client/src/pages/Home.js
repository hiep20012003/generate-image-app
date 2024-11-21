import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  Grid2,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import interior from "../images/home-hero-image.png";
import sketch from "../images/sketch_to_image.jpg";

const Home = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid2
        container
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: { xs: "strength", md: "center" },
          mt: { xs: 8, md: -4 },
        }}
        spacing={{ xs: 4, md: 4 }}
      >
        <Stack
          sx={{ textAlign: { xs: "center", md: "left" }, flex: 1 }}
          spacing={4}
        >
          <Typography gutterBottom variant="h4">
            Reimagine Your Spaces with AI-Powered Design
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            Transform ideas into stunning architectural and interior designs in
            seconds. Powered by cutting-edge Stable Diffusion technology.
          </Typography>
          <Grid2
            container
            spacing={2}
            justifyContent={{ xs: "center", md: "start" }}
          >
            <Button
              component={Link}
              to="/Text2Image"
              variant="contained"
              size="medium"
            >
              Generate by Text
            </Button>
            <Button
              component={Link}
              to="/Sketch2Image"
              variant="contained"
              size="medium"
            >
              Generate by Sketch
            </Button>
          </Grid2>
        </Stack>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Box sx={{ alignSelf: { xs: "center", md: "center" } }}>
              <Box
                component="img"
                sx={{ width: { xs: "100%", md: "360px" } }}
                srcSet={`${interior}?fit=crop&auto=format&dpr=2 2x`}
                src={`${interior}?fit=crop&auto=format`}
                alt={"interior"}
                loading="lazy"
              />
            </Box>
            <Box sx={{ alignSelf: { xs: "center", md: "end" } }}>
              <Box
                component="img"
                sx={{ width: { xs: "100%", md: "360px" } }}
                srcSet={`${sketch}?fit=crop&auto=format&dpr=2 2x`}
                src={`${sketch}?fit=crop&auto=format`}
                alt={"sketch"}
                loading="lazy"
              />
            </Box>{" "}
          </Box>
        </Box>
      </Grid2>
    </Container>
  );
};

export default Home;
