import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  StudentModel,
  TUserName,
} from './student/student.interface';
import bcrypt from 'bcrypt';
import config from '..';

// ! create Schema
const nameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    maxlength: [20, 'First Name can not be more than 20 characters'],
    required: [true, 'First name is required'],
    //! custom validation
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in capitalize formate',
    // },
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [20, 'Middle Name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [20, 'Middle Name can not be more than 20 characters'],
    required: [true, 'Last name is required'],
    //! custom validation
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not correct method only letter use please!',
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "Father's name is required"] },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Local guardian's name is required"] },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});
// !StudentMethods eaita bosbe custom instance hole parameter ea last ea
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    password: {
      type: String,
      maxlength: [20, 'Password is not more than 20'],
      required: [true, 'Password is required'],
    },
    name: { type: nameSchema, required: [true, 'Student name is required'] },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message:
          '{VALUE} is not a valid gender. Only "male" or "female" are allowed.',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: '{VALUE} is not valid type email!',
      },
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyCOntactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImg: { type: String },
    isActive: {
      type: String,
      enum: {
        values: ['active', 'blocked'],
        message:
          '{VALUE} is not a valid status. Only "active" or "blocked" are allowed.',
      },
      default: 'active',
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// ! virtual mongoose jodi kokhono dorkar hoy je kono data sudhu matro clint ea dekhno db te dorkar nai tokhon vitrual use korte hoy jemon fullname

studentSchema.virtual('fullname').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//! using pre & post middleware or hooks for password hasing called document middleware

studentSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  // console.log(this, 'this is pre');
  next();
});
studentSchema.post('save', function (doc, next) {
  doc.password = '';

  // console.log(this, 'this is post');
  next();
});

//! using pre & post middleware or hooks for delete called query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.findOne({ isDelete: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDelete: { $ne: true } } });

  next();
});

//!create custom static methods check user isUserExists

studentSchema.statics.isUserExists = async function (id: string) {
  const existsUser = await Student.findOne({ id });
  return existsUser;
};

// ! create custom instance methods check user exists
// studentSchema.method('isUserExists', async function isUserExists(id: string) {
//   const existsUser = await Student.findOne({ id });
//   return existsUser;
// });

// studentSchema.methods.isUserExists = async function (id: string) {
//   const existsUser = await Student.findOne({ id });
//   return existsUser;
// };

//! create a model

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
