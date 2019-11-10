import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import RenderGifs from './RenderGifs'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    card: {
        // maxWidth: 345
    },
    media: {
        height: 367,
        width: 280
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
        textAlign: 'center'
    },
    button: {
        textAlign: 'center',
        margin: theme.spacing(1),
    },
    div: {
        textAlign: 'center'
    }
}));

let loadMoreGifs = (giphy, gifs, setGifs) => {
    giphy.trending({
        limit: 25,
        rating: 'g',
        fmt: 'json',
        offset: gifs.length
    }, function (err, res) {
        setGifs([...gifs, ...res.data.map(gg => gg.images.fixed_height)])
    })
}

function Searching({ giphy }) {
    const [gifs, setGifs] = useState([]);
    const [searchGif, setSearchGif] = useState('');

    useEffect(() => {
            searchGif && giphy.search(searchGif).then(function (res) {
                setGifs(res.data.map(gg => gg.images.fixed_height))
            })
    }, [searchGif]);

    const classes = useStyles();
    return (
        <div className={classes.div}>
            <TextField
                id="standard-basic"
                className={classes.textField}
                label="Search any Gif"
                margin="normal"
                onChange={(e) => setSearchGif(e.target.value)}
                placeholder="Search any Gif"
                value={searchGif}
            />
            {(gifs.length !== 0) && <Fragment><Card className={classes.card}>
                <CardContent className={classes.content}>
                    <RenderGifs
                        gifs={gifs}
                        classes={classes}
                    />
                </CardContent>
            </Card>
          <Button variant="contained" color="primary" className={classes.button} onClick={() => loadMoreGifs(giphy, gifs, setGifs)}>Load more</Button></Fragment>}
        </div>
    )
}

export default Searching;