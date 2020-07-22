const models = require("../models");
const User = models.User;
const Role = models.Role;

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
 * Delete a user
 * 
 * @param id number 
 * 
 * @return JSON
 */
exports.deleteUser = (req,res) => {
  let result = {
    status: false,
    message: '',
    data: ''
  }

  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(user => {
      if(!user){
        return res.status(200).send(result);
      }
      result.status = true
      return res.status(200).send(result);
    })
    .catch(error => {
      result.message = error
      return res.status(200).send(result);
    })
}

/**
 * Change user status
 * 
 * @param id number 
 * 
 * @return JSON 
 */
exports.changeStatus = (req, res) => {
  let result = {
    status: false,
    message: '',
    data: ''
  }

  
  User.findByPk(req.body.params.id)
  .then(user => {
    if(!user){
      return res.status(200).send(result);
    }
    user.update({
      is_active: user.is_active ? 0 : 1
    })
    .then(updated => {
      result.status = true;
      return res.status(200).send(result);
    })
    .catch(error => {
      result.message = error
      return res.status(200).send(result);
    })
  })
}

/**
 * Get users for the data table.
 *
 * @param orderCol string
 * @param sortDesc string
 * @param limit number
 * @param offset number
 *
 * @return json
 */
exports.getUsersForDataTable = (req, res) => {
  let result = {
    status: false,
    message: '',
    data: ''
  }

  let orderCol = (req.query.sortBy) ? req.query.sortBy : 'name' ;
  let sortDesc = (req.query.sortDesc) ? req.query.sortDesc : 'asc' ;
  let limit = req.query.limit ? Number(req.query.limit) : 10; 
  let offset = req.query.offset ? ((Number(req.query.offset)-1) * limit) : 0;

  User.findAndCountAll({
    attributes: ['id','name','email','is_active'],
    limit: limit,
    offset: offset,
    order: [
      [orderCol, sortDesc]
    ],
    include: [{
      model: Role,
      required: true,
      attributes: ['name']
    }]
  })
  .then(
    users => {
      result.data = users;
      result.status = true;
      return res.status(200).send(result);
    }
  )
  .catch(err => {
    result.message = err.message;
    return res.status(200).send(result);
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
