using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TD.Models;
using TD.Models.Views;

namespace TD
{
    public class AppDB
    {
        public async Task<DBAction> Create(AppEditModel dataModel, string userId)
        {
            using (var db = new TDContext())
            {
                dataModel.Id = new DBHelper().GetAppId(db);
              
               
                var app = new App(dataModel);
                app.ModiyId = userId;
                app.LastModify = DateTime.UtcNow;
                var gallery = new GalleryDB(db).Create(app);
                if (!string.IsNullOrEmpty(dataModel.ImageData))
                {

                    var save = await db.SaveImage(dataModel.ImageData, "apps", null);
                    if (!save.OK) return new DBAction(save.Message, false);
                    gallery.AppFiles.Add(save.Image);
                }
                db.Apps.Add(app);
                var str = await db.SaveMessageAsync();
                if (!string.IsNullOrEmpty(str))
                    return new DBAction(str, false);
                return new DBAction(app.Id);
            }

        }
        public async Task<DBAction> Edit(AppEditModel dataModel, string userId)
        {
            using (var db = new TDContext())
            {
                var app = await db.Apps.FindAsync(dataModel.Id);
                if (app == null) return new DBAction(LanguageDB.NotFound, false);
                app.Name = dataModel.Name;
                app.Link = dataModel.Link;
                app.Content = dataModel.Content;
                app.Database = dataModel.Database;
                app.ModiyId = userId;
                app.LastModify = DateTime.UtcNow;
                if (!string.IsNullOrEmpty(dataModel.ImageData))
                {
                    var gallery = app.Galleries.FirstOrDefault();
                    if (gallery == null)
                        gallery = new GalleryDB(db).Create(app);
                    var image = gallery.AppFiles.FirstOrDefault();
                    AppFileValue save;
                    if (image != null)
                        save = await db.SaveImage(dataModel.ImageData, "apps", image.Id);
                    else save = await db.SaveImage(dataModel.ImageData, "apps", null);
                    if (!save.OK) return new DBAction(save.Message, false);
                    image = save.Image;
                }
             

                db.Entry(app).State = EntityState.Modified;
                var str = await db.SaveMessageAsync();
                if (!string.IsNullOrEmpty(str)) return new DBAction(str, false);
                return new DBAction(app.Id);

            }
        }
        public async Task<string> Delete(string id)
        {
            if (string.IsNullOrEmpty(id)) return ((TD.Global.NoData));
            using (var db = new TDContext())
            {
                App app = await db.Apps.FindAsync(id);
                if (app == null) return (LanguageDB.NotFound);


                db.Apps.Remove(app);
                var galleries = db.Galleries.Where(x => x.AppId == app.Id).Select(x => x.Id).ToList();
                if (galleries != null && galleries.Count > 0)
                {
                    var galleryDB = new GalleryDB(db);
                    for (int i = 0, j = galleries.Count; i < j; i++)
                    {
                        await galleryDB.Delete(galleries[i]);
                    }
                }
                var str = await db.SaveMessageAsync();
                if (!string.IsNullOrEmpty(str)) return str;


                return "";
                //return (Js.SuccessRedirect(AppRemove, TD.Properties.Resources.AdminAppsLink));
            }

        }
    }
    public class AppFileDB
    {
        TDContext db;
        public AppFileDB()
        {
            this.db = new TDContext();
        }
        public AppFileDB(TDContext db)
        {
            this.db = db;
        }
        public async Task Delete(string id, string path)
        {

            var img = await db.AppFiles.FindAsync(id);
            if (img == null)
                return;
            string fullPath = HttpContext.Current.Server.MapPath("~" + (string.IsNullOrEmpty(path) ? img.FileName : path));
            db.AppFiles.Remove(img);

            var str = await db.SaveMessageAsync();
            if (!string.IsNullOrEmpty(str)) return;
            fullPath.DeleteFile();


        }
    }
    public class GalleryDB
    {
        TDContext db;
        public GalleryDB()
        {
            db = new TDContext();
        }
        public GalleryDB(TDContext db)
        {
            this.db = db;
        }
        public async Task<DBAction> Delete(string id)
        {
            if (string.IsNullOrEmpty(id)) return new DBAction(LanguageDB.NotFound, false);
            var data = db.Galleries.Find(id);
            if (data == null) return new DBAction(LanguageDB.NotFound, false);
            var files = await db.AppFiles.Where(x => x.GalleryId == id).Select(x => x.Id).ToListAsync();
            var listFile = new List<string>();
            if (files != null && files.Count > 0)
            {
                var sb = new StringBuilder();

                foreach (var item in files)
                {
                    var file = db.AppFiles.Find(item);
                    if (file != null)
                    {
                        db.AppFiles.Remove(file);
                        listFile.Add(file.FullPath);
                    }
                }
            }
            db.Galleries.Remove(data);
            var str = await db.SaveMessageAsync();
            if (!string.IsNullOrEmpty(str)) return new DBAction(str, false);
            for (int i = 0, j = listFile.Count; i < j; i++)
            {
                HttpContext.Current.Server.MapPath("~" + listFile[i]).DeleteFile();
            }
            return new DBAction();
        }
        public Gallery Create()
        {
            var gallery = new Gallery(new DBHelper().GetGalleryId(db));
            db.Galleries.Add(gallery);
            return gallery;
        }
        public Gallery Create(App product)
        {
            var gallery = new Gallery(new DBHelper().GetGalleryId(db))
            {
                App = product
            };
            db.Galleries.Add(gallery);
            return gallery;
        }
        public Gallery CreateBlog(Blog product)
        {
            var gallery = new Gallery(new DBHelper().GetGalleryId(db))
            {
                Blog = product
            };
            db.Galleries.Add(gallery);
            return gallery;
        }
    }
    public class AppCategoryDB
    {
        private TDContext db;

