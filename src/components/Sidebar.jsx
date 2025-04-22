import React from 'react';
import { Drawer, List, ListItem, ListItemText, Collapse, Box, Button } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { userMenu, adminMenu } from '../menu/SidebarMenu';

const Sidebar = ({ isAdmin }) => {
    const menuList = isAdmin ? adminMenu : userMenu;
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
                <ListItem button onClick={() => handleClick(item.label)}>
                    <ListItemText primary={item.label} />
                    {openItems[item.label] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
            ) : (
                <ListItem button onClick={() => navigate(item.path)}>
                    <ListItemText primary={item.label} />
                </ListItem>
            )}
            {item.children && (
                <Collapse in={openItems[item.label]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {item.children.map((sub) => (
                            <ListItem key={sub.label} button sx={{ pl: 4 }} onClick={() => navigate(sub.path)}>
                                <ListItemText primary={sub.label} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            )}
        </React.Fragment>
    ));

    return (
        <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }} PaperProps={{ sx: { width: 240, display: 'flex', flexDirection: 'column' } }}>
            <List sx={{ flexGrow: 1 }}>{renderMenu(menuList)}</List>
            <Box sx={{ p: 2 }}>
                <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>
                    로그아웃
                </Button>
            </Box>
        </Drawer>
    );
};

export default Sidebar;