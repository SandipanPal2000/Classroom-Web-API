﻿using AutoMapper;
using ClassroomManagement.web.DTOs.Student;
using ClassroomManagement.web.Infrstructure;
using ClassroomManagement.web.Models;
using Microsoft.EntityFrameworkCore;

namespace ClassroomManagement.web.Services
{
    public class StudentService : IStudentService
    {
        private readonly DbObject _dbObject;
        private readonly IMapper _mapper;

        public StudentService(DbObject dbObject, IMapper mapper)
        {
            _dbObject = dbObject;
            _mapper = mapper;
        }
        public async Task AddStudent(CreateStudentDTO _newStudent)
        {
            _dbObject.StudentTB.Add(_mapper.Map<StudentInfo>(_newStudent));
            await _dbObject.SaveChangesAsync();
            
        }

        public async Task DeleteStudent(int Id)
        {
            var result = _dbObject.StudentTB.FirstOrDefault(s => s.StudentId== Id);
            if (result == null)
            {
                new Error("Student not found");
                
            }
            else
            {
                _dbObject.StudentTB.Remove(result);
                await _dbObject.SaveChangesAsync();
                
            }
        }

        public async Task<ServiceResponse<GetStudentDTO>> FetchSingleStudent(int Id)
        {
            var response = new ServiceResponse<GetStudentDTO>();
            var result = _dbObject.StudentTB.FirstOrDefault(s => s.StudentId == Id);
            if (result == null)
            {
                response.Success = false;
                response.Message = "The StudnetID = " + Id + " can not be found";
                new Error(response.Message);
            }
            else
            {
                response.Data = _mapper.Map<GetStudentDTO>(result);
                response.Message = "Successfully fetched the data";
            }
            return response;
        }

        public async Task<ServiceResponse<List<GetStudentDTO>>> FetchStudentsList()
        {
            var response = new ServiceResponse<List<GetStudentDTO>>();
            var result = _dbObject.StudentTB.ToList();
            if (result == null)
            {
                response.Success = false;
                response.Message = "No data found! Table is empty";
                new Error(response.Message);
            }
            else
            {
                response.Data = result.Select(s=>_mapper.Map<GetStudentDTO>(s)).ToList();
                response.Message = "Successfully fetched the data";
            }
            return response;
        }

        public async Task UpdateScore(int Id, int Score)
        {
            var result = _dbObject.StudentTB.First(s => s.StudentId==Id);
            if (result == null)
            {
                new Error("Student not found");
                
            }
            else
            {
                result.Score = Score;
                await _dbObject.SaveChangesAsync();
        
            }
        }

        public async Task UpdateStudent(UpdateStudentDTO _student)
        {
            var result = _dbObject.StudentTB.First(s => s.StudentId == _student.StudentId);
            if (result == null)
            {
                new Error("Student not found");
                
            }
            else
            {
                result.Score = _student.Score;
                result.StudentName = _student.StudentName;
                result.Department = _student.Department;
                result.StudentRoll  = _student.StudentRoll;
                await _dbObject.SaveChangesAsync();
           
            }
        }
    }
}
