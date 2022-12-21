// reff script: https://medium.com/@andrewoons/how-to-define-sequelize-associations-using-migrations-de4333bf75a7
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Portfolio', // name of Source model
      'user_id', // name of the key we're adding
      {
        type: Sequelize.UUID,
        references: {
          model: 'User', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
  },

  async down(queryInterface) {
    // remove Order belongsTo Customer
    return queryInterface.removeColumn(
      'Portfolio', // name of Source model
      'user_id', // key we want to remove
    );
  },
};
