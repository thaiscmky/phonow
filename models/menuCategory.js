module.exports = (sequelize, DataTypes) => {
    var menuCategory= sequelize.define('menu_category', {
        category_name:{
        type:DataTypes.STRING,
      },
      category_description:{
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
    menuCategory.associate = function(models) {
      
      };
    return menuCategory;
  };