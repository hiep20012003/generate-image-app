import React, { useEffect, useState } from "react";
import {
  Box,
  Grid2,
  Typography,
  Container,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import PhotoIcon from "@mui/icons-material/Photo";
import { useSelector } from "react-redux";
import ui from "../reducers/loading";

const GeneratedImage = () => {
  const { image } = useSelector((state) => state.comfy);
  const { isLoading } = useSelector((state) => state.ui);

  useEffect(() => {}, []);

  const handleDownload = (e) => {};

  return (
    <Paper raised elevation={6} sx={{ height: "100%" }}>
      <Grid2
        container
        direction="column"
        sx={{ px: 4, py: 4, height: "100%" }}
        spacing={2}
      >
        <Paper
          variant="outlined"
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading === true && !image ? (
            <CircularProgress />
          ) : image ? (
            <Box
              component="img"
              alt="image generate"
              src={image}
              sx={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <PhotoIcon color="disabled" sx={{ height: "80%", width: "auto" }} />
          )}
        </Paper>
        <Grid2 container sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={!image}
            href={image}
            download="image.png"
          >
            Download
          </Button>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default GeneratedImage;
