import Route from '@ioc:Adonis/Core/Route'

Route.post('/forgot', 'Users/ForgotPassword.store')
Route.get('/forgot/:key', 'Users/ForgotPassword.show')
Route.put('/forgot/', 'Users/ForgotPassword.update')
