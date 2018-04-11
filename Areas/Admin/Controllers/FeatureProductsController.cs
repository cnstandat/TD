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
    public class FeatureAppsController : Controller
    {
        private TDContext db = new TDContext();

        // GET: Admin/FeatureApps
        public async Task<ActionResult> Index()
        {
            return View(await db.FeatureApps.ToListAsync());
        }

        // GET: Admin/FeatureApps/Details/5
        public async Task<ActionResult> Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            FeatureApp featureApp = await db.FeatureApps.FindAsync(id);
            if (featureApp == null)
            {
                return HttpNotFound();
            }
            return View(featureApp);
        }

        // GET: Admin/FeatureApps/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/FeatureApps/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,Name,ValueType")] FeatureApp featureApp)
        {
            if (ModelState.IsValid)
            {
                db.FeatureApps.Add(featureApp);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(featureApp);
        }

        // GET: Admin/FeatureApps/Edit/5
        public async Task<ActionResult> Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            FeatureApp featureApp = await db.FeatureApps.FindAsync(id);
            if (featureApp == null)
            {
                return HttpNotFound();
            }
            return View(featureApp);
        }

        // POST: Admin/FeatureApps/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,Name,ValueType")] FeatureApp featureApp)
        {
            if (ModelState.IsValid)
            {
                db.Entry(featureApp).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(featureApp);
        }

        // GET: Admin/FeatureApps/Delete/5
        public async Task<ActionResult> Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            FeatureApp featureApp = await db.FeatureApps.FindAsync(id);
            if (featureApp == null)
            {
                return HttpNotFound();
            }
            return View(featureApp);
        }

        // POST: Admin/FeatureApps/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
            FeatureApp featureApp = await db.FeatureApps.FindAsync(id);
            db.FeatureApps.Remove(featureApp);
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
