using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;
using TD.Models;
using TD.Models.Views;

namespace TD.Areas.Admin.Controllers
{
    public class PartnersController : Controller
    {
        private TDContext db = new TDContext();
        // GET: Admin/Partners
        public ActionResult Index(string id)
        {
            IQueryable<Partner> partners = db.Partners;
            if (!string.IsNullOrEmpty(id))
            {
                partners = partners.Where(x => x.Name.Contains(id));
            }
            ViewBag.Search = id;
            return View(partners);//.ToListAsync());
        }
        // GET: Admin/Partners/Create
        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(PartnerEditView model)
        {
            if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));
            if (await db.Partners.AnyAsync(x => x.Name == model.Name)) return Json(Js.Error(TD.Global.PartnerExist));
            var data = new Partner(model);
            
            if (!string.IsNullOrEmpty(model.ImageData))
            {
                var saveFile = model.ImageData.WriteImageString(Server.MapPath("~/data/img/partners"));
                if (!saveFile.Success)
                    return Json(Js.Error(saveFile.Error));
                data.Logo = "/data/img/partners/" + saveFile.FileName;
            }
            db.Partners.Add(data);
            var str =await db.SaveMessageAsync();
            if (str!=null) return Json(Js.Error(str));
            return Json(Js.SuccessRedirect("Thêm mới khách hàng thành công", "/admin/partners/edit/" + data.Id));
        }

        // GET: Admin/Partners/Edit/5
        public async Task<ActionResult> Edit(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return View();
            }
            Partner partner = await db.Partners.FindAsync(id);
            if (partner == null)
            {
                return View();
            }
            return View(partner);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(PartnerEditView model)
        {
            if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));
            if (await db.Partners.AnyAsync(x => x.Id != model.Id && x.Name == model.Name)) return Json(Js.Error(TD.Global.PartnerExist));
            var data = await db.Partners.FindAsync(model.Id);
            if (data == null) return Json(Js.Error(Global.NoData));
            data.Name = model.Name;
            data.Address = model.Address;
            data.Phone = model.Phone;
            data.Email = model.Email;
            data.Website = model.Website;
            data.TaxNumber = model.TaxNumber;
            if (!string.IsNullOrEmpty(model.ImageData))
            {

                var saveFile = model.ImageData.WriteImageString("partners",Server.MapPath("~/data/img/partners/" + data.Logo));
                if (!saveFile.Success)
                    return Json(Js.Error(saveFile.Error));
                data.Logo = "/data/img/partners/" + saveFile.FileName;
            }
            db.Entry(data).State = EntityState.Modified;
            var str =await db.SaveMessageAsync();
            if (str!=null) return Json(Js.Error(str));
            return Json(Js.SuccessRedirect("Cập nhật khách hàng thành công", "/admin/partners")); ;
        }

        public ActionResult PartnerApps(string id)
        {
            if (string.IsNullOrEmpty(id)) return PartialView();
            var partnerApps = db.ClientApps.Include(X => X.App).Where(x => x.ClientId == id);
            var partner = db.Partners.Find(id);
            if (partner == null)
                return PartialView();
            var model = new List<ClientAppEditModel>();
            ViewBag.PartnerId = partner.Id;
            ViewBag.PartnerName = partner.Name;
            foreach (var item in partnerApps)
            {
                model.Add(new ClientAppEditModel
                {
                    AppId = item.AppId,
                    ClientId = item.ClientId,
                    AppName = item.App.Name,
                    Start = item.Start,
                    Expires = item.Expires
                });
            }
            return PartialView(model);
        }

        // POST: Admin/Partners/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(Guid id)
        {
            Partner partner = await db.Partners.FindAsync(id);
            if (partner == null) return Json(Js.Error(Global.NoData));
            db.Partners.Remove(partner);
            var str =await db.SaveMessageAsync();
            if (str!=null) return Json(Js.Error(str));
            return Json(Js.SuccessRedirect("Đã xóa khách hàng", "/admin/partners"));
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
