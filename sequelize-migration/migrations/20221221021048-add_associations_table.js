// reff script: https://medium.com/@andrewoons/how-to-define-sequelize-associations-using-migrations-de4333bf75a7
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // User has many portfolio
    await queryInterface.addColumn(
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

    // Portfolio has many portfolio-item
    await queryInterface.addColumn('Portfolio_Item', 'portfolio_id', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      references: {
        model: 'Portfolio',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    // Portfolio-item has one asset
    await queryInterface.addColumn('Portfolio_Item', 'asset_id', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      references: {
        model: 'Asset',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface) {
    // remove Portfolio belongsTo User
    await queryInterface.removeColumn(
      'Portfolio', // name of Source model
      'user_id', // key we want to remove
    );

    // remove Portfolio-item belongsTo Portfolio
    await queryInterface.removeColumn(
      'Portfolio_Item', // name of Source model
      'portfolio_id', // key we want to remove
    );

    // remove Portfolio-item belongsTo Asset
    await queryInterface.removeColumn(
      'Portfolio_Item', // name of Source model
      'asset_id', // key we want to remove
    );
  },
};
