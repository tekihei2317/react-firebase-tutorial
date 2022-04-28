import admin from 'firebase-admin'

admin.initializeApp()

const functionMap = {
  fetchCalendar: './use-cases/fetch-calendar',
  publishers: './use-cases/publishers',
}

function loadFunctions(fnMap: typeof functionMap) {
  for (const [functionName, path] of Object.entries(fnMap)) {
    if (!process.env.FUNCTION_TARGET || process.env.FUNCTION_TARGET === functionName) {
      module.exports[functionName] = require(path)
    }
  }
}

loadFunctions(functionMap)
