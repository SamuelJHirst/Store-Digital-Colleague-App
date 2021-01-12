import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { showBanner } from '../../actions/bannerActions';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

const useStyles = theme => ({

});

class LocationAislesList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			aisles: []
		};
	}

	componentDidMount() {
		axios.get('/aisle/' + this.props.apiUser.site.code, { headers: { Authorization: this.props.apiToken } }).then((aisles) => {
			this.setState({ ...this.state, aisles: aisles.data.data });
		}, (error) => {
			this.props.showBanner('Cannot Get Aisles: Something Went Wrong', 'error');
		});
	}
	
	render() {
		return (
			<>
				<Box m={1}>
					<Card>
						<CardContent>
							<List component="nav">
							<Divider />
								{
									this.state.aisles.map(aisle => (
										<>
											<ListItemLink key={aisle.aisle} component={Link} to={"/locations/" + aisle.aisle}>
												<ListItemText primary={aisle.aisle + " - " + aisle.name} />
											</ListItemLink>
											<Divider />
										</>
									))
								}
							</List>	
						</CardContent>
					</Card>
				</Box>
			</>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(withStyles(useStyles)(LocationAislesList));