using Microsoft.AspNet.Identity;
using System;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;
using TD.Models;

namespace TD.Areas.Admin.Controllers
{
    [Authorize(Roles ="SysAdmin,Admin,ContentManager")]
    public class CommentsController : Controller
    {
        TDContext db = new TDContext();

        // GET: Admin/Comments
        public ActionResult Index(string BlogId, string AppId, int? Page)
        {
            var models = GetComments(AppId, BlogId, Page);
       //     var user = db.Users.Find(User.Identity.GetUserId());
            
            if (Page == null || Page.Value == 1)
                return PartialView(models);
            else return PartialView("_More", models);
        }

        IQueryable<Comment> GetComments(string AppId, string BlogId, int? Page)
        {
            int page = Page ?? 1;
            int skip = (page - 1) * CData.AppConfig.PageCount;

            IQueryable<Comment> comments = db.Comments;
            if (BlogId != null)
            {
                ViewBag.CreateLink = "BlogId=" + BlogId;
                comments = comments.Where(x => x.BlogId == BlogId);
            }
            else if (AppId != null)
            {
                ViewBag.CreateLink = "AppId=" + AppId;
                comments = comments.Where(x => x.AppId == AppId);
            }

            ViewBag.BlogId = BlogId;
            ViewBag.AppId = AppId;
            ViewBag.Page = page + 1;
            ViewBag.HasMore = comments.Count() > page * CData.AppConfig.PageCount;
            comments = comments.OrderByDescending(x => x.Created).Skip(skip).Take(CData.AppConfig.PageCount);
            return comments;
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Gen(string AppId, string BlogId,string CommentId, int? Count)
        {
            int count = Count ?? 10;
            var dbHelper = new DBHelper();
            var str = await dbHelper.GerenateComments(db,db.Blogs.Find(BlogId),db.Apps.Find(AppId),db.Comments.Find(CommentId),count, User.Identity.GetUserId());
            if (str != null) return Json(str.GetError());
            return Json(Js.Success("Tạo dữ liệu ngẫu nhiên thành công"));
        }
        public async Task<ActionResult> Edit(string id)
        {
            if (id == null) PartialView();
            return PartialView((await db.Comments.FindAsync(id)));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> EditComment(Comment model)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            var data = db.Comments.Find(model.Id);
            if (data == null) return Json(Js.Error("Không tìm thấy thảo luận"));
            var err = await model.Content.GetValidHtml();
            data.Content = err;
            data.LastModify = DateTime.Now;
            data.Reason += string.Format("Cập nhật lúc {0:dd/MM/yy HH mm} bởi {1} :{2}", data.LastModify, user.UserName, model.Reason);

            data.ModifyId = user.Id;
            db.Entry(data).State = EntityState.Modified;
            db.SaveChanges();
            return Json(Js.SuccessRedirect("Đã cập nhật thảo luận", "/admin/blogs/edit/" + model.BlogId));
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Delete(string id)
        {
            if (string.IsNullOrEmpty(id)) return Json(Js.Error("Không tìm thấy thảo luận"));
            var data = await db.Comments.FindAsync(id);
            if (data == null) return Json(Js.Error("Không tìm thấy thảo luận"));
            db.Comments.Remove(data);
            db.SaveChanges();
            return Json(Js.SuccessRedirect("Đã xóa thảo luận", "/admin/blogs/edit/" + data.BlogId));
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
