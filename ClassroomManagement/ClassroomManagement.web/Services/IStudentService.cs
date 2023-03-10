using ClassroomManagement.web.DTOs.Student;
using ClassroomManagement.web.Infrstructure;

namespace ClassroomManagement.web.Services
{
    public interface IStudentService
    {
        Task<ServiceResponse<List<GetStudentDTO>>> FetchStudentsList();
        Task<ServiceResponse<GetStudentDTO>> FetchSingleStudent(int Id);
        Task AddStudent(CreateStudentDTO _newStudent);
        Task UpdateStudent(UpdateStudentDTO _student);
        Task DeleteStudent(int Id);
        Task UpdateScore(int Id, int Score);
    }
}
