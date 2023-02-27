const multer = require('multer')

const storage = multer.diskStorage({
    filename: function(req,file,cb){
        const uniq = Date.now() + Math.round(Math.random() * 1E9)
        cb(null,uniq+'.png')
    }
})

const upload = multer({
    storage,
    limits: {fileSize: 10  * Math.pow(1024,4)},
    fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image.jfif') {
        cb(null, true);
        req.isFileValid = true
    } else {
        req.isFileValid = false
        req.isFileValidMessage = 'Just allowed png and jpg type'
        return cb(null, false);
    }
    },
})

module.exports = upload