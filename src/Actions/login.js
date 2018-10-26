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
  let token = '';
  fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    body: data,
  }).then((response) => {
    if (response.ok) {
      token = response.headers.get('authorization');
      return response.json();
    }
    throw new Error('Network response was not ok.');
  }).then((json) => {
    dispatch(loginSuccess(token, json.user.id, json.user.email, json.user.username));
  })
    .catch(() => {
      dispatch(loginError(true));
    });
};

export const createFetch = data => (dispatch) => {
  let token = '';
  fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    body: data,
  }).then((response) => {
    if (response.ok) {
      token = response.headers.get('authorization');
      return response.json();
    }
    throw new Error('Network response was not ok.');
  }).then((json) => {
    console.log(json);
    dispatch(loginSuccess(token, json.id, json.email, json.username));
  })
    .catch(() => {
      dispatch(loginError(true));
    });
};
