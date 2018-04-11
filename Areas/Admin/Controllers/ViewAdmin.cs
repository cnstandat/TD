using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TD.Admin.Views
{
    public class MyAction
    {
        public string Name { get; set; }

        public bool IsHttpPost { get; set; }
    }

    public class MyController
    {
        public string Name { get; set; }

        public string Namespace { get; set; }

        public IEnumerable<MyAction> MyActions { get; set; }
    }

    public class MyArea
    {
        public string Name { get; set; }

        public IEnumerable<string> Namespace { get; set; }

        public IEnumerable<MyController> MyControllers { get; set; }
    }
}