const AuthenticationController = require('./controllers/AuthenticationController')
const UsersController = require('./controllers/UsersController')
// const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy') turned off for testing purposes 

const DonationTransactionController = require('./controllers/DonationTransactionController')
const RewardsTransactionController = require('./controllers/RewardsTransactionController')

const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  app.post('/register',
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)
  
  app.get('/users/:level',
    // isAuthenticated,
    UsersController.index)
  app.post('/users',
    // isAuthenticated,
    UsersController.post)
  app.put('/users/:userId',
    // isAuthenticated,   
    UsersController.put)
  app.delete('/users/:userId',
    // isAuthenticated,  
    UsersController.remove)
  
  app.get('/donation',
    isAuthenticated,  
    DonationTransactionController.index)
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
}
