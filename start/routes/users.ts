import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/register', 'Users/Register.store')
Route.get('/api/register/:key', 'Users/Register.show')
Route.put('/api/register', 'Users/Register.update')
