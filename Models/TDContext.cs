using System;
using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace TD.Models
{

    public partial class TDContext : IdentityDbContext<User>
    {
        public TDContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            #region Identity Framework Change Default Table Names
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<IdentityRole>().ToTable("Roles");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("UserClaims");
            modelBuilder.Entity<IdentityUserLogin>().ToTable("UserLogins");
            modelBuilder.Entity<IdentityUserRole>().ToTable("UserRoles");

            #endregion

           
            //Register_AppInfo(modelBuilder);

            RegisterApp_AppFeatures(modelBuilder);

            RegisterApp_ClientUsing(modelBuilder);

            RegisterUser(modelBuilder);

            RegisterBlog(modelBuilder);

            RegisterFile_Gallery_Config(modelBuilder);

            RegisterTask(modelBuilder);

            RegisterPartner(modelBuilder);

            Register_ProductCategory(modelBuilder);
            Register_Product(modelBuilder);
        }
        public static TDContext Create()
        {
            return new TDContext();
        }
    }
}