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
using Microsoft.AspNet.Identity;

namespace TD.Areas.Admin.Controllers
{
    public class AppTasksController : Controller
    {
        private TDContext db = new TDContext();

        // GET: Admin/AppTasks
        public ActionResult Index()
        {
            return View(db.AppTasks.Where(x => !x.Complete));
        }
        public ActionResult Create()
        {
            ViewBag.AcceptId = new SelectList(db.Users, "Id", "UserName");
            ViewBag.ParentId = new SelectList(db.AppTasks, "Id", "Name");
            ViewBag.TagTaskId = new SelectList(db.TagTasks, "Id", "Name");
            //ViewBag.LevelId = typeof(TaskLevel).GetSelectList();
            return PartialView();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Name,Note,MaxStep,ParentId,AcceptId,Level")] AppTask appTask, string[] TagTaskId)
        {
            var helper = new DBHelper();
            appTask.Id = helper.GetAppCategoryId(db);
            if (TagTaskId != null)
            {
                foreach (var item in TagTaskId)
                {
                    var tag = await db.TagTasks.FindAsync(item);
                    if (tag == null)
                    {
                        tag = await db.TagTasks.SingleOrDefaultAsync(x => x.Name == item);
                        if (tag == null)
                        {
                            db.TagTasks.Add(new TagTask
                            {
                                Id = helper.GetTagTaskId(db),
                                Name = item,
                            });
                            await db.SaveAsync();
                        }
                    }
                    if (tag != null)
                    {
                        db.TaskTags.Add(new TaskTag
                        {
                            AppTask = appTask,
                            TagTask = tag,
                        });
                    }
                }
            }
            appTask.Created = DateTime.UtcNow;
            appTask.UserId = User.Identity.GetUserId();
            db.AppTasks.Add(appTask);
            var str = await db.SaveMessageAsync();
            if (str != null) return Json(str.GetError());
            return Json(LanguageDB.AppTaskAdded, "/admin/apptasks/edit/" + appTask.Id);
        }

        // GET: Admin/AppTasks/Edit/5
        public async Task<ActionResult> Edit(string id)
        {
            if (id == null) return View();
            AppTask appTask = await db.AppTasks.FindAsync(id);
            if (appTask == null) return View();
            ViewBag.AcceptId = new SelectList(db.Users, "Id", "UserName", appTask.AcceptId);
            ViewBag.ParentId = new SelectList(db.AppTasks, "Id", "Name", appTask.ParentId);

            ViewBag.TagTaskId = new MultiSelectList(db.TagTasks, "Id", "Name", appTask.TaskTags.Select(x => x.TagTaskId));
            return PartialView(appTask);
        }

        // POST: Admin/AppTasks/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,Name,Note,CurrentStep,ParentId,AcceptId,Created,Expired,Level,Complete")] AppTask appTask)
        {
            var data = await db.AppTasks.FindAsync(appTask.Id);
            if (data == null) return Json(LanguageDB.NotFound.GetError());
            data.Name = appTask.Name;
            data.Note = appTask.Note;
            data.CurrentStep = appTask.CurrentStep;
            data.ParentId = appTask.ParentId;
            data.AcceptId = appTask.AcceptId;
            data.Expired = appTask.Expired;
            data.Level = appTask.Level;
            data.Complete = appTask.Complete;
            db.Entry(appTask).State = EntityState.Modified;

            var str = await db.SaveMessageAsync();
            if (str != null) Json(str.GetError());
            return Json(Js.SuccessRedirect(LanguageDB.AppTaskChanged, "/admin/apptasks"));

        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Delete(string id)
        {
            if (id == null) return Json(LanguageDB.NotFound.GetError());
            AppTask appTask = await db.AppTasks.FindAsync(id);
            db.AppTasks.Remove(appTask);
            var str = await db.SaveMessageAsync();
            if (str != null) return Json(str.GetError());
            return Json(Js.SuccessRedirect(LanguageDB.AppTaskRemoved, "/admin/apptasks"));
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
