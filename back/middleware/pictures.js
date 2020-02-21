import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      var filetype = '';
      if (file.mimetype === 'image/gif') filetype = 'gif';
      else if (file.mimetype === 'image/png') filetype = 'png';
	  else if (file.mimetype === 'image/jpeg') filetype = 'jpg';
	  else cb(null, false);

	  cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

export default multer({storage: storage, fileSize: 1000000});