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
using Microsoft.AspNet.Identity;

namespace TD.Areas.Admin.Controllers
{
    public class UserAppsController : Controller
    {
        private TDContext db = new TDContext();

        // GET: Admin/UserApps
        public ActionResult Index(string AppId, string ClientId)
        {
            var userApps = db.UserApps.Where(x => x.AppId == AppId && x.ClientId == ClientId);
            ViewBag.AppId = AppId;
            ViewBag.ClientId = ClientId;
            return PartialView(userApps);
        }

        // GET: Admin/UserApps/Create
        public async Task<ActionResult> Create(string AppId, string ClientId)
        {
            if (string.IsNullOrEmpty(AppId) || string.IsNullOrEmpty(ClientId)) return View();
            var app = await db.Apps.FindAsync(AppId);
            if (app == null) return View();
            var client = await db.Partners.FindAsync(ClientId);
            if (client == null) return View();

            ViewBag.AppId = AppId;
            ViewBag.AppName = app.Name;
            ViewBag.ClientName = client.Name;
            ViewBag.ClientId = ClientId;
            ViewBag.UserId = new SelectList(db.Users, "Id", "UserName");
            ViewBag.RoleId = new SelectList(db.AppRoles.Where(x => x.AppId == AppId && x.ClientId == ClientId), "Id", "Name");
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "UserId,ClientId,AppId,RoleId")] UserApp userApp)
        {
            var user = await new UserDB(db).FindOrCreate(userApp.UserId, User.Identity.GetUserId());
            if (user == null) return Json("Vui lòng chọn người dùng".GetError());
            var role = await new AppRoleDB(db).FindOrCreate(userApp.RoleId, userApp.AppId, userApp.ClientId);
            if (role == null) return Json("Vui lòng chọn quyền hạn".GetError());
            db.UserApps.Add(userApp);
            var str = await db.SaveMessageAsync();
            if (str!=null) return Json(str.GetError());
            return Json(Js.SuccessRedirect("Thêm mới người dùng thành công", "/admin/clientapps/edit?ClientId=" + userApp.ClientId + "&AppId=" + userApp.AppId));
        }

        // GET: Admin/UserApps/Edit/5
        public async Task<ActionResult> Edit(string id)
        {
            if (string.IsNullOrEmpty(id)) return View();

            UserApp userApp = await db.UserApps.FindAsync(id);

            if (userApp == null) return View();
            string UserId = userApp.UserId;
            string ClientId = userApp.ClientId;
            string AppId = userApp.AppId;
            ViewBag.RoleId = new SelectList(db.AppRoles.Where(x => x.AppId == AppId && x.ClientId == ClientId), "Id", "Name",userApp.RoleId);
            return View(userApp);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "RoleId,UserId,ClientId,AppId")] UserApp userApp)
        {

            var role = await new AppRoleDB(db).FindOrCreate(userApp.RoleId, userApp.AppId, userApp.ClientId);
            if (role == null) return Json("Vui lòng chọn quyền hạn".GetError());
            userApp.RoleId = role.Id;
            db.Entry(userApp).State = EntityState.Modified;
            var str = await db.SaveMessageAsync();
            if (str!=null) return Json(str.GetError());
            return Json(Js.SuccessRedirect("Thêm mới người dùng thành công", "/admin/clientapps/edit?ClientId=" + userApp.ClientId + "&AppId=" + userApp.AppId));
        }

        // GET: Admin/UserApps/Delete/5
        public async Task<ActionResult> Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserApp userApp = await db.UserApps.FindAsync(id);
            if (userApp == null)
            {
                return HttpNotFound();
            }
            return View(userApp);
        }

        // POST: Admin/UserApps/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
            UserApp userApp = await db.UserApps.FindAsync(id);
            db.UserApps.Remove(userApp);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
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
