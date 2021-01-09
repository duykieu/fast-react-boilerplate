import { Switch, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";

const Routers: React.FunctionComponent = () => {
    return (
        <Switch>
            <Route path="/login" component={LoginPage} />
            <Layout />
        </Switch>
    );
};

export default Routers;
