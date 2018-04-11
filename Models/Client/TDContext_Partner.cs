using System;
using System.Data.Entity;

namespace TD.Models
{
    public partial class TDContext
    {
        public DbSet<Client> Partners { get; set; }
        public DbSet<ClientTalk> PartnerTalks { get; set; }
        public DbSet<Department> Departments { get; set; }
        private void RegisterPartner(DbModelBuilder modelBuilder)
        {
            var partner = modelBuilder.Entity<Client>();
            partner.HasKey(x => x.Id);
            partner.Property(x => x.Id).HasMaxLength(20);
            partner.HasOptional(x => x.Admin).WithMany(x => x.PartnerAdmins).HasForeignKey(x => x.AdminId).WillCascadeOnDelete(false);
            var partnerTalk = modelBuilder.Entity<ClientTalk>();
            
            partnerTalk.HasKey(x => x.Id).HasOptional(x => x.App).WithMany(x => x.Talks).HasForeignKey(x => x.AppId).WillCascadeOnDelete(false);
            partnerTalk.HasRequired(x => x.Partner).WithMany(x => x.PartnerTalks).HasForeignKey(x => x.PartnerId).WillCascadeOnDelete(false);
            partnerTalk.Property(x => x.Id).HasMaxLength(20);
            var depart = modelBuilder.Entity<Department>();
            depart.HasKey(x => x.Id).HasRequired(x => x.Partner).WithMany(x => x.Departments).HasForeignKey(x => x.PartnerId);
            depart.Property(x => x.Id).HasMaxLength(20);
        }
    }
}