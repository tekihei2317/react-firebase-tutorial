import admin from 'firebase-admin'
import { Command } from 'commander'
import fs from 'fs'
import { parse } from 'csv-parse/sync'

import { Publisher } from '../services/mangarel/models/publisher'
import { collectionName } from '../services/mangarel/constants'

import serviceAccount from '../react-firebase-tutorial-adminsdk.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
})

const db = admin.firestore()

async function uploadSeed(collection: string, seedFile: string) {
  const fileContent = fs.readFileSync(seedFile, { encoding: 'utf-8' })
  const records = parse(fileContent, {
    columns: true,
    delimiter: '\t',
    skipEmptyLines: true,
  })

  const collectionRef = db.collection(collection)

  if (collection === collectionName.publishers) {
    const docs: Required<Publisher>[] = records.map((record: Publisher) => ({
      ...record,
      website: record.website ? record.website : null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }))
    for await (const doc of docs) {
      const { id, ...docWithoutId } = doc
      await collectionRef.doc(id).set(docWithoutId)
    }
  } else {
    throw new Error(`Seeder for collection ${collection} does not exist.`)
  }
}

const command = new Command()
command.version('0.1.0', '-v, --version').arguments('<collection> <seedFile>').action(uploadSeed)

command.parse(process.argv)
