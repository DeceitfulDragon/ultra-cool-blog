const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = [
  {
    username: 'techguy',
    password: 'password123'
  },
  {
    username: 'coder123',
    password: 'password123'
  },
  {
    username: 'devgal',
    password: 'password123'
  }
];

const postData = [
  {
    title: 'Why JavaScript is Awesome',
    content: 'JavaScript is a versatile language that can be used for both front-end and back-end development.',
    user_id: 1
  },
  {
    title: 'Understanding Asynchronous Programming',
    content: 'Asynchronous programming is essential for handling long-running operations without blocking the main thread.',
    user_id: 2
  },
  {
    title: 'Top 10 VS Code Extensions',
    content: 'Here are my top 10 VS Code extensions that every developer should use.',
    user_id: 3
  }
];

const commentData = [
  {
    content: 'Great post! I completely agree.',
    user_id: 2,
    post_id: 1
  },
  {
    content: 'This was very helpful, thanks!',
    user_id: 3,
    post_id: 1
  },
  {
    content: 'I never understood async programming until now.',
    user_id: 1,
    post_id: 2
  },
  {
    content: 'These extensions are awesome!',
    user_id: 1,
    post_id: 3
  }
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  const posts = await Post.bulkCreate(postData, {
    returning: true
  });

  const comments = await Comment.bulkCreate(commentData, {
    returning: true
  });

  console.log('Database seeded!');
  process.exit(0);
};

seedDatabase();