import { AppBar, Toolbar } from '@mui/material'
import React from "react";

const Header: React.FunctionComponent = () => {

    const displayDesktop = () => {
        return <Toolbar>API Status Dashboards</Toolbar>;
    };

    return (
        <AppBar position="static" sx={{
            mb: 2
        }}>
            {displayDesktop()}
        </AppBar>
    );
}

export default Header;