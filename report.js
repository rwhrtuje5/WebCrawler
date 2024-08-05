function printReport(pages) {
 console.log("\n\n\n$$$ The report is starting $$$\n\n\n")
  const ar = []
  for (const key in pages)
	ar.push([pages[key], key])
  
  ar.sort(([a, x], [b, y]) => {
	return b - a
  })
  for (const [count, url] of ar)
	console.log(`Found ${count} internal links to ${url}`)
}

export {printReport} 