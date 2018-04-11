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

namespace TD.MobileShop.Areas.Admin.Controllers
{
    public class InfoAppsController : Controller
    {
        private TDContext db = new TDContext();

        // GET: Admin/InfoApps
        public async Task<ActionResult> Index()
        {
            var infoApps = db.InfoApps.Include(i => i.App).Include(i => i.AppInfo);
            return View(await infoApps.ToListAsync());
        }

        // GET: Admin/InfoApps/Details/5
        public async Task<ActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            InfoApp infoApp = await db.InfoApps.FindAsync(id);
            if (infoApp == null)
            {
                return HttpNotFound();
            }
            return View(infoApp);
        }

        // GET: Admin/InfoApps/Create
        public ActionResult Create()
        {
            ViewBag.AppId = new SelectList(db.Apps, "Id", "Name");
            ViewBag.AppInfoId = new SelectList(db.AppInfoes, "Id", "Name");
            return View();
        }

        // POST: Admin/InfoApps/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "AppId,AppInfoId,Value")] InfoApp infoApp)
        {
            if (ModelState.IsValid)
            {
                infoApp.AppId = Guid.NewGuid();
                db.InfoApps.Add(infoApp);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            ViewBag.AppId = new SelectList(db.Apps, "Id", "Name", infoApp.AppId);
            ViewBag.AppInfoId = new SelectList(db.AppInfoes, "Id", "Name", infoApp.AppInfoId);
            return View(infoApp);
        }

        // GET: Admin/InfoApps/Edit/5
        public async Task<ActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            InfoApp infoApp = await db.InfoApps.FindAsync(id);
            if (infoApp == null)
            {
                return HttpNotFound();
            }
            ViewBag.AppId = new SelectList(db.Apps, "Id", "Name", infoApp.AppId);
            ViewBag.AppInfoId = new SelectList(db.AppInfoes, "Id", "Name", infoApp.AppInfoId);
            return View(infoApp);
        }

        // POST: Admin/InfoApps/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "AppId,AppInfoId,Value")] InfoApp infoApp)
        {
            if (ModelState.IsValid)
            {
                db.Entry(infoApp).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewBag.AppId = new SelectList(db.Apps, "Id", "Name", infoApp.AppId);
            ViewBag.AppInfoId = new SelectList(db.AppInfoes, "Id", "Name", infoApp.AppInfoId);
            return View(infoApp);
        }

        // GET: Admin/InfoApps/Delete/5
        public async Task<ActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            InfoApp infoApp = await db.InfoApps.FindAsync(id);
            if (infoApp == null)
            {
                return HttpNotFound();
            }
            return View(infoApp);
        }

        // POST: Admin/InfoApps/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(Guid id)
        {
            InfoApp infoApp = await db.InfoApps.FindAsync(id);
            db.InfoApps.Remove(infoApp);
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
