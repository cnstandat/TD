using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using TD.Models;
using TD.Models.Views;
namespace TD.Areas.Admin.Controllers
{
    [Authorize(Roles = "SysAdmin,Admin,UserManager")]
    public class UsersController : Controller
    {
        private TDContext db = new TDContext();
        private UserManager _userManager;
        public UsersController(UserManager userManager)
        {
            UserManager = userManager;

        }
        public UserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<UserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        public UsersController() { }

        const int PageSize = 10;
        public ActionResult Index(string Sort, string Search, int? Page)
        {
            IQueryable<User> all = FilterUsers(Sort, Search, Page);
            return View(all);

        }
        public ActionResult GetMore(string Sort, string Search, int? Page)
        {
            IQueryable<User> all = FilterUsers(Sort, Search, Page);


            return PartialView(all);

        }
        IQueryable<User> FilterUsers(string Sort, string Search, int? Page)
        {
            ViewBag.Sort = Sort;
            ViewBag.Search = Search;
            int page = Page ?? 1;
            IQueryable<User> all = db.Users.Include(x => x.BlogCreated).Include(x => x.CommentCreated);
            if (Search.NotNull()) all = all.Where(x => x.FullName.Contains(Search) || x.UserName.Contains(Search));

            ViewBag.Page = page + 1;
            ViewBag.HasMore = all.Count() > page * PageSize;
            if (Sort.NotNull()) all = all.OrderByDescending(x => x.UserName).Skip((page - 1) * PageSize).Take(PageSize);
            else all = all.OrderBy(x => x.UserName).Skip((page - 1) * PageSize).Take(PageSize);
            return all;
        }

        public ActionResult Create()
        {
            UserViewModel model = new UserViewModel();
            ViewBag.RoleId = new SelectList(db.Roles, "Id", "Name");

            return View(model);
        }
        public ActionResult Roles()
        {
            var lst = new List<RoleViewModel>();
            foreach (var item in db.Roles)
                lst.Add(new RoleViewModel
                {
                    Id = item.Id,
                    Name = item.Name
                });
            return View(lst);
        }

        async Task<IEnumerable<string>> GetSelectRole(string[] roleId, TDContext db)
        {
            var lst = new List<string>();
            var roleDB = new RoleDB(db);
            if (roleId != null && roleId.Length > 0)
                for (int i = 0, j = roleId.Length; i < j; i++)
                {
                    var item = await roleDB.FindOrCreate(roleId[i]);
                    if (item != null) lst.Add(item.Id);
                }
            return lst;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(UserViewModel model)
        {
            if (!ModelState.IsValid) return Json(this.GetModelStateError().GetError());

            var db = new TDContext();
            var currentUser = User.Identity.GetUserId();
            var lstSelect = await GetSelectRole(model.RoleId, db);
            if (await db.Users.AnyAsync(x => x.UserName == model.UserName))
                return Json(Js.Error(TD.Global.UserNameUsed));

            var data = new User(model.UserName);
            data.CantSay = model.CantSay;
            data.Sign = model.Sign;
            data.Email = model.Email;
            data.PasswordHash = model.Password.ToEncrypt();
            db.Users.Add(data);
            var str = await db.SaveMessageAsync();
            if (str!=null) return Json(str.GetError());

            foreach (var item in lstSelect)
                if (!data.Roles.Any(x => x.RoleId == item))
                    data.Roles.Add(new IdentityUserRole
                    {
                        UserId = data.Id,
                        RoleId = item
                    });
            db.Entry(data).State = EntityState.Modified;
            str = await db.SaveMessageAsync();
            if (str!=null) return Json(str.GetError());
            return Json(Js.SuccessRedirect(TD.Global.UserInserted, "/admin/users"));
        }
        public ActionResult Edit(string id)
        {
            if (string.IsNullOrEmpty(id)) return View();

            User data = db.Users.Find(id);
            if (data == null) return View();
            UserViewModel model = new UserViewModel()
            {
                Id = data.Id,
                UserName = data.UserName,
                Password = data.PasswordHash.ToDecrypt(),
                CantSay = data.CantSay,
                Email = data.Email,
                Sign = data.Sign
            };
            ViewBag.RoleId = new MultiSelectList(db.Roles, "Id", "Name", data.Roles.Select(x=>x.RoleId).ToArray());
            return View(model);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]

        public async Task<ActionResult> Edit(UserViewModel model)
        {
            var db = new TDContext();
            var currentUser = User.Identity.GetUserId();

            var data = db.Users.Find(model.Id);
            if (data == null) return Json(Js.Error("Không tìm thấy người dùng"));



            var lstSelect = await GetSelectRole(model.RoleId, db);
            var current = data.Roles.ToList();



            foreach (var item in current)
            {
                if (!lstSelect.Contains(item.RoleId))
                {
                    data.Roles.Remove(item);// UserManager.RemoveFromRoleAsync(data.Id, item);
                }
            }
            data.UserName = model.UserName;
            data.Email = model.Email;
            data.CantSay = model.CantSay;
            data.Sign = model.Sign;
            data.PasswordHash = model.Password.ToEncrypt();
            db.Entry(data).State = EntityState.Modified;
            


            foreach (var item in lstSelect)
            {
                
                if (!data.Roles.Any(x => x.RoleId == item))
                {
                    data.Roles.Add(new IdentityUserRole
                    {
                        UserId = data.Id,
                        RoleId = item
                    });
                }

            }

            db.Entry(data).State = EntityState.Modified;
            var str = await db.SaveMessageAsync();
            if (str!=null) return Json(str.GetError());
            return Json(Js.SuccessRedirect(Global.UserChanged, "/admin/users"));
        }




        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(string id)
        {
            using (var db = new TDContext())
            {
                User data = db.Users.Find(id);
                if (data != null)
                {
                    if (data.AvatarId != null)
                    {
                        var image = data.Avatar;
                        db.AppFiles.Remove(image);
                        string filePath = Server.MapPath("~/data/img/users/" + id);// + string.Format(Properties.Resources.UserImageLink, id));
                        filePath.DeleteFile();
                    }
                    db.Users.Remove(data);
                    var str = await db.SaveMessageAsync();
                    if (str!=null) return Json(str.GetError());

                    return Json(Js.SuccessRedirect(Global.UserRemoved, "/admin/users"));
                }
                return Json(Js.Error());
            }
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