        public AppCategoryDB(TDContext db)
        {
            this.db = db;
        }
        public List<SelectListItem> GetSelectList()
        {

            var lst = new List<SelectListItem>();
            foreach (var item in db.ProductCategories)
                lst.Add(new SelectListItem
                {
                    Value = item.Id,
                    Text = item.Name
                });
            return lst;
        }

    }
    public class UserDB
    {
        public async Task<User> FindOrCreate(string IdOrName, string creator)
        {
            var data = db.Users.Find(IdOrName);
            if (data != null) return data;
            data = await db.Users.FirstOrDefaultAsync(x => x.UserName == IdOrName);
            if (data != null) return data;
            data = new User()
            {
                UserName = IdOrName,
                PasswordHash = IdOrName.ToEncrypt(),
                JoinTime = DateTime.Now,
                CreatorId = creator,
            };
            db.Users.Add(data);
            if (await db.SaveMessageAsync()!=null)
                return null;
            return data;

        }
        public UserDB()
        {
            db = new TDContext();
        }
        public UserDB(TDContext db)
        {
            this.db = db;
        }

        public TDContext db { get; set; }
    }
    public class RoleDB
    {
        public async Task<IdentityRole> FindOrCreate(string IdOrName)
        {
            var data = db.Roles.Find(IdOrName);
            if (data != null) return data;
            data = await db.Roles.FirstOrDefaultAsync(x => x.Name == IdOrName);
            if (data != null) return data;
            data = new IdentityRole()
            {
                Name = IdOrName,

            };
            db.Roles.Add(data);
            if (await db.SaveMessageAsync() !=null)
                return null;
            return data;

        }
        public RoleDB()
        {
            db = new TDContext();
        }
        public RoleDB(TDContext db)
        {
            this.db = db;
        }

        public TDContext db { get; set; }
    }
    public class AppRoleDB
    {
        public async Task<AppRole> FindOrCreate(string IdOrName, string AppId, string ClientId)
        {
            var data = await db.AppRoles.FindAsync(IdOrName);
            if (data != null) return data;
            data = await db.AppRoles.FirstOrDefaultAsync(x => x.Name == IdOrName);
            if (data != null) return data;
            data = new AppRole(new DBHelper().GetAppRoleId(db), IdOrName, ClientId, AppId);
            db.AppRoles.Add(data);
            if (await db.SaveMessageAsync()!=null)
                return null;
            return data;

        }
        public AppRoleDB()
        {
            db = new TDContext();
        }
        public AppRoleDB(TDContext db)
        {
            this.db = db;
        }

