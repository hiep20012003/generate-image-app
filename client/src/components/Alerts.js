import React, { useEffect, useRef } from "react";
import { Alert as AlertUI, Box, Fade } from "@mui/material";
import { useDispatch } from "react-redux";
import { timeOutEnd } from "../reducers/alerts.js";

const Alerts = ({ queue, open }) => {
  const dispatch = useDispatch();
  const timeRef = useRef(null);

  useEffect(() => {
    timeRef.current = setTimeout(() => {
      dispatch(timeOutEnd());
    }, 2000);

    return () => {
      clearTimeout(timeRef.current);
    };
  }, [queue]);

  return (
    <Box
      component="div"
      sx={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        "z-index": 100,
      }}
    >
      {queue?.map((item, index) => {
        return (
          <Fade key={index} in={open} mountOnEnter unmountOnExit>
            <AlertUI
              sx={{ mb: 1, boxShadow: "rgba(0, 0, 0, 0.12) 0px 2px 4px" }}
              severity={item?.type}
            >
              {item?.message}
            </AlertUI>
          </Fade>
        );
      })}
    </Box>
  );
};

export default Alerts;
