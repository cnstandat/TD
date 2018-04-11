using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TD.Models;
using TD.Models.Views;
using Newtonsoft.Json;
using System.IO;
using System.Data.Entity;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace TD.Controllers
{
    public class CheckController : Controller
    {
        // GET: Pub
        TDContext db = new TDContext();
        #region User
        public async Task<ActionResult> UserName(string UserName)
        {
            if (UserName == null) return GetJS(false);
            return GetJS(!await db.Users.AnyAsync(x => x.UserName == UserName));//
        }
        public async Task<ActionResult> Phone(string PhoneNumber)
        {
            if (PhoneNumber == null) return GetJS(false);
            return GetJS(!await db.Users.AnyAsync(x => x.PhoneNumber == PhoneNumber));//
        }
        public async Task<ActionResult> Email(string Email)
        {
            if (Email == null) return GetJS(false);
            return GetJS(!await db.Users.AnyAsync(x => x.Email == Email));//
        }
        #endregion
        public async Task<ActionResult> Blog(string FullName)
        {
            if (FullName == null) return GetJS(false);
            return GetJS(!await db.Blogs.AnyAsync(x => x.FullName == FullName));// );//
        }

        public async Task<ActionResult> TagBlog(string FullName)
        {
            if (FullName == null) return GetJS(false);
            return GetJS(! await db.TagBlogs.AnyAsync(x => x.FullName == FullName));//
        }
        public async Task<ActionResult> App(string Name)
        {
            if (Name == null) return GetJS(false);
            return GetJS(!await db.Apps.AnyAsync(x => x.Name == Name));//
        }
        public async Task<ActionResult> Partner(string Name)
        {
            if (Name == null) return GetJS(false);
            return GetJS(!await db.Partners.AnyAsync(x => x.Name == Name));
        }

   

        [Authorize(Roles = "SysAdmin,Admin")]
        public ActionResult Feature(string Name)
        {
            if (string.IsNullOrEmpty(Name)) return GetJS(false);
            return GetJS(!db.FeatureApps.Any(x => x.Name == Name));
        }
        ActionResult GetJS(object data)
        {
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
               
            }
            base.Dispose(disposing);
        }
    }
}