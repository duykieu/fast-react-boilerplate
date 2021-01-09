import React from "react";
import styled from "styled-components";
import { Menu } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Colors } from "../Colors";
import { useGlobalHooks } from "../redux/global_hooks";
import { GLOBAL_TOGGLE_SIDEBAR } from "../redux/global";
import { Avatar, Button, Popover } from "antd";
import { AUTH_LOGOUT_USER } from "../redux/auth";

const Wrapper = styled.div`
    height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    border-bottom: 1px solid ${Colors.Gray3};
`;

const Left = styled.div`
    display: flex;
    align-items: center;
`;

const AccountMenu = styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-gap: 1rem;
`;

interface ITopBarProps {
    title?: string;
}

const TopBar: React.FunctionComponent<ITopBarProps> = ({ title }) => {
    const dispatch = useDispatch();

    const onToggleMenu = () => {
        dispatch({ type: GLOBAL_TOGGLE_SIDEBAR });
    };

    const onLogout = () => {
        dispatch({ type: AUTH_LOGOUT_USER });
    };

    return (
        <Wrapper>
            <Left>
                <Menu
                    onClick={onToggleMenu}
                    style={{ marginRight: "1.5rem", cursor: "pointer" }}
                    size={16}
                />
                {title}
            </Left>
            <div>
                <Popover
                    content={
                        <AccountMenu>
                            <Link to="/users/profile">Quản lý tài khoản</Link>
                            <Button type="link" onClick={onLogout}>
                                Thoát ra
                            </Button>
                        </AccountMenu>
                    }
                >
                    <Avatar>K</Avatar>
                </Popover>
            </div>
        </Wrapper>
    );
};

export default TopBar;
