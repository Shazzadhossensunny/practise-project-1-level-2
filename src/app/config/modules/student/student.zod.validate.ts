import { z } from 'zod';

const nameValidateSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(20, 'First Name cannot be more than 20 characters'),
  middleName: z
    .string()
    .trim()
    .max(20, 'Middle Name cannot be more than 20 characters')
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(20, 'Last Name cannot be more than 20 characters'),
});

// Guardian schema
const guardianValidateSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  fatherContactNo: z.string().min(1, "Father's contact number is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  motherContactNo: z.string().min(1, "Mother's contact number is required"),
});

// Local Guardian schema
const localGuardianValidateSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z.string().min(1, "Local guardian's occupation is required"),
  contactNo: z.string().min(1, "Local guardian's contact number is required"),
  address: z.string().min(1, "Local guardian's address is required"),
});

// Student schema
const studentValidateSchema = z.object({
  id: z.string().min(1, 'Student ID is required'),
  name: nameValidateSchema,
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({
      message: 'Gender must be either "male" or "female"',
    }),
  }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  email: z
    .string()
    .email('Email must be a valid email address')
    .min(1, 'Email is required'),
  contactNo: z.string().min(1, 'Contact number is required'),
  emergencyCOntactNo: z.string().min(1, 'Emergency contact number is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    .optional()
    .or(z.literal(null))
    .refine((value) => value !== null, {
      message: 'Blood group must be a valid type if provided',
    }),
  presentAddress: z.string().min(1, 'Present address is required'),
  permanentAddress: z.string().min(1, 'Permanent address is required'),
  guardian: guardianValidateSchema,
  localGuardian: localGuardianValidateSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked'], {
    errorMap: () => ({
      message: 'Status must be either "active" or "blocked"',
    }),
  }),
});

export default studentValidateSchema;
