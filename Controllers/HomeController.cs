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
    public class HomeController : Controller
    {
        private TDContext db = new TDContext();
        #region Page
        public ActionResult Index()
        {

            return View("Index", db.Galleries.Where(x => x.InHome));

        }
        public ActionResult Mining()
        {
            return View();
        }
        public ActionResult SearchAll(string id)
        {
            return View();
        }
        public ActionResult _Apps()
        {
            var products = db.Apps;
            //var models = db.Apps.Where(x => x.AppType == AppType.App).Select(x => new App(x));
            return PartialView(db.Apps.ToList().Select(x => new AppEditModel(x)));
        }
        public ActionResult _Partner()
        {
            return PartialView(db.Partners);
        }
        public ActionResult _Testimonials()
        {
            return PartialView(db.PartnerTalks);
        }
        public ActionResult _Project()
        {
            var lst = new List<AppEditModel>();
            foreach (var item in db.Apps)
                lst.Add(new AppEditModel(item));
            return PartialView(lst);
        }


        public ActionResult _Gallery()
        {
            return PartialView("_Gallery", db.Galleries.Where(x => x.InHome).Include(x => x.AppFiles));
        }
        [Authorize]
        public ActionResult _Cart()
        {
            var userId = User.Identity.GetUserId();
            return PartialView("_Cart", db.Carts.Where(x => x.UserId == userId));
        }
        public ActionResult _CheckOut()
        {
            return PartialView("_CheckOut");
        }

        public ActionResult _Config(string id)
        {

            var user = db.Users.Find(User.Identity.GetUserId());
            bool isAdmin = false;
            if (user != null)
            {
                var roleIDs = user.Roles.Select(x => x.RoleId);
                if (roleIDs != null)
                {
                    var roles = db.Roles.Where(x => roleIDs.Contains(x.Id)).Select(x => x.Name.ToLower());
                    isAdmin = roles.Contains("sysadmin") || roles.Contains("admin") || roles.Contains("contentmanager");
                }
            }
            ViewBag.Admin = isAdmin;
            var data = db.DPages.Find(id);
            if (data == null)
            {
                ViewBag.Name = id;
                return PartialView();
            }
            return PartialView(new DPageViewModel()
            {
                Id = data.Id,
                Content = data.Content,
                Name = data.Name
            });
        }
        public ActionResult _Lazy(string id)
        {

            var user = db.Users.Find(User.Identity.GetUserId());
            bool isAdmin = false;
            if (user != null)
            {
                var roleIDs = user.Roles.Select(x => x.RoleId);
                if (roleIDs != null)
                {
                    var roles = db.Roles.Where(x => roleIDs.Contains(x.Id)).Select(x => x.Name.ToLower());
                    isAdmin = roles.Contains("sysadmin") || roles.Contains("admin") || roles.Contains("contentmanager");
                }
            }
            ViewBag.Admin = isAdmin;
            var data = db.DPages.Find(id);
            if (data == null)
            {
                ViewBag.Name = id;
                return PartialView();
            }
            return PartialView(new DPageViewModel()
            {
                Id = data.Id,
                Content = data.Content,
                Name = data.Name
            });
        }
        #endregion


        #region Home Blog
        public ActionResult _HomeBlogs(int? id)
        {
            int page = id ?? 1;
            var lst = GetHomeBlogViews(page);
            if (page == 1)
                return PartialView(lst);
            else return PartialView("_HomeBlogsMore", lst);
        }
        public ActionResult _HomeBlog(int? id)
        {
            int page = id ?? 1;
            var lst = GetHomeBlogViews(page);
            if (page == 1)
                return PartialView(lst);
            else return PartialView("_HomeBlogMore", lst);
        }
        private IEnumerable<BlogViewModel> GetHomeBlogViews(int page)
        {
            var blogs = db.Blogs.OrderByDescending(x => x.LastModify).Include(x => x.Galleries).Include(X => X.Comments).Skip(PageSize * (page - 1)).Take(PageSize);
            ViewBag.Page = page + 1;
            ViewBag.HasMore = db.Blogs.Count() > page * PageSize;

            return blogs.Select(x => new BlogViewModel()
            {
                Id = x.Id,
                Name = x.Name,
                Image = x.Galleries.FirstOrDefault().AppFiles.FirstOrDefault().FullPath,
                FullName = x.FullName,
                LastModify = x.LastModify,
                Creator = x.User.UserName,
                CommentCount = x.Comments.Count,
                Viewed = x.Viewed,
                Content = x.LongSummary
            });
        }


        #endregion



        const int PageSize = 3;

        #region Blog
        public ActionResult Blog(string id, int? page, int? year, int? month)
        {

            DateTime from, to;
            IQueryable<Blog> all = db.Blogs;
            int Year = year ?? -1;
            int Month = month ?? -1;
            int Page = page ?? 1;
            if (!string.IsNullOrEmpty(id) && id.ToLower() != "all")
            {
                all = all.Where(x => x.BlogTags.Select(y => y.TagBlog.Name).Contains(id));
            }
            if (Year > 0)
            {
                if (Month > 0)
                {
                    from = new DateTime(Year, Month, 1);
                    if (Month < 12)
                    {
                        to = new DateTime(Year, Month + 1, 1);
                    }
                    else
                    {
                        to = new DateTime(Year + 1, 1, 1);
                    }
                }
                else
                {
                    from = new DateTime(Year, 1, 1);
                    to = new DateTime(Year + 1, 1, 1);
                }
                all = all.Where(x => x.LastModify >= from && x.LastModify < to);

            }
            var blogs = all.Include(X => X.Comments).Include(x => User);
            ViewBag.Page = Page + 1;
            ViewBag.Year = Year;
            ViewBag.Month = Month;
            ViewBag.TagBlog = id;
            ViewBag.HasMore = blogs.Count() > PageSize * Page;

            blogs = blogs.OrderByDescending(x => x.LastModify)
                .Skip(PageSize * (Page - 1))
                .Take(PageSize);
            System.Linq.Expressions.Expression<Func<Blog, BlogViewModel>> HomeBlogSelector = x => new BlogViewModel
            {
                AppId = x.AppId,
                AppName = x.App.Name,
                Name = x.Name,
                Closed = x.Closed,
                CommentCount = x.Comments.Count,
                FullName = x.FullName,
                Creator = x.User.UserName,
                Image = x.Galleries.FirstOrDefault().AppFiles.FirstOrDefault(i => i.IsMain).FullPath,
                LastModify = x.LastModify,
                Summary = x.Summary,
                LongSummary = x.LongSummary
            };
            if (Page == 1)
            {
                return View(blogs.Select(HomeBlogSelector));
            }
            else return PartialView("BlogMore", blogs.Select(HomeBlogSelector));
        }




        #endregion

        #region Single Post
        public ActionResult ViewPost(string id)
        {
            var s = db.Blogs.FirstOrDefault(x => x.Name == id);
            if (s == null) return HttpNotFound();
            s.Viewed++;
            db.Entry(s).State = EntityState.Modified;
            db.SaveChanges();
            var model = new BlogViewModel
            {
                Name = s.Name,
                FullName = s.FullName,
                Id = s.Id,

                CommentCount = s.Comments.Count,
                Viewed = s.Viewed,
                Content = s.Content,
                LastModify = s.LastModify,

            };
            model.CanComment = !s.Closed;
            return View(model);
        }
        public ActionResult _GetAuthor(string id)
        {
            if (string.IsNullOrEmpty(id)) return HttpNotFound();

            var blog = db.Blogs.Find(id);
            if (blog == null) return HttpNotFound();
            if (blog.User == null) return HttpNotFound();

            var model = new AuthorViewModel(blog.User);
            return PartialView(model);
        }
        const int RelatedSize = 6;
        const int PopularSize = 6;
        const int NewSize = 6;
        const int CommentSize = 10;
        public ActionResult _GetRelated(string id)
        {
            if (string.IsNullOrEmpty(id)) return HttpNotFound();

            var blog = db.Blogs.Find(id);
            if (blog == null) return HttpNotFound();
            var tags = blog.BlogTags.Select(x => x.TagBlogId).ToList();


            var lst = db.Blogs.OrderByDescending(x => x.LastModify).Take(RelatedSize).Where(x => x.BlogTags.Select(y => y.TagBlogId).Intersect(tags).Any()).Select(x => new BlogViewModel
            {
                Name = x.Name,
                FullName = x.FullName,
                LastModify = x.LastModify,
                Image = x.Galleries.FirstOrDefault().AppFiles.FirstOrDefault(i => i.IsMain).FullPath,
                Id = x.Id
            });


            return PartialView(lst);
        }
        public ActionResult _GetPopular()
        {
            var lst = db.Blogs.OrderByDescending(x => x.LastModify).Take(NewSize).Select(x => new BlogViewModel
            {
                Id = x.Id,
                Name = x.Name,
                FullName = x.FullName,
                LastModify = x.LastModify,
                Image = x.Galleries.FirstOrDefault().AppFiles.FirstOrDefault(i => i.IsMain).FullPath
            });
            return PartialView(lst);

        }
        public ActionResult _GetNew()
        {
            var lst = db.Blogs.OrderByDescending(x => x.LastModify).Take(NewSize).Select(x => new BlogViewModel
            {
                Id = x.Id,
                Name = x.Name,
                FullName = x.FullName,
                LastModify = x.LastModify,
                Image = x.Galleries.FirstOrDefault().AppFiles.FirstOrDefault(i => i.IsMain).FullPath
            });
            return PartialView(lst);
        }
        public ActionResult _GetTagBlog(string id)
        {
            if (string.IsNullOrEmpty(id)) return HttpNotFound();

            var blog = db.Blogs.Find(id);
            if (blog == null) return HttpNotFound();
            var tags = blog.BlogTags.Select(x => x.TagBlog);
            var lst = new List<TagBlogViewModel>();
            lst.AddRange(tags.Select(x => new TagBlogViewModel
            {
                Name = x.Name,
                FullName = x.FullName
            }));
            return PartialView(lst);
        }

        public ActionResult _GetTags()
        {

            var lst = new List<TagBlogViewModel>();
            lst.AddRange(db.TagBlogs.Select(x => new TagBlogViewModel
            {
                Name = x.Name,
                FullName = string.IsNullOrEmpty(x.FullName) ? x.Name : x.FullName,
                BlogCount = x.BlogTags.Count
            }));
            return PartialView(lst);
        }
        public ActionResult _GetNavBlog(string id)
        {
            if (string.IsNullOrEmpty(id)) return HttpNotFound();

            var blog = db.Blogs.Find(id);
            if (blog == null) return HttpNotFound();
            var last = db.Blogs.OrderByDescending(x => x.LastModify).Where(x => x.Id != id && x.LastModify <= blog.LastModify).FirstOrDefault();
            var next = db.Blogs.OrderBy(x => x.LastModify).Where(x => x.Id != id && x.LastModify > blog.LastModify).FirstOrDefault();
            var model = new NavBlogViewModel()
            {
                Last = last == null ? null : new BlogViewModel
                {
                    Name = last.Name,
                    FullName = last.FullName
                },
                Next = next == null ? null : new BlogViewModel
                {
                    Name = next.Name,
                    FullName = next.FullName
                }
            };
            return PartialView(model);
        }
        public ActionResult _Comments(string id)
        {

            if (string.IsNullOrEmpty(id)) return PartialView();
            var lst = GetCommentBlogs(id, 1);// new List<CommentViewModel>();

            return PartialView(lst);
        }
        public ActionResult _CommentMore(string id, int? Page)
        {
            if (string.IsNullOrEmpty(id)) return PartialView();
            int page = Page ?? 1;
            var lst = GetCommentBlogs(id, page);// new List<CommentViewModel>();

            return PartialView(lst);
        }
        private List<CommentViewModel> GetCommentBlogs(string id, int page)
        {
            var comments = db.Comments.Where(x => x.BlogId == id && string.IsNullOrEmpty(x.ParentId)).Include(x => x.Children);
            ViewBag.HasMore = comments.Count() > page * CommentSize;
            comments = comments.OrderByDescending(x => x.Created).Skip(CommentSize * (page - 1)).Take(CommentSize);
            var lst = new List<CommentViewModel>();

            foreach (var x in comments)
            {
                lst.Add(new CommentViewModel(x, x.Children.Count > 0));
            }
            ViewBag.BlogId = id;
            ViewBag.Page = page + 1;
            return lst;
        }
        public ActionResult _GetCommentForm(string id)
        {
            var userId = User.Identity.GetUserId();

            if (string.IsNullOrEmpty(id)) return HttpNotFound();
            var blog = db.Blogs.Find(id);
            if (blog == null) return HttpNotFound();
            if (blog.Closed) return PartialView("_ClosedCommentForm");
            else
            {
                if (!string.IsNullOrEmpty(userId))
                {
                    var user = db.Users.Find(userId);
                    if (user != null)
                    {
                        return PartialView(new CommentAddModel
                        {
                            BlogId = id,
                        });
                    }
                }
                return PartialView("_LoginCommentForm");
            }

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> AddComment(CommentAddModel model)
        {
            var userId = User.Identity.GetUserId();
            if (string.IsNullOrEmpty(userId)) return Json(Js.Error("Vui lòng đăng nhập để thảo luận")); ;

            var user = db.Users.Find(userId);
            if (user == null) return Json(Js.Error("Vui lòng đăng nhập để thảo luận")); ;


            var blog = await db.Blogs.FindAsync(model.BlogId);

            if (blog == null) return Json(Js.Error("Không tìm thấy bài viết")); ;

            if (blog.Closed) return Json(Js.Error("Thảo luận cho bài viết đã đóng")); ;

            if (model.ParentId != null)
            {
                var parent = db.Comments.Find(model.ParentId);
                if (parent == null) return Json(Js.Error("Không tìm thấy thảo luận")); ;

            }
            var content = await model.Content.GetValidHtml();
            if (string.IsNullOrEmpty(content))
            {
                return Json(Js.Error("Nội dung không được để trống")); ;
            }
            var data = new Comment(new DBHelper().GetCommentId(db), content)
            {
                UserId = user.Id,
                BlogId = model.BlogId,
                AppId = model.AppId
            };
            if (model.ParentId != null) data.ParentId = model.ParentId;
            db.Comments.Add(data);
            db.SaveChanges();
            return Json(Js.SuccessComponent("Đã đăng thảo luận", "comments-container")); ;
        }
        public ActionResult _CommentChild(string id)
        {
            if (string.IsNullOrEmpty(id)) return PartialView();
            var lst = GetChildViewModels(id, 1);
            return PartialView(lst);
        }
        public ActionResult _CommentChildMore(string id, int? Page)
        {
            if (string.IsNullOrEmpty(id)) return PartialView();
            int page = Page ?? 1;
            var lst = GetChildViewModels(id, page);
            return PartialView(lst);
        }
        List<CommentViewModel> GetChildViewModels(string CommentId, int page)
        {
            var comments = db.Comments.Where(x => x.ParentId == CommentId).Include(x => x.Children).Include(x => x.User);
            ViewBag.HasMore = comments.Count() > page * CommentSize;
            comments = comments.OrderByDescending(x => x.Created).Skip(CommentSize * (page - 1)).Take(CommentSize);
            var lst = new List<CommentViewModel>();
            foreach (var x in comments)
            {
                lst.Add(new CommentViewModel(x, x.Children.Count > 0));
            }
            ViewBag.Page = page + 1;
            ViewBag.Id = CommentId;
            return lst;
        }

        public string LoadMoreComment(string id, int page)
        {
            var blog = db.Blogs.Find(id);
            if (blog == null) return "";
            List<CommentViewModel> lst = GetCommentBlogs(id, page);

            return JsonConvert.SerializeObject(lst);
        }


        #endregion
        [Authorize(Roles = "Admin,Supporter")]
        public ActionResult ChatSupport()
        {
            return PartialView();
        }
        public ActionResult ChatTest()
        {
            return PartialView();
        }


        public ActionResult _PartnerTalk()
        {
            return PartialView(db.PartnerTalks.Where(x => x.MainPage));
        }
        public HomeController()
        {
        }

    }
}