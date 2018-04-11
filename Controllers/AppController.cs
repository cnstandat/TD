using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TD.Models;
using TD.Models.Views;

namespace TD.Controllers
{
    public class AppController : Controller
    {
        private TDContext db = new TDContext();
        #region Get All Apps
        public ActionResult Index(string LinkId, string PartnerId)
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            if (user == null)
            {
                return View(GetAllApps());
            }
            var app = db.Apps.FirstOrDefault(x => x.Link == LinkId);
            if (app == null)
            {
                return View(GetAllApps());
            }
            if (string.IsNullOrEmpty(PartnerId)) return View(GetAllApps());
            var partnerapp = db.ClientApps.Find(PartnerId, app.Id);
            if (partnerapp == null)
            {
                return View(GetAllApps());
            }
            else
            {
                var userPartnerApp = db.UserApps.FirstOrDefault(x => x.AppId == app.Id && x.ClientId == PartnerId && x.UserId == user.Id);
                if (userPartnerApp == null)
                    return Redirect(string.Format("/{0}/Reg/{1}", app.Name, PartnerId));
                else return Redirect("/" + app.Link);
            }

        }


        public List<AppEditModel> GetAllApps()
        {
            var apps = db.Apps;
            var lst = new List<AppEditModel>();
            foreach (var item in apps)
                lst.Add(new AppEditModel(item));
            return lst;
        }

        #endregion

        public ActionResult _GetPrice(string id)
        {
            if (string.IsNullOrEmpty(id)) return HttpNotFound();
            var appPrices = db.AppVersions.Include(X => X.App).Where(x => x.AppId == id);
            var lst = new List<AppVersionView>();
            foreach (var item in appPrices)
            {
                var add = new AppVersionView(item, true);

                foreach (var item2 in db.VersionFeatureApps.Where(x => x.AppId == item.AppId && x.Version == item.Version))
                    add.FeatureApps.Add(new VersionFeatureEditModel(item2, true));
                lst.Add(add);
            }
            return PartialView(lst);
        }
        public ActionResult _GetFeatureApps(string id)
        {
            if (string.IsNullOrEmpty(id)) return HttpNotFound();
            var appPrices = db.AppFeatures.Include(X => X.FeatureApp).Include(x => x.App).Where(x => x.AppId == id);
            var lst = new List<AppFeatureView>();
            foreach (var item in appPrices)
            {
                lst.Add(new AppFeatureView(item, true));
            }
            return PartialView(lst);
        }
    }
}