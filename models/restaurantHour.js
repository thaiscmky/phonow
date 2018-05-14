module.exports = (sequelize, DataTypes) => {
    var RestaurantHour = sequelize.define('restaurant_hour', {
      day_name:{
        type:DataTypes.STRING,
      },
      start_time:{
        type:DataTypes.STRING,
      },
      end_time:{
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
    RestaurantHour.associate = function(models) {
      //TODO  
    };
    return RestaurantHour;
  };