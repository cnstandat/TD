using System;
using System.IO;
using System.Linq;

namespace TD
{
    public static class FileExtensions
    {
        public static void CopyFile(this string sourceFileName, string destinationFileName, string destinationPath)
        {
            string destFileName = string.Empty;
            destFileName = Path.Combine(destinationPath, destinationFileName);
            System.IO.File.Copy(sourceFileName, destFileName, true);
        }

        public static object CreateTempFolder()
        {
            string tempFileName = Path.GetTempFileName();
            string path = Path.Combine(Path.GetTempPath(), Path.GetFileNameWithoutExtension(tempFileName));
            Directory.CreateDirectory(path);
            return path;
        }
        public static RunAction SaveToFile(this string text, string pathWithTXTFullfilename,bool AutoCreateFolder=true)
        {
            try
            {
                //write string to file
                string folderPath= Path.GetDirectoryName(pathWithTXTFullfilename);
                if (!Directory.Exists(folderPath)) Directory.CreateDirectory(folderPath);
                System.IO.File.WriteAllText(pathWithTXTFullfilename, text);
                return new RunAction();
            }
            catch (Exception exception)
            {
                return new RunAction(exception.GetExceptionString());
            }

        }
        public static bool IsExits(this string fullPath)
        {
            if (string.IsNullOrEmpty(fullPath)) return false;
            return System.IO.File.Exists(fullPath);
        }
        public static string LoadFromFile(this string fullPath)
        {
            if (string.IsNullOrEmpty(fullPath)) return null;
            if (System.IO.File.Exists(fullPath)) return System.IO.File.ReadAllText(fullPath);
            else return null;
        }
        public static string DeleteFile(this string fullPath)
        {
            if (string.IsNullOrEmpty(fullPath)) return "";
            if (System.IO.File.Exists(fullPath))
                try
                {
                    File.Delete(fullPath);
                }
                catch (Exception ex)
                {
                    return ex.GetExceptionString();
                }
            return "";

        }
        public static string GetFileExtension(this string filename)
        {
            return filename.Substring(filename.LastIndexOf('.') + 1);
        }
        public static string GetRandomFileNameWithExt(this string path,string ext=null)
        {
            string fileName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName());
            string filePath = string.Format("{0}\\{1}{2}", path, fileName, ext??"");
            while (filePath.IsExits())
            {
                fileName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName());
                filePath = string.Format("{0}\\{1}{2}", path, fileName, ext);
            }
            return fileName+ext;
        }
    }
}
