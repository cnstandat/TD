using System;
using System.Collections.Generic;
using TD.Models.Views;

namespace TD.Models
{
    public class App
    {

        public App(AppEditModel data)
        {
            this.Id = data.Id;
            this.Name = data.Name;
            this.Link = data.Link;
            this.Database = data.Database;
            this.Content = data.Content;
        }
        public string Id { get; set; }
        public string Database { get; set; }
        public string Link { get; set; }
        public string ModiyId { get; set; }
        public DateTime LastModify { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public string CreatorId { get; set; }
        public virtual User Modify { get; set; }
        public virtual User Creator { get; set; }
        public virtual ICollection<ClientApp> Partners { get; set; } // App Only
        public virtual ICollection<Blog> Blogs { get; set; }
        public virtual ICollection<AppVersion> Versions { get; set; } // App Only
        public virtual ICollection<AppFeature> Features { get; set; } // App Only
        public ICollection<VersionFeature> VersionFeatures { get; set; } // App Only
        public ICollection<PartnerTalk> PartnerTalks { get; set; } // App Only
        public virtual ICollection<Gallery> Galleries { get; set; }
        public virtual ICollection<UserApp> UserApps { get; set; }
        public virtual ICollection<AppRole> AppRoles { get; set; }
        public virtual ICollection<CartItem> Carts { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        public App()
        {
            Partners = new List<ClientApp>();
            Blogs = new List<Blog>();
            Versions = new List<AppVersion>();
            Features = new List<AppFeature>();
            VersionFeatures = new List<VersionFeature>();
            UserApps = new List<UserApp>();
            AppRoles = new List<AppRole>();
            Carts = new List<CartItem>();
            Comments = new List<Comment>();
        }
    }
    public class VersionFeature
    {

        public VersionFeature()
        {

        }
        public VersionFeature(VersionFeatureEditModel data)
        {
            this.AppId = data.AppId;
            this.Version = data.Version;
            this.FeatureAppId = data.FeatureAppId;
            this.Content = data.Content;
        }
        public string AppId { get; set; }
        public LicenseType Version { get; set; }
        public virtual App App { get; set; }
        public string FeatureAppId { get; set; }
        public virtual FeatureApp FeatureApp { get; set; }
        public string Content { get; set; }
    }
    public class FeatureApp
    {

        public FeatureApp()
        {
            Features = new List<AppFeature>();
            Versions = new List<VersionFeature>();
        }
        public FeatureApp(string Id, string Name) : this()
        {
            this.Id = Id;
            this.Name = Name;
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public ValueType ValueType { get; set; }
        public ICollection<AppFeature> Features { get; set; }
        public ICollection<VersionFeature> Versions { get; set; }
        public ICollection<ProductCategoryInfo> Category { get; set; }
    }
    public class AppFeature
    {
        public AppFeature()
        {
        }
        public AppFeature(string appId, string FeatureAppId)
        {
            this.AppId = appId;
            this.FeatureAppId = FeatureAppId;
        }
        public string AppId { get; set; }
        public string FeatureAppId { get; set; }
        public virtual FeatureApp FeatureApp { get; set; }
        public virtual App App { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }
    }
    public class AppVersion
    {
        public AppVersion()
        {

        }
        public AppVersion(AppVersionView data)
        {
            this.AppId = data.AppId;
            this.Version = data.Version;
            this.Price = data.Price;
            this.OldPrice = data.OldPrice;
            this.Discount = data.Discount;
        }
        public string AppId { get; set; }
        public virtual App App { get; set; }
        public LicenseType Version { get; set; }
        public string Price { get; set; }
        public string OldPrice { get; set; }
        public string Discount { get; set; }
        public string Spelcial1 { get; set; }
        public string Spelcial2 { get; set; }
    }

}