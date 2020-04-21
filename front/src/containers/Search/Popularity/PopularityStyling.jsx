import { COLORS } from '../../../config/style';
import { Slider, withStyles } from '@material-ui/core';

const PopularitySlider = withStyles({
	root: {
		color: COLORS.PURPLE,
		height: 8,
		width: 200,
	}, thumb: {
		height: 24,
		width: 24,
		backgroundColor: COLORS.WHITE,
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

export default PopularitySlider;