import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Grid, Typography, AppBar, Toolbar, Paper, Button } from "@material-ui/core"

interface AppProps {
}

interface AppState {
  isSubmitting: boolean
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      isSubmitting: false
    }
  }

  toggleSubmitting = () => {
    const { isSubmitting } = this.state
    this.setState({ isSubmitting: !isSubmitting }) 
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              GitHub Integration Example - Inspiration Sprint 2019
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper style={{padding: 10, margin: 10}}>
  
        <Grid container spacing={3} style={{}}>
          <Grid item xs={12}>
            <Typography variant="h6">
              Submissions
            </Typography>
          </Grid>
          <br/>
          <Grid item xs={12}>
            <Button variant="outlined" color="primary" onClick={this.toggleSubmitting}>
              Add a File
            </Button>
          </Grid>
        </Grid>
        </Paper>
      </React.Fragment>
    );
  }
}

export default App;
