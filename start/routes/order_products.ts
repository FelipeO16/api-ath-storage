import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/order/product', 'Orders/OrderProducts.store').middleware('auth')
Route.get('/api/order/products/:id', 'Orders/OrderProducts.index').middleware('auth')
Route.put('/api/order/product', 'Orders/OrderProducts.update').middleware('auth')
Route.get('/api/order/total/:id', 'Orders/OrderProducts.show').middleware('auth')
Route.delete('/api/order/product', 'Orders/OrderProducts.destroy').middleware('auth')
