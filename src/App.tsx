import React from "react";
import logo from "./logo.svg";
import AuthProvider from "./components/AuthProvider";
import { HashRouter } from "react-router-dom";
import Routers from "./Routers";

import "antd/dist/antd.css";

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
