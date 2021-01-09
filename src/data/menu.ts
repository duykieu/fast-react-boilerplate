import React from "react";
import { Home, Box, Settings, File, List } from "react-feather";

export interface IMenu {
    label: string;
    path: string;
    icon?: React.ReactNode;
    permissions?: string[];
    children?: IMenu[];
}

const menuData: IMenu[] = [
    {
        label: "Trang chủ",
        path: "/",
        icon: Home
    },
    {
        label: "Sản phẩm",
        path: "/products",
        icon: Box,
        children: [
            {
                label: "Tất cả sản phẩm",
                path: "/products"
            },
            {
                label: "Bộ sưu tập",
                path: "/collections"
            },
            {
                label: "Thẻ",
                path: "/Tags"
            }
        ]
    },
    {
        label: "Quản lý nội dung",
        path: "/cms/posts",
        icon: File,
        children: [
            {
                label: "Tất cả sản phẩm",
                path: "/cms/posts"
            },
            {
                label: "Chuyên mục",
                path: "/cms/categories"
            },
            {
                label: "Thẻ",
                path: "/Tags"
            }
        ]
    },
    {
        label: "Quản lý Menu",
        path: "/menus",
        icon: List
    },
    {
        label: "Cài đặt",
        path: "/settings",
        icon: Settings
    }
];

export default menuData;
