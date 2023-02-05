import React, { Component } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default class Home extends Component {
  render() {
    return (
      <>
        <Typography align="left" variant="h4" component="h2">Welcome User!</Typography>
        <Typography align="left">Here you will find your summary</Typography>
      </>
    )
  }
}
