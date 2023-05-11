import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/order', 'Orders/Order.store').middleware('auth')
Route.get('/api/orders', 'Orders/Order.index').middleware('auth')
Route.put('/api/order', 'Orders/Order.update').middleware('auth')
Route.get('/api/order/:id', 'Orders/Order.show').middleware('auth')
Route.delete('/api/order', 'Orders/Order.destroy').middleware('auth')
