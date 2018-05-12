module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            validate: {
                isAlpha: true,
            }
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        }
    });

    return User;
};