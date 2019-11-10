import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

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
    button: {
        textAlign: 'center',
        margin: theme.spacing(1),
    },
    div: {
        textAlign: 'center'
    }
}))

// const mediaStyles = makeStyles((width, height) => ({
//     media: {
//         width,
//         height
//     }
// }))

// function mediaStyles(width, height) {
//     let abcd = makeStyles({
//         width,
//         height
//     })
//     return abcd
// }

let renderGifs = (gifs, classes) => {
    return gifs.map((gif) => {
        return <CardMedia
            className={classes.media}
            image={gif.url}
            title="Contemplative Reptile"
        />
    })
}

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

function Trending({ giphy }) {
    const [gifs, setGifs] = useState([]);

    !gifs.length && giphy.trending().then(function (res) {
        setGifs(res.data.map(gg => gg.images.fixed_height))
    });

    const classes = useStyles();
    let allGifs = renderGifs(gifs, classes)
    return (
        <div className={classes.div}>
            {(gifs.length !== 0) && <Fragment><Card className={classes.card}>
                <CardContent className={classes.content}>
                    {allGifs}
                </CardContent>
            </Card>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => loadMoreGifs(giphy, gifs, setGifs)}>Load more</Button></Fragment>}
        </div>
    )
}

export default Trending;