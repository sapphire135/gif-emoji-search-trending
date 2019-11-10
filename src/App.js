import React, { useState } from 'react';
import Trending from './Trending';
import Searching from './Searching';
import Emoji from './Emoji';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

var giphy = require('giphy-api')();

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}));

function App() {
  const classes = useStyles();
  const [button, setButton] = useState('Trending')

  let buttonComponent = () => {
    switch (button) {
      case 'Trending':
        return <Trending
          giphy={giphy}
        />
      case 'Searching':
        return <Searching
          giphy={giphy}
        />
      case 'Emoji':
        return <Emoji/>
      default:
        return <Trending
          giphy={giphy}
        />
    }
  }
  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Button variant="contained" color="primary" onClick={() => setButton('Trending')}>Trending Gifs</Button>
          <Button variant="contained" color="primary" onClick={() => setButton('Searching')}>Search Gifs</Button>
          <Button variant="contained" color="primary" onClick={() => setButton('Emoji')}>Emoji</Button>
        </Toolbar>
      </AppBar>
      {buttonComponent()}
    </div>
  );
}

export default App;