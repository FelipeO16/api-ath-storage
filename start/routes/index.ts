import Route from '@ioc:Adonis/Core/Route'
import './auth'
import './users'
import './password'
import './customers'
import './products'
import './categories'
import './orders'
import './order_products'
import './analytics'

Route.get('/', async () => {
  return { hello: 'world' }
})
