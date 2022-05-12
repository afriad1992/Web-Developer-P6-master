const express = require('express');

const router = express.Router();
const multer = require('../middleware/multer-config');

const SauceCtlr = require('../controllers/sauce.controller');
const auth = require('../middleware/auth');
router.get('/',auth, SauceCtlr.getAllSauces);
router.get('/:id',auth, SauceCtlr.getOneSauce);
router.post('/',auth,multer, SauceCtlr.postOneSauce);
router.put('/:id',auth,multer, SauceCtlr.putOneSauce);
router.delete('/:id',auth, SauceCtlr.deleteOneSauce);
router.post('/:id/like',auth, SauceCtlr.likeSauce);


module.exports = router;