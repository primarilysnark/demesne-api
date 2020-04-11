import { ManagementClient } from 'auth0'

const env =
  (process.env.NODE_ENV as 'development' | 'test' | 'production') ||
  'development'

export let client: ManagementClient

if (
  process.env.AUTH0_DOMAIN &&
  process.env.AUTH0_CLIENT_ID &&
  process.env.AUTH0_CLIENT_SECRET
) {
  client = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: 'read:users update:users'
  })
} else {
  // tslint:disable-next-line: no-var-requires
  const configs = require('../../config/auth0.json')
  client = new ManagementClient({
    ...configs[env],
    scope: 'read:users update:users'
  })
}
