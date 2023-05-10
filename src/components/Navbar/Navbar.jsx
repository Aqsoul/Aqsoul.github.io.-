import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from "@material-ui/core";
import {ShoppingCart} from "@material-ui/icons";
import {Link, useLocation, useNavigate} from 'react-router-dom';

import logo from '../../assets/icon-removebg-preview.png';
import useStyles from './styles'


const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();

    const navigate = useNavigate()

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="35px" className={classes.image}/>
                        SABIZ.KZ
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname === '/' && (
                        <div className={classes.grow}>
                            <IconButton onClick={(event) => {
                                event.preventDefault();
                                navigate("/cart")
                            }} aria-label="Show cart items" color="inherit">
                                <Badge overlap={"rectangular"} badgeContent={totalItems} color="secondary">
                                    <ShoppingCart/>
                                </Badge>
                            </IconButton>
                        </div>)}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;