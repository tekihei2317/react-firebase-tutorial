import admin from 'firebase-admin'
import { Command } from 'commander'
import fs from 'fs'
import { parse } from 'csv-parse/sync'

// import { Publisher } from '../services/mangarel/models/publisher'
// import { collectionName } from '../services/mangarel/constants'

import serviceAccount from '../react-firebase-tutorial-adminsdk.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
})

async function uploadSeed(collection: string, seedFile: string) {
  const fileContent = fs.readFileSync(seedFile, { encoding: 'utf-8' })
  const records = parse(fileContent, {
    columns: true,
    delimiter: '\t',
    skipEmptyLines: true,
  })

  console.log(records)
}

const command = new Command()
command.version('0.1.0', '-v, --version').arguments('<collection> <seedFile>').action(uploadSeed)

command.parse(process.argv)
