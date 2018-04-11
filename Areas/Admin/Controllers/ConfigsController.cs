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
    public class ConfigsController : Controller
    {
        private TDContext db = new TDContext();

        // GET: Admin/Configs
        public ActionResult Index()
        {

            return PartialView(db.DPages);
        }

        public ActionResult Create()
        {

            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(DPageViewModel view)
        {
            if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));
            var data = db.DPages.Find(view.Id);
            view.Content = await view.Content.GetValidHtml();
            if (data != null) return Json(Js.Error("Trang đã tồn tại"));
            data = new Models.DPage(view);
            data.IsPage = true;
            data.CreatorId = User.Identity.GetUserId();
            data.LastModify = DateTime.UtcNow;
            db.DPages.Add(data);
            var str = await db.SaveMessageAsync();
            if (str!=null) return Json(Js.Error(str));
            return Json(Js.SuccessRedirect("Đã thêm trang mới", "/admin/config"));
        }

        // GET: Admin/Configs/Edit/5
        public async Task<ActionResult> Edit(string id)
        {
            if (string.IsNullOrEmpty(id))
                return View();
            var data = await db.DPages.FindAsync(id);
            if (data == null) return View();
            return View(new DPageViewModel
            {
                Id = data.Id,
                Name = data.Name,
                isPage = data.IsPage,
                Content = data.Content
            });
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(DPageViewModel view)
        {
            if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));
            var data = db.DPages.Find(view.Id);
            view.Content = await view.Content.GetValidHtml();
            if (data == null) return Json(Js.Error("Trang không tồn tại"));
            data.IsPage = view.isPage;
            data.Content = view.Content;
            data.Name = view.Name;
            data.ModifyId = User.Identity.GetUserId();
            data.LastModify = DateTime.UtcNow;
            db.Entry(data).State = System.Data.Entity.EntityState.Modified;
            var str = await db.SaveMessageAsync();
            if (str!=null) return Json(Js.Error(str));
            return Json(Js.SuccessRedirect("Đã lưu trang", "/admin/config"));
        }




        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
            var data = await db.DPages.FindAsync(id);
            if (data == null) return Json(Js.Error("Trang không tồn tại"));
            db.DPages.Remove(data);
            var str = await db.SaveMessageAsync();
            if (str != null) return Json(Js.Error(str));
            return Json(Js.SuccessRedirect("Đã xóa trang", "/admin/config"));
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
