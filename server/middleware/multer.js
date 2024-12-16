import multer from 'multer'

const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
})

const singleAvatar = multerUpload.single('avatar')

const attachmentsMulter = multerUpload.array('files', 5)

export { singleAvatar, attachmentsMulter }

// import multer from 'multer'

// const storage = multer.diskStorage({
//   destination: 'uploads',
//   filename: (req, file, cb) => {
//     cb(null, `${new Date().getTime()}-${file.originalname}`)
//   },
// })

// const upload = multer({
//   storage,
// })
// export default upload
