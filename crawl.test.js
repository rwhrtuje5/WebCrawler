import { test, expect } from "@jest/globals"
import { normalizeURL, getURLsFromHTML } from "./crawl.js"

function runTest(discription, func, input, output) {
  test(discription, function() {
	expect(func(input)).toEqual(output)
  })
}

runTest("https://youtube.com equal youtube.com ", normalizeURL, "https://youtube.com", "youtube.com")
runTest("http://youtube.coma equal youtube.coma ", normalizeURL, "http://youtube.coma", "youtube.coma")
runTest("http://blog.boot.dev/path equal blog.boot.dev/path", normalizeURL, "http://blog.boot.dev/path", "blog.boot.dev/path")
runTest("https://blog.boot.dev/path/ equal blog.boot.dev/path", normalizeURL, "https://blog.boot.dev/path/", "blog.boot.dev/path")
runTest("http://blog.boot.dev/path/ equal blog.boot.dev/path", normalizeURL, "http://blog.boot.dev/path/", "blog.boot.dev/path")
runTest("TEST#01", getURLsFromHTML, `
  <html>
    <body>
      <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
  </html>`, [
  "https://blog.boot.dev/"
])
runTest("TEST#01", getURLsFromHTML, `
  <html>
    <body>
      <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
      <a href="https://blog.boot.dcc"><span>Go to Boot.dev</span></a>
    </body>
  </html>`, [
  "https://blog.boot.dev/",
  "https://blog.boot.dcc/"
])
