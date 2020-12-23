/* eslint-disable promise/catch-or-return */
import React from 'react';
import { Box, Container, Button, Grid } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TextAreaField from './components/TextAreaField';

const { dialog } = require('electron').remote;

const openDialog = () => {};
const Hello = () => {
  return (
    <Container>
      <Box component="span" m={1}>
        <TextAreaField />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary">
            Зашифровать
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary">
            Расшифровать
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" onClick={openDialog}>
            Выбрать файл
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
