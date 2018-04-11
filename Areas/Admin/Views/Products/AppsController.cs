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
    public class AppsController : Controller
    {
        private TDContext db = new TDContext();

        // GET: Admin/Apps
        public ActionResult Index()
        {

            var lst = new List<AppView>();
            foreach (var app in db.Apps)
            {
                lst.Add(new AppView(app));
            }
            return View(lst);
        }

        // GET: Admin/Apps/Details/5
        public async Task<ActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            App app = await db.Apps.FindAsync(id);
            if (app == null)
            {
                return HttpNotFound();
            }
            return View(app);
        }

        // GET: Admin/Apps/Create
        public ActionResult Create()
        {
            var model = new AppView();
            return View(model);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<string> Create(AppView model)
        {
            var app = new App(model);
            app.UserId = User.Identity.GetUserId();
            db.Apps.Add(app);
            await db.SaveChangesAsync();
            return IdentityReturn.GetStringSuccessAndRedirect("Tạo mới ứng dụng thành công", "/admin/apps");
        }


        public async Task<ActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            App app = await db.Apps.FindAsync(id);
            if (app == null)
            {
                return HttpNotFound();
            }

            return View(new AppView(app));
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<string> Edit(AppView data)
        {
            var app = db.Apps.Find(data.Id);
            app.LastModify = DateTime.Now;
            app.UserId = User.Identity.GetUserId();
            app.Name = data.Name;
            db.Entry(app).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return IdentityReturn.GetStringSuccessAndRedirect("Cập nhật thông tin ứng dụng thành công", "/admin/apps");
        }
        public ActionResult GetPartnerApps(Guid? Id)
        {
            if (Id == null) return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            var partnerApps = db.PartnerApps.Include(X => X.Partner).Where(x => x.AppId == Id.Value);
            App app = db.Apps.Find(Id.Value);
            if (app == null)
            {
                return HttpNotFound();
            }
            var model = new PartnerAppViews();
            model.AppId = app.Id;
            model.AppName = app.Name;
            model.list = new List<PartnerAppView>();
            foreach (var item in partnerApps)
            {
                model.list.Add(new PartnerAppView
                {
                    AppId = item.AppId,
                    PartnerId = item.PartnerId,
                    PartnerName = item.Partner.Name,
                    Start = item.Start,
                    Expires = item.Expires
                });
            }
            return PartialView(model);
        }
        public ActionResult CreatePartnerApp(Guid AppId)
        {
            var app = db.Apps.Find(AppId);
            if (app == null)
                return HttpNotFound();
            var model = new PartnerAppView
            {
                AppId = AppId,
                AppName = app.Name,
                Start = DateTime.Now,
                LicenseType = LicenseType.Demo,
                AllPartner=GetAllPartner()
            };
            return PartialView(model);
        }
        IEnumerable<SelectListItem> GetAllPartner()
        {
            return db.Partners.Select(x => new SelectListItem
            {
                Value = x.Id.ToString(),
                Text = x.Name
            });
        }
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(Guid id)
        {
            App app = await db.Apps.FindAsync(id);
            db.Apps.Remove(app);
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
