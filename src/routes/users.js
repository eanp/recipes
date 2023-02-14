const express = require('express')
const router = express.Router()
const {getData,getDetail,postData} = require('./../controller/users')

router.get('/',getData)
router.get('/:id',getDetail)
router.post('/',postData)
// router.get('/:id',getData)

module.exports = router
