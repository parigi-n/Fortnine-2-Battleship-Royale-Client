import React from 'react';
import { translate } from 'react-translate';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const CustomButton = (props) => {
  const {
    t, text, click, marginTop, type,
  } = props;
  return (
    <Button variant="contained" type={type} style={{ backgroundColor: 'black', marginTop: `${marginTop}px` }} onClick={click} color="primary">
      {t(text)}
    </Button>
  );
};

CustomButton.propTypes = {
  t: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  click: PropTypes.func,
  marginTop: PropTypes.number,
  type: PropTypes.string,
};

CustomButton.defaultProps = {
  click: () => null,
  marginTop: 0,
  type: 'button',
};

export default (translate('CustomButton')(CustomButton));
