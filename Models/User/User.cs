using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using TD.Models.Views;

namespace TD.Models
{
    public class User : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User> manager)
        {
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            if(userIdentity!=null)
            {
                if (this.Avatar != null && this.Avatar.FileName!=null)
                    userIdentity.AddClaim(new Claim("avatar", this.Avatar.FileName));
                if (this.Email != null)
                {
                    userIdentity.AddClaim(new Claim("email", this.Email));
                }
                userIdentity.AddClaim(new Claim("emailconfirm", this.EmailConfirmed ? "1" : "0"));
            }
            
            return userIdentity;
        }
      
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager manager, string authenticationType)
        {
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            return userIdentity;
        }
        public string AvatarId { get; set; }
        public bool CantSay { get; set; }
        public string Sign { get; set; }
        public DateTime JoinTime { get; set; }
        public string FullName { get; set; }
        public DateTime? BirthDay { get; set; }
        public string CreatorId { get; set; }
        public string ConnectionId { get; set;}
        public string IpAddress { get; set; }
        public User() : base()
        {
            JoinTime = DateTime.UtcNow;
            CommentCreated = new List<Comment>();
            CommentModify = new List<Comment>();
            BlogCreated = new List<Blog>();
            BlogModified = new List<Blog>();
            UserLikes = new List<UserLike>();
            AppFiles = new List<AppFile>();
            ClientAppModify = new List<ClientApp>();
            ClientAppCreated = new List<ClientApp>();
            Apps = new List<App>();
            UserApps = new List<UserApp>();
            TaskAccepted = new List<AppTask>();
            TaskCreated = new List<AppTask>();
            Exps = new List<UserExperience>();
            Carts = new List<CartItem>();
            LikeComments = new List<LikeComment>();
            UserCreated = new List<User>();
            PartnerCreated = new List<Partner>();
            PartnerModify = new List<Partner>();
            DPageCreate = new List<DPage>();
            DPageModify = new List<DPage>();
            ProductCreate = new List<Product>();
            ProductModify = new List<Product>();
            Faucets = new List<UserFaucet>();
        }
        public User(string UserName) : this()
        {
            this.UserName = UserName;
        }
        
       
       public virtual ICollection<UserFaucet> Faucets { get; set; }
        public bool IsCompany { get; set; }
        public virtual AppFile Avatar { get; set; }
        public virtual User Creator { get; set; }
        public virtual ICollection<LikeComment> LikeComments { get; set; }
        public virtual ICollection<User> UserCreated { get; set; }
        public virtual ICollection<Partner> PartnerCreated { get; set; }
        public virtual ICollection<Partner> PartnerModify { get; set; }
        public virtual ICollection<DPage> DPageCreate { get; set; }
        public virtual ICollection<DPage> DPageModify { get; set; }
        public virtual ICollection<ClientApp> ClientAppModify { get; set; }
        public virtual ICollection<ClientApp> ClientAppCreated { get; set; }
        public virtual ICollection<App> Apps { get; set; }
        public virtual ICollection<UserApp> UserApps { get; set; }
        public virtual ICollection<AppFile> AppFiles { get; set; }
        public virtual ICollection<Blog> BlogCreated { get; set; }
        public virtual ICollection<Blog> BlogModified { get; set; }
        public virtual ICollection<Comment> CommentCreated { get; set; }
        public virtual ICollection<Comment> CommentModify { get; set; }
        public virtual ICollection<UserLike> UserLikes { get; set; }
        public virtual ICollection<UserExperience> Exps { get; set; }
        public virtual ICollection<AppTask> TaskCreated { get; set; }
        public virtual ICollection<AppTask> TaskAccepted { get; set; }
        public virtual ICollection<CartItem> Carts { get; set; }
        public virtual ICollection<Product> ProductCreate { get; set; }
        public virtual ICollection<Product> ProductModify { get; set; }
    }
    public class UserContact
    {

        public UserContact()
        {

        }
        public UserContact(string Name, string Email, string Phone, string Content) : this()
        {
            this.Name = Name;
            this.Email = Email;
            this.Phone = Phone;
            this.Content = Content;
        }
       
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Content { get; set; }
        public DateTime Create { get; set; }
        public bool IsAccept { get; set; }
        public string IP { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public string AccepterId { get; set; }
        public virtual User Accepter { get; set; }
    }
    public class Experience
    {

        public Experience()
        {
            Exps = new List<UserExperience>();
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Style { get; set; }
        public ICollection<UserExperience> Exps { get; set; }
    }
    public class UserExperience
    {

        public UserExperience()
        {

        }
        public string UserId { get; set; }
        public string ExpericenceId { get; set; }
        public int Value { get; set; }
        public virtual User User { get; set; }
        public virtual Experience Experience { get; set; }
    }
    public class CartItem
    {
        
        public CartItem()
        {
            
        }
        public string Id { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public string AppId { get; set; }
        public virtual App App { get; set; }
        public decimal Quantity { get; set; }
        public string ProductId { get; set; }
        public virtual Product Product{ get; set; }
    }
    public class Faucet
    {
        
        public Faucet()
        {
            Users = new List<UserFaucet>();
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Image { get; set; }
        public int Time { get; set; }
        public int Min { get; set; }
        public int Max { get; set; }
        public FaucetType FaucetType { get; set; }
        public CaptchaType CaptchaType { get; set; }
        public string Resolve { get; set; }
        public virtual ICollection<UserFaucet> Users { get; set; }
    }
    public class UserFaucet
    {
        
        public UserFaucet()
        {
            
        }
        public string UserId { get; set; }
        public string FaucetId { get; set; }
        public virtual User User { get; set; }
        public virtual Faucet Faucet { get; set; }
        public string Info01 { get; set; }
        public string Info02 { get; set; }
        public string Info03 { get; set; }
        public string Info04 { get; set; }
        public string Info05 { get; set; }
        public string Info06 { get; set; }
        public string Info07 { get; set; }
        public string Info08 { get; set; }
        public string Info09 { get; set; }
    }
}