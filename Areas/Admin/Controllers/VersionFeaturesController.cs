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

namespace TD.Areas.Admin.Controllers
{
    public class VersionFeaturesController : Controller
    {
        private TDContext db = new TDContext();

        // GET: Admin/VersionFeatures
        public async Task<ActionResult> Index()
        {
            var versionFeatureApps = db.VersionFeatureApps.Include(v => v.FeatureApp).Include(v => v.App);
            return View(await versionFeatureApps.ToListAsync());
        }

        // GET: Admin/VersionFeatures/Details/5
        public async Task<ActionResult> Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VersionFeature versionFeature = await db.VersionFeatureApps.FindAsync(id);
            if (versionFeature == null)
            {
                return HttpNotFound();
            }
            return View(versionFeature);
        }

        // GET: Admin/VersionFeatures/Create
        public ActionResult Create()
        {
            ViewBag.FeatureAppId = new SelectList(db.FeatureApps, "Id", "Name");
            ViewBag.AppId = new SelectList(db.Apps, "Id", "Database");
            return View();
        }

        // POST: Admin/VersionFeatures/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "AppId,Version,FeatureAppId,Content")] VersionFeature versionFeature)
        {
            if (ModelState.IsValid)
            {
                db.VersionFeatureApps.Add(versionFeature);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            ViewBag.FeatureAppId = new SelectList(db.FeatureApps, "Id", "Name", versionFeature.FeatureAppId);
            ViewBag.AppId = new SelectList(db.Apps, "Id", "Database", versionFeature.AppId);
            return View(versionFeature);
        }

        // GET: Admin/VersionFeatures/Edit/5
        public async Task<ActionResult> Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VersionFeature versionFeature = await db.VersionFeatureApps.FindAsync(id);
            if (versionFeature == null)
            {
                return HttpNotFound();
            }
            ViewBag.FeatureAppId = new SelectList(db.FeatureApps, "Id", "Name", versionFeature.FeatureAppId);
            ViewBag.AppId = new SelectList(db.Apps, "Id", "Database", versionFeature.AppId);
            return View(versionFeature);
        }

        // POST: Admin/VersionFeatures/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "AppId,Version,FeatureAppId,Content")] VersionFeature versionFeature)
        {
            if (ModelState.IsValid)
            {
                db.Entry(versionFeature).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewBag.FeatureAppId = new SelectList(db.FeatureApps, "Id", "Name", versionFeature.FeatureAppId);
            ViewBag.AppId = new SelectList(db.Apps, "Id", "Database", versionFeature.AppId);
            return View(versionFeature);
        }

        // GET: Admin/VersionFeatures/Delete/5
        public async Task<ActionResult> Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            VersionFeature versionFeature = await db.VersionFeatureApps.FindAsync(id);
            if (versionFeature == null)
            {
                return HttpNotFound();
            }
            return View(versionFeature);
        }

        // POST: Admin/VersionFeatures/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
            VersionFeature versionFeature = await db.VersionFeatureApps.FindAsync(id);
            db.VersionFeatureApps.Remove(versionFeature);
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
