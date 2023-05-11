import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/order', 'Orders/Order.store')
Route.post('/api/logs', 'Orders/Order.log')
Route.get('/api/orders', 'Orders/Order.index')
Route.put('/api/order', 'Orders/Order.update')
Route.get('/api/order/:id', 'Orders/Order.show')
Route.delete('/api/order', 'Orders/Order.destroy')
