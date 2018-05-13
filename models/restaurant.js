module.exports = (sequelize, DataTypes) => {
    var Restaurant = sequelize.define('restaurant', {
        restaurant_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
          },
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
      //TODO  Restaurant belongsTo user , Restaurant ,
      // Restaurant.hasMany(models.restaurant_hour);
      Restaurant.hasMany(models.restaurant_hour,{as: 'restHourId', foreignKey: 'id'})
  
    };
    return Restaurant;
  };