module.exports = (sequelize, DataTypes) => {
    var MenuType = sequelize.define('menu_type', {
      
          MenuType_name:{
        type:DataTypes.STRING,
      },
      MenuType_description:{
       type:DataTypes.STRING
      },
       isActive:{
        type:DataTypes.BOOLEAN ,
        defaultValue:false
       },
       created_by:{
        type:DataTypes.STRING
       },
       updated_by:{
        type:DataTypes.STRING
       },
    }, {});
    MenuType.associate = function(models) {
      //TODO  
    };
    return MenuType;
  };