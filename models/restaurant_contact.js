module.exports = (sequelize, DataTypes) => {
    var contact= sequelize.define('restaurant_contact', {
          social_contact:{
        type:DataTypes.STRING,
      },
      contact_email:{
       type:DataTypes.STRING
      },
      contact_phone1:{
        type:DataTypes.STRING
       },
       
       comments:{
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
    contact.associate = function(models) {
      //TODO  
      contact.belongsTo(models.restaurant);
      
    };
    return contact;
  };