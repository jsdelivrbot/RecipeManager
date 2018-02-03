import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const MenuBar = props => {
  const Dropdown = props => (
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      }
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      <MenuItem
        primaryText="Lista Przepisów"
        containerElement={<Link to="/przepisy" />}
      />
      <MenuItem
        primaryText="Nowy przepis"
        containerElement={<Link to="/przepis/nowy" />}
      />
      <Divider />
      <MenuItem
        primaryText="Lista Składników"
        containerElement={<Link to="/skladniki" />}
      />
      <MenuItem
        primaryText="Nowy składnik"
        containerElement={<Link to="/skladnik/nowy" />}
      />
    </IconMenu>
  );

  return <AppBar title={props.title} iconElementLeft={<Dropdown />} />;
};

export default MenuBar;
