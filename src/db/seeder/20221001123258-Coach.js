module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Coaches', [{
      name: 'Stanislav',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Carlo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Coaches', null, {});
  },
};
