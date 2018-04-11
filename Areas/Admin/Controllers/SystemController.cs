using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TD.Models;
using TD.Models.Views;

namespace TD.Areas.Admin.Controllers
{
    [Authorize(Roles = "Admin")]
    public class SysController : Controller
    {
        // GET: Admin/System
        TDContext db = new TDContext();

        public ActionResult MainNav()
        {
            return PartialView("MainNav");
        }

        public ActionResult TopMenu()
        {
            var user = db.Users.SingleOrDefault(x => x.UserName == User.Identity.Name);
            var currentUserInfo = new CurrentUserInfo();
            if (user != null)
            {
                currentUserInfo.SetUser(user);
            }
            return PartialView("TopMenu",currentUserInfo);
        }
        public ActionResult QuickSidebar()
        {
            return PartialView("QuickSidebar");
        }
        [HttpPost]

        [ValidateAntiForgeryToken]
        public ActionResult OptimizerImage()
        {
            ImageExtensions.optimizeImages();
            return RedirectToAction("Index", "HomeAdmin", new { Area = "Admin" });
        }
    }
}