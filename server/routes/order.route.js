const OrderController = require('../controllers/order.controller');  
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/order', OrderController.findAllOrders);
    app.get('/api/order/:id', OrderController.getOneOrder);
    app.post('/api/order/new', OrderController.newOrder);
    app.delete('/api/order/:id', OrderController.deleteOrder);
}