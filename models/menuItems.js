module.exports = (sequelize, DataTypes) => {
    var MenuItems= sequelize.define('menu_items', {
        item_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
          },
          tem_name_english:{
        type:DataTypes.STRING,
      },
      item_name_vietnamese:{
       type:DataTypes.STRING
      },
     
      item_description:{
        type:DataTypes.STRING
       },
       item_price:{
        type:DataTypes.DECIMAL
       },
       rating:{
        type:DataTypes.INTEGER
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
    MenuItems.associate = function(models) {
      //TODO  Restaurant belongsTo user , Restaurant ,
      //  Menuitems.hasMany(models.restaurant);
      MenuItems.hasMany(models.restaurant,{as: 'restaurantId', foreignKey: 'restaurant_id'})
  
      
    };
    return MenuItems;
  };