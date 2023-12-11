import React ,{Suspense} from 'react'
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./layout/NavBar";
import About from "./pages/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/About" element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

// function Loading() {
//   return <h2>🌀 Loading...</h2>;
// }

export default App;
