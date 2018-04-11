using System;
using System.Data.Entity;

namespace TD.Models
{
    public partial class TDContext
    {
        public DbSet<Gallery> Galleries { get; set; }
        public DbSet<AppFile> AppFiles { get; set; }
        public DbSet<DPage> DPages { get; set; }
        private void RegisterFile_Gallery_Config(DbModelBuilder modelBuilder)
        {
            var AppFile = modelBuilder.Entity<AppFile>();
            AppFile.HasKey(x => x.Id);
            AppFile.Property(x => x.Id).HasMaxLength(20);
            AppFile.HasOptional(x => x.Gallery).WithMany(x => x.AppFiles).HasForeignKey(x => x.GalleryId).WillCascadeOnDelete(true);
            AppFile.HasOptional(x => x.Uploader).WithMany(x => x.AppFiles).HasForeignKey(x => x.UploaderId).WillCascadeOnDelete(false);

            var gallery = modelBuilder.Entity<Gallery>();
            gallery.HasKey(x => x.Id);
            gallery.Property(x => x.Id).HasMaxLength(20);
            gallery.HasOptional(x => x.App).WithMany(x => x.Galleries).HasForeignKey(x => x.AppId).WillCascadeOnDelete(false);
            gallery.HasOptional(x => x.Blog).WithMany(x => x.Galleries).HasForeignKey(x => x.BlogId).WillCascadeOnDelete(false);

            var config = modelBuilder.Entity<DPage>();
            config.HasKey(x => x.Id);
            config.Property(x => x.Id).HasMaxLength(20);
            config.HasRequired(x => x.Creator).WithMany(x => x.DPageCreate).HasForeignKey(x => x.CreatorId).WillCascadeOnDelete(false);
            config.HasOptional(x => x.Modifier).WithMany(x => x.DPageModify).HasForeignKey(x => x.ModifyId).WillCascadeOnDelete(false);
        }
    }
}