import Route from '@ioc:Adonis/Core/Route'

Route.post('/product', 'Products/Product.store')
Route.get('/product/:name', 'Products/Product.show')
Route.put('/product', 'Products/Product.update')
Route.delete('/product', 'Products/Product.destroy')

Route.get('/products', 'Products/Product.index')
Route.get('/products/:category', 'Products/Product.productsByCategory')
