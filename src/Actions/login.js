export const loginSuccess = (token, id, email, username) => ({
  type: 'LOGIN_SUCCESS',
  token,
  id,
  email,
  username,
});

export const loginError = error => ({
  type: 'LOGIN_ERROR',
  error,
});

export const loginLoading = loading => ({
  type: 'LOGIN_LOADING',
  loading,
});

export const loginFetch = data => (dispatch) => {
  dispatch(loginLoading(true));
  fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    body: data,
  }).then((response) => {
    if (response.ok) {
      return response.headers.get('authorization');
    }
    dispatch(loginLoading(false));
    throw new Error('Network response was not ok.');
  }).then((tokenAuth) => {
    fetch('http://localhost:3000/users/me', {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: tokenAuth,
      },
    }).then((response) => {
      dispatch(loginLoading(false));
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
      .then((item) => {
        dispatch(loginSuccess(tokenAuth, item.id, item.email, item.username));
      });
  })
    .catch(() => {
      dispatch(loginError(true));
    });
};
