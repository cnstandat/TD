using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.Infrastructure.Annotations;

namespace TD.Models
{
    public partial class TDContext
    {
        public DbSet<ClientApp> ClientApps { get; set; }
        public DbSet<UserApp> UserApps { get; set; }
        public DbSet<AppRole> AppRoles { get; set; }
        private void RegisterApp_ClientUsing(DbModelBuilder modelBuilder)
        {
            var clienApp = modelBuilder.Entity<ClientApp>();
            clienApp.HasKey(x => new { x.ClientId, x.AppId });
            clienApp.HasRequired(x => x.Client).WithMany(x => x.Apps).HasForeignKey(x => x.ClientId).WillCascadeOnDelete(false);
            clienApp.HasRequired(x => x.App).WithMany(x => x.Partners).HasForeignKey(x => x.AppId).WillCascadeOnDelete(false);
            clienApp.HasRequired(x => x.Creator).WithMany(x => x.ClientAppCreated).HasForeignKey(x => x.CreatorId).WillCascadeOnDelete(false);
            clienApp.HasRequired(x => x.Modify).WithMany(x => x.ClientAppModify).HasForeignKey(x => x.ModifyId).WillCascadeOnDelete(false);

            var userApp = modelBuilder.Entity<UserApp>();
            userApp.HasKey(x=>x.Id);
            userApp.Property(x => x.Id).HasMaxLength(16);
            userApp.HasRequired(x => x.User).WithMany(x => x.UserApps).HasForeignKey(x => x.UserId).WillCascadeOnDelete(false);
            userApp.HasRequired(x => x.Role).WithMany(x => x.Users).HasForeignKey(x => x.RoleId);
            userApp.HasRequired(x => x.Client).WithMany(x => x.UserApps).HasForeignKey(x => x.ClientId).WillCascadeOnDelete(false);
            userApp.HasRequired(x => x.App).WithMany(x => x.UserApps).HasForeignKey(x => x.AppId);
            userApp.Property(x => x.UserId).HasColumnAnnotation("IX_UserApp_UserId", new IndexAnnotation(new IndexAttribute("IX_UserApp_UserId") { IsUnique = true }));
            userApp.Property(x => x.ClientId).HasColumnAnnotation("IX_UserApp_ClientId", new IndexAnnotation(new IndexAttribute("IX_UserApp_ClientId") { IsUnique = true }));
            userApp.Property(x => x.AppId).HasColumnAnnotation("IX_UserApp_AppId", new IndexAnnotation(new IndexAttribute("IX_UserApp_AppId") { IsUnique = true }));
            var appRole = modelBuilder.Entity<AppRole>();
            appRole.HasKey(x => x.Id);
            appRole.Property(x => x.Id).HasMaxLength(16);
            appRole.HasRequired(x => x.Client).WithMany(x => x.AppRoles).HasForeignKey(x => x.ClientId).WillCascadeOnDelete(false);
            appRole.HasRequired(x => x.App).WithMany(x => x.AppRoles).HasForeignKey(x => x.AppId).WillCascadeOnDelete(false);
           
        }
    }
}