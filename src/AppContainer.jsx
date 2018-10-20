import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import Header from './Header/Header';

export default class AppContainer extends React.Component {
	static propTypes = {
		app: PropTypes.shape({
			path: PropTypes.string,
			name: PropTypes.string,
		}),
		apps: PropTypes.array,
		children: PropTypes.node,
		pageRoutes: PropTypes.array,
		localStorageUnavailable: PropTypes.func,
		renderHeader: PropTypes.func,
	};

	static defaultProps = {
		renderHeader: props => <Header {...props} />,
	};

	componentDidMount() {
		this.setDocumentTitle();
	}

	componentDidUpdate(prevProps) {
		this.setDocumentTitle();
	}

	setDocumentTitle() {
		if (this.props.app) {
			document.title = this.props.app.name;
		} else {
			document.title = 'Deployment Split Demo';
		}
	}

	_recurseNestedSubpages = (routeCollection, subpages, pageRoute, error, path) => {
		subpages.forEach(subpage => {
			const nextPath = path[0] === '/' ? `${path}/${subpage.page.path}` : `/${path}/${subpage.page.path}`;

			routeCollection.push(
				<Route
					exact
					path={nextPath}
					key={subpage.appPath + pageRoute.page.path + subpage.page.path}
					render={props => (
						<subpage.component {...props} />
					)}
					name={subpage.page.name}
				/>
			);

			if (subpage.subpages) {
				this._recurseNestedSubpages(routeCollection, subpage.subpages, subpage, error, nextPath);
			}
		});
	};

	_generateSubpageRoutes(subpages, pageRoute, error) {
		const routeCollection = [];

		this._recurseNestedSubpages(
			routeCollection,
			subpages,
			pageRoute,
			error,
			`${pageRoute.appPath}/${pageRoute.page.path}`
		);

		return routeCollection;
	}

	render() {
		const pages = [];

		const appLink = this.props.location.pathname.replace(/[^a-z0-9]/gi, '');

		const headerProps = {
			location: this.props.location,
			currentApp: this.props.app,
			appLink,
			appBase: this.props.app && this.props.app.path,
			pages: this.pages,
			apps: this.props.apps,
			appName: this.props.app ? this.props.app.name : '',
		};

		return (
			<main
				id={this.props.app && this.props.app.path}
				className={appLink}
			>
				{this.props.renderHeader(headerProps)}

				{this.props.pageRoutes &&
					this.props.pageRoutes.map(pageRoute => (
						<div key={pageRoute.appPath + pageRoute.page.path}>
							<Route
								exact
								path={`/${pageRoute.appPath}/${pageRoute.page.path}`}
								key={pageRoute.appPath + pageRoute.page.path}
								render={props => (
									<pageRoute.component
										{...props}
										key={pageRoute.appPath + pageRoute.page.path}
									/>
								)}
								name={pageRoute.page.name}
							/>

							{pageRoute.subpages && this._generateSubpageRoutes(pageRoute.subpages, pageRoute, error)}
						</div>
					))}
			</main>
		);
	}
}
