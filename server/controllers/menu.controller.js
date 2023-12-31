const Menu = require('../model/menu.model');

module.exports.findAllItems = (req, res) => {
    Menu.find() 
         .then((allItems) =>{res.json({menu: allItems })})
         .catch ((err) => {res.json({ message: "Something went wrong", error: err})});
}

module.exports.getItem = (request, response) => {
    Menu.findOne({ _id: request.params.id })
        .then(item => response.json(item))
        .catch(err => response.json(err));
}

module.exports.createItem = (request, response) => {
    const { name } = request.body;
    Menu.exists({ name })
      .then(nameExists => {
        if (nameExists) {
          return Promise.reject({ errors: { name: { message: 'This item is already existing' } } });
        } else {
            return Menu.create(request.body);
        }
      })
      .then(item => response.json(item))
      .catch(err => response.json(err));
  };

  module.exports.updateItem = (request, response) => {
    const foodId = request.params.id;
    const updatedItem = request.body;
    
    if (updatedItem.name) {
        Menu.find({ name: updatedItem.name, _id: { $ne: foodId } })
            .then(nameExists => {
                if (nameExists.length > 0) {
                    return Promise.reject({ errors: { name: { message: 'This item already exists' } } });
                } else {
                    Menu.findOneAndUpdate({ _id: foodId }, updatedItem, { new: true })
                        .then(updatedItem => response.json(updatedItem))
                        .catch(err => response.json(err));
                }
            })
            .catch(err => response.json(err));
    } else {
        Menu.findOneAndUpdate({ _id: foodId }, updatedItem, { new: true })
            .then(updatedItem => response.json(updatedItem))
            .catch(err => response.json(err));
    }
};
  


module.exports.deleteItem = (request, response) => {
    Menu.deleteOne({ _id: request.params.id }) 
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}