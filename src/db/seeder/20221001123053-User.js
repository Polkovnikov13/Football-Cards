module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Artem',
      email: 'artem@mail.ru',
      password: '12345',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: '123',
      email: '123@mail.ru',
      password: '$2b$10$vR1eidg7uwWpfSAM5ZUkMeCgjxjaLBB1exnzTMgeDLjh.29pYG8xW',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
