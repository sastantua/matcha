import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Slider, Tooltip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
		root: {
			width: 300 + theme.spacing(3) * 2,
		},
		margin: {
			height: theme.spacing(3),
		},
}));

function ValueLabelComponent(props) {
		const { children, open, value } = props;

		return (
			<Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
					{children}
			</Tooltip>
		);
}

const PrettoSlider = withStyles({
		root: {
			color: '#000',
			height: 8,
		},
		thumb: {
			height: 24,
			width: 24,
			backgroundColor: '#FFF',
			border: '2px solid currentColor',
			marginTop: -8,
			marginLeft: -12,
			'&:focus,&:hover,&$active': {
					boxShadow: 'inherit',
			},
		},
		active: {},
		valueLabel: {
			left: 'calc(-50% + 4px)',
		},
		track: {
			height: 8,
			borderRadius: 4,
		},
		rail: {
			height: 8,
			borderRadius: 4,
		},
})(Slider);

function CustomSlider() {
		const classes = useStyles();

		return (
				<div id="custom-slider-container">
					<PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
				</div>
		);
}

export default CustomSlider;