export const setServerErrors = (e, setError) => {
  e.errors?.forEach((error) => {
    const path = error.path.split('.').pop();
    setError(path, {
      type: 'server',
      message: error.message
    })
  });
}
