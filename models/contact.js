module.exports = (sequelize, DataTypes) => {
    var contact= sequelize.define('contact', {
          contact_name:{
        type:DataTypes.STRING,
      },
      contact_email:{
       type:DataTypes.STRING
      },
      contact_phone:{
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
    };
    return contact;
  };