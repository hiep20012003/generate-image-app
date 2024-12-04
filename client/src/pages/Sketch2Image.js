import React, { useState } from "react";
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
import { generateImageBySketch } from "../actions/comfy.js";
import GeneratedImage from "../components/GeneratedImage.js";
import { sizes } from "../constants/imageSizes.js";
import UploadImageZone from "../components/UploadImageZone.js";
import { interiorStyle } from "../constants/interiorStyle.js";

import imgTemp from "../images/011.png";

const Sketch2Image = () => {
  const { isLoading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    positive: "",
    negative: "",
    style: interiorStyle[0].value,
    image: {},
    client_id: localStorage.getItem("client_id"),
  });

  const handleGenerateClick = (e) => {
    e.preventDefault();
    const checkRequired = formData?.image?.name;
    if (checkRequired) {
      dispatch({ type: 'RESET_IMAGE' });
      dispatch(generateImageBySketch(formData));
    }
  };
  const handleCancelClick = (e) => {
    e.preventDefault();
    if (isLoading) {
      dispatch({ type: 'CANCEL_REQUEST' });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, height: "100%" }}>
      <Grid2 container spacing={8} sx={{ height: "100%" }}>
        <Grid2
          container
          spacing={2}
          direction="column"
          sx={{}}
          size={{ xs: 12, md: 4 }}
        >
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
              <Typography variant="h5">Prompt Sketch to Image</Typography>
              <TextField
                fullWidth
                multiline
                name="positive"
                label="Positive Prompt"
                value={formData.positive}
                onChange={(e) => {
                  setFormData({ ...formData, positive: e.target.value });
                }}
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
              <UploadImageZone
                fileBase64={formData.image?.image}
                onChange={(e) => {
                  setFormData({ ...formData, image: e });
                }}
              />
              <Button
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleGenerateClick}
                disabled={formData?.image?.name === undefined || isLoading}
              >
                Generate Image
              </Button>
              <Button
                size="medium"
                variant="contained"
                color="secondary"
                onClick={handleCancelClick}
                disabled={!isLoading}
              >
                Cancel
              </Button>
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

export default Sketch2Image;
