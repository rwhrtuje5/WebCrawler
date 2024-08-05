import { normalizeURL, getURLsFromHTML, crawlPage } from "./crawl.js"
import { printReport } from "./report.js"
async function main() {
  const argv = process.argv.slice(2)
  if (argv.length > 1 ||argv.length < 1 ) {
	cosole.error("ERROR: arguments number")
  }
  const baseURL = argv[0]
  console.log(`the crawler is starting at ${baseURL}`) 
  printReport(await crawlPage(baseURL))
}

main()