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
    public class TaskTagsController : Controller
    {
        private TDContext db = new TDContext();

        // GET: Admin/TaskTags
        public async Task<ActionResult> Index()
        {
            var taskTags = db.TaskTags.Include(t => t.AppTask).Include(t => t.TagTask);
            return View(await taskTags.ToListAsync());
        }

        // GET: Admin/TaskTags/Details/5
        public async Task<ActionResult> Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TaskTag taskTag = await db.TaskTags.FindAsync(id);
            if (taskTag == null)
            {
                return HttpNotFound();
            }
            return View(taskTag);
        }

        // GET: Admin/TaskTags/Create
        public ActionResult Create()
        {
            ViewBag.AppTaskId = new SelectList(db.AppTasks, "Id", "Name");
            ViewBag.TagTaskId = new SelectList(db.TagTasks, "Id", "Name");
            return View();
        }

        // POST: Admin/TaskTags/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "AppTaskId,TagTaskId")] TaskTag taskTag)
        {
            if (ModelState.IsValid)
            {
                db.TaskTags.Add(taskTag);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            ViewBag.AppTaskId = new SelectList(db.AppTasks, "Id", "Name", taskTag.AppTaskId);
            ViewBag.TagTaskId = new SelectList(db.TagTasks, "Id", "Name", taskTag.TagTaskId);
            return View(taskTag);
        }

        // GET: Admin/TaskTags/Edit/5
        public async Task<ActionResult> Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TaskTag taskTag = await db.TaskTags.FindAsync(id);
            if (taskTag == null)
            {
                return HttpNotFound();
            }
            ViewBag.AppTaskId = new SelectList(db.AppTasks, "Id", "Name", taskTag.AppTaskId);
            ViewBag.TagTaskId = new SelectList(db.TagTasks, "Id", "Name", taskTag.TagTaskId);
            return View(taskTag);
        }

        // POST: Admin/TaskTags/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "AppTaskId,TagTaskId")] TaskTag taskTag)
        {
            if (ModelState.IsValid)
            {
                db.Entry(taskTag).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewBag.AppTaskId = new SelectList(db.AppTasks, "Id", "Name", taskTag.AppTaskId);
            ViewBag.TagTaskId = new SelectList(db.TagTasks, "Id", "Name", taskTag.TagTaskId);
            return View(taskTag);
        }

        // GET: Admin/TaskTags/Delete/5
        public async Task<ActionResult> Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TaskTag taskTag = await db.TaskTags.FindAsync(id);
            if (taskTag == null)
            {
                return HttpNotFound();
            }
            return View(taskTag);
        }

        // POST: Admin/TaskTags/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
            TaskTag taskTag = await db.TaskTags.FindAsync(id);
            db.TaskTags.Remove(taskTag);
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
