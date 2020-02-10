import React from 'react';
import { InputWrapper, InputWrapperSmall } from '../../components/Wrapper/Wrapper.jsx';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core';

import profilePicture from '../../media/frogs.jpg'
import logo from '../../media/reactlogoblue.svg';
import useStyles from '../../helper/useStyles'
import './Match.css'

function TestCard() {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
		<CardActionArea>
		   <img src={profilePicture}/>
		   <CardMedia
			   className={classes.media}
			   // image={profilePicture}
			   title="Contemplative Reptile"
		   />
		   <CardContent>
			   <InputWrapper  variant="h5" component="h2">
				   Lizard
			   </InputWrapper>
			   <InputWrapperSmall stylvariant="body2" color="textSecondary" component="p">
				   all continents except Antarctica
			   </InputWrapperSmall>
		   </CardContent>
		</CardActionArea>
		<CardActions>
		   	<Button size="small" style={{ color: '#FFF' }}>
				   Like
		   	</Button>
		   <Button size="small" color="primary">
			   Next
		   </Button>
		</CardActions>
		</Card>
	);
}

export default TestCard;