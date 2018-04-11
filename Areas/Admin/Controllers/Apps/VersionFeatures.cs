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
      
        #region Version FeatureApps
        public async Task< ActionResult> VersionFeatureApps(string AppId, LicenseType? Version)
        {
            var db = new TDContext();
            if (string.IsNullOrEmpty(AppId) || Version == null) return View();
            App app = db.Apps.Find(AppId);
            if (app == null)
            {
                return View();
            }
            var appFeatureApps = db.AppFeatures.Where(x => x.AppId == app.Id);
            var lst = typeof(LicenseType).GetDictionary();
            foreach (var item in appFeatureApps.ToList())
            {
                foreach (var t in lst)
                {
                    var data = db.VersionFeatureApps.Find(item.AppId, (LicenseType)t.Key, item.FeatureAppId);
                    if (data == null)
                    {
                        data = new VersionFeature
                        {
                            AppId = item.AppId,
                            Version = (LicenseType)t.Key,
                            FeatureAppId = item.FeatureAppId,
                            Content = item.Content
                        };
                        db.VersionFeatureApps.Add(data);
                        var str =await db.SaveDatabase();
                    }
                }
            }
            var partnerApps = db.VersionFeatureApps.Include(X => X.App).Include(x => x.FeatureApp).Where(x => x.AppId == AppId && x.Version == Version).OrderBy(x => x.FeatureApp.Name);

            var model = new List<VersionFeatureEditModel>();
            ViewBag.AppId = app.Id;
            ViewBag.Version = Version;
            foreach (var item in partnerApps)
            {
                model.Add(new VersionFeatureEditModel(item));
            }
            return PartialView(model);
        }
        public ActionResult VersionFeatureAppsAdd(string AppId, LicenseType? Version)
        {
            if (string.IsNullOrEmpty(AppId) || Version == null) return View();

            var app = db.Apps.Find(AppId);
            if (app == null) return View();
            var model = new VersionFeatureEditModel()
            {
                AppId = app.Id,
                AppName = app.Name,
                Version = Version.Value,
                FeatureApps = GetAllFeatureApp(app, false, Version)
            };
            return View(model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VersionFeatureAppsAdd(VersionFeatureEditModel model)
        {
            using (var db = new TDContext())
            {
                if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));

                var FeatureAppId = model.Selected;

                var find = db.FeatureApps.Find(FeatureAppId);
                if (find == null)
                {
                    find = db.FeatureApps.FirstOrDefault(x => x.Name == model.Selected);
                    if (find == null)
                    {
                        find = new FeatureApp
                        {
                            Name = model.Selected
                        };
                        db.FeatureApps.Add(find);
                        var str =await db.SaveDatabase();
                        if (str!=null)
                            return Json(str.GetError());
                    }
                    FeatureAppId = find.Id;
                }

                var data = await db.VersionFeatureApps.FindAsync(model.AppId, model.Version, FeatureAppId);
                if (data != null)
                    return Json(TD.Global.AppVersionExist.GetError());
                model.FeatureAppId = FeatureAppId;
                data = new VersionFeature(model);
                db.VersionFeatureApps.Add(data);
                var str2 =await db.SaveDatabase();
                if (str2.NotNull()) return Json(str2.GetError());
                return Json(Js.SuccessRedirect(TD.Global.AppVersionAdded, string.Format("{0}/VersionAppFeaturesAdd?AppId={1}&Version={2}", TD.Properties.Resources.AdminAppsLink, model.AppId, model.Version)));
            }
        }

        public ActionResult VersionFeatureAppsEdit(string AppId, LicenseType? Version, string FeatureAppId)
        {
            if (Version == null || string.IsNullOrEmpty(AppId) || string.IsNullOrEmpty(FeatureAppId)) return View();
            var app = db.VersionFeatureApps.Find(AppId, Version.Value, FeatureAppId);
            if (app == null) return View();
            var model = new VersionFeatureEditModel(app)
            {

                Selected = FeatureAppId.ToString(),

                FeatureApps = GetAllFeatureApp()
            };
            return View(model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VersionFeatureAppsEdit(VersionFeatureEditModel model)
        {
            using (var db = new TDContext())
            {
                if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));
                var FeatureAppId = model.Selected;

                var find = db.FeatureApps.Find(FeatureAppId);
                if (find == null)
                {
                    find = db.FeatureApps.FirstOrDefault(x => x.Name == model.Selected);
                    if (find == null)
                    {
                        find = new FeatureApp
                        {
                            Name = model.Selected
                        };
                        db.FeatureApps.Add(find);
                        var str =await db.SaveDatabase();
                        if (str!=null)
                            return Json(str.GetError());
                    }
                    FeatureAppId = find.Id;
                }
                model.FeatureAppId = FeatureAppId;
                var data = await db.VersionFeatureApps.FindAsync(model.AppId, model.Version, FeatureAppId);
                if (data == null)
                {

                    data = new VersionFeature(model);
                    db.VersionFeatureApps.Add(data);
                    var str =await db.SaveDatabase();
                    if (str!=null) return Json(str.GetError());
                }
                data.Content = model.Content;
                db.Entry(data).State = EntityState.Modified;
                var result =await db.SaveDatabase();
                if (result.NotNull()) result.GetError();
                return Json(Js.SuccessRedirect(TD.Global.VersionFeatureAppChanged, string.Format("{0}/VersionsEdit?AppId={1}&Version={2}", TD.Properties.Resources.AdminAppEditLink, model.AppId, model.Version)));
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VersionsFeatureAppsDelete(string AppId, LicenseType? Version, string FeatureAppId)
        {
            if (string.IsNullOrEmpty(AppId) || Version == null || string.IsNullOrEmpty(FeatureAppId)) return Json(this.GetNoData());
            using (var db = new TDContext())
            {
                var data = await db.VersionFeatureApps.FindAsync(AppId, Version, FeatureAppId);
                if (data != null)
                {
                    db.VersionFeatureApps.Remove(data);
                    var str =await db.SaveDatabase();
                    if (str!=null) return Json(str.GetError());
                }
                return Json(Js.SuccessRedirect(TD.Global.VersionFeatureAppRemoved, TD.Properties.Resources.AdminAppEditLink + AppId));
            }
        }
        #endregion

     
    }
}
