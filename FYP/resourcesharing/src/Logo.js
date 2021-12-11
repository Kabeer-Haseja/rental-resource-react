import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box   component="img" src="./RR.png" alt="hh" sx={{ width: 40, height: 100, ...sx }} />;
}
