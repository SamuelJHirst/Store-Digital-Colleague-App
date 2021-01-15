import React from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Loading from '../common/Loading';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ModuleHeader from './ModuleHeader';
import ModuleLocation from './ModuleLocation';
import ModuleProducts from './ModuleProducts';

const useStyles = theme => ({
	cardContent: {
        "&:last-child": {
            paddingBottom: 16
        }
    },
});

class ModuleInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			module: {}
		}
	}

	componentDidMount() {
		axios.get('/module/site/' + this.props.apiUser.site.code + '/' + this.props.match.params.discriminator, { headers: { Authorization: this.props.apiToken } }).then((module) => {
			this.setState({ ...this.state, module: module.data.data })
		});
	}

	render() {
		const { classes } = this.props;
		if (!this.state.module.module) return ( <Loading /> );
		return (
			<>
				<ModuleHeader module={this.state.module.module} />
				<Box m={1}>
					<Card>
						<CardContent className={classes.cardContent}>
							<Link to='/modules'>
								<Typography color="textPrimary">Go Back</Typography>
							</Link>
						</CardContent>
					</Card>
				</Box>
				<ModuleLocation discriminator={this.state.module.module.discriminator} bay={this.state.module.bay} />
				<ModuleProducts products={this.state.module.module.products} />
			</>
		);
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser,
});

export default connect(mapStateToProps, null)(withRouter(withStyles(useStyles)(ModuleInfo)));