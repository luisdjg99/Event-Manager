// import db connection
var dbConnection = require('../dbConnection');

const User = function (user){

  this.user_id = user.user_id,
  this.username = user.username,
  this.user_pw = user.user_pw,
  this.first_name = user.first_name,
  this.last_name = user.last_name,
  this.phone_num = user.phone_num,
  this.email = user.email,
  this.user_type = user.user_type,
  this.university_id = user.university_id

};

User.createUser = (new_user, result) => {

    dbConnection.query(`STATEMENT TO INSERT`, new_user, (err, res) => {

      if(err){
        result(err, null);
        return;
    }

    result(null, new_user);

    });
}

User.authenticateUser = (user_credentials, result) => {

  dbConnection.query(`STATEMENT TO see if credentials are in user`, user_credentials, (err, res) => {

    if(err){
      result(err, null);
      return;
  }

  result(null, res);

  });
}