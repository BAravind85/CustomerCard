const express=require('express');
const customerController=require('../controller/customerController')
const cardController=require('../controller/cardController')
const router=express.Router();

// router.post('/profile', createProfile);
router.post('/create',customerController.createCustomerModel);
router.get('/details',customerController.getList);
router.delete('/delete/:userId',customerController.deleteCustomer);

router.post('/createCard',cardController.createCard);
router.get('/getCards',cardController.getCards);



module.exports = router;