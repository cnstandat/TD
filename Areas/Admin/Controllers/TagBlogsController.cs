using System;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using TD.Models;

namespace TD.Areas.Admin.Controllers
{
    [Authorize(Roles = "SysAdmin,Admin,BlogManager")]
    public class TagBlogsController : Controller
    {
        private TDContext db = new TDContext();

        // GET: Admin/TagBlogs
        public ActionResult Index(string Sort, string Search)
        {
            ViewBag.Sort = string.IsNullOrEmpty(Sort) ? null : Sort;
            ViewBag.Search = Search;
            IQueryable<TagBlog> models = db.TagBlogs;
            if (Search != null)
            {
                models = models
                    //.Include(x => x.BlogTags.Count)
                    .Where(s => s.Name.Contains(Search) || s.FullName.Contains(Search));
            }
            if (!string.IsNullOrEmpty(Sort))
                models = models.OrderByDescending(s => s.Name);
            else models = models.OrderBy(s => s.Name);
            return View(models);
        }

        public ActionResult Create()
        {
            return View();
        }
        public ActionResult _Create()
        {
            return PartialView();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,FullName")] TagBlog tag)
        {
            if (db.TagBlogs.Any(x => x.FullName == tag.FullName))
            {
                return Json(Js.Error(TD.Global.TagBlogUsed)); ;
            }
            tag.Id = new DBHelper().GetTagBlogId(db);
            tag.Name = tag.FullName.GetSafeName();
            db.TagBlogs.Add(tag);
            var str = await db.SaveMessageAsync();
            if (str != null) return Json(Js.Error(str));
            return Json(Js.SuccessRedirect(TD.Global.TagBlogInserted, "/admin/tagblogs")); ;
        }

        // GET: Admin/TagBlogs/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null) return View();

            return View(db.TagBlogs.Find(id));
        }
        public ActionResult _Edit(string id)
        {
            if (id == null) return View();

            return PartialView(db.TagBlogs.Find(id));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,FullName")] TagBlog tag)
        {
            if (await db.TagBlogs.AnyAsync(x => x.Id != tag.Id && x.FullName == tag.FullName))
                return Json(Js.Error(Global.TagBlogUsed)); ;
            tag.Name = tag.FullName.GetSafeName();
            db.Entry(tag).State = EntityState.Modified;
            var str = await db.SaveMessageAsync();
            if (str != null) return Json(str.GetError());
            return Json(Js.SuccessRedirect(TD.Global.TagBlogChanged, "/admin/tagblogs")); ;
        }



        // POST: Admin/TagBlogs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
            if (string.IsNullOrEmpty(id)) return Json(Js.Error(Global.NoData));
            TagBlog tag = await db.TagBlogs.FindAsync(id);
            if (tag == null) return Json(Js.Error(Global.NoData));
            db.TagBlogs.Remove(tag);
            var str = await db.SaveMessageAsync();
            if (str!=null) return Json(str.GetError());
            return Json(Js.SuccessRedirect(TD.Global.TagBlogRemove, "/admin/tagblogs")); ;
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
