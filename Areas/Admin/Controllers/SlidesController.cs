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
    public class GallerysController : Controller
    {
        private TDContext db = new TDContext();

        // GET: Admin/Gallerys
        public async Task<ActionResult> Index()
        {
            var slides = db.Galleries.Include(s => s.App);
            return View(await slides.ToListAsync());
        }

        // GET: Admin/Gallerys/Details/5
        public async Task<ActionResult> Details(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Gallery slide = await db.Galleries.FindAsync(id);
            if (slide == null)
            {
                return HttpNotFound();
            }
            return View(slide);
        }

        // GET: Admin/Gallerys/Create
        public ActionResult Create()
        {
            ViewBag.AppId = new SelectList(db.Apps, "Id", "Name");
            return View();
        }

        // POST: Admin/Gallerys/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,Name,Subtitle,ButtonText,Link,AppId")] Gallery slide)
        {
            if (ModelState.IsValid)
            {
                db.Galleries.Add(slide);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            ViewBag.AppId = new SelectList(db.Apps, "Id", "Name", slide.AppId);
            return View(slide);
        }
        public ActionResult AppGallery(string AppId)
        {
            var product = db.Apps.Find(AppId);
            if (product != null)
            {
                if (product.Galleries.Count == 0)
                {
                    product.Galleries.Add(new Gallery
                    {
                        AppId = AppId,
                        Name = "Gallery Of App " + product.Name,
                        Subtitle = product.Id.ToString(),
                        ButtonText = "ButtonText"
                    });
                    db.SaveChanges();
                }
                var slide = product.Galleries.FirstOrDefault();
                if (slide != null)
                {
                    return View("Edit", slide.Id);
                }
            }
            return View();
        }

        // GET: Admin/Gallerys/Edit/5
        public async Task<ActionResult> Edit(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Gallery slide = await db.Galleries.FindAsync(id);
            if (slide == null)
            {
                return HttpNotFound();
            }
            ViewBag.AppId = new SelectList(db.Apps, "Id", "Name", slide.AppId);
            return View(slide);
        }

        // POST: Admin/Gallerys/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,Name,Subtitle,ButtonText,Link,AppId")] Gallery slide)
        {
            if (ModelState.IsValid)
            {
                db.Entry(slide).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewBag.AppId = new SelectList(db.Apps, "Id", "Name", slide.AppId);
            return View(slide);
        }

        // GET: Admin/Gallerys/Delete/5
        public async Task<ActionResult> Delete(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Gallery slide = await db.Galleries.FindAsync(id);
            if (slide == null)
            {
                return HttpNotFound();
            }
            return View(slide);
        }

        // POST: Admin/Gallerys/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(Guid id)
        {
            Gallery slide = await db.Galleries.FindAsync(id);
            db.Galleries.Remove(slide);
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
