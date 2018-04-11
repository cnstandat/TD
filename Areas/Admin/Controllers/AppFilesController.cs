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
using TD.Models.Views;

namespace TD.Areas.Admin.Controllers
{
    [Authorize(Roles = "SysAdmin,Admin,ContentManager")]
    public class AppFilesController : Controller
    {
        private TDContext db = new TDContext();

        public async Task<ActionResult> Index(string AppId, string BlogId)
        {
            if (BlogId != null)
            {
                var blog = await db.Blogs.FindAsync(BlogId);
                if (blog == null) return PartialView();
                if (blog.Galleries.Count == 0)
                {
                    var gal = new GalleryDB(db).CreateBlog(blog);
                    await db.SaveAsync();
                }
                ViewBag.CreateLink = "BlogId=" + BlogId;
                return PartialView("_Index", db.AppFiles.Where(x => x.Gallery.BlogId == BlogId));
            }
            else if (AppId != null)
            {
                ViewBag.CreateLink = "AppId=" + AppId;
                var product = await db.Apps.FindAsync(AppId);
                if (product == null) return PartialView();
                if (product.Galleries.Count == 0)
                {
                    var gal = new GalleryDB(db).Create(product);
                    await db.SaveAsync();
                }
                return PartialView("_Index", db.AppFiles.Where(x => x.Gallery.AppId == AppId));
            }

            return View(db.AppFiles);
        }

        public async Task<ActionResult> CreateImage(string AppId, string BlogId)
        {
            if (AppId == null && BlogId == null) return PartialView();
            Gallery gallery = null;
            if (AppId != null)
            {
                var product = await db.Apps.FindAsync(AppId);
                if (product == null) return View();
                if (product.Galleries.Count == 0)
                {
                    gallery = new GalleryDB(db).Create(product);
                    await db.SaveAsync();
                }
                else
                {
                    gallery = product.Galleries.FirstOrDefault();
                }

            }
            else
            {
                var blog = await db.Blogs.FindAsync(BlogId);
                if (blog == null) return PartialView();
                if (blog.Galleries.Count == 0)
                {
                    gallery = new GalleryDB(db).CreateBlog(blog);
                    await db.SaveAsync();
                }
                else
                {
                    gallery = blog.Galleries.FirstOrDefault();
                }

            }
            if (gallery == null) return PartialView();
            ViewBag.GalleryId = gallery.Id;
            return PartialView();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> CreateImage(ImageView model)
        {
            if (string.IsNullOrEmpty(model.ImageData) || string.IsNullOrEmpty(model.GalleryId)) return Json("Không có dữ liệu ảnh".GetError());

            var gal = await db.Galleries.FindAsync(model.GalleryId);
            if (gal == null) return Json("Không tìm thấy bộ sưu tập".GetError());
            if (gal.AppId != null)
            {
                var product = gal.App;

                var file = await db.SaveImage(model.ImageData, "products");
                if (!file.OK) return Json(file.Message.GetError());
                file.Image.GalleryId = model.GalleryId;
                file.Image.IsMain = model.IsMain;

                var str = await db.SaveMessageAsync();
                if (str != null) return Json(str.GetError());
                return Json(Js.SuccessRedirect("Thêm mới ảnh thành công", "/admin/products/edit/" + product.Id));
            }
            else
            {
                var blog = gal.Blog;
                var file = await db.SaveImage(model.ImageData, "products");
                if (!file.OK) return Json(file.Message.GetError());
                file.Image.GalleryId = model.GalleryId;
                file.Image.IsMain = model.IsMain;
                var str = await db.SaveMessageAsync();
                if (str != null) return Json(str.GetError());
                return Json(Js.SuccessRedirect("Thêm mới ảnh thành công", "/admin/blogs/edit/" + blog.Id));
            }
        }

        // GET: Admin/AppFiles/Edit/5
        public async Task<ActionResult> EditImage(string id)
        {
            if (id == null) return PartialView();
            AppFile appFile = await db.AppFiles.FindAsync(id);
            if (appFile == null) return PartialView();
            return PartialView(new ImageView(appFile));
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> EditImage(ImageView model)
        {
            if (model.Id == null) return Json(LanguageDB.NotFound.GetError());
            var file = await db.AppFiles.FindAsync(model.Id);
            if (file == null) return Json(LanguageDB.NotFound.GetError());
            //?? false;
            string returnUrl = "";
            if (file.Gallery != null)
            {
                if (file.Gallery.App != null) returnUrl = "/admin/products/edit/" + file.Gallery.AppId;
                else returnUrl = "/admin/blogs/edit/" + file.Gallery.BlogId;
            }
            else
            {
                returnUrl = "/admin/fileManager";
            }
            if (!string.IsNullOrEmpty(model.ImageData))
            {
                var saveFile = await db.SaveImage(model.ImageData, null, file.Id);
                if (!saveFile.OK) return Json(saveFile.Message.GetError());
                file.UploaderId = User.Identity.GetUserId();
                file.UploadType = UploadType.Image;
            }
            file.IsMain = model.IsMain;
            db.Entry(file).State = EntityState.Modified;
            var str = await db.SaveMessageAsync();
            if (str != null) return Json(str.GetError());
            return Json(Js.SuccessRedirect("Cập nhật file thành công", returnUrl));


        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
            if (id == null) return Json(LanguageDB.NotFound.GetError());
            AppFile appFile = await db.AppFiles.FindAsync(id);
            if (appFile == null) return Json(LanguageDB.NotFound.GetError());

            string returnUrl = "";
            if (appFile.Gallery != null)
            {
                if (appFile.Gallery.Blog != null) returnUrl = "/admin/blogs/edit/" + appFile.Gallery.BlogId;
                else if (appFile.Gallery.App != null) returnUrl = "/admin/products/edit/" + appFile.Gallery.AppId;
            }
            else returnUrl = "/admin";
            db.AppFiles.Remove(appFile);
            var str = await db.SaveMessageAsync();//.SaveChangesAsync();
            if (str != null) return Json(str.GetError());
            if (!appFile.FullPath.Contains("novatar.png"))
                Server.MapPath(appFile.FullPath).DeleteFile();
            return Json(Js.SuccessRedirect("Đã xóa file", returnUrl));
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
