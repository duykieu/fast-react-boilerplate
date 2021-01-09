import React from "react";
import styled from "styled-components";
import Breadcrumbs from "../components/Breadcrumbs";

interface IProductsProps {}

const ProductsPage: React.FunctionComponent<IProductsProps> = () => {
    return <Breadcrumbs items={[]} />;
};

export default ProductsPage;
