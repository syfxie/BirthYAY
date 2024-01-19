import React, { useState } from "react";
import { Link } from "react-router-dom";

import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

import '../fonts.css'
import { COLORS } from '../constants/Colors'

export default function SideBar() {

    const [collapsed, setCollapsed] = useState(false);

    const menuItemStyles = {
        root: {
            fontSize: '18px',
            fontWeight: 400,
            alignItems: 'flex-start'
        },
        icon: {
            color: COLORS.darkGray,
        },
        button: {
            '&:hover': {
                backgroundColor: COLORS.lightYellow,
                fontWeight: 600,
            },
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', justifyContent:'flex-start', flex: '0 1 auto'}}>
            <Sidebar backgroundColor={COLORS.lightYellow}
                collapsedWidth="80px"
                     collapsed={collapsed}
            >
                <div style={{display: 'flex', flexDirection:'column', height:'80vh'}}>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                        <IconButton onClick={() => setCollapsed(!collapsed)}>
                            <MenuIcon />
                        </IconButton>
                    </div>

                    {collapsed ?
                        <div style={{height:"140px"}}></div>
                        :
                        <img alt="Logo"
                             src="/images/Celebrate.png"
                             style={{marginLeft: '15px', objectFit: 'contain', marginBottom: '20px'}}
                             width="220px"
                             height="120px"
                        />

                    }

                    <Menu menuItemStyles={menuItemStyles}>
                        <MenuItem icon={<SpaceDashboardOutlinedIcon />}
                                  component={<Link to="/home" className="link" />}
                        >
                            Dashboard
                        </MenuItem>

                        <MenuItem icon={<ExploreOutlinedIcon />}
                                  component={<Link to="/explore" className="link" />}
                        >
                            Explore
                        </MenuItem>

                        <MenuItem icon={<CakeOutlinedIcon />}
                                  component={<Link to="/birthdays" className="link" />}
                        >
                            My Birthdays
                        </MenuItem>

                        <MenuItem icon={<CardGiftcardOutlinedIcon />}
                                  component={<Link to="/gifts" className="link" />}
                        >
                            My Gifts
                        </MenuItem>

                        <MenuItem icon={<AutoFixHighOutlinedIcon />}
                                  component={<Link to="/wishlist" className="link" />}
                        >
                            My Wishlist
                        </MenuItem>
                    </Menu>
                </div>

                <div>
                    <Menu
                        menuItemStyles={menuItemStyles}
                    >
                        <MenuItem icon={<SettingsOutlinedIcon />}
                                  component={<Link to="/settings" className="link" />}
                        >
                            Settings
                        </MenuItem>
                    </Menu>
                </div>
            </Sidebar>
        </div>
    );
}
