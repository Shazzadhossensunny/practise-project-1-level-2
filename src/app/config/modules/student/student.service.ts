import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  //? custom static method

  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }

  const result = await Student.create(studentData); //? built in static method

  //? custom instance method
  // const student = new Student(studentData); //create an instance
  // if (await student.isUserExists(student.id)) {
  //   throw new Error('User already exists!');
  // }
  // const result = await student.save(); //? built in instance method
  return result;
};

const getAllStudentsDB = async () => {
  const result = await Student.find();
  return result;
};

const getSIngleStudentDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsDB,
  getSIngleStudentDB,
};
