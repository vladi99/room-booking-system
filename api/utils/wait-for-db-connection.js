export default async function retry(sequelizeInstance, retryDelay) {
  try {
    await sequelizeInstance.authenticate()
    console.log('Connected to db.')
  } catch (error) {
    console.log(
      `Could not connect to db instance, retrying in ${retryDelay} milliseconds...`,
      error.toString()
    )
    await new Promise(resolve => setTimeout(resolve, retryDelay))
    await retry(sequelizeInstance, retryDelay)
  }
}
