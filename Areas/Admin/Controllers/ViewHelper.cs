using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace TD
{
    public class ViewHelper
    {
        public List<SelectListItem> GenData()
        {
            var lst = new List<SelectListItem>();
            var value = "tagblog,blog".Split(',');
            var text = "Nhãn bài viết,Bài viết".Split(',');
            for (int i = 0, j = value.Length; i < j; i++)
            {
                lst.Add(new SelectListItem
                {
                    Value = value[i],
                    Text = text[i]
                });
            }
            return lst;
        }
    }
}