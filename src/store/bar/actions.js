export default function loadData() {
  return dispatch => (
    new Promise((resolve) => {
      dispatch({
        type: 'BAR',
        data: ['a', 'b'],
      });
      resolve();
    })
  );
}
