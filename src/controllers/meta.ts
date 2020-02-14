import express from 'express'

export function getRouter() {
  const router = express.Router()

  router.get('/', (_req, res) => {
    return res.json({
      meta: {
        version: 'v1',
        license:
          "This API uses trademarks and/or copyrights owned by Paizo Inc., which are used under Paizo's Community Use Policy. We are expressly prohibited from charging you to use or access this content. This API is not published, endorsed, or specifically approved by Paizo Inc. For more information about Paizo's Community Use Policy, please visit paizo.com/communityuse. For more information about Paizo Inc. and Paizo products, please visit paizo.com."
      }
    })
  })

  return router
}
