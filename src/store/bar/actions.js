export default function loadData() {
  return dispatch => (
    new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: 'BAR',
          data: ['a', 'b'],
        });
        resolve();
      }, 3000);
    })
  );
}
