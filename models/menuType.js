module.exports = (sequelize, DataTypes) => {
  var MenuType = sequelize.define('menu_type', {

    menu_type_name: {
      type: DataTypes.STRING,
    },
    menu_type_description: {
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
  MenuType.associate = function (models) {
    //TODO  
  };
  return MenuType;
};