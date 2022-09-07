import Route from '@ioc:Adonis/Core/Route'

Route.post('/order/product', 'Orders/OrderProducts.store').middleware('auth')
Route.get('/order/products/:id', 'Orders/OrderProducts.index').middleware('auth')
Route.put('/order/product', 'Orders/OrderProducts.update').middleware('auth')
Route.get('/order/total/:id', 'Orders/OrderProducts.show').middleware('auth')
Route.delete('/order/product', 'Orders/OrderProducts.destroy').middleware('auth')
