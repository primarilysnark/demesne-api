import fetch from 'node-fetch'
import jsdom from 'jsdom'

export async function get(url: string) {
  const page = await fetch(url).then(res => res.text())
  const dom = new jsdom.JSDOM(page, { url })

  return dom
}

export async function post(url: string, body: object) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(async res => {
    return [await res.json(), res.status]
  })
}
