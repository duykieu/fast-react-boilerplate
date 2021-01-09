import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import { useGlobalHooks } from "../redux/global_hooks";
import ProductsPage from "../pages/ProductsPage";
import HomePage from "../pages/HomePage";
import SettingsPage from "../pages/SettingsPage";

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
`;

const SidebarWrapper = styled.div`
    width: 25rem;
`;

const Main = styled.div`
    flex: 1;
`;

const Content = styled.div`
    flex: 1;
    padding: 1rem 2rem;
`;

interface ILayoutProps {}

const Layout: React.FunctionComponent<ILayoutProps> = () => {
    const { showSidebar } = useGlobalHooks();

    return (
        <Wrapper>
            {showSidebar && (
                <SidebarWrapper>
                    <Sidebar />
                </SidebarWrapper>
            )}

            <Main>
                <TopBar title="Home page" />
                <Content>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/products" component={ProductsPage} />
                        <Route path="/settings" component={SettingsPage} />
                    </Switch>
                </Content>
            </Main>
        </Wrapper>
    );
};

export default Layout;
