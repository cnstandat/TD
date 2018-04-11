using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TD.Models;
using TD.Models.Views;
using Microsoft.AspNet.Identity;

namespace TD.Areas.Admin.Controllers
{
    [Authorize(Roles = "SysAdmin")]
    public partial class AppsController : Controller
    {
        #region Apps
        public ActionResult Index(string Search,  int? Page)
        {
            IQueryable<App> all = db.Apps.Include(X => X.Partners).Include(x => x.Versions).Include(x => x.Features);
            if (!string.IsNullOrEmpty(Search)) all = all.Where(x => x.Name.Contains(Search));
           
            int page = Page ?? 1;
           
            ViewBag.HasMore = all.Count() > CData.AppConfig.PageCount * page;
            ViewBag.Page = page + 1;
            all = all.OrderBy(x => x.Name).Skip((page - 1) * CData.AppConfig.PageCount).Take(CData.AppConfig.PageCount);
            ViewBag.Search = Search;
            return View(all);
        }
        public ActionResult Create()
        {
            return View(new AppEditModel(new AppCategoryDB(db).GetSelectList()));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(AppEditModel dataModel)
        {
            if (!ModelState.IsValid) return Json(this.GetModelStateError().GetError());
            var create = await new AppDB().Create(dataModel,User.Identity.GetUserId());
            if (!create.Success) return Json(create.Message.GetError());
            return Json(Js.SuccessRedirect(string.Format(CData.AppConfig.AppAdded, CData.AppConfig.AppCreateLink, CData.AppConfig.AppLink), CData.AppConfig.AppEditLink + create.Message));
        }
        public async Task<ActionResult> Edit(string id)
        {
            if (string.IsNullOrEmpty(id)) return View();
            App app = await db.Apps.FindAsync(id);
            if (app == null)
                return View();
            return View(new AppEditModel(app, new AppCategoryDB(db).GetSelectList()));
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(AppEditModel dataModel)
        {
            if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));
            var create = await new AppDB().Edit(dataModel,User.Identity.GetUserId());
            if (!create.Success) return Json(create.Message.GetError());
            return Json(Js.SuccessRedirect(string.Format(CData.AppConfig.AppEdit,CData.AppConfig.AppCreateLink,CData.AppConfig.AppLink),CData.AppConfig.AppLink));
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
           
            var delete = await new AppDB().Delete(id);
            if (!string.IsNullOrEmpty(delete)) return Json(delete.GetError());
            return Json(Js.SuccessRedirect(string.Format(CData.AppConfig.AppRemove, CData.AppConfig.AppCreateLink), CData.AppConfig.AppLink));
        }
        #endregion




        #region Utils
        private TDContext db = new TDContext();

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        #endregion
    }
}
