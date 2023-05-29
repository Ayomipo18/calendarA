import { createValidator } from 'express-joi-validation'

const validator = createValidator({ passError : true });

export default validator;