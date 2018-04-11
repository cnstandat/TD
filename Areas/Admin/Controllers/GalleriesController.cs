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
    public class GalleriesController : Controller
    {
        private TDContext db = new TDContext();

        // GET: Admin/Galleries
        public ActionResult Index()
        {

            return PartialView(db.Galleries.Where(x => x.InHome));
        }
        public ActionResult Create()
        {
            return PartialView();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(string Name, string Link, string ButtonText, string Subtitle, string VideoLink, string ImageData)
        {
            if (string.IsNullOrEmpty(ImageData))
                return Json("Không có dữ liệu ảnh".GetError());
            var saveFile = await db.SaveImage(ImageData, "galleries", null);// ImageData.WriteImageString(Server.MapPath("~/data/img/slides"));
            if (!saveFile.OK) return Json(saveFile.Message);
            var gal = new GalleryDB(db).Create();
            gal.InHome = true;
            gal.Name = Name;
            gal.Link = Link;
            gal.ButtonText = ButtonText;
            gal.Subtitle = Subtitle;
            gal.VideoLink = VideoLink;
            gal.AppFiles.Add(saveFile.Image);
            var str = await db.SaveMessageAsync();
            if (str != null) return Json(str.GetError());
            return Json(Js.SuccessRedirect("Đã thêm Gallery" + saveFile.Image.FileName, "/admin/home/config"));
        }

        // GET: Admin/Galleries/Edit/5
        public async Task<ActionResult> Edit(string id)
        {
            if (id == null) return View();
            var data = await db.Galleries.FindAsync(id);
            if (data == null) return View();
            var image = data.AppFiles.FirstOrDefault();
            if (image != null)
            {
                ViewBag.AppFileId = image.Id;
                ViewBag.Image = image.FullPath;
            }
            else ViewBag.Image = "/data/img_svg/noavatar.png";
            return PartialView(data);
        }
        public async Task<ActionResult> EditDirect(string id)
        {
            if (id == null) return View();
            var data = await db.Galleries.FindAsync(id);
            if (data == null) return View();
            var image = data.AppFiles.FirstOrDefault();
            if (image != null)
            {
                ViewBag.AppFileId = image.Id;
                ViewBag.Image = image.FullPath;
            }
            else ViewBag.Image = "/data/img_svg/noavatar.png";
            return View(data);
        }
        // POST: Admin/Galleries/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(GalleryEditViewModel model)
        {
            string result = "";
            var data = db.Galleries.Find(model.Id);
            if (data == null) return Json(LanguageDB.NotFound.GetError());
            if (!string.IsNullOrEmpty(model.ImageData))
            {
                var image = db.AppFiles.Find(model.AppFileId);
                if (image != null)
                {
                    image.FullPath.DeleteFile();
                    db.AppFiles.Remove(image);
                }
                var saveFile = await db.SaveImage(model.ImageData, "galleries", null);
                if (!saveFile.OK) return Json(Js.Error(saveFile.Message));
                data.AppFiles.Add(saveFile.Image);

                db.Entry(image).State = System.Data.Entity.EntityState.Modified;
                result += saveFile.Message;
            }
            data.Name = model.Name;
            data.Subtitle = model.Subtitle;
            data.Link = model.Link;
            data.VideoLink = model.VideoLink;
            data.InHome = model.InHome;
            data.ButtonText = model.ButtonText;
            db.Entry(data).State = System.Data.Entity.EntityState.Modified;
            var str = await db.SaveMessageAsync();
            if (str != null) return Json(Js.Error(str));
            return Json(Js.SuccessRedirect("Đã cập nhật Gallery: " + result, "/admin/home/config", 10));
        }



        // POST: Admin/Galleries/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
            if (id == null) return Json(LanguageDB.NotFound.GetError());
            var data = await db.Galleries.FindAsync(id);
            if (data == null) return Json(LanguageDB.NotFound.GetError());

            if (data.AppFiles != null && data.AppFiles.Count > 0)
            {
                var lst = data.AppFiles.ToList();
                foreach (var item in lst)
                {
                    item.FullPath.DeleteFile();
                    db.AppFiles.Remove(item);
                }
            }
            db.Galleries.Remove(data);
            var str = await db.SaveMessageAsync();
            if (str != null) return Json(Js.Error(str));
            return Json(Js.SuccessRedirect("Đã xóa Gallery", "/admin/home/config"));
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
