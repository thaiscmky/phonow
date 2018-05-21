module.exports = (sequelize, DataTypes) => {
    var Restaurant = sequelize.define('restaurant', {
          restaurant_name:{
        type:DataTypes.STRING,
      },
      address:{
        type:DataTypes.STRING,
      },
      resturant_city:{
       type:DataTypes.STRING
      },
     
      restaurant_state:{
        type:DataTypes.STRING
       },
       
       restaurant_zip:{
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
    Restaurant.associate = function(models) {
      //TODO  
      Restaurant.hasMany(models.restaurant_hour);
     
    };
    return Restaurant;
  };