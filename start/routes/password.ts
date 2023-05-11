import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/forgot', 'Users/ForgotPassword.store')
Route.get('/api/forgot/:key', 'Users/ForgotPassword.show')
Route.put('/api/forgot/', 'Users/ForgotPassword.update')
