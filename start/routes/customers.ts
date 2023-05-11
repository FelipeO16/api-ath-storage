import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/customer', 'Customers/Customer.store').middleware('auth')
Route.get('/api/customer/:id', 'Customers/Customer.show').middleware('auth')
Route.put('/api/customer', 'Customers/Customer.update').middleware('auth')
Route.delete('/api/customer', 'Customers/Customer.destroy').middleware('auth')
