using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.Models
{
    public class DBHelper
    {
        public string GetTagBlogId(TDContext db)
        {
            var count = db.TagBlogs.LongCount();
            string id = string.Format(CData.AppConfig.TagBlogId, count++);
            while (db.TagBlogs.Any(x => x.Id == id))
            {
                id = string.Format(CData.AppConfig.TagBlogId, count++);
            }
            return id;
        }
        public string GetCommentId(TDContext db)
        {
            var count = db.Comments.LongCount();
            string id = string.Format(CData.AppConfig.CommentId, count++);
            while (db.Comments.Any(x => x.Id == id))
            {
                id = string.Format(CData.AppConfig.CommentId, count++);
            }
            return id;
        }
        public string GetAppTaskId(TDContext db)
        {
            var count = db.AppTasks.LongCount();
            string id = string.Format(CData.AppConfig.AppTaskId, count++);
            while (db.AppTasks.Any(x => x.Id == id))
            {
                id = string.Format(CData.AppConfig.AppTaskId, count++);
            }
            return id;
        }
        public string GetTagTaskId(TDContext db)
        {
            var count = db.TagTasks.LongCount();
            string id = string.Format(CData.AppConfig.TagTaskId, count++);
            while (db.TagTasks.Any(x => x.Id == id))
            {
                id = string.Format(CData.AppConfig.TagTaskId, count++);
            }
            return id;
        }
        public string GetBlogId(TDContext db)
        {
            var count = db.Blogs.LongCount();
            string id = string.Format(CData.AppConfig.BlogId, count++);
            while (db.Blogs.Any(x => x.Id == id))
            {
                id = string.Format(CData.AppConfig.BlogId, count++);
            }
            return id;
        }
        public string GetAppFileId(TDContext db)
        {
            var count = db.AppFiles.LongCount();
            string id = string.Format(CData.AppConfig.AppFileId, count++);
            while (db.AppFiles.Any(x => x.Id == id))
            {
                id = string.Format(CData.AppConfig.AppFileId, count++);
            }
            return id;
        }
        public string GetGalleryId(TDContext db)
        {
            var count = db.Galleries.LongCount();
            string id = string.Format(CData.AppConfig.GalleryId, count++);
            while (db.Galleries.Any(x => x.Id == id))
            {
                id = string.Format(CData.AppConfig.GalleryId, count++);
            }
            return id;
        }
        public string GetAppRoleId(TDContext db)
        {
            var count = db.AppRoles.LongCount();
            string id = string.Format(CData.AppConfig.AppRoleId, count++);
            while (db.AppRoles.Any(x => x.Id == id))
            {
                id = string.Format(CData.AppConfig.AppRoleId, count++);
            }
            return id;
        }
        public string GetAppId(TDContext db)
        {
            var count = db.Apps.LongCount();
            string id = string.Format(CData.AppConfig.AppId, count++);
            while (db.Apps.Any(x => x.Id == id))
            {
                id = string.Format(CData.AppConfig.AppId, count++);
            }
            return id;
        }
        public string GetAppCategoryId(TDContext db)
        {
            var count = db.ProductCategories.LongCount();
            string id = string.Format(CData.AppConfig.AppCategoryId, count++);
            while (db.ProductCategories.Any(x => x.Id == id))
            {
                id = string.Format(CData.AppConfig.AppCategoryId, count++);
            }
            return id;
        }
        public string GetPartnerId(TDContext db)
        {
            var count = db.Partners.LongCount();
            string id = string.Format(CData.AppConfig.PartnerId, count++);
            while (db.Partners.Any(x => x.Id == id))
            {
                id = string.Format(CData.AppConfig.PartnerId, count++);
            }
            return id;
        }
        public void Gerenate_AppFeatures(TDContext db)
        {
            var appFeatureApps = AppFeatures.Split(',');
            foreach (var item in appFeatureApps)
            {
                db.FeatureApps.Add(new FeatureApp()
                {
                    Name = item
                });
            }
        }
        public async Task<string> GerenateBlogs(TDContext db, string sadmin, int count)
        {
            Random ran = new Random();
            var blogs = Blogs.Split(' ');
            string fullName, content, safeName;
            if (db.TagBlogs.Count() == 0)
            {
                var str = await GerenateTagBlogs(db);
                if (!string.IsNullOrEmpty(str)) return str;
            }
            var lstTagBlogs = db.TagBlogs.ToList();
            var lstAdd = new List<string>();
            var random = new Random();
            var sb = new StringBuilder();
            string result = "";
            for (int i = 0; i < count; i++)
            {
                fullName = getRandom(random, blogs).Trim();
                content = getRandom(random, blogs, 100);
                safeName = fullName.GetSafeName();

                if (!lstAdd.Contains(safeName) && !db.Blogs.Any(x => x.Name == safeName))
                {
                    lstAdd.Add(safeName);
                    var blog = new Blog
                    {
                        Id = GetBlogId(db),
                        Name = safeName,
                        FullName = fullName,
                        Content = content,
                        UserId = sadmin,
                        LastModify = DateTime.Now,
                        Summary = content.GetSummary(30).Result,
                        LongSummary = content.GetSummary(60).Result
                    };
                    db.Blogs.Add(blog);
                    int start = ran.Next(lstTagBlogs.Count);
                    for (int t = 0; t < start; t++)
                    {
                        var tagBlog = new BlogTag
                        {
                            TagBlog = lstTagBlogs[t],
                            Blog = blog
                        };
                        db.BlogTags.Add(tagBlog);
                    }
                    result = await db.SaveMessageAsync();
                    if (result != null)
                        sb.Append(result);
                }


            }

            return sb.Length > 0 ? sb.ToString() : null;
        }
        public async Task<string> GerenateTagBlogs(TDContext db)
        {

            var lsttags = TagBlogs.Split(',');
            string item;
            var lstAdd = new List<string>();
            var sb = new StringBuilder();
            for (int i = 0; i < lsttags.Length; i++)
            {
                item = lsttags[i];
                if (!string.IsNullOrEmpty(item))
                {
                    if (!lstAdd.Contains(item) && !db.TagBlogs.Any(x => x.Name == item))
                    {
                        lstAdd.Add(item);
                        db.TagBlogs.Add(new TagBlog(GetTagBlogId(db), item, item));
                        sb.Append(await db.SaveMessageAsync());
                    }
                }
            }

            return sb.ToString();

        }
        public async Task<string> GenUsers(TDContext db, string userId)
        {

            int current = db.Users.Count();
            string name = string.Format("test{0:0000000}", current++);
            string password = "123456".ToEncrypt();
            var sb = new StringBuilder();
            for (int i = 0; i < 10; i++)
            {
                while (db.Users.Any(x => x.UserName == name))
                {
                    name = string.Format("test{0:0000000}", current++);
                }
                db.Users.Add(new User(name)
                {
                    PasswordHash = password,
                    JoinTime = DateTime.UtcNow,
                    CreatorId = userId,
                    IsCompany = true,
                });
                var result = await db.SaveMessageAsync();
                if (result != null)
                    sb.Append(result);
            }
            return sb.Length == 0 ? null : sb.ToString();
        }
        public async Task<string> GerenateComments(TDContext db, Blog Blog, App App, Comment Parent, int count, string userId)
        {
            var blogs = Blogs.Split(' ');
            string content, id;
            if (db.Users.Count() < 5)
            {
                var str = await GenUsers(db, userId);
                if (str != null) return str;
            }
            var lstUser = db.Users.Select(x => x.Id).ToList();
            var len = lstUser.Count;
            var random = new Random();
            var sb = new StringBuilder();
            string result = "";
            for (int i = 0; i < count; i++)
            {
                content = getRandom(random, blogs, 50);
                id = GetCommentId(db);
                if (!db.Comments.Any(x => x.Id == id))// == safeName))
                {

                    var data = new Comment
                    {
                        Id = id,
                        Content = content,
                        Blog = Blog,
                        App = App,
                        Parent = Parent,
                        UserId = lstUser[random.Next(len)],
                        LastModify = DateTime.UtcNow,
                    };
                    db.Comments.Add(data);

                    result = await db.SaveMessageAsync();
                    if (result != null)
                        sb.Append(result);
                }


            }

            return sb.Length > 0 ? sb.ToString() : null;

        }
        string getRandom(Random random, string[] lst, int? max = null)
        {
            StringBuilder sb = new StringBuilder();

            int i = 0, j = 0;
            if (max != null)
            {
                j = max.Value;
            }
            else
            {
                j = random.Next(3, 10);
            }
            for (; i < j; i++)
            {
                sb.Append(lst[random.Next(0, lst.Length)] + " ");
            }
            return sb.ToString();
        }

        string Blogs = "Need to wrap an odd-shaped () gift  Create a box for it  Measure it up choose a template and print it This page is a resource for DIY artists graphics designers and everyone who likes paper crafts like me It contains an ever growing number of templates for gift boxes and increasingly more other interesting things that can be made out of paper What makes this site special is that the templates are all dynamic: you can customize almost all dimensions All templates are free no login is required A piece of cake Literally A wedge-shaped box that can be used to store pieces of cake The box consists of an upper and a lower part The upper part is the cover The lower part is a flat pack that doesn't need glue because it will be locked by cover By default the cover is 5% larger then the bottom but this can be adjusted in the expert settings The angle is a measure for how big a piece of cake can fit in Look in the figure if you don't know what to enter here For example an angle of 30 is large enough for 1 piece from a 12-piece cake The length is the length of the piece which should be about half the diameter of the complete cake Be sure to add some allowance here ";

        string TagBlogs = "CS,.Net,Code,Tutorial,Mobile,Android,iOS,Win Phone,Free,Event,PhoneGap,DevExtreme,DevExpress,HTML5,CSS3,JavaScript,jQuery,icon";
        string AppFeatures = "Windows,iOS,Android,WinPhone,Web,HTML5,CSS3,JavaScript,jQuery,Người dùng tối đa,Cơ sở dữ liệu,Kích thước dữ liệu,Phân quyền người dùng,Điều khiển từ xa,Mạng nội bộ,Kết nối internet,Tự động sao lưu dữ liệu,Cloud Server";
    }
}