import React from 'react';
import {
    Drawer, List, ListItem, ListItemText, Collapse, Box, Button
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { userMenu, adminMenu } from '../../menu/SidebarMenu';
import styles from '../../css/components/Sidebar.module.css';

const Sidebar = () => {
    const role = localStorage.getItem('role');
    const menuList = role === 'admin' ? adminMenu : userMenu;

    const [openItems, setOpenItems] = React.useState({});
    const navigate = useNavigate();

    const handleClick = (label) => {
        setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    const handleLogout = () => {
        localStorage.removeItem('role');
        navigate('/');
    };

    const renderMenu = (items) => items.map((item) => (
        <React.Fragment key={item.label}>
            {item.children ? (
                <>
                    <ListItem button onClick={() => handleClick(item.label)} className={styles.mainItem}>
                        <ListItemText primary={item.label} />
                        {openItems[item.label] ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openItems[item.label]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.children.map((sub) => (
                                <ListItem
                                    key={sub.label}
                                    button
                                    onClick={() => navigate(sub.path)}
                                    className={styles.nestedItem}
                                >
                                    <ListItemText primary={sub.label} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </>
            ) : (
                <ListItem button onClick={() => navigate(item.path)} className={styles.mainItem}>
                    <ListItemText primary={item.label} />
                </ListItem>
            )}
        </React.Fragment>
    ));

    return (
        <Drawer
            variant="permanent"
            classes={{ paper: styles.drawer }}
        >
            <Box className={styles.logo} onClick={() => navigate('/dashboard')}>
                ㈜한결테크닉스
            </Box>

            <List>{renderMenu(menuList)}</List>

            <Box className={styles.logoutContainer}>
                <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>
                    로그아웃
                </Button>
            </Box>
        </Drawer>
    );
};

export default Sidebar;