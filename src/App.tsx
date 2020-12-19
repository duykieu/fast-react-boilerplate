import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AuthProvider from "./components/AuthProvider";
import { HashRouter } from "react-router-dom";
import Routers from "./Routers";

const App: React.FunctionComponent = ({ children }) => {
    return (
        <HashRouter>
            <AuthProvider>
                <Routers />
            </AuthProvider>
        </HashRouter>
    );
};

export default App;
