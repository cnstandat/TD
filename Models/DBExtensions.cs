using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace TD
{

    public static class WebHelperExtensions
    {
        public static List<SelectListItem> GetSelectList(this Type t)
        {
            if (t == null)
                return null;
            if (!t.IsEnum)
                return null;
            string[] names = Enum.GetNames(t);
            Array values = Enum.GetValues(t);
            var lst = new List<SelectListItem>();
            for (int i = 0; i < values.Length; i++)
            {
                lst.Add(new SelectListItem
                {
                    Value = ((int)values.GetValue(i)).ToString(),
                    Text = ((Enum)values.GetValue(i)).GetEnumDescription()
                });
            }
            return lst;
        }
    }
}
