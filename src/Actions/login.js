export const setUser = (token, id, email, username ) => ({
  type: 'SET_USER',
  token,
  id,
  email,
  username,
});
