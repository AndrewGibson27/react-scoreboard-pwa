export default function loadData() {
  return dispatch => (
    new Promise((resolve) => {
      dispatch({
        type: 'BAZ',
        data: ['c', 'd'],
      });
      resolve();
    })
  );
}
