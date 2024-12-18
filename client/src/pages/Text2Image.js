import React, { useState, useEffect } from "react";
import {
  Box,
  Grid2,
  Typography,
  Container,
  Button,
  Paper,
  TextField,
  MenuItem,
  FormLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cancelGenerate, generateImageByText } from "../actions/comfy.js";
import GeneratedImage from "../components/GeneratedImage.js";
import { sizes } from "../constants/imageSizes.js";
import { interiorStyle } from "../constants/interiorStyle.js";

const Text2Image = () => {
  const { isLoading } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    positive: "",
    negative: "",
    size: sizes[0].value,
    style: interiorStyle[0].value,
    image: {},
    client_id: localStorage.getItem("client_id"),
  });

  const handleGenerateClick = (e) => {
    e.preventDefault();
    const checkRequired = formData?.positive !== "";
    if (checkRequired) {
      dispatch({ type: "RESET_IMAGE" });
      dispatch(generateImageByText(formData));
    }
  };
  const handleCancelClick = (e) => {
    e.preventDefault();
    if (isLoading) {
      dispatch({ type: "RESET_IMAGE" });
      dispatch(cancelGenerate());
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, height: "100%" }}>
      <Grid2 container spacing={8} sx={{ height: "100%" }}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Paper elevation={6} raised>
            <Grid2
              container
              component="form"
              noValidate
              autoComplete="off"
              direction="column"
              spacing={4}
              sx={{ px: 4, py: 4 }}
            >
              <Typography variant="h5">Prompt Text to Image</Typography>
              <TextField
                fullWidth
                multiline
                name="positive"
                label="Positive Prompt"
                value={formData.positive}
                onChange={(e) => {
                  setFormData({ ...formData, positive: e.target.value });
                }}
                required
              />
              <TextField
                fullWidth
                multiline
                name="negative"
                label="Negative Prompt"
                value={formData.negative}
                onChange={(e) => {
                  setFormData({ ...formData, negative: e.target.value });
                }}
              />

              <TextField
                sx={{ flexGrow: 1 }}
                select
                label="Size Image"
                value={formData.size}
                helperText="Please select your size"
                onChange={(e) => {
                  setFormData({ ...formData, size: e.target.value });
                }}
              >
                {sizes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                sx={{ flexGrow: 1 }}
                select
                label="Interior Style"
                value={formData.style}
                helperText="Please select your Style"
                onChange={(e) => {
                  setFormData({ ...formData, style: e.target.value });
                }}
              >
                {interiorStyle.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Grid2 container spacing={1}>
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleGenerateClick}
                  disabled={formData?.positive === "" || isLoading}
                  sx={{ width: "100%" }}
                >
                  Generate Image
                </Button>
                <Button
                  size="medium"
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancelClick}
                  disabled={!isLoading}
                  sx={{ width: "100%" }}
                >
                  Cancel
                </Button>
              </Grid2>
            </Grid2>
          </Paper>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8, height: "100%" }}>
          <GeneratedImage />
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Text2Image;
