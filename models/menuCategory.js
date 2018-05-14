module.exports = (sequelize, DataTypes) => {
    var menuCategory= sequelize.define('menu_category', {
        categrories_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
          },
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
      //TODO  Restaurant belongsTo user , Restaurant ,
      //  menuCategory.hasMany(models.User);
       menuCategory.hasMany(models.user,{as: 'userId', foreignKey: 'user_id'})
  
      };
    return menuCategory;
  };