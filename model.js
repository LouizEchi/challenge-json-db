const fs = require('fs')

module.exports = {
  assignData,
  retrieveData,
  removeData,
  fileRetrieval,
  fileSave
}

async function assignData (data, parameters, body) {
  return parameters.reduce((previous, value, i) => {
    if (!previous[value]) previous[value] = {}

    if (i === parameters.length - 1) {
      Object.assign(previous[value], body)
    }

    return previous[value]
  }, data)
}

async function removeData (data, parameters) {
  return parameters.reduce((previous, value, i) => {
    if (i === parameters.length - 1) {
      Reflect.deleteProperty(previous, value)
    }

    return previous[value]
  }, data)
}

async function retrieveData (data, parameters) {
  return parameters.reduce((previous, value, i) => {
    if (!previous[value]) previous[value] = {}
    return previous[value]
  }, data)
}

async function fileRetrieval (path) {
  let data = {}

  if (fs.existsSync(path)) {
    data = JSON.parse(fs.readFileSync(path))
  }

  return data
}

async function fileSave (path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
}
