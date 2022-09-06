import React from 'react';
import ApBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';

export default function AppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ApBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
            <Button href='/' color='inherit'>HomePage</Button>   
            <Button href='/chart' color='inherit'>Chart</Button>
            <Button href='/tables' color='inherit'>Tables</Button>
        </Toolbar>
      </ApBar>
    </Box>
  );
}