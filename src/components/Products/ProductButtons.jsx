import React from 'react';
import ProductModules from './ProductModules';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class ProductButtons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menu: null
		}
	}

	setMenu = (menu) => {
		this.setState({ ...this.state, menu: menu });
	}

	render() {
		return (
			<>
				<Box p={1}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={12} md={4}>
							<Button variant="contained" color="primary" fullWidth size="large">Search Other Sites</Button>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Button variant="contained" color="primary" fullWidth size="large" disabled>Upcoming Deliveries</Button>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Button variant="contained" color="primary" fullWidth size="large" onClick={() => { this.setMenu('modules'); }}>View Related Modules</Button>
						</Grid>
					</Grid>
				</Box>
				<ProductModules open={this.state.menu === 'modules'} close={() => { this.setMenu(null); }} modules={this.props.modules} />
			</>
		);
	}
}

export default ProductButtons;