import { Slider, withStyles } from '@material-ui/core';

const ProximitySlider = withStyles({
	root: {
		color: '#000',
		height: 8,
		width: 200,
	}, thumb: {
		height: 24,
		width: 24,
		backgroundColor: '#FFF',
		border: '2px solid currentColor',
		marginTop: -8,
		marginLeft: -12,
		'&:focus,&:hover,&$active': {
				boxShadow: 'inherit',
		},
	}, active: {
	}, valueLabel: {
		left: 'calc(-50% + 4px)',
	}, track: {
		height: 8,
		borderRadius: 4,
	}, rail: {
		height: 8,
		borderRadius: 4,
	},
})(Slider);

export default ProximitySlider;