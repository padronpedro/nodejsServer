const db = require("../models");
const User = db.User;
const Role = db.Role;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
  
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
  
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
  
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

/**
 * Get users for the data table.
 *
 * @param Request $request
 *
 * @return json
 */
exports.getUsersForDataTable = (req, res) => {
  let result = {
    status: false,
    message: '',
    data: ''
  }

  let orderCol = (req.body.sortBy == 'name') ? 'users.name' : req.body.sortBy ;

  User.findAll({
    option: [
      orderCol, req.body.sortDesc
    ],
    include: [{
      model: Role,
      required: true
    }]
  })
  .then(
    users => {

      result.data = users;
      return res.status(200).send(result);
    }
  )
  .catch(err => {
    result.message = err.message;
    res.status(200).send(result);
  });  
};
  // public function getUsersForDataTable(Request $request)
  //   {
  //       $query->leftJoin('countries','countries.id','=','users.country_id')
  //       $query->leftJoin('plans','plans.id','=','users.plan_id');
  //       if(strlen($request->search)>0)
  //       {
  //           $query = $query->whereRaw(' (UPPER(TRIM(users.name)) like UPPER(TRIM(?)) OR UPPER(TRIM(users.email)) like UPPER(TRIM(?)))',["%$request->search%","%$request->search%"]);
  //       }


  //       $users = $query->paginate($request->itemsPerPage,['users.id as id','users.name as name','users.email as email','roles.name as role','users.is_active as is_active','countries.name as country_name', 'countries.code as country_code', 'plans.name as plan_name', 'users.plan_sms as plan_sms', 'users.sms_webhook as sms_webhook']);

  //       return $users;
  //   }
