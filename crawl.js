import {JSDOM} from 'jsdom'

function normalizeURL(url) {
  url = new URL(url)
  if (url.pathname != "/") return url.host + (url.pathname.at(-1) == "/" ? url.pathname.slice(0, -1) : url.pathname)
  else return url.host
}


function getURLsFromHTML(html, baseURL) {
  const urls = []
  const dom = new JSDOM(html)
  const anchors = dom.window.document.querySelectorAll('a')

  for (const anchor of anchors) {
    if (anchor.hasAttribute('href')) {
      let href = anchor.getAttribute('href')

      try {
        // convert any relative URLs to absolute URLs
        href = new URL(href, baseURL).href
        urls.push(href)
      } catch(err) {
        console.log(`${err.message}: ${href}`)
      }
    }
  }

  return urls
}

async function fetchHTML(crURL) {
  const resp = await fetch(crURL, {
    "method" : "get",
    "mode" : "cors",
    "headers" : {
      "Content-Type" : "text/html"
    }
  })
  
  if (resp.status > 399) {
    console.log(`Got HTTP error: ${resp.status} ${resp.statusText}`)
    return
  }
  
  const contentType = resp.headers.get('content-type')
  if (!contentType || !contentType.includes('text/html')) {
    console.log(`Got non-HTML response: ${contentType}`)
    return
  }
  const html = await resp.text()
  return html
}

async function crawlPage(Url) {
  const pages = {}
  
  async function helper(baseURL, crURL = baseURL) {
	if ((new URL(baseURL)).hostname != (new URL(crURL)).hostname)
	  return
  
	if (pages[normalizeURL(crURL)] >= 1) {
	  pages[normalizeURL(crURL)]++
	  return
	}
	
	pages[normalizeURL(crURL)] = 1
	
	console.log(`crawling ${crURL}`)
	const URLs = getURLsFromHTML(await fetchHTML(crURL), baseURL)
	for (const url of URLs)
	  await helper(crURL, url)	
  }
  await helper(Url)
  return pages
}

export {normalizeURL, getURLsFromHTML, crawlPage}