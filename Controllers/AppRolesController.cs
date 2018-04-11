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

namespace TD.Controllers
{
    public class AppRolesController : Controller
    {
        private TDContext db = new TDContext();

        // GET: AppRoles
        public async Task<ActionResult> Index()
        {
            var appRoles = db.AppRoles.Include(a => a.App).Include(a => a.Client);
            return View(await appRoles.ToListAsync());
        }

        // GET: AppRoles/Details/5
        public async Task<ActionResult> Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AppRole appRole = await db.AppRoles.FindAsync(id);
            if (appRole == null)
            {
                return HttpNotFound();
            }
            return View(appRole);
        }

        // GET: AppRoles/Create
        public ActionResult Create()
        {
            ViewBag.AppId = new SelectList(db.Apps, "Id", "Database");
            ViewBag.ClientId = new SelectList(db.Partners, "Id", "Name");
            return View();
        }

        // POST: AppRoles/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,Name,ClientId,AppId")] AppRole appRole)
        {
            if (ModelState.IsValid)
            {
                db.AppRoles.Add(appRole);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            ViewBag.AppId = new SelectList(db.Apps, "Id", "Database", appRole.AppId);
            ViewBag.ClientId = new SelectList(db.Partners, "Id", "Name", appRole.ClientId);
            return View(appRole);
        }

        // GET: AppRoles/Edit/5
        public async Task<ActionResult> Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AppRole appRole = await db.AppRoles.FindAsync(id);
            if (appRole == null)
            {
                return HttpNotFound();
            }
            ViewBag.AppId = new SelectList(db.Apps, "Id", "Database", appRole.AppId);
            ViewBag.ClientId = new SelectList(db.Partners, "Id", "Name", appRole.ClientId);
            return View(appRole);
        }

        // POST: AppRoles/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,Name,ClientId,AppId")] AppRole appRole)
        {
            if (ModelState.IsValid)
            {
                db.Entry(appRole).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewBag.AppId = new SelectList(db.Apps, "Id", "Database", appRole.AppId);
            ViewBag.ClientId = new SelectList(db.Partners, "Id", "Name", appRole.ClientId);
            return View(appRole);
        }

        // GET: AppRoles/Delete/5
        public async Task<ActionResult> Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AppRole appRole = await db.AppRoles.FindAsync(id);
            if (appRole == null)
            {
                return HttpNotFound();
            }
            return View(appRole);
        }

        // POST: AppRoles/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
            AppRole appRole = await db.AppRoles.FindAsync(id);
            db.AppRoles.Remove(appRole);
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
