import { body, param, validationResult, check } from 'express-validator'

const validateHandler = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next() // Proceed to the next middleware if no errors
  }

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(', ')

  // Return a response with status 400 and error messages
  return res.status(400).json({
    status: false,
    message: errorMessages,
  })
}

const registerValidator = () => [
  body('name', 'Please Enter Name').notEmpty(),
  body('userName', 'Please Enter Username').notEmpty(),
  body('bio', 'Please Enter Bio').notEmpty(),
  body('password', 'Please Enter Password').notEmpty(),
]

const loginValidator = () => [
  body('userName', 'Please Enter Username').notEmpty(),
  body('password', 'Please Enter Password').notEmpty(),
]

const newGroupValidator = () => [
  body('name', 'Please Enter Name').notEmpty(),
  body('members')
    .notEmpty()
    .withMessage('Please Enter Members')
    .isArray({ min: 2, max: 100 })
    .withMessage('Members must be 2-100'),
]

const addMemberValidator = () => [
  body('chatId', 'Please Enter Chat ID').notEmpty(),
  body('members')
    .notEmpty()
    .withMessage('Please Enter Members')
    .isArray({ min: 1, max: 97 })
    .withMessage('Members must be 1-97'),
]

const removeMemberValidator = () => [
  body('chatId', 'Please Enter Chat ID').notEmpty(),
  body('userId', 'Please Enter User ID').notEmpty(),
]

const sendAttachmentsValidator = () => [
  body('chatId', 'Please Enter Chat ID').notEmpty(),
]

const chatIdValidator = () => [
  param('chatId', 'Please Enter Chat ID').notEmpty(),
]

const renameValidator = () => [
  param('chatId', 'Please Enter Chat ID').notEmpty(),
  body('name', 'Please Enter New Name').notEmpty(),
]

const sendRequestValidator = () => [
  body('userId', 'Please Enter User ID').notEmpty(),
]

const acceptRequestValidator = () => [
  body('requestId', 'Please Enter Request ID').notEmpty(),
  body('accept')
    .notEmpty()
    .withMessage('Please Add Accept')
    .isBoolean()
    .withMessage('Accept must be a boolean'),
]

const adminLoginValidator = () => [
  body('secretKey', 'Please Enter Secret Key').notEmpty(),
]

export {
  acceptRequestValidator,
  addMemberValidator,
  adminLoginValidator,
  chatIdValidator,
  loginValidator,
  newGroupValidator,
  registerValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  sendRequestValidator,
  validateHandler,
}
