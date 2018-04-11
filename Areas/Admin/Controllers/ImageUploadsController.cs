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
    [Authorize(Roles = "SysAdmin,Admin")]
    public class ImageUploadsController : Controller
    {
        private TDContext db = new TDContext();

        // GET: Admin/ImageUploads
        public async Task<ActionResult> Index()
        {
            var ImageUploads = db.ImageUploads.Include(s => s.Slide).Include(s => s.User);
            return View(await ImageUploads.ToListAsync());
        }

        // GET: Admin/ImageUploads/Details/5
        public async Task<ActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ImageUpload ImageUpload = await db.ImageUploads.FindAsync(id);
            if (ImageUpload == null)
            {
                return HttpNotFound();
            }
            return View(ImageUpload);
        }

        // GET: Admin/ImageUploads/Create
        public ActionResult Create(Guid Id)
        {
            var data = new AppSlideView
            {
                SlideId = Id
            };


            return View(data);
        }

     
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(AppSlideView data)
        {
            if (ModelState.IsValid)
            {
                var user = db.Users.SingleOrDefault(x => x.UserName == User.Identity.Name);
                var ImageUpload = new ImageUpload
                {
                    UserId = user.Id,
                    SlideId = data.SlideId
                };
                db.ImageUploads.Add(ImageUpload);
                db.SaveChanges();
                string FileName = string.Format("slide_{0:000000}_{1}.jpg", ImageUpload.Id);
                var filepath = Server.MapPath("~/data/img/slides/{0}" + FileName);
                filepath.WriteImageString(data.Data);
                //await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(data);
        }

        // GET: Admin/ImageUploads/Edit/5
        public async Task<ActionResult> Edit(int id)
        {

            ImageUpload ImageUpload = await db.ImageUploads.FindAsync(id);
            if (ImageUpload == null)
            {
                return HttpNotFound();
            }
            ViewBag.SlideId = new SelectList(db.Slides, "Id", "Name", ImageUpload.SlideId);
            ViewBag.UserId = new SelectList(db.Users, "Id", "ConnectionId", ImageUpload.UserId);
            return View(ImageUpload);
        }

        // POST: Admin/ImageUploads/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,FileName,UserId,SlideId")] ImageUpload ImageUpload)
        {
            if (ModelState.IsValid)
            {
                db.Entry(ImageUpload).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewBag.SlideId = new SelectList(db.Slides, "Id", "Name", ImageUpload.SlideId);
            ViewBag.UserId = new SelectList(db.Users, "Id", "ConnectionId", ImageUpload.UserId);
            return View(ImageUpload);
        }

        // GET: Admin/ImageUploads/Delete/5
        public async Task<ActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ImageUpload ImageUpload = await db.ImageUploads.FindAsync(id);
            if (ImageUpload == null)
            {
                return HttpNotFound();
            }
            return View(ImageUpload);
        }

        // POST: Admin/ImageUploads/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(Guid id)
        {
            ImageUpload ImageUpload = await db.ImageUploads.FindAsync(id);
            db.ImageUploads.Remove(ImageUpload);
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
