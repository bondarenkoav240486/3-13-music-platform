import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useRouter } from "next/router";

import Search from "./Search";
// import TrackItem from "./TrackItem";

import MusicNoteIcon from '@material-ui/icons/MusicNote';

import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

// import PlayCircleIcon from '@mui/icons-material/PlayCircle';



// const menuItems = [
//     { text: 'Головна', href: '/' },
//     { text: 'Список пісень', href: '/tracks' },
//     { text: 'Список альбомів', href: '/albums' },
//     { text: 'Завантажити пісню', href: '/tracks/create' },
// ]

const icons = [
    <MusicNoteIcon />,
    <LibraryMusicIcon />,
    <InboxIcon />,
    <MailIcon />
];
const menuItems = [
    { text: 'Головна', href: '/', icon: icons[0] },
    { text: 'Список пісень', href: '/tracks', icon: icons[1] },
    // { text: 'Список альбомів', href: '/albums', icon: icons[3] },
    { text: 'Завантажити пісню', href: '/tracks/create', icon: icons[2] },
];


export default function Navbar() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter()

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div >
            <CssBaseline />
            <AppBar
                position="fixed"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                    // edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        <MusicNoteIcon style={{ color: 'red' }} />
                        {/* <PlayCircleIcon style={{ color: 'red' }}/> */}
                        {/* <MusicNoteIcon style={{ color: '#b53f3f' }}/> */}

                        {/* <LibraryMusicIcon/> */}
                        Music Platform
                    </Typography>
                    <Search />
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                {/* <List>
                    {menuItems.map(({ text, href }, index) => (
                        <ListItem button key={href} onClick={() => router.push(href)}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List> */}
                <List>
                    {menuItems.map(({ text, href, icon }, index) => (
                        <ListItem button key={href} onClick={() => router.push(href)}>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}
