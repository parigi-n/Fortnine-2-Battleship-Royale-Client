export const joinRoom = idroom => ({
  type: 'JOIN_ROOM',
  idroom,
});

const getRoomFetch = (token, callback) => {
  fetch('http://188.166.50.184:3000/rooms', {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.status);
  }).then((json) => {
    callback(json);
  }).catch(() => {
  });
};

export default getRoomFetch;
