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
      

      

        #region FeatureApps
        public ActionResult FeatureApps()
        {
            return View(db.FeatureApps);
        }
        public ActionResult FeatureAppsAdd()
        {

            return View(new FeatureAppView());
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> FeatureAppsAdd(FeatureAppView model)
        {
            using (var db = new TDContext())
            {
                if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));
                if (await db.FeatureApps.AnyAsync(x => x.Name == model.Name)) return Json(TD.Global.FeatureAppExits.GetError());
                var data = new FeatureApp()
                {
                    Name = model.Name
                };
                db.FeatureApps.Add(data);
                var str =await db.SaveDatabase();
                if (str!=null) return Json(str.GetError());
                return Json(Js.SuccessRedirect("Đã thêm chức năng", "/admin/apps/AppFeaturesAdd")); ;
            }
        }

        public ActionResult FeatureAppsEdit(string id)
        {
            if (string.IsNullOrEmpty(id)) return View();
            var app = db.FeatureApps.Find(id);
            if (app == null)
                return View();

            return View(new FeatureAppView(app));
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> FeatureAppsEdit(FeatureAppView model)
        {
            using (var db = new TDContext())
            {
                if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));



                var data = await db.FeatureApps.FindAsync(model.Id);
                if (data == null) return Json(string.Format("Không tìm thấy chức năng : {0} Mã :{1}", model.Name, model.Id).GetError());
                data.Name = model.Name;
                db.Entry(data).State = EntityState.Modified;
                var result =await db.SaveDatabase();
                if (result.NotNull()) result.GetError();
                return Json(Js.SuccessRedirect("Đã cập nhật chức năng", "/admin/apps/FeatureApps"));
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> FeatureAppsDelete(string id)
        {
            using (var db = new TDContext())
            {
                if (string.IsNullOrEmpty(id)) return Json(Js.SuccessRedirect("Đã cập nhật chức năng", "/admin/apps/FeatureApps"));
                var data = await db.FeatureApps.FindAsync(id);
                if (data != null)
                {
                    db.FeatureApps.Remove(data);
                    var str =await db.SaveDatabase();
                    if (str!=null) return Json(str.GetError());
                }
                return Json(Js.SuccessRedirect("Đã cập nhật chức năng", "/admin/products/FeatureApps"));
            }
        }
        #endregion

       
    }
}
