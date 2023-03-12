﻿namespace ClassroomManagement.web.Infrstructure
{
    public class Error
    {
        Exception _e;
        public Error(Exception e)
        {
            _e = e;
            ErrorLogging(_e);
        }
        public Error(string es)
        {
            ErrorLogging(es);
        }
        public static void ErrorLogging(Exception ex)
        {
            string strPath = @"C:\Users\Ryiu\Downloads\Sandipan Project\Classroom-Web-API\ClassroomManagement\LogFile";
            if (!File.Exists(strPath))
            {
                File.Create(strPath).Dispose();
            }
            using (StreamWriter sw = File.AppendText(strPath))
            {
                sw.WriteLine("=============Error Logging ===========");
                sw.WriteLine("===========Start============= " + DateTime.Now);
                sw.WriteLine("Error Message: " + ex.Message);
                sw.WriteLine("Stack Trace: " + ex.StackTrace);
                sw.WriteLine("===========End============= " + DateTime.Now);

            }
        }
        public static void ErrorLogging(String ex)
        {
            string strPath = @"C:\Users\Ryiu\Downloads\Sandipan Project\Classroom-Web-API\ClassroomManagement\LogFile";
            if (!File.Exists(strPath))
            {
                File.Create(strPath).Dispose();
            }
            using (StreamWriter sw = File.AppendText(strPath))
            {
                sw.WriteLine("=============Error Logging ===========");
                sw.WriteLine("===========Start============= " + DateTime.Now);
                sw.WriteLine("Error Message: " + ex);
                //sw.WriteLine("Stack Trace: " + ex.StackTrace);
                sw.WriteLine("===========End============= " + DateTime.Now);

            }
        }
    }
}
