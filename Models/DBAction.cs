using System;
using System.Linq;

namespace TD
{
    public class DBAction
    {
        public DBAction()
        {
            this.OK = true;
        }
        public DBAction(string Id)
        {
            this.OK = true;
            this.Id = Id;
        }
        public DBAction(string Message, bool value)
        {
            this.OK = false;
            this.Id = Message;
        }
        public bool OK { get; set; }
        public string Id { get; set; }
    }
}