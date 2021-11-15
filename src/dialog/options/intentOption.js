import React  from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    buttonOption: {
        marginRight: '15px'
    } 
});


 function IntentOption(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorEl(null);
    };
    
    return (
        <div>
            <Button className={props.classes.buttonOption}
                variant='contained'
                color='primary'
                id='btnUserIntent'
                width='100%'
                onClick={handleClick}>
                Bloco Usuário
            </Button>


            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >

                <MenuItem onClick={() => { props.singleIntent() }}>Intenção</MenuItem>
                <MenuItem onClick={() => { props.multipleIntents()}}>Multipla Escolha</MenuItem>
            </Menu>
        </div>
    );
}


export default withStyles(styles, { withTheme: true })(IntentOption);   