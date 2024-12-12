<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function selectStudents()
    {
        $students = Student::all();
        return $students;
    }

    public function addstudent(Request $request)
    {
        $student = Student::create([
            'name' => $request->name,
            'phonenum' => $request->phonenum,
        ]);

        return response()->json($student, 201);
    }

    public function delStudent($id)
    {
        $student = Student::find($id);
        $student->delete();

        return response()->json(null, 204);
    }

    public function deleteMultiple(Request $request)
    {
        $ids = $request->input('ids');
        Student::destroy($ids);
        return response()->json(null, 204);
    }

    public function student($id)
    {
        $student = Student::find($id);
        return $student;
    }

    public function updateStudent(Request $request, $id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $studentData = $request->input('student');

        if (!$studentData) {
            return response()->json(['message' => 'Invalid request payload'], 400);
        }

        $student->name = $studentData['name'] ?? $student->name;
        $student->phonenum = $studentData['phonenum'] ?? $student->phonenum;
        $student->save();

        return response()->json($student);
    }
}
