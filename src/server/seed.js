import { User, Product } from './database.js';
import { encrypt } from './constants.js';

const productsArray = [
  {
    'id': 1,
    'name': 'Towel',
    'cost': 50,
    'description': 'Handy tool to wipe your face',
    'quantity': 500,
    'image': 'http://www.ikea.com/PIAimages/0104142_PE250908_S5.JPG'
  },{
    'id': 2,
    'name': 'Toothbrush',
    'cost': 10,
    'description': 'Handy tool to clean your teeth',
    'quantity': 1000,
    'image': 'http://images.gumbrand.com/media/catalog/product/cache/1/image/600x600/9df78eab33525d08d6e5fb8d27136e95/4/3/430_us_r_1ct_12-14.png'
  }
]

User.sync({force: true}).then(() => {
  User.create({
    id: 1,
    name: 'Ben',
    email: 'ben@soundcontrolrecords.com',
    password: encrypt('password'),
  }).then(user => {
    Product.sync({force: true}).then(() => {
      productsArray.forEach(product => {
        Product.create({
          id: product.id,
          name: product.name,
          description: product.description,
          cost: product.cost,
          quantity: product.quantity,
          image: product.image,
          creator: product.creator || user.id,
          title: product.title,
          text: product.text,
        });
      });
    });
  });
});