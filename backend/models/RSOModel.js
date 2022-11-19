var dbConnection = require('../dbConnection');

const RSO = function(rso){
  this.rso_id = rso.rso_id,
  this.university_id = rso.university_id,
  this.rso_name = rso.name, 
  this.num_students = rso.num_students, 
  this.description = rso.description,
  this.admin_id = rso.admin_id
}

RSO.createRSO = (new_RSO, result) => {
    dbConnection.query(`statement to add to RSO table`, new_RSO, (err, res) => {
      if(err){
        result(err, null);
        return;
    }

      result(null, res);
    })
}