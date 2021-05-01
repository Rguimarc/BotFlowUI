import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export default function SimpleMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const localProps = props;
    return (
        <div>
            <Button
                variant='containedSecondary'
                style={{ width: '80%' }}
                color='palette.secondary.light'
                onClick={handleClick}
                style= {{  marginRight: '15px'}}
                id='btnBotResponse'>
                Bloco Bot
            </Button>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { localProps.simpleResponse() }}>Resposta Simples</MenuItem>
                <MenuItem onClick={() => { localProps.conditionalResponse() }}>Resposta Condicional</MenuItem>
            </Menu>
        </div>
    );
}
