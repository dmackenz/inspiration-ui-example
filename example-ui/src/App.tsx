import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Grid } from "@material-ui/core"

const App: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        hello
      </Grid>
    </Grid>
  );
}

export default App;
