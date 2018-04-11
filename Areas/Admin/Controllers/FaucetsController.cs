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
    public class FaucetsController : Controller
    {
        private TDContext db = new TDContext();

        // GET: Admin/Faucets
        public async Task<ActionResult> Index()
        {
            return View(await db.Faucets.ToListAsync());
        }

        // GET: Admin/Faucets/Details/5
        public async Task<ActionResult> Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Faucet faucet = await db.Faucets.FindAsync(id);
            if (faucet == null)
            {
                return HttpNotFound();
            }
            return View(faucet);
        }

        // GET: Admin/Faucets/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/Faucets/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,Name,Address,Image,Time,Min,Max,FaucetType,CaptchaType,Resolve")] Faucet faucet)
        {
            if (ModelState.IsValid)
            {
                db.Faucets.Add(faucet);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(faucet);
        }

        // GET: Admin/Faucets/Edit/5
        public async Task<ActionResult> Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Faucet faucet = await db.Faucets.FindAsync(id);
            if (faucet == null)
            {
                return HttpNotFound();
            }
            return View(faucet);
        }

        // POST: Admin/Faucets/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,Name,Address,Image,Time,Min,Max,FaucetType,CaptchaType,Resolve")] Faucet faucet)
        {
            if (ModelState.IsValid)
            {
                db.Entry(faucet).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(faucet);
        }

        // GET: Admin/Faucets/Delete/5
        public async Task<ActionResult> Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Faucet faucet = await db.Faucets.FindAsync(id);
            if (faucet == null)
            {
                return HttpNotFound();
            }
            return View(faucet);
        }

        // POST: Admin/Faucets/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
            Faucet faucet = await db.Faucets.FindAsync(id);
            db.Faucets.Remove(faucet);
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
