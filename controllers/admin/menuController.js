var db = require("../../models");
//TODO Implement Controller for MVC
module.exports = {

    getMenuTypes(req,res){
        db.menu_type.findAll({

        }).then(function(menuTypes){
            res.status(200).json(menuTypes);
        })
        .catch(function(error){
            res.status(500).json(error);
        })
    },

    getMenuCategories(req,res){
        db.menu_category.findAll({

        }).then(function(menuCategories){
            res.status(200).json(menuCategories);
        })
        .catch(function(error){
            res.status(500).json(error);
        })
    }


}
  
   

