const user = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        token: action.token,
        id: action.id,
        email: action.email,
        username: action.username,
      };
    case 'LOGIN_ERROR':
      return {
        error: action.error,
      };
    case 'LOGIN_DISCONNECT':
      return {
        disconnect: action.bool,
      };
    case 'JOIN_ROOM':
      return Object.assign({}, state, {
        idroom: action.idroom,
      });
    default:
      return state;
  }
};

export default user;
