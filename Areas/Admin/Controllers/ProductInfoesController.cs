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
    public class AppInfoesController : Controller
    {
        private TDContext db = new TDContext();

        // GET: Admin/AppInfoes
        public async Task<ActionResult> Index()
        {
            return View(await db.AppInfoes.ToListAsync());
        }

        // GET: Admin/AppInfoes/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AppInfo productInfo = await db.AppInfoes.FindAsync(id);
            if (productInfo == null)
            {
                return HttpNotFound();
            }
            return View(productInfo);
        }

        // GET: Admin/AppInfoes/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/AppInfoes/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,Name,Comparable")] AppInfo productInfo)
        {
            if (ModelState.IsValid)
            {
                db.AppInfoes.Add(productInfo);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(productInfo);
        }

        // GET: Admin/AppInfoes/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AppInfo productInfo = await db.AppInfoes.FindAsync(id);
            if (productInfo == null)
            {
                return HttpNotFound();
            }
            return View(productInfo);
        }

        // POST: Admin/AppInfoes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,Name,Comparable")] AppInfo productInfo)
        {
            if (ModelState.IsValid)
            {
                db.Entry(productInfo).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(productInfo);
        }

        // GET: Admin/AppInfoes/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AppInfo productInfo = await db.AppInfoes.FindAsync(id);
            if (productInfo == null)
            {
                return HttpNotFound();
            }
            return View(productInfo);
        }

        // POST: Admin/AppInfoes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            AppInfo productInfo = await db.AppInfoes.FindAsync(id);
            db.AppInfoes.Remove(productInfo);
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
