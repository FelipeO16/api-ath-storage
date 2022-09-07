import Route from '@ioc:Adonis/Core/Route'

Route.post('/customer', 'Customers/Customer.store').middleware('auth')
Route.get('/customer/:id', 'Customers/Customer.show').middleware('auth')
Route.put('/customer', 'Customers/Customer.update').middleware('auth')
Route.delete('/customer', 'Customers/Customer.destroy').middleware('auth')
