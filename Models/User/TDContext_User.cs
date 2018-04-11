using System;
using System.Data.Entity;

namespace TD.Models
{
    public partial class TDContext
    {
        public DbSet<UserContact> UserContact { get; set; }
        public DbSet<Experience> Exps { get; set; }
        public DbSet<UserExperience> UserExps { get; set; }
        public DbSet<CartItem> Carts { get; set; }
        public DbSet<Faucet> Faucets { get; set; }
        public DbSet<UserFaucet> UserFaucets { get; set; }
        private static void RegisterUser(DbModelBuilder modelBuilder)
        {
            var user = modelBuilder.Entity<User>();
            user.HasOptional(x => x.Creator).WithMany(x => x.UserCreated).HasForeignKey(x => x.CreatorId).WillCascadeOnDelete(false);
            user.HasOptional(x => x.Avatar).WithMany(x => x.Avatars).HasForeignKey(x => x.AvatarId).WillCascadeOnDelete(false);
            var exp = modelBuilder.Entity<Experience>();
            exp.HasKey(x => x.Id);
            exp.Property(x => x.Id).HasMaxLength(20);
            var userExp = modelBuilder.Entity<UserExperience>();
            userExp.HasKey(x => new
            {
                x.UserId,
                x.ExpericenceId
            });
            userExp.HasRequired(x => x.User).WithMany(x => x.Exps).HasForeignKey(x => x.UserId);
            userExp.HasRequired(x => x.Experience).WithMany(x => x.Exps).HasForeignKey(x => x.ExpericenceId);

            var cart = modelBuilder.Entity<CartItem>();
            cart.HasKey(x => x.Id);
            cart.Property(x => x.Id).HasMaxLength(16);
            cart.HasRequired(x => x.User).WithMany(x => x.Carts).HasForeignKey(x => x.UserId);
            cart.HasOptional(x => x.App).WithMany(x => x.Carts).HasForeignKey(x => x.AppId);
            cart.HasOptional(x => x.Product).WithMany(x => x.Carts).HasForeignKey(x => x.ProductId);
            var faucet = modelBuilder.Entity<Faucet>();
            faucet.HasKey(x => x.Id).Property(x=>x.Id).HasMaxLength(20);
            var userFaucet = modelBuilder.Entity<UserFaucet>();
            userFaucet.HasKey(x => new { x.UserId, x.FaucetId });
            userFaucet.HasRequired(x => x.Faucet).WithMany(x => x.Users).HasForeignKey(x => x.FaucetId);
            userFaucet.HasRequired(x => x.User).WithMany(x => x.Faucets).HasForeignKey(x => x.UserId);
        }
    }
}