import mongoose from  'mongoose';

const Schema = mongoose.Schema;

export const WalletSchema = new Schema({
// var WalletSchema = exports.WalletSchema = new Schema({

  cash: {
    totalCashAmount: {
      type: Number
    },
    amount: {         // represents the last added amount
      type: Number
    },
    bill: {             // represents the type of bill
      type: String
    },
    oneDollarBills:   [ { type: Number } ],
    fiveDollarBills:  [ { type: Number } ],
    tenDollarBills:   [ { type: Number } ],
    twentyDollarBills: [ { type: Number} ],
    hundredDollarBills: [ { type: Number} ]
  },

// an array of personal documents
  personalDocument: [
   {
      type: String
    }
  ],

// an array of receipts
  receipt: [
    {
      vendor: {
        type: String,
        required: 'Enter vendor name for receipt'
      },

      created_date: {
        type: Date,
        default: Date.now,
      },

      amount: {
        type: Number,
        required: 'Enter the amount on the receipt'
      }
    }
  ]


});
