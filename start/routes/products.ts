import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/product', 'Products/Product.store')
Route.get('/api/product/:name', 'Products/Product.show')
Route.put('/api/product', 'Products/Product.update')
Route.delete('/product', 'Products/Product.destroy')

Route.get('/api/products', 'Products/Product.index')
Route.get('/api/products/:category', 'Products/Product.productsByCategory')
