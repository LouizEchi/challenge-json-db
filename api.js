const {
  assignData,
  retrieveData,
  removeData,
  fileRetrieval,
  fileSave
} = require('./model')

module.exports = {
  getStudent,
  removeStudent,
  updateStudent
}

async function getStudent (req, res) {
  const { student_id: studentId, parameters } = req.params

  const path = `./data/${studentId}.json`

  const file = await fileRetrieval(path)
  const data = await retrieveData(file, parameters)

  res.json({ success: true, data })
}

async function removeStudent (req, res) {
  const { student_id: studentId, parameters } = req.params

  const path = `./data/${studentId}.json`

  const data = await fileRetrieval(path)
  await removeData(data, parameters)

  await fileSave(path, data)

  res.json({ success: true, data })
}

async function updateStudent (req, res) {
  const { student_id: studentId, parameters } = req.params
  const body = req.body

  const path = `./data/${studentId}.json`
  const data = await fileRetrieval(path)

  await assignData(data, parameters, body)

  await fileSave(path, data)

  res.json({ success: true, data })
}
