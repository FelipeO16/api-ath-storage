import Route from '@ioc:Adonis/Core/Route'

Route.post('/category', 'Category/Category.store').middleware('auth')
Route.get('/category', 'Category/Category.index').middleware('auth')
Route.get('/category/:id', 'Category/Category.show').middleware('auth')
Route.put('/category', 'Category/Category.update').middleware('auth')
Route.delete('/category', 'Category/Category.destroy').middleware('auth')
