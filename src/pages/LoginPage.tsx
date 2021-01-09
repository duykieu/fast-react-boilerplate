import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import styled from "styled-components";

import { ReduxThunkDispatch, RootStateType } from "../redux/reducer";
import { AuthAction } from "../redux/auth";
import FormikInputFormGroup from "../components/ui/FormikInputFormGroup";
import { LoginFormDataType } from "../models/user";
import { Button } from "antd";

type Error = {
    message: string | null;
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Form = styled.div`
    width: 400px;
    padding: 3rem;
    max-width: 100%;
`;

interface ILoginPageProps {
    error: Error;
    token: string | null;
    dispatch: ReduxThunkDispatch;
}

const LoginPage: React.FunctionComponent<ILoginPageProps> = ({
    error,
    token,
    dispatch
}) => {
    const history = useHistory();

    const fm = useFormik<LoginFormDataType>({
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

    const handleSubmit = e => fm.handleSubmit(e);

    return (
        <Wrapper>
            <Form>
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
                <Button block type="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </Wrapper>
    );
};

const mapStateToProps = ({ auth }: RootStateType) => ({
    error: auth.error,
    token: auth.token
});

export default connect(mapStateToProps)(LoginPage);
