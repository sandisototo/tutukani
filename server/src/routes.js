const AuthenticationController = require('./controllers/AuthenticationController')
const UsersController = require('./controllers/UsersController')
const AdminController = require('./controllers/AdminController')
// const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy') turned off for testing purposes 

const DonationTransactionController = require('./controllers/DonationTransactionController')
const RewardsTransactionController = require('./controllers/RewardsTransactionController')

const isAuthenticated = require('./policies/isAuthenticated')
const isAuthenticatedAdmin = require('./policies/isAuthenticatedAdmin')

module.exports = (app) => {
  app.post('/register',
    validate_singup,
    AuthenticationController.register)
 
  app.post('/login',
    AuthenticationController.login)
 
  app.get('/users/:level',
    // isAuthenticated,
    UsersController.index)
  app.get('/users/:level/:cell_number',
    // isAuthenticated,
    UsersController.getByNumber)
  app.post('/users',
    // isAuthenticated,
    UsersController.post)
  app.put('/users/:userId',
    // isAuthenticated,   
    UsersController.put)
  app.delete('/users/:userId',
    // isAuthenticated,  
    UsersController.remove)
  app.post('/linkuser/:cell_number',
    isAuthenticated,
    UsersController.linkUser)
  
  app.get('/donation/',
    isAuthenticated,  
    DonationTransactionController.index)
  app.get('/donation/:history',
    isAuthenticated,  
    DonationTransactionController.index)
  app.get('/donation/:level/:candidateId',
    // isAuthenticated,  
    DonationTransactionController.getDonationCount)
  app.post('/donation',
    isAuthenticated,
    DonationTransactionController.post)
  app.put('/donation/:donationId',
    isAuthenticated,   
    DonationTransactionController.put)
  app.delete('/donation/:donationId',
    isAuthenticated,  
    DonationTransactionController.remove)
  
  app.get('/rewards',
    isAuthenticated,  
    RewardsTransactionController.index)
  app.post('/rewards',
    isAuthenticated,
    RewardsTransactionController.post)
  app.put('/rewards/:rewardId',
    isAuthenticated,   
    RewardsTransactionController.put)
  app.delete('/rewards/:rewardId',
    isAuthenticated,  
    RewardsTransactionController.remove)

  app.get('/admin',
    // isAuthenticatedAdmin,
    AdminController.index)
  app.post('/adminLogin',
    validate_admin_login,
    AuthenticationController.adminlogin)
  app.post('/admin',
    validate_admin_singup,
    AdminController.post)
  app.put('/admin/:adminId',
    // isAuthenticatedAdmin,   
    AdminController.put)
  app.delete('/admin/:adminId',
    isAuthenticatedAdmin,  
    AdminController.remove)
}
