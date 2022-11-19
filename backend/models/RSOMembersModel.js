var dbConnection = require('../dbConnection');

const RSOMember = function(rsoMember)
{
  this.rso_memberid = rsoMember.rso_memberid, 
  this.user_id = rsoMember.user_id, 
  this.rso_id = rsoMember.rso_id
}

RSOMember.addUser = (user, result) => {

  dbConnection.query(`add user to RSOMEMBER table`, user, (err, res) => {
    if (err){
      result(err, null);
      return;
    }

    result(null, res);
  });
  
}