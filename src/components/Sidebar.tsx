import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { Home, Activity, ChevronDown } from "react-feather";
import cls from "classnames";

import { Colors } from "../Colors";
import menuData, { IMenu } from "../data/menu";
import { useSelector } from "react-redux";
import { useGlobalHooks } from "../redux/global_hooks";

const Wrapper = styled.div`
    background-color: ${Colors.White};
    border-right: 1px solid ${Colors.Gray4};
    height: 100%;
`;

const LogoWrapper = styled.div`
    display: flex;
    padding: 1.5rem;
`;

const Logo = styled.div`
    width: 50px;
    height: 50px;
    color: ${Colors.TextPrimary};
    border-radius: 50%;
    border: 5px solid ${Colors.TextPrimary};
    font-size: 40px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Menu = styled.div`
    display: grid;
    grid-template-columns: auto;
    a {
        color: ${Colors.TextPrimary};
        text-decoration: none;
    }
`;

const MenuItem = styled.div`
    &.active > .submenu {
        display: block;
    }
    a {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 2rem;
        align-items: center;
        &:hover,
        &.active {
            background-color: ${Colors.Gray2};
        }
    }
    .submenu {
        display: none;
        padding-left: 3.2rem;
        .menu-item {
            a {
                background-color: transparent;
            }
        }
    }

    .icon {
        margin-right: 1rem;
    }
    svg {
        display: flex;
    }

    .left {
        display: flex;
    }
`;

interface ISidebarProps {}

const Sidebar: React.FunctionComponent<ISidebarProps> = () => {
    const { showSidebar } = useGlobalHooks();

    const location = useLocation();

    console.log(location);

    React.useEffect(() => {}, []);

    const showChev = (item: IMenu) => {
        return item.children && item.children.length && showSidebar;
    };

    const renderMenuItem = (item: IMenu, index: number, className?: string) => {
        return (
            <MenuItem
                key={index}
                className={cls({
                    active: item.path === location.pathname
                })}
            >
                <Link
                    to={item.path}
                    className={cls({
                        active: item.path === location.pathname
                    })}
                >
                    <div className="left">
                        {/*@ts-ignore*/}
                        {item.icon && <item.icon className="icon" />}
                        {showSidebar && item.label}
                    </div>
                    {showChev(item) && <ChevronDown size={15} />}
                </Link>

                {item.children && (
                    <div className="submenu">
                        {item.children.map((child, index) =>
                            renderMenuItem(child, index, "menu-item")
                        )}
                    </div>
                )}
            </MenuItem>
        );
    };

    return (
        <Wrapper>
            <LogoWrapper>
                <Logo>K</Logo>
            </LogoWrapper>
            <Menu>
                {menuData.map((item, index) => renderMenuItem(item, index))}
            </Menu>
        </Wrapper>
    );
};

export default Sidebar;
