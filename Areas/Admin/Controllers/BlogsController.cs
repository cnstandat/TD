using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using TD.Models;
using TD.Models.Views;
namespace TD.Areas.Admin.Controllers
{
    [Authorize(Roles = "SysAdmin,Admin,BlogManager")]

    public class BlogsController : Controller
    {
        private TDContext db = new TDContext();
        public BlogsController() { }
        public ActionResult Index(string SortByName, string SortByDate, string Search, int? Page, int? First)
        {
            IQueryable<Blog> lst = GetBlogs(SortByName, SortByDate, Search, Page, First);
            if (Page == null || Page.Value == 1)
                return View(lst);
            else return PartialView("GetMore", lst);
        }

        private IQueryable<Blog> GetBlogs(string SortByName, string SortByDate, string currentFilter, int? page, int? First)
        {
            var models = db.Blogs.Include(X => X.Comments);

            if (!String.IsNullOrEmpty(currentFilter))
                models = models.Where(s => s.Name.Contains(currentFilter) || s.FullName.Contains(currentFilter));

            if (First == null)
            {
                if (!string.IsNullOrEmpty(SortByName))
                {
                    if (!string.IsNullOrEmpty(SortByDate))
                        models = models.OrderByDescending(x => x.FullName).ThenByDescending(x => x.LastModify);
                    else models = models.OrderByDescending(x => x.FullName).ThenBy(x => x.LastModify);
                }

                else
                {
                    if (!string.IsNullOrEmpty(SortByDate))
                        models = models.OrderBy(x => x.FullName).ThenByDescending(x => x.LastModify);
                    else models = models.OrderBy(x => x.FullName).ThenBy(x => x.LastModify);
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(SortByName))
                {
                    if (!string.IsNullOrEmpty(SortByDate))
                        models = models.OrderByDescending(x => x.LastModify).ThenByDescending(x => x.FullName);
                    else models = models.OrderBy(x => x.LastModify).ThenByDescending(x => x.FullName);
                }

                else
                {
                    if (!string.IsNullOrEmpty(SortByDate))
                        models = models.OrderByDescending(x => x.LastModify).ThenBy(x => x.FullName);
                    else models = models.OrderBy(x => x.LastModify).ThenBy(x => x.FullName);
                }
            }





            int pageNumber = (page ?? 1);
            ViewBag.Page = pageNumber + 1;
            ViewBag.SortByName = SortByName;
            ViewBag.SortByDate = SortByDate;
            ViewBag.Search = currentFilter;
            ViewBag.HasMore = models.Count() > pageNumber * CData.AppConfig.DefaultPageSize;
            ViewBag.First = First;
            var lst = models.Skip((pageNumber - 1) * CData.AppConfig.DefaultPageSize).Take(CData.AppConfig.DefaultPageSize);
            return lst;
        }


        public ActionResult Create(string AppId)
        {
            var model = new BlogEditModel
            {
                AppId = AppId
            };
            if (AppId != null)
            {
                var app = db.Apps.Find(AppId);
                if (app == null) return View();
                model.AppName = app.Name;
            }
            if (AppId != null)
            {
                var product = db.Apps.Find(AppId);
                if (product == null) View();
                model.AppName = product.Name;
            }
            ViewBag.TagBlogId = new SelectList(db.TagBlogs, "Id", "Name");
            ViewBag.ParentId = new SelectList(db.Blogs, "Id", "Name");
            return View(model);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(BlogEditModel model)
        {
            if (!ModelState.IsValid) return Json(this.GetModelStateError().GetError());
            var db = new TDContext();
            var UserId = User.Identity.GetUserId();
            if (db.Blogs.Any(x => x.FullName == model.FullName))
                return Json(Js.Error(Global.BlogNameUsed));

            var lstSelect = await new TagBlogDB(db).FindOrCreate(model.TagBlogId);
            model.Content = await model.Content.GetValidHtml();
            model.Summary = await model.Content.GetSummary();
            model.LongSummary = await model.Content.GetSummary(500);
            model.Name = model.FullName.GetSafeName();
            model.Id = new DBHelper().GetBlogId(db);
            model.UserId = UserId;

            var blog = new Blog(model);
            if (model.ParentId != null)
            {
                var parent = await db.Blogs.FindAsync(model.ParentId);
                if (parent != null)
                {
                    blog.ParentId = parent.Id;
                    foreach (var item in parent.BlogTags.Select(x => x.TagBlogId))
                    {
                        if (!lstSelect.Contains(item)) lstSelect.Add(item);
                    }
                }
            }


            foreach (var item in lstSelect)
            {
                blog.BlogTags.Add(new BlogTag(item, blog.Id));
            }
            var gal = new GalleryDB(db).CreateBlog(blog);
            if (!string.IsNullOrEmpty(model.ImageData))
            {

                var saveFile = await this.db.SaveImage(model.ImageData, "blogs");
                if (!saveFile.OK) return Json(Js.Error(saveFile.Message));
                saveFile.Image.IsMain = true;
                gal.AppFiles.Add(saveFile.Image);
            }
            db.Blogs.Add(blog);
            var str = await db.SaveMessageAsync();
            if (str.NotNull()) return Json(str.GetError());
            if (string.IsNullOrEmpty( model.ParentId ))
            {
                var parent = await db.Blogs.FindAsync(model.ParentId);
                if (parent != null)
                {
                    blog.ParentId = parent.Id;
                    var lstAdd = new List<string>();
                    foreach (var item in parent.BlogTags.Select(x => x.TagBlogId))
                    {

                        if (!lstAdd.Contains(item) && !await db.BlogTags.AnyAsync(x => x.TagBlogId == item && x.BlogId == model.Id))
                        {
                            db.BlogTags.Add(new BlogTag
                            {
                                BlogId = model.Id,
                                TagBlogId = item,
                            });
                            lstAdd.Add(item);
                        }
                    }
                }
            }
            return Json(Js.SuccessRedirect(Global.BlogInserted, "/admin/blogs"));
        }

        public ActionResult Edit(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return View();
            }
            Blog blog = db.Blogs.Find(id);
            if (blog == null) return View();
            var model = new BlogEditModel()
            {

                Id = blog.Id,
                FullName = blog.FullName,
                MarkDelete = blog.MarkDelete,
                Content = blog.Content,
                Closed = blog.Closed,
            };
            model.ParentId = blog.ParentId;
            var lst = new List<string>();
            foreach (var item in blog.BlogTags)
            {
                lst.Add(item.TagBlogId.ToString());
            }

            ViewBag.TagBlogId = new SelectList(db.TagBlogs, "Id", "Name",lst);
            ViewBag.ParentId = new SelectList(db.Blogs, "Id", "Name",model.ParentId);

            return View(model);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]

