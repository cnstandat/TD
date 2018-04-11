using System;
using System.Data.Entity;

namespace TD.Models
{
    public partial class TDContext
    {
        public DbSet<Partner> Partners { get; set; }
        public DbSet<PartnerTalk> PartnerTalks { get; set; }
        public DbSet<Department> Departments { get; set; }
        private void RegisterPartner(DbModelBuilder modelBuilder)
        {
            var partner = modelBuilder.Entity<Partner>();
            partner.HasKey(x => x.Id);
            partner.Property(x => x.Id).HasMaxLength(20);
            partner.HasOptional(x => x.Creator).WithMany(x => x.PartnerCreated).HasForeignKey(x => x.CreatorId).WillCascadeOnDelete(false);
            partner.HasOptional(x => x.Modify).WithMany(x => x.PartnerModify).HasForeignKey(x => x.ModifyId).WillCascadeOnDelete(false);
            var partnerTalk = modelBuilder.Entity<PartnerTalk>();
            
            partnerTalk.HasKey(x => x.Id).HasOptional(x => x.App).WithMany(x => x.PartnerTalks).HasForeignKey(x => x.AppId).WillCascadeOnDelete(false);
            partnerTalk.HasRequired(x => x.Partner).WithMany(x => x.PartnerTalks).HasForeignKey(x => x.PartnerId).WillCascadeOnDelete(false);
            partnerTalk.Property(x => x.Id).HasMaxLength(20);
            var depart = modelBuilder.Entity<Department>();
            depart.HasKey(x => x.Id).HasRequired(x => x.Partner).WithMany(x => x.Departments).HasForeignKey(x => x.PartnerId);
            depart.Property(x => x.Id).HasMaxLength(20);
        }
    }
}