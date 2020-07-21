const models = require('./app/models');
const User = models.User;
const Role = models.Role;
const RoleUsers = models.RoleUsers;
var bcrypt = require('bcryptjs')

// User.create({
//     name: 'Pedro',
//     password: bcrypt.hashSync('a', 8),
//     email: 'pedro@pedro.com'
// })
// .then(user => {
//     Role.findByPk(1)
//     .then(thisRole => {
//         user.setRoles(thisRole)
//         .then(() => {

//         })
//         .catch((err)=>{
//             console.log('2',err)
//         })
//     })
//     .catch((err)=>{
//         console.log('1',err)
//     })
//     console.log(user)
// })

User.findOne({
    where: {
        email: 'a@a.com'
    }
})
.then(user => {
    console.log(user)
    return
})
