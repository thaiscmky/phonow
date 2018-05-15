module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {

    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_unique_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        unique: true,
        message: 'user id  must be a unique value.'
      }
    },
    user_first_name: {
      type: DataTypes.STRING,
    },
    user_last_name: {
      type: DataTypes.STRING
    },
    user_email: {
      type: DataTypes.STRING
    },
    user_phone_mobile: {
      type: DataTypes.STRING
    },
    user_phone_work: {
      type: DataTypes.STRING
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    created_by: {
      type: DataTypes.STRING
    },
    updated_by: {
      type: DataTypes.STRING
    },
  }, {});
  // User.associate = function (models) {
  //   //TODO  Restaurant belongsTo user , Restaurant ,
  //   // User.belongsTo(models.User_Sec_Grp);
  // };
  return User;
};