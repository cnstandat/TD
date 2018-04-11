using System;
using System.Data;
using System.Linq;
using System.Web.Mvc;
using TD.Models;

namespace TD.Areas.Admin.Controllers
{
    public partial class AppsController
    {
        #region App Blogs
        public ActionResult Blogs(string id)
        {
            if (string.IsNullOrEmpty(id)) return PartialView();
            App app = db.Apps.Find(id);
            if (app == null) return PartialView();

            var partnerApps = db.Blogs.Where(x => x.AppId == id).OrderBy(x => x.LastModify);
            ViewBag.AppId = app.Id;
            return PartialView(partnerApps);
        }

        #endregion

    }
}
