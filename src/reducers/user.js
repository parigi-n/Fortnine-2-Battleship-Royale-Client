const user = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER':
      return [
        ...state,
        {
          token: action.token,
          id: action.id,
          email: action.email,
          username: action.username,
        },
      ];
    default:
      return state;
  }
};

export default user;
