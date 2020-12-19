import { Switch, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

const Routers: React.FunctionComponent = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
        </Switch>
    );
};

export default Routers;
