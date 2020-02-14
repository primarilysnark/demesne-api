import { Request, Response, Router as ExpressRouter } from 'express'
import { WithWebsocketMethod } from 'express-ws'
import ws from 'ws'

const INVALID_PARSE_JSON_TYPE = 'invalid-parse-json-type'

function tryParseJson(content: string): { type: string; content?: object } {
  try {
    const json = JSON.parse(content)

    if (!json || typeof json !== 'object') {
      return {
        type: INVALID_PARSE_JSON_TYPE
      }
    }

    return json
  } catch (err) {
    return {
      type: INVALID_PARSE_JSON_TYPE
    }
  }
}

type MessageHandler = (
  req: Request,
  res: Response,
  webSocket: ws,
  content: object
) => any

interface IWSExpressRouter extends ExpressRouter {
  onMessage: (type: string, handler: MessageHandler) => void
  broadcast: (type: string, content: object) => void
}

export function Router(path: string) {
  const router = ExpressRouter() as IWSExpressRouter & WithWebsocketMethod
  const handlers = new Map<string, MessageHandler>()
  const openSockets = new Set<ws>()

  function handleClose(webSocket: ws) {
    if (openSockets.has(webSocket)) {
      openSockets.delete(webSocket)
    }
  }

  function handleMessage(req: Request, res: Response, webSocket: ws) {
    return async (message: string) => {
      const parsedMessage = tryParseJson(message)

      if (
        !parsedMessage.type ||
        parsedMessage.type === INVALID_PARSE_JSON_TYPE
      ) {
        return
      }

      if (handlers.has(parsedMessage.type)) {
        const result = await handlers.get(parsedMessage.type)(
          req,
          res,
          webSocket,
          parsedMessage.content
        )

        if (result) {
          webSocket.send(JSON.stringify(result))
        }
      }
    }
  }

  function onConnect(req: Request, res: Response, webSocket: ws) {
    return handleMessage(
      req,
      res,
      webSocket
    )(JSON.stringify({ type: 'connect' }))
  }

  router.onMessage = (type: string, handler: MessageHandler) => {
    handlers.set(type, handler)
  }

  router.broadcast = (type: string, content: object) => {
    const packet = JSON.stringify({
      type,
      content
    })

    openSockets.forEach(socket => socket.send(packet))
  }

  router.ws(path, async (webSocket: ws, req: Request) => {
    const res: Response = null
    openSockets.add(webSocket)

    webSocket.on('message', await handleMessage(req, res, webSocket))

    webSocket.on('close', () => handleClose(webSocket))
    await onConnect(req, res, webSocket)
  })

  return router
}
