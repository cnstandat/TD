using System;
using System.Linq;

namespace TD
{
    public class DBAction
    {


        public DBAction()
        {
            Success = true;
        }
        public DBAction(string Message)
        {
            this.Message = Message;
            this.Success = false;
        }
        public DBAction(Exception exception)
        {
            this.Message = exception.GetExceptionString();
            this.Success = false;
        }
        public DBAction(object Data)
        {
            this.Success = true;
            this.Data = Data;
        }





        public DBAction(string Message, object Data)
        {
            this.Message = Message;
            this.Data = Data;
            this.Success = false;
        }

        public DBAction(string Message, bool Success, object Data) : this(Message, Success)
        {
            this.Data = Data;
        }
        public object Data { get; set; }
        public string Message { get; set; }
        public bool Success { get; set; }
    }
}

