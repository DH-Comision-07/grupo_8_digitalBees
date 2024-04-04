const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, path.join(__dirname,'../../public/img/groups'))
    },
    filename:(req,file,cb) =>{
        console.log(file);
        const newFileName = 'group-' +  Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const uploadFile = multer({ storage });

module.exports = uploadFile ;