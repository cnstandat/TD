using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TD.Models;
using System.Data.Entity;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using X.PagedList;
using Newtonsoft.Json;

namespace TD.Controllers
{
    public class HomeController : Controller
    {
        private TDContext db = new TDContext();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult _About()
        {

            return PartialView();
        }
        public async Task<ActionResult> _Apps()
        {
            var products = db.Apps;
            var models = products.ToList().Select(x => new AppViewModel(x));
            return PartialView(models);
        }
        public ActionResult _Policies()
        {

            return PartialView();
        }
        public ActionResult _Transfer()
        {
            return PartialView();
        }
        public ActionResult _Quantity()
        {
            return PartialView();
        }
        public ActionResult _Support()
        {

            return PartialView("_Support");
        }
        public ActionResult _Slide()
        {
            return PartialView("_Slide", db.Slides);
        }
        public ActionResult _Cart()
        {
            return PartialView("_Cart", db.Slides);
        }
        public ActionResult _CheckOut()
        {
            return PartialView("_CheckOut", db.Slides);
        }
        public ActionResult _Contact()
        {
            return PartialView("_Contact", db.Slides);
        }
        public ActionResult _Payment()
        {
            return PartialView();
        }


        const int HomeBlogPageSize = 2;
        public ActionResult _Blog()
        {

            var blogs = db.Blogs.OrderByDescending(x => x.LastModify).Include(x => x.User).Include(X => X.Comments).Include(x => x.TagBlogs).Include(x => x.ImageUpload).Take(HomeBlogPageSize).Select(s => new BlogViewModel
            {
                Name = s.Name,
                Title = s.ShortName,
                Tags = s.TagBlogs.Select(x => new TagViewModel { Name = x.Tag.Name, FullName = x.Tag.FullName }).ToList(),
                Image = s.ImageUploadId == null ? null : s.ImageUpload.FileName,
                LastModify = s.LastModify
            });
            return PartialView("_Blog", blogs);
        }
        public ActionResult _Says()
        {
            var comments = db.Comments.OrderByDescending(x => x.Created).Include(x => x.User).Take(4).Select(x => new CommentSaysViewModel
            {
                UserAvatar = x.User.Avatar != null ? "/Pub/GetFile/" + x.User.Id : "/data/img/noavatar.png",
                Content = x.Content,
                UserName = x.User.UserName
            });
            return PartialView("_Says", comments);
        }
        public ActionResult ContactPartial()
        {
            return PartialView();
        }
        public static string GetAvatarPath(User user)
        {
            return user.Avatar != null ? string.Format("/Pub/GetFile/{0}", user.Id) : "/data/img/noavatar.png";
        }
        [HttpGet]
        public string HomeBlogGetMore(int? id)
        {
            id = id ?? 1;
            var blogs = db.Blogs.OrderByDescending(x => x.LastModify).Include(X => X.Comments).Include(x => x.TagBlogs).Include(x => x.ImageUpload).Skip((id.Value - 1) * HomeBlogPageSize).Take(id.Value * HomeBlogPageSize).Select(s => new BlogViewModel
            {
                Name = s.Name,
                Title = s.ShortName,
                Tags = s.TagBlogs.Select(x => new TagViewModel { Name = x.Tag.Name, FullName = x.Tag.FullName }).ToList(),
                Image = s.ImageUploadId == null ? null : s.ImageUpload.FileName,
                LastModify = s.LastModify
            });
            return JsonConvert.SerializeObject(blogs.ToList());
        }


        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
        [Authorize(Roles = "Admin,Supporter")]
        public ActionResult ChatSupport()
        {
            return PartialView();
        }
        public ActionResult ChatTest()
        {
            return PartialView();
        }
        [HttpGet]
        public ActionResult Contact()
        {
            var user = db.Users.Find(User.Identity.GetUserId());

            if (user != null)
                return View(new ContactViewModel { Name = user.UserName, Email = user.Email, LastSent = TempData["sent"] != null ? TempData["sent"].ToDate() : DateTime.MinValue, SendSuccess = TempData["sent"] != null ? true : false });
            if (TempData["sent"] != null)
                return View(new ContactViewModel { LastSent = TempData["sent"] != null ? TempData["sent"].ToDate() : DateTime.MinValue, SendSuccess = TempData["sent"] != null ? true : false });
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Contact(ContactViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            if (model.LastSent.Value > DateTime.MinValue && (model.LastSent.Value - DateTime.UtcNow).Seconds < 10)
            {
                return View(model);
            }
            var user = db.Users.Find(User.Identity.GetUserId());
            string Name = model.Name, Email = model.Email, Message = model.Content;
            if (user != null)
            {
                Name = user.UserName;
                Email = user.Email;

                //return RedirectToAction("ViewBlog", model);
            }

            db.ContactMessages.Add(new ContactMessage() { Name = Name, Email = Email, Content = Message });
            await db.SaveChangesAsync();
            TempData["sent"] = DateTime.UtcNow;

            return RedirectToAction("Contact");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<bool> AddMessage(string Name, string Email, string Message)
        {

            var user = db.Users.Find(User.Identity.GetUserId());

            if (user != null)
            {
                Name = user.UserName;
                Email = user.Email;

                //return RedirectToAction("ViewBlog", model);
            }
            if (!string.IsNullOrEmpty(Message) && !string.IsNullOrEmpty(Name))
            {
                db.ContactMessages.Add(new ContactMessage() { Name = Name, Email = Email, Content = Message });
                await db.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }
}