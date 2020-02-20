import { JSDOM } from 'jsdom'

interface Room {
  name: string
  benefit?: string
  bonus?: number
  costs?: {
    [key: string]: number
  }
  description?: string
  earnings?: {
    goods: boolean
    influence: boolean
    labor: boolean
    magic: boolean
    gp: boolean
  }
  size?: {
    minimum: number
    maximum: number
  }
  time?: number
}

function parseRoomDescriptionNode(room: Room, node: Node) {
  room.description = node.previousSibling.previousSibling.textContent.trim()
}

function parseRoomAttributeNode(room: Room, node: Element) {
  node.querySelectorAll('b').forEach(strongElement => {
    switch (strongElement.textContent.trim()) {
      case 'Benefit':
        room.benefit = node.textContent.trim()
        break

      case 'Create':
        const costsText = strongElement.nextSibling.textContent.trim()
        const costsRegExp = /(\d+) ([A-Z]\w+)/g

        const costs: {
          [key: string]: number
        } = {
          goods: 0,
          influence: 0,
          labor: 0,
          magic: 0
        }
        let match
        // tslint:disable-next-line: no-conditional-assignment
        while ((match = costsRegExp.exec(costsText)) !== null) {
          costs[match[2].toLowerCase()] = parseInt(match[1], 10)
        }
        room.costs = costs
        break

      case 'Earnings':
        const earningsText = strongElement.nextSibling.textContent.trim()
        const earnings = earningsText.match(/\+(\d+)/)
        room.bonus = parseInt(earnings[1], 10)
        room.earnings = {
          goods: earningsText.includes('Goods'),
          influence: earningsText.includes('Influence'),
          labor: earningsText.includes('Labor'),
          magic: earningsText.includes('Magic'),
          gp: earningsText.includes('gp')
        }
        break

      case 'Size':
        const size = strongElement.nextSibling.textContent.match(/(\d+)—(\d+)/)
        room.size = {
          minimum: parseInt(size[1], 10),
          maximum: parseInt(size[2], 10)
        }
        break

      case 'Time':
        const timeText = strongElement.nextSibling.textContent
          .trim()
          .match(/\d+/)

        if (timeText) {
          room.time = parseInt(timeText[0], 10)
        }
        break

      default:
        // console.log(strongElement.textContent)
        break
    }
  })
}

export function parseRoomsAndTeams(dom: JSDOM) {
  const { Node } = dom.window

  const startNode = dom.window.document.querySelector('#rooms')
  let node = startNode.nextSibling

  const rooms = []
  let room: Room
  while (
    node != null &&
    (node.nodeType !== Node.ELEMENT_NODE ||
      (node as Element).id !== 'room-augmentations')
  ) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element

      if (element.className === 'stat-block-title') {
        if (room) {
          parseRoomDescriptionNode(room, element)
          rooms.push(room)
        }

        room = {
          name: element.textContent
        }
      }

      if (element.className === 'stat-block-1') {
        parseRoomAttributeNode(room, element)
      }
    }

    node = node.nextSibling
  }

  if (room) {
    parseRoomDescriptionNode(room, node)
    rooms.push(room)
  }

  return rooms
}
