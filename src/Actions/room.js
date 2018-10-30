export const joinRoom = idroom => ({
  type: 'JOIN_ROOM',
  idroom,
});

const getRoomFetch = (token, callback) => {
  fetch('http://localhost:3000/rooms', {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  }).then((json) => {
    callback(json);
  }).catch(() => {
  });
};

export default getRoomFetch;
