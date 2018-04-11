using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD
{
    public static class ExceptionExtensions
    {
        public static string GetExceptionString(this System.Exception e, int level = int.MaxValue)
        {
            var sb = new StringBuilder();
            var ex = e;
            // var counter = 1;
            StackTrace st = new StackTrace(ex, true);

            //Get the first stack frame
            StackFrame frame = st.GetFrame(0);

            //Get the file name
            string fileName = frame.GetFileName();

            //Get the method name
            string methodName = frame.GetMethod().Name;

            //Get the line number from the stack frame
            int line = frame.GetFileLineNumber();

            //Get the column number
          //  int col = frame.GetFileColumnNumber();
            if (!string.IsNullOrEmpty(fileName))
            {
                sb.Append(fileName + "->");
            }
            if (!string.IsNullOrEmpty(methodName))
            {
                sb.Append(methodName + "->");
            }
            if (line > 0)
            {
                sb.Append(line);
            }
            if (ex.InnerException == null) sb.Append(":" + ex.Message);
            //sb.Append($"{fileName} -> {methodName} -> {line}: {ex.Message}");
            while (ex.InnerException != null)
            {

                ex = ex.InnerException;
                st = new StackTrace(ex, true);

                //Get the first stack frame
                frame = st.GetFrame(0);

                //Get the file name
                fileName = frame.GetFileName();

                //Get the method name
                methodName = frame.GetMethod().Name;

                //Get the line number from the stack frame
                line = frame.GetFileLineNumber();

                //Get the column number
                //    col = frame.GetFileColumnNumber();
                if (!string.IsNullOrEmpty(fileName))
                {
                    sb.Append(fileName + "->");
                }
                if (!string.IsNullOrEmpty(methodName))
                {
                    sb.Append(methodName + "->");
                }
                if (line > 0)
                {
                    sb.Append(line);
                }
                if (ex.InnerException == null) sb.Append(":" + ex.Message);
                //sb.Append($"{fileName} -> {methodName} -> {line}: {ex.Message}");
            }
          //  return sb.ToString();
            //StackTrace st = new StackTrace(ex, true);

            ////Get the first stack frame
            //StackFrame frame = st.GetFrame(0);

            ////Get the file name
            //string fileName = frame.GetFileName();

            ////Get the method name
            //string methodName = frame.GetMethod().Name;

            ////Get the line number from the stack frame
            //int line = frame.GetFileLineNumber();

            ////Get the column number
            //int col = frame.GetFileColumnNumber();
            //return $"{fileName} -> {methodName} -> {line}: {ex.Message}";
            //while (exception != null && counter <= level)

            //{

            //    //sb.AppendLine($"{counter}-> Level: {counter}");

            //    sb.AppendLine($"{counter}-> {exception.StackTrace}: {exception.Message}");
            //    //sb.AppendLine($"{counter}-> Source: {exception.Source}");
            //    //sb.AppendLine($"{counter}-> Target Site: {exception.TargetSite}");
            //    //sb.AppendLine($"{counter}-> Stack Trace: {exception.StackTrace}");

            //    exception = exception.InnerException;
            //    counter++;
            //}
#if DEBUG
            Debug.WriteLine(sb);
#endif
            return sb.ToString();
        }
    }
}
