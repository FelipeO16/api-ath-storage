import Route from '@ioc:Adonis/Core/Route'

Route.post('/order', 'Orders/Order.store').middleware('auth')
Route.get('/orders', 'Orders/Order.index').middleware('auth')
Route.put('/order', 'Orders/Order.update').middleware('auth')
Route.get('/order/:id', 'Orders/Order.show').middleware('auth')
Route.delete('/order', 'Orders/Order.destroy').middleware('auth')
