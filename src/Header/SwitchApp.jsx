import React from 'react';
import PropTypes from 'prop-types';

import AppIcons from '../AppIcons';
import SVGIcon from '../SVGIcon/SVGIcon';

const SwitchApp = props => {
	const toggleAppsMenu = event => {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		props.toggleAppMenu(!props.isAppMenuOpen);
	};

	return (
		<div
			className={`h-pullLeft js-ignore-global-menu-close AppSwitcher__button${
				props.isAppMenuOpen ? ' open' : ''
			}`}
		>
			<SVGIcon
				icon="EllipsisHDouble"
				wrapperClassName="AppSwitcher__selector"
				size={35}
				handleClick={toggleAppsMenu}
			/>

			{props.isAppMenuOpen && <div
				className="js-ignore-global-menu-close AppSwitcher__selectorMenu"
				role="menu"
			>
				<div className="AppSwitcher__srollableHolder">
					<AppIcons apps={props.apps} appLink={props.appLink} />
				</div>
			</div>}
		</div>
	);
};

SwitchApp.propTypes = {
	apps: PropTypes.array,
	isAppMenuOpen: PropTypes.bool,
	appLink: PropTypes.string,
};

export default SwitchApp;
