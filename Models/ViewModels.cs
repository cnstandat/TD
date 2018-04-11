using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace TD.Models.Views
{
    public class ImageView
    {
        
        public ImageView()
        {
            
        }
        public ImageView(AppFile data)
        {
            this.Id = data.Id;
            this.IsMain = data.IsMain;
            this.FullPath = data.FullPath;
        }
        public string Id { get; set; }
        public string ImageData { get; set; }
        public string BlogId { get; set; }
        public string AppId { get; set; }
        public string FullPath { get; set; }
        public bool IsMain { get; set; }
        public string GalleryId { get; set; }
    }
    public class UserView
    {
        public UserView()
        {
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

    }
    public class AppEditModel
    {
        public AppEditModel()
        {

        }
        public AppEditModel(IEnumerable<SelectListItem> Categories) //Edit
        {
            this.Id = Guid.NewGuid().ToString();
            this.Image = "/data/img_svg/noavatar.png";
        }
        public AppEditModel(App data) //View
        {
            this.Id = data.Id;
            this.Name = data.Name;
            this.Link = data.Link;
            var gallery = data.Galleries.FirstOrDefault();
            this.Content = data.Content;
            this.strAppTypes = "";
        }
        public AppEditModel(App data, IEnumerable<SelectListItem> Categories) //Edit
        {
            this.Id = data.Id;
            this.Name = data.Name;
            this.Database = data.Database;
            this.PartnerCount = data.Partners.Count;
            this.Link = data.Link;
            this.Content = data.Content;
            var lstSelected = new List<string>();
        }
        public string Image { get; set; }
        [Required]
        public string Id { get; set; }
        [Required]
        [MinLength(2)]
        public string Name { get; set; }
        public string Price { get; set; }
        [AllowHtml]
        public string ImageData { get; set; }
        public int PartnerCount { get; set; }
        public string Link { get; set; }
        public string Database { get; set; }
        public string strAppTypes { get; private set; }
        public string Content { get; set; }
    }
    public class AppVersionView
    {
        public AppVersionView() { }
        public AppVersionView(AppVersion data)
        {

            this.AppId = data.AppId;
            this.AppName = data.App.Name;
            this.Version = data.Version;
            this.VersionName = data.Version.GetEnumDescription();
            this.Price = data.Price;
            this.OldPrice = data.OldPrice;
            this.Discount = data.Discount;
        }
        public AppVersionView(AppVersion data, bool GetChild) : this(data)
        {
            FeatureApps = new List<VersionFeatureEditModel>();

        }
        [Required]
        public string Selected { get; set; }


        public IEnumerable<SelectListItem> AllVersions { get; set; }
        public string VersionName { get; set; }
        public LicenseType Version { get; set; }
        public string Price { get; set; }
        public string OldPrice { get; set; }
        public string Discount { get; set; }
        [Required]
        public string AppId { get; set; }
        public List<VersionFeatureEditModel> FeatureApps { get; set; }
        public string AppName { get; set; }
    }
    public class FeatureAppView
    {

        public FeatureAppView()
        {

        }
        public FeatureAppView(FeatureApp data)
        {
            Id = data.Id;
            Name = data.Name;
        }
        public string Id { get; set; }
        [Required]
        [MinLength(1)]
        public string Name { get; set; }
    }
    public class AppFeatureView
    {
        public AppFeatureView() { }
        public AppFeatureView(AppFeature data)
        {
            this.AppId = data.AppId;
            this.AppName = data.App.Name;
            this.FeatureAppId = data.FeatureAppId;
            this.FeatureAppName = data.FeatureApp.Name;
            this.Content = data.Content;
            this.Order = data.Order;
        }
        public AppFeatureView(AppFeature data, bool Load)
        {
            this.AppId = data.AppId;
            this.AppName = data.App.Name;
            this.FeatureAppId = data.FeatureAppId;
            this.FeatureAppName = data.FeatureApp.Name;
            this.Content = data.FeatureApp.Name + data.Content;
            this.Order = data.Order;
        }
        [Required]
        public string AppId { get; set; }

        public string FeatureAppId { get; set; }
        public string FeatureAppName { get; set; }
        [Required]
        public string Selected { get; set; }
        public IEnumerable<SelectListItem> FeatureApps { get; set; }
        [AllowHtml]
        public string Content { get; set; }
        public string AppName { get; set; }
        [Required]
        public int Order { get; set; }
    }

    public class VersionFeatureEditModel
    {

        public VersionFeatureEditModel()
        {

        }
        public VersionFeatureEditModel(VersionFeature data)
        {
            this.AppId = data.AppId;
            this.FeatureAppName = data.FeatureApp.Name;
            this.Version = data.Version;
            this.FeatureAppId = data.FeatureAppId;
            this.Content = data.Content;
            this.AppName = data.App.Name;
        }
        public VersionFeatureEditModel(VersionFeature data, bool Load)
        {
            this.AppId = data.AppId;
            this.FeatureAppName = data.FeatureApp.Name;
            this.Version = data.Version;
            this.FeatureAppId = data.FeatureAppId;
            this.Content = data.FeatureApp.Name + data.Content;
            this.AppName = data.App.Name;
        }
        [Required]
        public string AppId { get; set; }
        [Required]
        public string Selected { get; set; }
        public IEnumerable<SelectListItem> FeatureApps { get; set; }
        [Required]
        public string FeatureAppId { get; set; }
        [Required]
        public LicenseType Version { get; set; }
        [AllowHtml]
        public string Content { get; set; }
        public string FeatureAppName { get; set; }
        public string AppName { get; set; }
    }

    public class ClientAppEditModel
    {

        public ClientAppEditModel()
        {

        }
        public string AppId { get; set; }
        public string AppName { get; set; }
        public string ClientId { get; set; }
        public string ClientName { get; set; }
        public DateTime Start { get; set; }
        public DateTime? Expires { get; set; }


        public string LicenseType { get; set; }
        public IEnumerable<SelectListItem> Partners { get; set; }
        public IEnumerable<SelectListItem> LicenseTypes { get; set; }
    }
    public class UserAppEditModel
    {

        public UserAppEditModel()
        {

        }
        public string AppId { get; set; }
        public string AppName { get; set; }
        public string ClientId { get; set; }
        public string ClientName { get; set; }
        public string UserId { get; set; }
        public string RoleId { get; set; }
    }
    public class PartnerEditView
    {
        public PartnerEditView()
        {

        }

        [Required]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public string TaxNumber { get; set; }
        public string ImageData { get; set; }
    }


    public class RoleViewModel
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
    public class UserViewModel
    {
        public string Id { get; set; }
        [Required]
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool CantSay { get; set; }
        public string[] RoleId { get; set; }
        //The list of all cars
        public DateTime Created { get; set; }
    
        public string Sign { get; set; }
    }

    public class TagBlogViewModel
    {
        public string Name { get; set; }
        public string FullName { get; set; }
        public int BlogCount { get; set; }
    }
    public class FaucetView
    {
        
        public FaucetView()
        {
            
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Image { get; set; }
        public int Time { get; set; }
        public int Min { get; set; }
        public int Max { get; set; }
        public FaucetType FaucetType { get; set; }
        public CaptchaType CaptchaType { get; set; }
        public string Resolve { get; set; }
    }




    public class CommentFormViewModel
    {

        public CommentFormViewModel()
        {

        }
        public string BlogId { get; set; }
        public string CommentId { get; set; }
        public string BlogName { get; set; }
    }
    public class CommentSaysViewModel
    {

        public CommentSaysViewModel()
        {

        }
        public string UserAvatar { get; set; }
        public string UserName { get; set; }
        public string Content { get; set; }
    }
    public class AppBlogViewModel
    {
        public string AppId { get; set; }
        public IEnumerable<BlogViewModel> Blogs { get; set; }
    }
    public class BlogEditModel
    {
       
        public string Id { get; set; }
        public string Name { get; set; }
        [Display(Name = "Nhãn bài viết")]
        [Required]
        public string[] TagBlogId { get; set; }
       
        public string ParentId { get; set; }
       
        [Display(Name = "Tiêu đề")]
        [Required]
        public string FullName { get; set; }
        public string Summary { get; set; }
        public string LongSummary { get; set; }
        public string UserId { get; set; }
        [Display(Name = "Nội dung")]
        [AllowHtml]
        public string Content { get; set; }
        public string ReasonModify { get; set; }
        public string ImageData { get; set; }
        public bool MarkDelete { get; set; }
        public bool Closed { get; set; }
        public string AppId { get; set; }
        public string AppName { get; set; }

    }
    
    public class BlogViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public string Image { get; set; }
        [Display(Name = "Nội dung")]
        [AllowHtml]
        public string Content { get; set; }

        [Display(Name = "Lý do chỉnh sửa")]
        public string ReasonModify { get; set; }
        [Display(Name = "Đánh dấu xóa")]
        public bool MarkDelete { get; set; }
        [Display(Name = "Đã đóng")]
        public bool Closed { get; set; }
        public DateTime LastModify { get; set; }
        public string UtcLastModify
        {
            get
            {
                return LastModify.ToUtcString();
            }
        }
        public string AppId { get; set; }
        public string AppName { get; set; }
        public IEnumerable<TagBlogViewModel> TagBlogs { get; set; }
        public string Creator { get; set; }
        public int CommentCount { get; set; }
        public int Viewed { get; set; }
        public string Summary { get; set; }
        public string LongSummary { get; set; }
        public int Page { get; set; }
        public string LastModifyUtc { get; set; }
        public bool CanComment { get; set; }
        public string Twitter
        {
            get
            {
                return string.Format("https://twitter.com/home?status=http%3A//cnstandat.net/Viewpost/{0}/read", Name);
            }
        }
        public string Google
        {
            get
            {
                return string.Format("https://plus.google.com/share?url=http%3A//cnstandat.net/Viewpost/{0}/read", Name);
            }
        }
        public string Facebook
        {
            get
            {
                return string.Format("https://www.facebook.com/sharer/sharer.php?u=http%3A//cnstandat.net/Viewpost/{0}/read", Name);
            }
        }
    }
    public class GalleryEditViewModel
    {
        
        public GalleryEditViewModel()
        {
            
        }
        public string Id { get; set; }
        public string AppFileId { get; set; }
        [AllowHtml]
        public string Name { get; set; }
        [AllowHtml]
        public string Subtitle { get; set; }
        [AllowHtml]
        public string Link { get; set; }
        [AllowHtml]
        public string VideoLink { get; set; }
        [AllowHtml]
        public string ButtonText { get; set; }
        public bool InHome { get; set; }
        public string ImageData { get; set; }
    }
    public class DPageViewModel
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [AllowHtml]
        public string Content { get; set; }
        public bool isPage { get; set; }
    }
    public class HomeBlogViewModel
    {

        public HomeBlogViewModel()
        {

        }
        public HomeBlogViewModel(Blog s)
        {
            ShortName = s.Name;
            FullName = s.FullName;
            Id = s.Id;
            //if (s.AppFileId != null)
            //{
            //    this.Image = string.Format("/data/img/blogs/blog_{0}.jpg", s.Id);
            //}

            Creator = s.User.UserName;
            CommentCount = s.Comments.Count;
            Viewed = s.Viewed;
            Summary = s.Summary;
            LastModifyUtc = s.LastModify.ToUtcString();

        }

        public HomeBlogViewModel(Blog s, bool LongSummary)
        {
            ShortName = s.Name;
            FullName = s.FullName;
            Id = s.Id;
            //if (s.AppFileId != null)
            //{
            //    this.Image = string.Format("/data/img/blogs/blog_{0}.jpg", s.Id);
            //}

            Creator = s.User.UserName;
            CommentCount = s.Comments.Count;
            Viewed = s.Viewed;
            Summary = s.LongSummary;
            LastModifyUtc = s.LastModify.ToUtcString();
        }

        public string Id { get; set; }
        public string ShortName { get; set; }
        public string FullName { get; set; }
        public string Image { get; set; }
        public string Creator { get; set; }
        public int CommentCount { get; set; }
        public int Viewed { get; set; }
        public string Summary { get; set; }
        public string LastModifyUtc { get; set; }

        public string Twitter
        {
            get
            {
                return string.Format("https://twitter.com/home?status=http%3A//cnstandat.net/Viewpost/{0}/read", ShortName);
            }
        }
        public string Google
        {
            get
            {
                return string.Format("https://plus.google.com/share?url=http%3A//cnstandat.net/Viewpost/{0}/read", ShortName);
            }
        }
        public string Facebook
        {
            get
            {
                return string.Format("https://www.facebook.com/sharer/sharer.php?u=http%3A//cnstandat.net/Viewpost/{0}/read", ShortName);
            }
        }

    }
    public class UserBlogView
    {

        public UserBlogView()
        {

        }
        public UserBlogView(Blog s)
        {
            FullName = s.FullName;
            Id = s.Id;
            CommentCount = s.Comments.Count;
            Viewed = s.Viewed;
            LastModifyUtc = s.LastModify.ToString("dd/MM/yy HH:mm");
        }

        public string Id { get; set; }
        public string ShortName { get; set; }
        public string FullName { get; set; }
        public int CommentCount { get; set; }
        public int Viewed { get; set; }

        public string LastModifyUtc { get; set; }


    }
    public class NavBlogViewModel
    {
        public BlogViewModel Last { get; set; }
        public BlogViewModel Next { get; set; }
    }
    public class AuthorViewModel
    {

        public AuthorViewModel()
        {

        }

        public AuthorViewModel(User user)
        {
            this.Name = user.UserName;
            this.BlogCount = user.BlogCreated.Count;
            this.CommentCount = user.CommentCreated.Count;
            this.JoinTime = user.JoinTime.ToString("dd/MM/yy");
            this.Sign = user.Sign;
            this.ProfileLink = string.Format("/Account/Profile/{0}", user.UserName);
            if (user.AvatarId != null)
            {
                this.Image = string.Format("/data/img/users/{0}.jpg", user.Id);
            }
            else
            {
                this.Image = "/data/site_svg/noavatar.png";
            }
            this.BlogCreatedLink = string.Format("/Account/Profile/{0}", user.UserName);
            this.BlogCommentedLink = string.Format("/Account/Profile/{0}", user.UserName);
        }

        public string Name { get; set; }
        public string JoinTime { get; set; }
        public string Image { get; set; }
        public string Sign { get; set; }
        public int BlogCount { get; set; }
        public int CommentCount { get; set; }
        public string ProfileLink { get; set; }
        public string BlogCreatedLink { get; set; }
        public string BlogCommentedLink { get; set; }
    }

    public class AppGalleryView
    {
        public string AppId { get; set; }
        public string AppName { get; set; }
        public bool IsLarge { get; set; }
        public string GalleryId { get; set; }
        public string AppFileId { get; set; }
        public string FileName { get; set; }
        public string Data { get; set; }
    }
    public class AppGallerys
    {
        public string AppId { get; set; }
        public string GalleryId { get; set; }
        public virtual IEnumerable<AppGalleryView> Gallerys { get; set; }

    }
    
    public class ManageLoginsViewModel
    {
        public IList<UserLoginInfo> CurrentLogins { get; set; }
        public IList<AuthenticationDescription> OtherLogins { get; set; }
    }

    public class UserInfoView
    {
        public UserInfoView()
        {

        }
        public UserInfoView(User data)
        {
            this.Id = data.Id;
            this.UserName = data.UserName;
            this.FullName = data.FullName;
            if (!string.IsNullOrEmpty(data.FullName))
            {
                NameClass = "valid";
            }
            if (!string.IsNullOrEmpty(data.UserName))
            {
                this.UserNameClass = "valid";
            }
            this.Phone = data.PhoneNumber;
            if (data.PhoneNumberConfirmed) this.PhoneClass = "valid";
            this.Email = data.Email;
            this.Created = data.JoinTime;
            this.CantSay = data.CantSay;
            this.Sign = data.Sign;
            if (data.EmailConfirmed) EmailClass = "valid";
            this.Avatar = data.AvatarId != null ? string.Format("/data/img/users/{0}", data.Avatar.FileName) : "/data/site_svg/noavatar.png";

        }
        public string Id { get; set; }
        public string Avatar { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string EmailClass { get; set; }
        public bool CantSay { get; set; }
        public string Sign { get; set; }
        public DateTime Created { get; set; }
        public string NameClass { get; set; }
        public string UserNameClass { get; set; }
        public string Phone { get; set; }
        public string PhoneClass { get; set; }
        
    }
   
    public class CommentViewModel
    {
        public CommentViewModel()
        {

        }
        public CommentViewModel(Comment model, bool hasChild)
        {
            this.Id = model.Id;
            this.Creator = model.User.UserName;
            this.Content = model.Content;
            this.CreatedUtc = model.Created.ToUtcString();
            this.CreatorAvatar = model.User.AvatarId != null ? "/data/img/users/" + model.UserId + ".jpg" : "/data/site_svg/noavatar.png";
            this.HasChild = hasChild;
        }
        public string Id { get; set; }
        public string Creator { get; set; }
        public string CreatorAvatar { get; set; }
        public bool HasChild { get; set; }
        [AllowHtml]
        public string Content { get; set; }
        public string CreatedUtc { get; set; }

    }
    public class UserCommentView
    {
        public UserCommentView()
        {

        }
        public UserCommentView(Comment model)
        {
            this.Id = model.Id;
            this.Content = model.Content;
            this.CreatedUtc = model.Created.ToString("dd/MM/yy HH:mm");
        }
        public string Id { get; set; }
        public string CreatedUtc { get; set; }
        public string Content { get; set; }

    }
    public class CommentAddModel
    {
        public string BlogId { get; set; }
        public string ParentId { get; set; }
        public string AppId { get; set; }
        [AllowHtml]
        public string Content { get; set; }
    }
    public class AdminCommentViewModel
    {

        public AdminCommentViewModel()
        {

        }
        public AdminCommentViewModel(Comment x)
        {
            this.Id = x.Id;
            this.Creator = x.User.UserName;
            this.Content = x.Content;
            this.Created = x.Created;
            this.ChildCount = x.Children.Count;
        }

        public string Id { get; set; }
        public string Creator { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public int ChildCount { get; set; }
    }
    public class CommentEditModel
    {

        public CommentEditModel()
        {

        }
        public CommentEditModel(Comment data)
        {
            this.Id = data.Id;
            this.BlogId = data.BlogId;
            this.Content = data.Content;
            this.Reason = "";
        }

        [Required]
        public string Id { get; set; }
        [Required]
        public string BlogId { get; set; }
        [AllowHtml]
        public string Content { get; set; }
        [Required]
        public string Reason { get; set; }
    }
   
    public class UserAppView
    {

        public UserAppView()
        {

        }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string AppId { get; set; }
        public string AppName { get; set; }
        public string AppLink { get; set; }
        public string ClientId { get; set; }
        public string PartnerName { get; set; }
        public string Database { get; set; }
        public bool IsAdmin { get; set; }
        public int Port { get; set; }
        public string Password { get; set; }
        public string ServerIp { get; set; }
    }

    public class ErrorViewModel
    {
        public string LinkReturn { get; set; }
        public string Title { get; set; }
        public string Error { get; set; }
        public string Description { get; set; }
    }
    public class ServerConfig
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public int Port { get; set; }
        public string AppId { get; set; }
        public string PartnerId { get; set; }
        public bool IsCloud { get; set; }
        public string LocalAddress { get; set; }
        public string PublicAddress { get; set; }
        public string PartnerName { get; set; }
    }

}