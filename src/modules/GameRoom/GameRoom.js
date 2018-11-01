import React, { Component } from 'react';
import { translate } from 'react-translate';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BeatLoader } from 'react-spinners';
import CustomButton from '../CustomMaterialUIComponent/CustomButton';
import './GameRoom.css';

class GameRoom extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="GameRoom">
        <p className="LogDisplay" />

        <div className="btn_container">
          <div>
            <p>{t('CHOOSE')}</p>
            <CustomButton marginTop={20} text="ROCK" />
            <CustomButton marginTop={20} text="PAPER" />
            <CustomButton marginTop={20} text="SCISSORS" />
          </div>
        </div>

        <div className="Wait">
          <p>
            <BeatLoader
              sizeUnit="px"
              size={15}
              color="black"
              loading
            />
          </p>
        </div>

        <CustomButton marginTop={20} text="DISCONNECTROOM" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
  token: state.user.token,
});

GameRoom.propTypes = {
  t: PropTypes.func.isRequired,
  token: PropTypes.string,
};

export default connect(mapStateToProps)(translate('GameRoom')(GameRoom));
