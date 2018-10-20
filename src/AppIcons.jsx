import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LinkWithScrollToTop from './LinkWithScrollToTop';
import LoadingIndicator from './LoadingIndicator';
import SVGIcon from './SVGIcon/SVGIcon';

export default class AppIcons extends React.Component {
	static propTypes = {
		appLink: PropTypes.string,
		apps: PropTypes.array.isRequired,
		location: PropTypes.object,
		generate: PropTypes.string,
	};

	_generateMenu = currentAppLink => {
		const divs = this.props.apps.map(application => {
			const titleNoWhitespace = application.name.replace(/\s/g, '').toLowerCase();
			const shortName = application.shortName || application.name;

			return (
				<div
					className={`AppSwitcher__wrapper${currentAppLink == application.path ? ' active' : ''}`}
					key={`app_switcher_icon_${application.path}}`}
				>
					<LinkWithScrollToTop
						to={`/${application.redirect ? application.redirect : application.path}`}
						className="AppSwitcher__wrapperLink"
					>
						<SVGIcon
							icon={titleNoWhitespace}
							wrapperClassName="AppSwitcher__icon"
							size={40}
						/>

						<div className="h-textCenter AppSwitcher__iconLabel">{shortName}</div>
					</LinkWithScrollToTop>
				</div>
			);
		});

		return (
			<div className="h-marginT--xxl h-clearfix">{divs.length > 0 ? divs : <div>No available choices.</div>}</div>
		);
	};

	_generateLanding = () => {
		const divs = this.props.apps.map(application => {
			const titleNoWhitespace = application.name.replace(/\s/g, '').toLowerCase();

			return (
				<div
					className="col-xs-6 col-md-3 col-lg-2 h-marginB--sm"
					key={`app_switcher_icon_${application.path}}`}
				>
					<LinkWithScrollToTop
						className="AppLanding__link"
						to={`/${application.redirect ? application.redirect : application.path}`}
					>
						<SVGIcon
							icon={titleNoWhitespace}
							wrapperClassName="AppLanding__icon"
							size={80}
						/>

						<p className="h-textCenter AppLanding__label">{application.name}</p>
					</LinkWithScrollToTop>
				</div>
			);
		});

		return (
			<div className="container-fluid">
				<div className="AppLanding">
					<div className="row">
						{divs}
					</div>
				</div>
			</div>
		);
	};

	render() {
		return this.props.generate && this.props.generate === 'landing'
			? this._generateLanding()
			: this._generateMenu(this.props.appLink);
	}
}
