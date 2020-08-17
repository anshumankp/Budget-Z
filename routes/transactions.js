const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @route       GET api/transactions
// @desc        Get all user's transactions
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      _id: -1
    });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/transactions/monthly?month=${month}&year=${year}
// @desc        Get user's transactions of a particular month
// @access      Private
router.get('/year/:year/month/:month', auth, async (req, res) => {
  try {
    let fromMonth = parseInt(req.params.month);
    let fromYear = parseInt(req.params.year);
    let toMonth, toYear;
    if (fromMonth === 11) {
      toMonth = 0;
      toYear = fromYear + 1;
    } else {
      toMonth = fromMonth + 1;
      toYear = fromYear;
    }
    var lowerLimit = new Date(fromYear, fromMonth);
    var upperLimit = new Date(toYear, toMonth);

    const transactions = await Transaction.find({
      user: req.user.id,
      createdAt: { $gte: lowerLimit, $lt: upperLimit }
    }).sort({
      _id: -1
    });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/transactions
// @desc        Add new transaction
// @access      Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { text, amount, classification } = req.body;

    try {
      const newTransaction = new Transaction({
        text,
        amount,
        classification,
        user: req.user.id
      });

      const transaction = await newTransaction.save();
      res.json(transaction);
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  }
);

// @route       PUT api/todos/:id
// @desc        Update todo
// @access      Private
router.put('/:id', (req, res) => {
  res.send('Update transaction');
});

// @route       DELETE api/transactions/:id
// @desc        Delete transactions
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        msg: 'Transaction not found'
      });
    }

    // Make sure user owns contact
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Transaction.findByIdAndRemove(req.params.id);
    return res.json({ msg: 'Transaction removed' });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
