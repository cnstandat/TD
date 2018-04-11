using System;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using TD.Models;
using TD.Models.Views;
using TD.Properties;

namespace TD.Areas.Admin.Controllers
{
    public partial class AppsController
    {
        #region App FeatureApps
        public ActionResult AppFeatures(string id)
        {
            if (string.IsNullOrEmpty(id)) return PartialView();
            App app = db.Apps.Find(id);
            if (app == null) return PartialView();
            var all = db.AppFeatures.Include(X => X.FeatureApp).Where(x => x.AppId == id).OrderBy(x => x.Order);
            ViewBag.AppId = app.Id;
            return PartialView(all);
        }
        public ActionResult AppFeaturesAdd(string id)
        {
            if (string.IsNullOrEmpty(id)) return View();
            var app = db.Apps.Find(id);
            if (app == null) return View();
            var model = new AppFeatureView
            {
                AppId = app.Id,
                AppName = app.Name,
                FeatureApps = GetAllFeatureApp(app, true),
                Order = app.Features.Count() + 1
            };
            return View(model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> AppFeaturesAdd(AppFeatureView model)
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
                        var str = await db.SaveDatabase();
                        if (str!=null)
                            return Json(str.GetError());
                    }
                    FeatureAppId = find.Id;
                }


                var data = await db.AppFeatures.FindAsync(model.AppId, FeatureAppId);
                if (data != null)
                    return Json(Global.FeatureAppAppExist.GetError());

                data = new AppFeature(model.AppId, FeatureAppId);
                data.Content = model.Content;
                data.Order = model.Order;
                db.AppFeatures.Add(data);
                var str2 = await db.SaveDatabase();
                if (str2.NotNull()) return Json(str2.GetError());
                return Json(Js.SuccessRedirect(Global.FeatureAppAppAdded, "AppFeaturesAdd/" + model.AppId));
            }
        }

        public ActionResult AppFeaturesEdit(string AppId, string FeatureAppId)
        {
            if (string.IsNullOrEmpty( AppId) ||string.IsNullOrEmpty( FeatureAppId)) return View();
            var app = db.AppFeatures.Find(AppId, FeatureAppId);
            if (app == null) return View();
            var model = new AppFeatureView
            {
                AppId = AppId,
                AppName = app.App.Name,
                FeatureAppId = FeatureAppId,
                Selected = FeatureAppId.ToString(),
                Content = app.Content,
                Order = app.Order,
                FeatureApps = GetAllFeatureApp()
            };
            return View(model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> AppFeaturesEdit(AppFeatureView model)
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
                        var str = await db.SaveDatabase();
                        if (str!=null)
                            return Json(str.GetError());
                    }
                    FeatureAppId = find.Id;
                }


                var data = await db.AppFeatures.FindAsync(model.AppId, FeatureAppId);
                if (data == null)
                {
                    model.FeatureAppId = FeatureAppId;
                    data = new AppFeature(model.AppId, FeatureAppId)
                    {
                        Content = model.Content,
                        Order = model.Order
                    };
                    db.AppFeatures.Add(data);
                    var str = await db.SaveDatabase();
                    if (str!=null) return Json(str.GetError());
                }
                data.Content = model.Content;
                data.Order = model.Order;
                db.Entry(data).State = EntityState.Modified;
                var result = await db.SaveDatabase();
                if (result.NotNull()) result.GetError();
                return Json(Js.SuccessRedirect(Global.FeatureAppAppChanged, Resources.AdminAppEditLink + model.AppId));
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> AppFeaturesDelete(string AppId, string FeatureAppId)
        {
            if (string.IsNullOrEmpty(AppId) || string.IsNullOrEmpty(FeatureAppId)) return Json(this.GetNoData());
            using (var db = new TDContext())
            {
                var data = await db.AppFeatures.FindAsync(AppId, FeatureAppId);
                if (data != null)
                {
                    db.AppFeatures.Remove(data);
                    var str = await db.SaveDatabase();
                    if (str!=null) return Json(str.GetError());
                }
                return Json(Js.SuccessRedirect(Global.FeatureAppAppChanged, Resources.AdminAppEditLink + AppId));
            }
        }
        #endregion
    }
}
