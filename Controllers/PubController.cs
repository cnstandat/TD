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
    public class PubController : Controller
    {
        // GET: Pub
        TDContext db = new TDContext();
        public ActionResult GetUsers()
        {
            return Json(db.Users.Select(x => new { N = x.UserName, F = x.FullName }).ToList(), JsonRequestBehavior.AllowGet);
        }
        
       
        public async Task<ActionResult> BlogCheck(string FullName)
        {
            if (FullName == null) return GetJS(false);
            return GetJS(!await db.Blogs.AnyAsync(x => x.FullName == FullName));// );//
        }
        public async Task<ActionResult> TagBlogCheck(string FullName)
        {
            if (FullName == null) return GetJS(false);
            return GetJS(!await db.TagBlogs.AnyAsync(x => x.FullName == FullName));//
        }
        public async Task<ActionResult> AppCheck(string Name)
        {
            if (Name == null) return GetJS(false);
            return GetJS(!await db.Apps.AnyAsync(x => x.Name == Name));//
        }
        public async Task<ActionResult> PartnerCheck(string Name)
        {
            if (Name == null) return GetJS(false);
            return GetJS(!await db.Partners.AnyAsync(x => x.Name == Name));
        }

   
        public async Task<ActionResult> UserCheck(string UserName)
        {
            if (UserName == null) return GetJS(false);
            return GetJS(!await db.Users.AnyAsync(x => x.UserName == UserName));//
        }
        public async Task<ActionResult> CheckPhone(string Number)
        {
            if (Number == null) return GetJS(false);
            return GetJS(!await db.Users.AnyAsync(x => x.PhoneNumber == Number));//
        }
        public async Task<ActionResult> EmailCheckExist(string Email)
        {
            if (Email == null) return GetJS(false);
            return GetJS(!await db.Users.AnyAsync(x => x.Email == Email));//
        }
        [Authorize(Roles = "SysAdmin,Admin")]
        public ActionResult checkFeatureAppName(string Name)
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
                //if (_signInManager != null)
                //{
                //    _signInManager.Dispose();
                //    _signInManager = null;
                //}
                //if (db != null)
                //{
                //    db.Dispose();
                //    db = null;
                //}
            }
            base.Dispose(disposing);
        }
    }
}