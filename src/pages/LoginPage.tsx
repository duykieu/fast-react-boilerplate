import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReduxThunkDispatch, RootStateType } from "../redux/reducer";
import { AuthAction } from "../redux/auth";

type Error = {
    message: string | null;
};

interface ILoginPageProps {
    error: Error;
    token: string | null;
    dispatch: ReduxThunkDispatch;
}

type FormDataType = {
    username: string;
    password: string;
};

const LoginPage: React.FunctionComponent<ILoginPageProps> = ({
    error,
    token,
    dispatch
}) => {
    const history = useHistory();

    /**
     * Clear error when the first time loading page
     */
    React.useEffect(() => {
        dispatch(AuthAction.clearError());
    }, []);

    /**
     * If user has been authenticated, redirect them to the main app
     */
    React.useEffect(() => {
        if (token) {
            history.push("/");
        }
    }, [token]);

    const [formData, setFormData] = React.useState<FormDataType>({
        username: "",
        password: ""
    });

    const submitHandler = () => {
        const { username, password } = formData;
        dispatch(AuthAction.clearError());
        if (!username || !password) {
            return dispatch(
                AuthAction.setError<Error>({
                    message: "Please enter your username and password"
                })
            );
        }
        //Submit the form
        dispatch(AuthAction.login({ username, password }));
    };

    return (
        <div>
            <h3>Login</h3>
            {error?.message && <p style={{ color: "red" }}>{error.message}</p>}
            <div>
                <label>Username</label>
                <input
                    value={formData.username}
                    onChange={e => {
                        setFormData(v => ({ ...v, username: e.target.value }));
                    }}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    onChange={e => {
                        setFormData(v => ({ ...v, password: e.target.value }));
                    }}
                />
            </div>
            <button onClick={submitHandler}>Submit</button>
        </div>
    );
};

const mapStateToProps = ({ auth }: RootStateType) => ({
    error: auth.error,
    token: auth.token
});

export default connect(mapStateToProps)(LoginPage);
