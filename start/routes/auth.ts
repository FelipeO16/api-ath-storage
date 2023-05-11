import Route from '@ioc:Adonis/Core/Route'

// Route.post('/auth', 'Auth/Main.store')
// Route.delete('/auth', 'Auth/Main.destroy').middleware('auth')

Route.post('/api/auth', 'Auth/Main.store')
Route.get('/api/auth/', 'Auth/Main.show').middleware('auth')
Route.delete('/api/auth', 'Auth/Main.destroy').middleware('auth')