        public TDContext db { get; set; }
    }
    public class CommentDB
    {
        private TDContext db;

        public CommentDB()
        {
            db = new TDContext();
        }

        public CommentDB(TDContext db)
        {
            this.db = db;
        }

        public async Task Delete(string id)
        {

            var comment = await db.Comments.FindAsync(id);
            if (comment == null) return;

            var allChild = await db.Comments.Where(x => x.ParentId == id).Select(x => x.Id).ToListAsync();

            foreach (var item in allChild)
            {
                await Delete(item);
            }
            db.Comments.Remove(comment);
        }

    }
    public class BlogDB
    {
        private TDContext db;

        public BlogDB()
        {
            db = new TDContext();
        }

        public BlogDB(TDContext db)
        {
            this.db = db;
        }
        public async Task<string> Delete(string id)
        {
            var blog = await db.Blogs.FindAsync(id);
            if (blog == null) return LanguageDB.NotFound;
            var comments = await db.Comments.Where(x => x.BlogId == id).Select(x => x.Id).ToListAsync();
            var commentDB = new CommentDB(db);
            foreach (var item in comments)
            {
                await commentDB.Delete(item);
            }
            var galleryDB = new GalleryDB(db);
            var gallery = await db.Galleries.Where(x => x.BlogId == id).Select(x => x.Id).ToListAsync();
            foreach (var item in gallery)
            {
                await galleryDB.Delete(item);
            }
            db.Blogs.Remove(blog);
            var str = await db.SaveMessageAsync();
            return str;
        }
    }
    public class PartnerDB
    {
        public PartnerDB()
        {
            this.db = new TDContext();
        }
        public PartnerDB(TDContext db)
        {
            this.db = db;
        }
        public async Task<Partner> FindOrAdd(string IdOrName)
        {
            var client = db.Partners.Find(IdOrName);
            if (client == null)
            {
                client = db.Partners.FirstOrDefault(x => x.Name == IdOrName);
                if (client != null) return client;
                client = new Partner(new DBHelper().GetPartnerId(db), IdOrName);
                db.Partners.Add(client);
                if (await db.SaveMessageAsync() !=null) return null;
                return client;
            }
            return client;
        }
        public List<SelectListItem> GetSelectList()
        {

            var lst = new List<SelectListItem>();
            foreach (var item in db.Partners)
                lst.Add(new SelectListItem
                {
                    Value = item.Id,
                    Text = item.Name
                });
            return lst;
        }
        public TDContext db { get; set; }
    }
    public class TagBlogDB
    {
        public async Task<TagBlog> FindOrCreate(string IdOrName)
        {
            var data = await db.TagBlogs.FindAsync(IdOrName);
            if (data != null) return data;
            data = await db.TagBlogs.FirstOrDefaultAsync(x => x.Name == IdOrName);
            if (data != null) return data;
            data = new TagBlog()
            {
                Id = new DBHelper().GetTagBlogId(db),
                Name = IdOrName,
            };
            db.TagBlogs.Add(data);
            if ((await db.SaveMessageAsync()!=null))
                return null;
            return data;

        }
        public async Task<List<string>> FindOrCreate(string[] IdOrNames)
        {
            var lst = new List<string>();
            if (IdOrNames == null || IdOrNames.Length == 0) return lst;
            foreach (var item in IdOrNames)
            {
                var tag = await FindOrCreate(item);
                if (tag != null) lst.Add(tag.Id);
            }
            return lst;
        }
        public TagBlogDB()
        {
            db = new TDContext();
        }
        public TagBlogDB(TDContext db)
        {
            this.db = db;
        }

        public TDContext db { get; set; }
    }
}