import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import Sidemenu from './Sidemenu'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  let print = null;

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
          
          <Sidemenu/>


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
