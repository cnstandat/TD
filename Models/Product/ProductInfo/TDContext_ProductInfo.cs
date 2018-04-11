using System;
using System.Data.Entity;

namespace TD.Models
{
    public partial class TDContext
    {
    
        public DbSet<AppInfo> AppInfoes { get; set; }
        public DbSet<InfoApp> InfoApps { get; set; }
        public DbSet<VersionInfo> VersionInfoes { get; set; }
        void Register_AppInfo(DbModelBuilder modelBuilder)
        {
            
            var infoApp = modelBuilder.Entity<InfoApp>();
            infoApp.HasKey(x => x.Id);
            infoApp.Property(x => x.Id).HasMaxLength(20);
            var categoryAppInfo = modelBuilder.Entity<AppCategoryFeature>();
            categoryAppInfo.HasKey(x => new
            {
                x.AppCategoryId,
                x.InfoAppId
            });
            categoryAppInfo.HasRequired(x => x.AppCategory).WithMany(x => x.Information).HasForeignKey(x => x.AppCategoryId);
            categoryAppInfo.HasRequired(x => x.InfoApp).WithMany(x => x.CategoryInformation).HasForeignKey(x => x.InfoAppId);

            var producInfo = modelBuilder.Entity<AppInfo>();
            producInfo.HasKey(x => new
            {
                x.AppId,
                x.InfoAppId
            });
            producInfo.HasRequired(x => x.App).WithMany(x => x.Information).HasForeignKey(x => x.AppId);
            producInfo.HasRequired(x => x.InfoApp).WithMany(x => x.Information).HasForeignKey(x => x.InfoAppId);

            var version = modelBuilder.Entity<VersionInfo>();
            version.HasKey(x => new
            {
                x.AppId,
                x.LicenseType,
                x.InfoAppId
            });
            version.HasRequired(x => x.App).WithMany(x => x.VersionInfomation).HasForeignKey(x => x.AppId);
            version.HasRequired(x => x.InfoApp).WithMany(x => x.Versions).HasForeignKey(x => x.InfoAppId);
        }

        
    }
}