import React from 'react';


function TabPanel(props) {
	const { children, value, index, ...other } = props;

   return (
	  <div
		  hidden={value !== index}
		  {...other}
	  >
		  { value === index && <Box p={1}>{children}</Box> }
	  </div>
	);
}

export default TabPanel;