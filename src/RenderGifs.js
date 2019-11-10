import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

function RenderGifs({ gifs, classes }) {
    return gifs.map((gif, index) => {
        return <CardMedia
            className={classes.media}
            // styles={{ height: gif.height, width: gif.width}}
            image={gif.url}
            title="Contemplative Reptile"
            key={index}
        />
    })
}

export default RenderGifs