import * as fetch from './fetch'
import { parseRoomsAndTeams } from './parse-room'

async function getRooms() {
  const dom = await fetch.get(
    'http://legacy.aonprd.com/ultimateCampaign/downtime/roomsAndTeams.html'
  )
  const rooms = parseRoomsAndTeams(dom)

  await Promise.all(
    rooms.map(room =>
      fetch.post('http://localhost:8080/api/rooms', {
        data: {
          attributes: room
        }
      })
    )
  )
}

getRooms()
