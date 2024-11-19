import Joi from 'joi';

const nameValidateSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .pattern(/^[A-Z][a-z]*$/, '{VALUE} is not in capitalize format')
    .messages({
      'string.empty': 'First name is required',
      'string.max': 'First name cannot exceed 20 characters',
      'string.pattern.base': '{#value} is not in capitalize format',
    }),
  middleName: Joi.string().trim().max(20).optional().messages({
    'string.max': 'Middle name cannot exceed 20 characters',
  }),
  lastName: Joi.string()
    .trim()
    .max(20)
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.empty': 'Last name is required',
      'string.max': 'Last name cannot exceed 20 characters',
      'string.pattern.base': '{#value} must contain only letters',
    }),
});

const guardianValidateSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': "Father's name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': "Father's contact number is required",
  }),
  motherName: Joi.string().required().messages({
    'string.empty': "Mother's name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty': "Mother's contact number is required",
  }),
});

const localGuardianValidateSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': "Local guardian's name is required",
  }),
  occupation: Joi.string().required().messages({
    'string.empty': "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': "Local guardian's contact number is required",
  }),
  address: Joi.string().required().messages({
    'string.empty': "Local guardian's address is required",
  }),
});

const studentValidateSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required',
  }),
  name: nameValidateSchema.required().messages({
    'any.required': 'Student name is required',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only':
      '{#value} is not a valid gender. Only "male" or "female" are allowed.',
    'string.empty': 'Gender is required',
  }),
  dateOfBirth: Joi.string().required().messages({
    'string.empty': 'Date of birth is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '{#value} is not a valid email',
    'string.empty': 'Email is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact number is required',
  }),
  emergencyCOntactNo: Joi.string().required().messages({
    'string.empty': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
    .optional()
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent address is required',
  }),
  guardian: guardianValidateSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidateSchema.required().messages({
    'any.required': 'Local guardian information is required',
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only':
      '{#value} is not a valid status. Only "active" or "blocked" are allowed.',
  }),
});

export default studentValidateSchema;
