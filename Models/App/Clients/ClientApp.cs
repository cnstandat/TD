using System;
using System.Collections.Generic;

namespace TD.Models
{
    public class ClientApp
    {
        public ClientApp()
        {

        }
        public ClientApp(string ClientId, string AppId)
        {
            this.ClientId = ClientId;
            this.AppId = AppId;
            this.LastModify = DateTime.Now;
        }
        public string AppId { get; set; }
        public string ClientId { get; set; }
    
        public string AdminPath { get; set; }
     
        public string Database { get; set; }
        public string DBVersion { get; set; }
        public string SecretKey { get; set; }
        public int Port { get; set; }
        public DateTime Start { get; set; }
        public DateTime? Expires { get; set; }
        public LicenseType LicenseType { get; set; }
        public string CreatorId { get; set; }
        public string ModifyId { get; set; }
        public DateTime LastModify { get; set; }
        public string LocalIP { get; set; }
        public string PublicIP { get; set; }
        public virtual App App { get; set; }
        public virtual User Modify { get; set; }
        public virtual User Creator { get; set; }
        public virtual Partner Client { get; set; }

    }
    public class UserApp
    {

        public UserApp()
        {

        }
        public UserApp(string Id,string UserId, string PartnerId, string AppId)
        {
            this.Id = Id;
            this.UserId = UserId;
            this.ClientId = PartnerId;
            this.AppId = AppId;
        }
        public string Id { get; set; }
        public string UserId { get; set; }
        public string ClientId { get; set; }
        public string AppId { get; set; }
        public virtual User User { get; set; }
        public virtual Partner Client { get; set; }
        public virtual App App { get; set; }
        public string RoleId { get; set; }
        public virtual AppRole Role { get; set; }
    }
    

    public class AppRole
    {

        public AppRole()
        {
            Users = new List<UserApp>();
            //Roles = new List<AppUserRole>();
        }
        public AppRole(string Id,string Name,string ClientId,string AppId):this()
        {
            this.Id = Id;
            this.Name = Name;
            this.ClientId = ClientId;
            this.AppId = AppId;
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public string ClientId { get; set; }
        public string AppId { get; set; }
        public virtual Partner Client { get; set; }
        public virtual App App { get; set; }
        public ICollection<UserApp> Users { get; set; }
        //public virtual ICollection<AppUserRole> Roles { get; set; }

    }
}