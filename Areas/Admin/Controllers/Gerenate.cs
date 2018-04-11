using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TD.Models;
using TD.Models.Views;

namespace TD.Areas.Admin.Controllers
{
    [Authorize(Roles = "SysAdmin")]
    public partial class HomeController
    {
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> GenData(string modelName, int? count)
        {
            if (string.IsNullOrEmpty(modelName)) return Json(Js.Error("Vui lòng chọn dữ liệu"));
            modelName = modelName.ToLower();
            var dbHelper = new DBHelper();
            if (modelName == "tagblog")
            {
                var result = await dbHelper.GerenateTagBlogs(db);
                if (!string.IsNullOrEmpty(result)) return Json(Js.Error(result));
            }
            else if (modelName == "blog")
            {
                var str = await dbHelper.GerenateBlogs(db, User.Identity.GetUserId(), count ?? 10);
                if (str != null) return Json(str.GetError());
            }
            else return Json(Js.Error("Chưa hỗ trợ"));
            return Json(Js.Success(string.Format("Đã tạo dữ liệu : {0} số lượng {1}", modelName, count ?? 10)));
        }

    }
}