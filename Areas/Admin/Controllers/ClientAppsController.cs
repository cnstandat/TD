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

namespace TD.Areas.Admin.Controllers
{
    public class ClientAppsController : Controller
    {
        private TDContext db = new TDContext();

        // GET: Admin/ClientApps
        public ActionResult Index(string id)
        {
            if (string.IsNullOrEmpty(id)) return PartialView();
            var partnerApps = db.ClientApps.Include(X => X.Client).Where(x => x.AppId == id);
            App app = db.Apps.Find(id);
            if (app == null)
                return PartialView();
            ViewBag.AppId = app.Id;
            ViewBag.AppName = app.Name;
            return PartialView(partnerApps);
        }

       

        // GET: Admin/ClientApps/Create
        public ActionResult Create(string id)
        {
            if (string.IsNullOrEmpty(id)) return View();
            var app = db.Apps.Find(id);
            if (app == null)
                return View();
            var model = new ClientAppEditModel
            {
                AppId = id,
                AppName = app.Name,
                Start = DateTime.Now,
                Partners = new PartnerDB(db).GetSelectList(),
                LicenseTypes = typeof(LicenseType).GetSelectList()
            };
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(ClientAppEditModel model)
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
            var str = await db.SaveMessageAsync();
            if (str!=null) return Json(str.GetError());
            return Json(Js.SuccessRedirect(LanguageDB.ClientAppAdded,"/admin/products/edit/" + model.AppId));
        }

        public ActionResult Edit(string AppId, string ClientId)
        {
            if (string.IsNullOrEmpty(AppId) || string.IsNullOrEmpty(ClientId)) return View();
            var app = db.ClientApps.Find(ClientId, AppId);
            if (app == null) return View();
            var model = new ClientAppEditModel
            {
                AppId = AppId,
                ClientName = app.Client.Name,
                AppName = app.App.Name,
                ClientId = ClientId,
                Start = app.Start,
                Expires = app.Expires,
                LicenseTypes = typeof(LicenseType).GetSelectList(),
                LicenseType = ((int)app.LicenseType).ToString()
            };
            return View(model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(ClientAppEditModel model)
        {
            var data = await db.ClientApps.FindAsync(model.ClientId, model.AppId);
            if (data == null) return Json(LanguageDB.NotFound.GetError());
            data.LastModify = DateTime.Now;
            data.Start = model.Start;
            if (model.Expires != null)
                data.Expires = model.Expires.Value;
            if (model.LicenseType != null)
                data.LicenseType = model.LicenseType.ToEnum<LicenseType>();
            db.Entry(data).State = EntityState.Modified;
            var str = await db.SaveMessageAsync();
            if (str!=null) return Json(str.GetError());
            return Json(Js.SuccessRedirect(LanguageDB.ClientAppChanged, "/admin/products/edit/" + model.AppId));

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Delete(string AppId, string ClientId)
        {
            if (string.IsNullOrEmpty(AppId) || string.IsNullOrEmpty(ClientId)) return Json(this.GetNoData());
            var data = await db.ClientApps.FindAsync(ClientId, AppId);
            if (data == null) return Json(LanguageDB.NotFound.GetError());
            db.ClientApps.Remove(data);
            var str = await db.SaveMessageAsync();
            if (str!=null) return Json(str.GetError());
            return Json(Js.SuccessRedirect(LanguageDB.ClientAppRemoved, "/admin/products/edit/" + AppId));

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
