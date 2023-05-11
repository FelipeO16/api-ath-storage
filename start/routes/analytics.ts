import Route from '@ioc:Adonis/Core/Route'

Route.get('/api/analytics/:date?', 'Analytics/Analytics.show').middleware('auth')
// Route.put('/analytics/', 'Analytics/Analytics.update')
