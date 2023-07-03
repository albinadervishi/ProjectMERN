const MenuController = require('../controllers/menu.controller');  

module.exports = (app) => {
    app.get('/api/menu', MenuController.findAllItems);
    app.get('/api/menu/:id', MenuController.getItem);
    app.post('/api/menu/new', MenuController.createItem);
    app.patch('/api/menu/edit/:id', MenuController.updateItem);
    app.delete('/api/menu/:id', MenuController.deleteItem);
}