        public async Task<ActionResult> Edit(BlogEditModel model)
        {
            var db = new TDContext();
            var currentUser = User.Identity.GetUserId();

            var blog = await db.Blogs.FindAsync(model.Id);
            if (blog == null)
                return Json(Js.Error("Không tìm thấy bài viết"));
            blog.FullName = model.FullName;
            blog.Name = model.FullName.GetSafeName();
            blog.Content = await model.Content.GetValidHtml();
            blog.ReasonModify += model.ReasonModify;
            blog.MarkDelete = model.MarkDelete;
            blog.Summary = await blog.Content.GetSummary();
            blog.LongSummary = await blog.Content.GetSummary(500);
            blog.ModifierId = currentUser;
            blog.LastModify = DateTime.UtcNow;
            blog.Closed = model.Closed;
            if (model.TagBlogId != null)
            {
                var lstSelect = new List<string>();
                foreach (string item in model.TagBlogId)
                {
                    Guid tagId = item.ToGuid();
                    TagBlog findTagBlog = null;
                    if (tagId != Guid.Empty)
                    {
                        findTagBlog = db.TagBlogs.Find(tagId);
                    }

                    if (findTagBlog == null)
                    {
                        findTagBlog = db.TagBlogs.FirstOrDefault(x => x.FullName == item);
                        if (findTagBlog == null)
                        {
                            findTagBlog = new TagBlog(); //TagBlog(item); Fix
                            db.TagBlogs.Add(findTagBlog);

                        }

                    }
                    lstSelect.Add(findTagBlog.Id);
                }
                var current = blog.BlogTags.Select(x => x.TagBlogId).ToList();
                foreach (var item in current)
                {
                    if (!lstSelect.Contains(item))
                    {
                        var find = db.BlogTags.Find(item, blog.Id);
                        if (find != null)
                        {
                            db.BlogTags.Remove(find);
                        }
                    }
                }
            }
            if (!string.IsNullOrEmpty(model.ParentId))
            {
                var parent = await db.Blogs.FindAsync(model.ParentId);
                if (parent != null)
                {
                    blog.ParentId = parent.Id;
                    var lstAdd = new List<string>();
                    foreach (var item in parent.BlogTags.Select(x => x.TagBlogId))
                    {

                        if(!lstAdd.Contains(item) && !await db.BlogTags.AnyAsync(x=>x.TagBlogId==item && x.BlogId == model.Id))
                        {
                            db.BlogTags.Add(new BlogTag
                            {
                                BlogId=model.Id,
                                TagBlogId=item,
                            });
                            lstAdd.Add(item);
                        }
                    }
                }
            }

            db.Entry(blog).State = EntityState.Modified;
            var res = await db.SaveMessageAsync();
            if (!string.IsNullOrEmpty(res)) return Json(Js.Error(res));
            return Json(Js.SuccessRedirect(Global.BlogChanged, "/admin/blogs"));
        }
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
            if (id == null) return Json(LanguageDB.NotFound.GetError());
            var str = await new BlogDB(db).Delete(id);
            if (str != null) return Json(str.GetError());
            return Json(Js.SuccessRedirect(Global.BlogRemoved, "/admin/blogs"));
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
