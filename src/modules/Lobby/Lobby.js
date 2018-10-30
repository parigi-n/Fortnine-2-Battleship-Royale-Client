import React, { Component } from 'react';
import { translate } from 'react-translate';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import grey from '@material-ui/core/colors/grey';
import getRoomFetch from '../../Actions/room';
import Room from './Room';
import Header from '../Header/Header';
import './Lobby.css';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { token } = this.props;
    getRoomFetch(token, (arrayRooms) => {
      this.setState({ datas: arrayRooms });
    });
  }

  render() {
    const { datas } = this.state;
    const { t } = this.props;
    if (!datas) {
      return (
        <div className="Lobby" align="center">
          <Header />
          <CircularProgress className="center" size={100} style={{ color: grey[900] }} />
        </div>
      );
    }
    return (
      <div className="Lobby" align="center">
        <Header />
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <CustomTableCell>{t('TABNAMEROOM')}</CustomTableCell>
                <CustomTableCell numeric>{t('TABOWNER')}</CustomTableCell>
                <CustomTableCell numeric>{t('TABCURCONNECT')}</CustomTableCell>
                <CustomTableCell numeric>{t('TABOPTIONS')}</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas.map(it => (
                <Room
                  key={it.id}
                  id={it.id}
                  roomname={it.name}
                  user={it.roomOwner.username}
                  playerList={it.playerList}
                />
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Link to="/createRoom"><button className="button_fortnine add_new_room" type="button">{ t('ADDROOM') }</button></Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.user.username,
  token: state.user.token,
});

const mapDispatchToProps = () => ({});

Lobby.propTypes = {
  t: PropTypes.func.isRequired,
  token: PropTypes.string,
};

Lobby.defaultProps = {
  token: '',
};


export default connect(mapStateToProps, mapDispatchToProps)(translate('Lobby')(Lobby));
