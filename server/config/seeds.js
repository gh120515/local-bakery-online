const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Bread' },
    { name: 'Snacks' },
    { name: 'Confectionery' },
    { name: 'Others' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Bagel',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'bagel.jpg',
      ingredients: 'Lorem ipsum dolor sit amet',
      category: categories[0]._id,
      price: 4.99,
      // quantity: 500
    },
    {
      name: 'Grain Loaf',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'bread-loaf.jpg',
      ingredients: 'Lorem ipsum dolor sit amet',
      category: categories[0]._id,
      price: 7.99,
    },
    {
      name: 'Brown Bread Loaf',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'brown-bread-loaf.jpg',
      ingredients: 'Lorem ipsum dolor sit amet',
      category: categories[0]._id,
      price: 6.99,
    },
    {
      name: 'Cookies',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'cookies.jpg',
      ingredients: 'Lorem ipsum dolor sit amet',
      category: categories[1]._id,
      price: 2.49,
    },
    {
      name: 'Croissant',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'croissant.jpg',
      ingredients: 'Lorem ipsum dolor sit amet',
      category: categories[0]._id,
      price: 4.49,
    },
    {
      name: 'Macaron',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'macaron.jpg',
      ingredients: 'Lorem ipsum dolor sit amet',
      category: categories[2]._id,
      price: 2.99,
    },
    {
      name: 'Orange Jam',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'orange-jam.jpg',
      ingredients: 'Lorem ipsum dolor sit amet',
      category: categories[3]._id,
      price: 5.99,
    },
    {
      name: 'Pancake',
      description:
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      image: 'pancake.jpg',
      ingredients: 'Lorem ipsum dolor sit amet',
      category: categories[1]._id,
      price: 2.99,
    }
    
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@email.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
