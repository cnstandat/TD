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
    public partial class AppsController
    {
        #region App Version
        public ActionResult AppVersions(string id)
        {
            if (string.IsNullOrEmpty(id)) return PartialView();
            App app = db.Apps.Find(id);
            if (app == null)
                return PartialView();

            var partnerApps = db.AppVersions.Include(X => X.App).Where(x => x.AppId == id).OrderBy(x => x.Version);

            var model = new List<AppVersionView>();
            ViewBag.AppId = app.Id;

            foreach (var item in partnerApps)
            {
                model.Add(new AppVersionView(item));
            }
            return PartialView(model);
        }
        public ActionResult AppVersionsAdd(string id)
        {
            if (string.IsNullOrEmpty(id)) return View();
            var app = db.Apps.Find(id);
            if (app == null)
                return View();
            var model = new AppVersionView
            {
                AppId = app.Id,
                AppName = app.Name,
                AllVersions = GetAllLicenseType(app, true)
            };
            return View(model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> AppVersionsAdd(AppVersionView model)
        {
            using (var db = new TDContext())
            {
                if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));
                var version = model.Selected.ToEnum<LicenseType>();


                var data = await db.AppVersions.FindAsync(model.AppId, version);
                if (data != null)
                    return Json("Đã tồn tại phiên bản ứng dụng này".GetError());
                model.Version = version;
                data = new AppVersion(model);
                db.AppVersions.Add(data);
                var str =await db.SaveDatabase();
                if (str!=null) return Json(str.GetError());
                return Json(Js.SuccessRedirect("Đã thêm phiên bản", TD.Properties.Resources.AdminAppsLink + "/AppVersionsEdit?AppId=" + model.AppId + "&Version=" + version));
            }
        }

        public ActionResult AppVersionsEdit(string AppId, LicenseType? Version)
        {
            if (string.IsNullOrEmpty(AppId) || Version == null) return View();
            var app = db.AppVersions.Find(AppId, Version.Value);
            if (app == null)
                return View();
            var model = new AppVersionView(app)
            {
                Selected = ((int)Version).ToString(),
                AllVersions = GetAllLicenseType()
            };
            return View(model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> AppVersionsEdit(AppVersionView model)
        {
            using (var db = new TDContext())
            {
                if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));
                var version = model.Selected.ToEnum<LicenseType>();



                var data = await db.AppVersions.FindAsync(model.AppId, version);
                if (data == null)
                {
                    model.Version = version;
                    data = new AppVersion(model);
                    db.AppVersions.Add(data);
                    var str =await db.SaveDatabase();
                    if (str!=null) return Json(str.GetError());
                }
                data.Price = model.Price;
                data.OldPrice = model.OldPrice;
                data.Discount = model.Discount;
                db.Entry(data).State = EntityState.Modified;
                var result =await db.SaveDatabase();
                if (result.NotNull()) result.GetError();
                return Json(Js.SuccessRedirect(TD.Global.AppVersionChanged, TD.Properties.Resources.AdminAppEditLink + model.AppId));
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> AppVersionsDelete(string AppId, LicenseType? Version)
        {
            using (var db = new TDContext())
            {
                if (string.IsNullOrEmpty(AppId) || Version == null) return Json(TD.Global.AppVersionNotFound.GetError());

                var data = await db.AppVersions.FindAsync(AppId, Version.Value);
                if (data == null) return Json(TD.Global.AppVersionNotFound.GetError());

                db.AppVersions.Remove(data);
                var str =await db.SaveDatabase();
                if (str!=null) return Json(str.GetError());

                return Json(Js.SuccessRedirect(TD.Global.AppVersionRemoved, TD.Properties.Resources.AdminAppEditLink + AppId));
            }
        }
        #endregion
    }
}
