import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import { User } from 'App/Models'

export const { actions } = Bouncer.define('isAuthorized', (user: User, id: number) => {
  return user.id === id
})

export const { policies } = Bouncer.registerPolicies({})
