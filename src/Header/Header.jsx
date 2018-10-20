import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import sizeMe from 'react-sizeme';

import SwitchApp from './SwitchApp';

export class Header extends React.Component {
	static propTypes = {
		currentApp: PropTypes.object,
		appBase: PropTypes.string,
		appLink: PropTypes.string.isRequired,
		appName: PropTypes.string,
		apps: PropTypes.arrayOf(PropTypes.object).isRequired,
		closeAll: PropTypes.func,
		pages: PropTypes.arrayOf(PropTypes.object).isRequired,
		toggleAppMenu: PropTypes.func,
		size: PropTypes.shape({
			width: PropTypes.number,
		}),
	};

	static defaultProps = {
		currentApp: {},
	};

	state = {
		isAppMenuOpen: false,
	};

	toggleAppMenu = () => {
		this.setState(state => {
			isAppMenuOpen: !state.isAppMenuOpen,
		});
	}

	render() {
		return (
			<div>
				<header className="h-paddingB--push">
					<div className="Header h-clearfix js-header">
						<div className="h-pullRight">
							<SwitchApp
								appLink={this.props.appLink}
								apps={this.props.apps}
								isAppMenuOpen={this.state.isAppMenuOpen}
								toggleAppMenu={this.toggleAppMenu}
							/>
						</div>
					</div>
				</header>
			</div>
		);
	}
}