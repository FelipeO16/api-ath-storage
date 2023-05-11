import Route from '@ioc:Adonis/Core/Route'

Route.post('/api/category', 'Category/Category.store').middleware('auth')
Route.get('/api/category', 'Category/Category.index').middleware('auth')
Route.get('/api/category/:id', 'Category/Category.show').middleware('auth')
Route.put('/api/category', 'Category/Category.update').middleware('auth')
Route.delete('/api/category', 'Category/Category.destroy').middleware('auth')
