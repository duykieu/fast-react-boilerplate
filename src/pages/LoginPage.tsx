import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { ReduxThunkDispatch, RootStateType } from "../redux/reducer";
import { AuthAction } from "../redux/auth";
import FormikInputFormGroup from "../components/ui/FormikInputFormGroup";

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

    const fm = useFormik<{
        username: string;
        password: string;
    }>({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit(values) {
            dispatch(AuthAction.login(values));
        }
    });

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

    return (
        <div>
            <h3>Login</h3>
            <FormikInputFormGroup
                fm={fm}
                required
                label="Tài khoản"
                name="username"
            />
            <FormikInputFormGroup
                type="password"
                fm={fm}
                required
                label="Mật khẩu"
                name="password"
            />
            <button onClick={submitHandler}>Submit</button>
        </div>
    );
};

const mapStateToProps = ({ auth }: RootStateType) => ({
    error: auth.error,
    token: auth.token
});

export default connect(mapStateToProps)(LoginPage);
