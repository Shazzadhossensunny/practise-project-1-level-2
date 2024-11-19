import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidateSchema from './student.zod.validate';
// import studentValidateSchema from './student.joi.validate';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // ! using Joi validation
    // const { error, value } = studentValidateSchema.validate(studentData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong!!!',
    //     error: error.details,
    //   });
    // }

    //! using zod validation
    const zodParseValidation = studentValidateSchema.parse(studentData);

    //? will cal service func to send this data
    const result =
      await StudentServices.createStudentIntoDB(zodParseValidation);

    //?send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsDB();
    res.status(200).json({
      success: true,
      message: 'All Students get successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSIngleStudentDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student get successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student delete successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};
