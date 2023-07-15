
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
     cb(null,Date.now() +"--"+ file.originalname) 
    }
  })
  
 var upload = multer({ storage: storage })

   var upload = multer({
       storage,
       fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/gif" || file.mimetype == "image/jpeg" || file.mimetype == "image/webp") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
        limits:{
          fileSize:1024 * 1024 * 1024 * 2
      }
   })

  module.exports = upload