import Route from '@ioc:Adonis/Core/Route'

Route.post('/register', 'Users/Register.store')
Route.get('/register/:key', 'Users/Register.show')
Route.put('/register', 'Users/Register.update')
