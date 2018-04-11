using System;
using System.Data.Entity;

namespace TD.Models
{
    public partial class TDContext
    {
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<ProductCategoryInfo> ProductCategoryInfoes { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductInfo> ProductInfomations { get; set; }
        public DbSet<InfoProduct> InfoProducts { get; set; }
        private void Register_Product(DbModelBuilder modelBuilder)
        {
            Register_ProductCategory(modelBuilder);

            var product = modelBuilder.Entity<Product>();
            product.HasKey(x => x.Id);
            product.Property(x => x.Id).HasMaxLength(16);
            product.HasOptional(x => x.Modify).WithMany(x => x.ProductModify).HasForeignKey(x => x.ModifyId).WillCascadeOnDelete(false);
            product.HasRequired(x => x.Creator).WithMany(x => x.ProductCreate).HasForeignKey(x => x.CreatorId).WillCascadeOnDelete(false);
            product.HasRequired(x => x.Category).WithMany(x => x.Products).HasForeignKey(x => x.CategoryId);

            var info = modelBuilder.Entity<InfoProduct>();
            info.HasKey(x => x.Id).Property(x => x.Id).HasMaxLength(16);

            var pInfo = modelBuilder.Entity<ProductInfo>();
            pInfo.HasKey(x => new {
                x.ProductId,
                x.InfoId
            });
            pInfo.HasRequired(x => x.Product).WithMany(x => x.Information).HasForeignKey(x => x.ProductId);
            pInfo.HasRequired(x => x.Info).WithMany(x => x.Products).HasForeignKey(x => x.InfoId);           

            
        }
        private void Register_ProductCategory(DbModelBuilder modelBuilder)
        {
            var productCategory = modelBuilder.Entity<ProductCategory>();
            productCategory.HasKey(x => x.Id);
            productCategory.Property(x => x.Id).HasMaxLength(20);

            var categoryInfo = modelBuilder.Entity<ProductCategoryInfo>();
            categoryInfo.HasKey(x => new
            {
                x.CategoryId,
                x.InfoId
            });
            categoryInfo.HasRequired(x => x.Category).WithMany(x => x.Information).HasForeignKey(x => x.CategoryId);
            categoryInfo.HasRequired(x => x.Info).WithMany(x => x.Categories).HasForeignKey(x => x.InfoId);

        }
    }
}