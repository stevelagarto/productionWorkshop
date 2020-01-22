import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { green } from '@material-ui/core/colors';
import SettingsIcon from '@material-ui/icons/Settings';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));



function Header (props) {
  const classes = useStyles();
 let print = null;
 console.log('props.auth', props.auth);
 
    switch (props.auth) {
      case null:
        print = null;
        break;
      case false:
        print = (
          <li> 
          <div className={classes.root}>
                <Button variant="contained" color="primary" size="small" href={'http://localhost:5000/auth/google'}>
                Login With Google
                </Button>
              </div> 
          </li>
        );
        break;
      default:
        console.log('DEFAULT')
        print = (
          <>
          <MediaQuery maxWidth={600}>
            <li key="4" style={{ margin: '0 10px' }}>
            <PopupState variant="popover" popupId="demo-popup-menu">
            {popupState => (
              <React.Fragment>
                <div variant="contained" color="primary" {...bindTrigger(popupState)}>
                <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        
      >
        <MenuIcon color="secondary"  style={{ fontSize: '28' }}/>
      </IconButton>
                </div>
                <Menu MenuListProps={{ disablePadding: true }}{...bindMenu(popupState)}>
                  <MenuItem onClick={popupState.close}><Link to="/blogs">My Blogs</Link></MenuItem>
                  <MenuItem onClick={popupState.close}><a href='http://localhost:5000/auth/logout'>Logout</a></MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
            </li>
          </MediaQuery>
          
          <MediaQuery minWidth={601}>
            <li key="3" style={{ margin: '0 10px' }}>
            <Link to="/blogs"></Link>
              <div className={classes.root}>
             
                <Button variant="contained" color="primary" size="small">
                  My Blogs
                </Button>
                
              </div>
            </li>
          
            <li key="5" style={{ margin: '0 10px' }}>
              <div className={classes.root}>
                <Button variant="contained" color="primary" size="small" href={'http://localhost:5000/auth/logout'}>
                  Logout
                </Button>
              </div>
            </li>
          </MediaQuery>
        </>);
    }
  
    return (
      <nav className="indigo">
        <div className="nav-wrapper">
          
          <Link
            to={props.auth ? '/blogs' : '/'}
            className="left brand-logo inconsolata"
            style={{ marginLeft: '30px' }}
          >
          <SettingsIcon className="logo-icon" fontSize="large"/>
            Make.a.Blog
          </Link>
          <ul className="right">{print}</ul>
        </div>
      </nav>
    );
  
}

function mapStateToProps({ auth }) {
  console.log('Auth->>>>>>>>>>>>>>', auth);
  
  return { auth };
}

export default connect(mapStateToProps)(Header);
