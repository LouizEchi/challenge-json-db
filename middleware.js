const fs = require('fs')
const { STATUS_CODES } = require('http')

module.exports = {
  checkIfFileHasData,
  handleError,
  notFound,
  validateParameters
}

function checkIfFileHasData (req, res, next) {
  try {
    const { student_id: studentId, parameters } = req.params

    const path = `./data/${studentId}.json`

    if (!fs.existsSync(path)) {
      return notFound(req, res)
    }

    const data = JSON.parse(fs.readFileSync(path))

    let hasError
    parameters.reduce((previous, value) => {
      if (!previous[value]) {
        hasError = true
      }

      return previous[value]
    }, data)

    if (hasError) {
      return notFound(req, res)
    }

    return next()
  } catch (err) {
    console.log(err)
    if (err.statusCode) {
      return notFound(req, res)
    }
    return handleError(err, req, res, next)
  }
}

function handleError (err, req, res, next) {
  if (res.headersSent) return next(err)

  if (!err.statusCode) console.error(err)
  const statusCode = err.statusCode || 500
  const errorMessage = STATUS_CODES[statusCode] || 'Internal Error'
  res.status(statusCode).json({ error: errorMessage })
}

function notFound (_, res) {
  res.status(404).json({ error: 'Not Found' })
}

async function validateParameters (req, res, next) {
  const params = req.params[0]

  if (!/^((?!\s).)*$/.test(params)) {
    return res.json({
      error: 'Invalid params'
    })
  }

  req.params.parameters = params.split('/').filter(x => x)

  return next()
}
