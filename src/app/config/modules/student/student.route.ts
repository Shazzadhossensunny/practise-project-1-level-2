import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

//? will call controller func
router.post('/create-student', StudentController.createStudent);

router.get('/', StudentController.getAllStudent);

router.get('/:studentId', StudentController.getSingleStudent);
router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoute = router;
