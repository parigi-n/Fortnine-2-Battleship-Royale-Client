import React from 'react';
import { translate } from 'react-translate';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CustomDialog = (props) => {
  const {
    errMsg, t, open, handleClose,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{t('OOPS')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t(errMsg)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {t('OK')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  errMsg: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default (translate('CustomDialog')(CustomDialog));
