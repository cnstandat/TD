using System;
using System.Data.Entity;

namespace TD.Models
{
    public partial class TDContext
    {
        public DbSet<App> Apps { get; set; }
        public DbSet<AppVersion> AppVersions { get; set; }
        public DbSet<AppFeature> AppFeatures { get; set; }
        public DbSet<FeatureApp> FeatureApps { get; set; }
        public DbSet<VersionFeature> VersionFeatureApps { get; set; }
        private void RegisterApp_AppFeatures(DbModelBuilder modelBuilder)
        {
            var app = modelBuilder.Entity<App>();
            app.HasKey(x => x.Id);
            app.Property(x => x.Id).HasMaxLength(16);
           
            app.HasRequired(x => x.Modify).WithMany(x => x.Apps).HasForeignKey(x => x.ModiyId).WillCascadeOnDelete(false);
            var featureApp = modelBuilder.Entity<FeatureApp>();
            featureApp.HasKey(x => x.Id);
            featureApp.Property(x => x.Id).HasMaxLength(20);

            var appfeature = modelBuilder.Entity<AppFeature>();
            appfeature.HasKey(x => new { x.AppId, x.FeatureAppId });
            appfeature.HasRequired(x => x.App).WithMany(x => x.Features).HasForeignKey(x => x.AppId).WillCascadeOnDelete(false);
            appfeature.HasRequired(x => x.FeatureApp).WithMany(x => x.Features).HasForeignKey(x => x.FeatureAppId).WillCascadeOnDelete(false);

            var appVersion = modelBuilder.Entity<AppVersion>();
            appVersion.HasKey(x => new { x.AppId, x.Version });
            appVersion.HasRequired(x => x.App).WithMany(x => x.Versions).HasForeignKey(x => x.AppId);

            var verFeatures = modelBuilder.Entity<VersionFeature>();
            verFeatures.HasKey(x => new
            {
                x.AppId,
                x.Version,
                x.FeatureAppId
            });
            verFeatures.HasRequired(x => x.App).WithMany(x => x.VersionFeatures).HasForeignKey(x => x.AppId).WillCascadeOnDelete(false);
            verFeatures.HasRequired(x => x.FeatureApp).WithMany(x => x.Versions).HasForeignKey(x => x.FeatureAppId).WillCascadeOnDelete(false);

            
        }
       
    }
}