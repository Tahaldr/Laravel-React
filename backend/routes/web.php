<?php

use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/students', [StudentController::class, 'selectStudents']);

Route::post('/api/addstudent', [StudentController::class, 'addstudent']);

Route::get('/api/delstudent/{id}', [StudentController::class, 'delStudent']);
Route::post('/api/deletemultiple', [StudentController::class, 'deleteMultiple']);

Route::get('api/student/{id}', [StudentController::class, 'student']);
Route::post('/api/updatestudent/{id}', [StudentController::class, 'updateStudent']);
