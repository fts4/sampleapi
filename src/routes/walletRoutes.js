import {
  createNewWallet,
  getWallets,
  getWalletWithID,
  addCash,
  checkOnCashAmount,
  removeCash,
  addReceipt,
  deleteWallet
} from '../controllers/walletController';

const routes = (app) => {

// create a wallet
  app.route('/wallet/createNewWallet')
  .post(createNewWallet);

// get all wallets
  app.route('/wallets')
  .get(getWallets);

// get specific wallet, based on wallet id
  app.route('/wallets/:walletId')
  .get(getWalletWithID)

  .delete(deleteWallet);

// add cash to specific wallet
  app.route('/wallets/:walletId/addCash')
  .get(getWalletWithID)
  .put(addCash);

// get and put requests to remove cash from specific wallet
  app.route('/wallets/:walletId/removeCash')
  .get(getWalletWithID)
  .put(removeCash);

  app.route('/wallets/:walletId/cashbalance')
  .get((req, res, next) => {
    // using a middleware
    console.log(`Request from: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)
    next();
  }, checkOnCashAmount);


  app.route('/wallets/:walletId/addReceipt')
  .get(getWalletWithID)
  .put(addReceipt);

  app.route('/wallets/:walletId/deleteWallet')
  // .get(getWalletWithID)
  .delete(deleteWallet);
}

export default routes;
