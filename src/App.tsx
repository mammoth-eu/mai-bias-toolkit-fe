import React from 'react';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Router from "./pages/Router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <React.Fragment>
        <Header/>
        <ToastContainer/>
        <Router/>
        <Footer/>
    </React.Fragment>
  )
}

export default App
