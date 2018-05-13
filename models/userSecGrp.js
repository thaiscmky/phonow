module.exports = (sequelize, DataTypes) => {
    var UserSecGrp = sequelize.define('User_sec_grp', {
        
        grp_code:{
        type:DataTypes.STRING,
        primaryKey: true,
        allowNull:false
      },
      grp_name:{
        type:DataTypes.STRING,
      },
      grp_description:{
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
    UserSecGrp.associate = function(models) {
      //TODO  Restaurant belongsTo user , Restaurant ,
      // UserSecGrp.hasMany(models.User);
      UserSecGrp.hasMany(models.user,{as: 'userId', foreignKey: 'user_id'})
    };
    return UserSecGrp;
  };