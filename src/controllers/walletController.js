import mongoose from 'mongoose';
import { WalletSchema } from '../models/walletModel';


const Wallet = mongoose.model('Wallet', WalletSchema);


// bug user is able to create multiple wallets
export const createNewWallet = (req, res) => {
    let newWallet = new Wallet(req.body);
    newWallet.save((err, wallet) => {
      if (err) {
        res.send(err);
      }
      console.log('req.params:  ' + req.params);
      console.log('res.body: ' + res.body);
      console.log('wallet------ ' + wallet);
      console.log('cash value for one dollar bill\n' + wallet.cash.tenDollarBills)
      res.json(wallet);
    });
};

export const getWallets = (req, res) => {
  Wallet.find({}, (err, wallet) => {
    if (err) {
      res.send(err)
    }
    res.json(wallet)
  });
};


// see specific wallet and view the content
export const getWalletWithID = (req, res) => {
  Wallet.findById(req.params.walletId, (err, wallet) => {
      if (err) {
        res.send(err)
      }
      res.json(wallet);
  });
};



// localhost:3000/wallets/5a77745aa5b715c9269cf0ad/addCash
// add cash to a particular wallet
export const addCash = (req, res) => {
  Wallet.findOneAndUpdate( { _id: req.params.walletId}, req.body, { new: true }, (err, wallet) => {
    if (err) {
      res.send(err)
    }
    res.json(wallet);
  });
};


// put request to remove cash -- put request because I'm not deleting an entire wallet object.
// cash inside the wallet object is simply being updated.
export const removeCash = (req, res) => {
  Wallet.findOneAndUpdate( { _id: req.params.walletId}, req.body, { new: true }, (err, wallet) => {
    if (err) {
      res.send(err)
    }
    res.json(wallet);
  });
};


export const addReceipt = (req, res) => {
  Wallet.findOneAndUpdate( { _id: req.params.walletId}, req.body, { new: true }, (err, wallet) => {
    if (err) {
      res.send(err)
    }
    res.json(wallet);
  });
};

/** --- Helper functions --**/
// calculate the total amount for a specific dollar bill
function calcTotal(arr)
{
    var total = 0;
    if (arr) {
      for (var i = 0; i < arr.length; i++) {
        total += arr[i];
      }
    }
    return total;
}

// get message to display
function getCashInfo(totalAmount, billType)
{
  var message = "";
  var numBills = 0; // number of specific bill. e.g number of one dollar bills.
  if (totalAmount > 0) {
    numBills = totalAmount / billType;
  }
  message += (numBills > 9 ? numBills : ('0' + numBills) ) + ' $' + billType + ' bill(s). Total: $' + totalAmount + '   \n';
  return message;
}

// checkOnCashAmount
export const checkOnCashAmount = (req, res) => {
  Wallet.findById(req.params.walletId, (err, wallet) => {
    if (err) {
      res.send(err)
    }

    if (wallet) {
      var OneTotal = calcTotal(wallet.cash.oneDollarBills);
      var fiveTotal = calcTotal(wallet.cash.fiveDollarBills);
      var tenTotal = calcTotal(wallet.cash.tenDollarBills);
      var twentyTotal = calcTotal(wallet.cash.twentyDollarBills);
      var hunddredTotal = calcTotal(wallet.cash.hundredDollarBills);

      var cashInformation = 'Cash Amount\n';
      cashInformation += getCashInfo(OneTotal, 1);
      cashInformation += getCashInfo(fiveTotal, 5);
      cashInformation += getCashInfo(tenTotal, 10);
      cashInformation += getCashInfo(twentyTotal, 20);
      cashInformation += getCashInfo(hunddredTotal, 100);

      var totalCash = OneTotal + fiveTotal + tenTotal + twentyTotal + hunddredTotal;
      cashInformation += 'Total Cash Available: $' + totalCash + '.\n';
      console.log(cashInformation);
    }

    // res.json( {message: cashInformation});
    res.json(wallet);
  });
};

export const deleteWallet = (req, res) => {
  var id = req.params.walletId;
  Wallet.remove({ _id: req.params.walletId }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Successfully deleted Wallet. Wallet Id: ' + id});
  });
}
