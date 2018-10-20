import React from 'react';
import PropTypes from 'prop-types';
import SVGIcon from './SVGIcon/SVGIcon';

const LoadingIndicator = props => (
	<span className={`${props.wrapperClass} h-flexCenter`}>
		<SVGIcon icon="Spinner2" size={25} wrapperClassName="spinAnimation" />
		{props.text}
	</span>
);

LoadingIndicator.propTypes = {
	text: PropTypes.string,
	wrapperClass: PropTypes.string,
};

LoadingIndicator.defaultProps = {
	text: 'Loading…',
	wrapperClass: '',
};

export default LoadingIndicator;
