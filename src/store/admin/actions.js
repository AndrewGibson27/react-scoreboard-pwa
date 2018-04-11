export default function loadData() {
  return dispatch => (
    new Promise((resolve) => {
      dispatch({
        type: 'FOO',
        data: ['fun', 'sun'],
      });
      resolve();
    })
  );
}
