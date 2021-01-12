import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { showBanner } from '../../actions/bannerActions';
import LocationSearch from './LocationSearch';
import LocationAislesList from './LocationAislesList';
import LocationBaysList from './LocationBaysList';

const useStyles = theme => ({

});

class Locations extends React.Component {
	render() {
		return (
			<>
				<LocationSearch />
				{
					this.props.show === "aisles" && <LocationAislesList />
				}
				{
					this.props.show === "bays" && <LocationBaysList />
				}
			</>
		)
	}
}

export default withStyles(useStyles)(Locations);