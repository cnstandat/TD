using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD
{
    public class RunAction
    {
        public RunAction()
        {
            this.Success = true;
        }
        public RunAction(string Message)
        {
            this.Success = false;
            this.Message = Message;
        }
        public RunAction(bool Success, string Message)
        {
            this.Success = Success;
            this.Message = Message;
        }
        public string Message { get; set; }
        public bool Success { get; set; }
    }
}

