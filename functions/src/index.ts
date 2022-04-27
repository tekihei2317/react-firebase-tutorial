import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import puppeteer from 'puppeteer'

import { collectionName } from './services/mangarel/constants'
import { feedCalendar } from './crawlers/kodansha-calendar'
import { saveFeedMemo } from './firestore-admin/feed-memo'

admin.initializeApp()

export const publishers = functions.region('asia-northeast1').https.onRequest(async (req, res) => {
  const snapshot = await admin.firestore().collection(collectionName.publishers).get()

  const data = snapshot.docs.map((doc) => doc.data())
  res.send({ data })
})

const PUPPETEER_OPTIONS = {
  args: [
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--no-first-run',
    '--no-sandbox',
    '--no-zygote',
    '--single-process',
  ],
  headless: true,
}

export const fetchCalendar = functions
  .region('asia-northeast1')
  .https.onRequest(async (req, res) => {
    const browser = await puppeteer.launch(PUPPETEER_OPTIONS)
    const page = await browser.newPage()

    const db = admin.firestore()
    const feedMemos = await feedCalendar(page)
    const newMemoCount = await saveFeedMemo(db, feedMemos, 'kodansha')
    await browser.close()

    res.send(`Fetched Kodansha calendar. Wrote ${newMemoCount} memos.`)
  })
