const Order = require('../model/order.model');
const User = require('../model/user.model');
const Menu = require('../model/menu.model')

module.exports.findAllOrders = (req, res) => {
    Order.find() 
    .populate('user')
    .populate('products.menu')
         .then((allOrders) =>{res.json({orders: allOrders })})
         .catch ((err) => {res.json({ message: "Something went wrong", error: err})});
}

// module.exports.newOrder = async (req, res) => {
//   try {
//     const { userId, foodId, quantity, price } = req.body;

//     const user = await User.findOne({ _id: userId });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const menu = await Menu.findOne({ _id: foodId });
//     if (!menu) {
//       return res.status(404).json({ message: 'Food item not found' });
//     }

//     const order = {
//       user: {
//         userId: user._id,
//         address: user.address,
//         phoneNumber: user.phoneNumber,
//       },
//       products: {
//         foodId: menu._id,
//         foodName: menu.name,
//         amount: quantity,
//         img: menu.img,
//         price: price,
//       },
//     };

//     const createdOrder = await Order.create(order);

//     const updatedUser = await User.findOneAndUpdate(
//       { _id: userId },
//       { $push: { orders: createdOrder._id } },
//       { new: true, runValidators: true }
//     ).populate('Order');

//     res.status(200).json({
//       message: 'Food order created',
//       user: updatedUser,
//       order: createdOrder,
//     });
//   } catch (err) {
//     console.log('Failed to create a food order: ' + err);
//     res.json(err);
//   }
// };

module.exports.newOrder = (req, res) => {
  console.log(req.body);

  const { userId, products, price } = req.body;

  User.findOne({ _id: userId })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const menuPromises = products.map(product => {
        return Menu.findOne({ _id: product.foodId });
      });

      Promise.all(menuPromises)
        .then(menus => {
          const validProducts = products.filter((product, index) => {
            return menus[index] !== null;
          });

          if (validProducts.length !== products.length) {
            return res.status(404).json({ message: 'One or more food items not found' });
          }

          const order = new Order({
            price: price,
            user: user,
            products: validProducts.map(product => ({
              menu: product.foodId,
              quantity: product.quantity
            }))
          });

          order.save()
            .then(createdOrder => {
              User.findOneAndUpdate(
                { _id: userId },
                { $push: { orders: createdOrder._id } },
                { new: true, runValidators: true }
              )
                .populate('orders')
                .exec()
                .then(updatedUser => {
                  res.status(200).json({
                    message: 'Order created',
                    user: updatedUser,
                    order: createdOrder
                  });
                })
                .catch(err => {
                  console.log('Failed to update user with order ID: ' + err);
                  res.json(err);
                });
            })
            .catch(err => {
              console.log('Failed to create an order: ' + err);
              res.json(err);
            });
        })
        .catch(err => {
          console.log('Failed to find food items: ' + err);
          res.json(err);
        });
    })
    .catch(err => {
      console.log('Failed to find user: ' + err);
      res.json(err);
    });
};



module.exports.getOneOrder= (req, res) => {
    Order.findOne({ _id: req.params.id })
    .populate('user')
    .populate('products')
        .then(order => res.json(order))
        .catch(err => res.json(err))
};

module.exports.deleteOrder = (request, response) => {
    Order.deleteOne({ _id: request.params.id }) 
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}