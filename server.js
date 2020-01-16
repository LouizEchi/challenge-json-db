const express = require('express')
const bodyParser = require('body-parser')

const { updateStudent, removeStudent, getStudent } = require('./api')
const {
  validateParameters,
  checkIfFileHasData,
  handleError,
  notFound
} = require('./middleware')

const router = express.Router()

const PORT = process.env.PORT || 1337

const app = express()

app.use(bodyParser.json())

router.put('/:student_id/:propertyName(*)', validateParameters, updateStudent)
router.get(
  '/:student_id/:propertyName(*)',
  validateParameters,
  checkIfFileHasData,
  getStudent
)

router.delete(
  '/:student_id/:propertyName(*)',
  validateParameters,
  checkIfFileHasData,
  removeStudent
)

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
)

app.use(router)

app.use(handleError)
app.use(notFound)

if (require.main !== module) {
  module.exports = server
}
