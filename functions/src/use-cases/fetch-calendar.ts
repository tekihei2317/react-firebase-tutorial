import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import puppeteer from 'puppeteer'

import { feedCalendar } from '../crawlers/kodansha-calendar'
import { saveFeedMemo } from '../firestore-admin/feed-memo'

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

module.exports = functions.region('asia-northeast1').https.onRequest(async (req, res) => {
  const browser = await puppeteer.launch(PUPPETEER_OPTIONS)
  const page = await browser.newPage()

  const db = admin.firestore()
  const feedMemos = await feedCalendar(page)
  const newMemoCount = await saveFeedMemo(db, feedMemos, 'kodansha')
  await browser.close()

  res.send(`Fetched Kodansha calendar. Wrote ${newMemoCount} memos.`)
})
