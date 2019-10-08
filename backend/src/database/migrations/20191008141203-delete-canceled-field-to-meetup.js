module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('meetups', 'canceled_at');
  },

  down: queryInterface => {
    return queryInterface.removeColumn('meetups', 'banner_id');
  }
};
