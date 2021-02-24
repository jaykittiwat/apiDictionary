const express = require('express');
const router = express.Router();
const controllers = require("./../controllers/index")

router.get('/dictionary', controllers.getDictionaryList);
router.get('/dictionary/search?:slug', controllers.getDictionary_SelectedList);
router.post('/dictionary', controllers.createDictionary_Catalog);
router.post('/dictionary/:slug', controllers.creatDictionary_Wordlist);
router.put('/dictionary/:slug', controllers.updateDictionary_Wordlist);
router.put('/dictionary', controllers.updateDictionaryList);
router.delete('/dictionary', controllers.deleteDictionary);




//export this router to use in our index.js
module.exports = router;