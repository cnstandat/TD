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



        #region Partner Apps
        public ActionResult GetUserUsingApps(string AppId,string ClientId) //AppId
        {
            if (string.IsNullOrEmpty(AppId)||string.IsNullOrEmpty(ClientId)) return PartialView();
            var app = db.Apps.Find(AppId);
            if (app == null)
                return PartialView();
            var client = db.Partners.Find(ClientId);
            if (client == null) return PartialView();
            var all = db.UserApps.Include(X => X.Client).Where(x => x.AppId == AppId && x.ClientId==ClientId);
           
            ViewBag.AppId = AppId;
            ViewBag.AppName = app.Name;
            ViewBag.ClientId = ClientId;
            ViewBag.ClientName = client.Name;
            return PartialView(all);
        }
        public ActionResult RegisterUserUsingApp(string AppId,string ClientId) //App Id
        {
            if (string.IsNullOrEmpty(AppId)) return View();
            var app = db.Apps.Find(AppId);
            if (app == null)
                return View();
            var model = new ClientAppEditModel
            {
                AppId = AppId,
                AppName = app.Name,
                Start = DateTime.Now,
                Partners = new PartnerDB(db).GetSelectList(),
                LicenseTypes = typeof(LicenseType).GetSelectList()
            };
            return View(model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> RegisterUserUsingApp(ClientAppEditModel model)
        {
            if (!ModelState.IsValid) return Json(this.GetModelStateError().GetError());
            var client = await new PartnerDB(db).FindOrAdd(model.ClientId);
            if (client == null) return Json("Vui lòng chọn khách hàng".GetError());
            var data = await db.ClientApps.FindAsync(client.Id, model.AppId);
            if (data != null) return Json("Khách hàng đã sử dụng ứng dụng".GetError());
            data = new ClientApp(client.Id, model.AppId);
            data.LastModify = DateTime.Now;
            data.Start = model.Start;
            if (model.Expires != null)
                data.Expires = model.Expires.Value;
            data.LicenseType = model.LicenseType.ToEnum<LicenseType>();
            db.ClientApps.Add(data);
            var str = await db.SaveDatabase();
            if (str!=null) return Json(str.GetError());
            return Json(Js.SuccessRedirect(TD.Global.PartnerAppAdded, TD.Properties.Resources.AdminAppEditLink+model.AppId));
        }

        public ActionResult ChangeUserAppSetting(string AppId, string PartnerId)
        {
            if (string.IsNullOrEmpty(AppId) || string.IsNullOrEmpty(PartnerId)) return View();
            var app = db.ClientApps.Find(PartnerId, AppId);
            if (app == null) return View();
            var model = new ClientAppEditModel
            {
                AppId = AppId,
                ClientName = app.Client.Name,
                AppName = app.App.Name,
                ClientId = PartnerId,
                Start = app.Start,
                Expires = app.Expires,
                LicenseTypes = typeof(LicenseType).GetSelectList(),
                LicenseType = ((int)app.LicenseType).ToString()
            };
            return View(model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ChangeUserAppSetting(ClientAppEditModel model)
        {
            var data = await db.ClientApps.FindAsync(model.ClientId, model.AppId);
            if (data == null) return Json(TD.Global.PartnerAppNotFound.GetError());
            data.LastModify = DateTime.Now;
            data.Start = model.Start;
            if (model.Expires != null)
                data.Expires = model.Expires.Value;
            if (model.LicenseType != null)
                data.LicenseType = model.LicenseType.ToEnum<LicenseType>();
            db.Entry(data).State = EntityState.Modified;
            var str = await db.SaveDatabase();
            if (str!=null) return Json(str.GetError());
            return Json(Js.SuccessRedirect(TD.Global.PartnerAppChanged, TD.Properties.Resources.AdminAppEditLink + model.AppId));

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> RemoveUserApp(string AppId, string PartnerId,string UserId)
        {
            if (string.IsNullOrEmpty(AppId) || string.IsNullOrEmpty(PartnerId)) return Json(this.GetNoData());
            var data = await db.ClientApps.FindAsync(PartnerId, AppId);
            if (data == null) return Json(TD.Global.PartnerAppNotFound.GetError());
            db.ClientApps.Remove(data);
            var str = await db.SaveDatabase();
            if (str!=null) return Json(str.GetError());
            return Json(Js.SuccessRedirect(TD.Global.PartnerAppChanged, TD.Properties.Resources.AdminAppEditLink + AppId));

        }

        #endregion


    }
}
