const express = require('express');
const router = express.Router();
const controllers = require("./../controllers/index")

router.get('/dictionary', controllers.getDictionaryList);
router.get('/dictionary/search/:slug', controllers.getDictionary_detail);
router.get('/dictionary/merge/:userID/:slug', controllers.getDictionary_merge);
router.post('/dictionary', controllers.createDictionary_Catalog);
router.post('/dictionary/remove', controllers.deleteDictionary);
router.post('/dictionary/:slug', controllers.creatDictionary_Wordlist);
router.put('/dictionary/:slug', controllers.updateDictionary_Wordlist);
router.put('/dictionary', controllers.updateDictionaryList);





//export this router to use in our index.js
module.exports = router;