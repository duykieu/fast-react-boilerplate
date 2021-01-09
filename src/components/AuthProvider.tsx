import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootStateType } from "../redux/reducer";
import { TOKEN_KEY } from "../config";

const AuthProvider: React.FC<{
    token: string | null;
    children: React.PropsWithChildren<any>;
}> = ({ children, token }) => {
    const history = useHistory();

    // We write down token to localStorage for quick access from model
    React.useEffect(() => {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
        } else {
            const { location } = history;
            localStorage.removeItem(TOKEN_KEY);
            if (location.pathname !== "/login") {
                history.push("/login");
            }
        }
    }, [token]);

    return children;
};

const mapStateToProps = ({ auth }: RootStateType) => ({
    token: auth.token
});

export default connect(mapStateToProps)(AuthProvider);
