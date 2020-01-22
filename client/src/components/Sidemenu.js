import React, { useState} from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Divider from '@material-ui/core/Divider';

export default function TemporaryDrawer() {
  const useStyles = makeStyles({
    list: {
      width: 150,
    },
    fullList: {
      width: 'auto',
    },
  });

  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
      <Link to="/blogs">
        <ListItem button key={'My Blogs'}>
          <ListItemIcon style={{minWidth: '25px'}}> 
            <AssignmentIcon /> 
          </ListItemIcon>
          <ListItemText primary={'My Blogs'} />
        </ListItem></Link>
        <a href='http://localhost:5000/auth/logout'>
          <ListItem button key={'Logout'}>
            <ListItemIcon style={{minWidth: '25px'}}> <ExitToAppIcon/> 
              </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </a>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer('right', true)}>
        <MenuIcon color="secondary"  style={{ fontSize: '28' }} >Open Right</MenuIcon>
      </IconButton>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer>
    </div>
  );
}