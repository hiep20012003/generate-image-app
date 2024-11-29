import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import "./App.css";
import { publicRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout.js";
import { v4 as uuidv4 } from 'uuid';
import {useEffect} from "react";

function App() {
  useEffect(() => {
    if(!localStorage.getItem("client_id")) {
      localStorage.setItem("client_id", uuidv4());
    }
    console.log(process.env.REACT_APP_API_KEY);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((value, index) => (
          <Route
            key={index}
            path={value.path}
            element={
              <DefaultLayout>
                <value.component />
              </DefaultLayout>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
