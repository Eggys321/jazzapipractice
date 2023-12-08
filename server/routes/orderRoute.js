const express = require('express');
const { order, getOrders, getAllOrdersByUser } = require('../controllers/orderController');
const router = express.Router();
const auth = require('../middleware/auth');
// const isAdmin = require('../middleware/auth')
// const role = require('../middleware/roleAuth')

// create
router.post('/order',auth, order );
router.get('/orders',auth,getOrders);
router.get('/orders/:userId',auth,getAllOrdersByUser) 


module.exports = router