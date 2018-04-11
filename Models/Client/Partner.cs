using System;
using System.Collections.Generic;
using TD.Models.Views;

namespace TD.Models
{
    public class Client
    {
        public Client()
        {
            Departments = new List<Department>();
            Apps = new List<ClientApp>();
            PartnerTalks = new List<ClientTalk>();
            //Roles = new List<AppUserRole>();
            AppRoles = new List<AppRole>();
        }
        public Client(string Id,string Name)
        {
            this.Id = Id;
            this.Name = Name;
        }
        public Client(PartnerEditView data)
        {
            this.Id = data.Id;
            this.Name = data.Name;
            this.Address = data.Address;
            this.Phone = data.Phone;
            this.Email = data.Email;
            this.Website = data.Website;
            this.TaxNumber = data.TaxNumber;
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string TaxNumber { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public string Logo { get; set; }
        public virtual ICollection<ClientApp> Apps { get; set; }
        public virtual ICollection<ClientTalk> PartnerTalks { get; set; }
        public virtual User Admin { get; set; }
        public string AdminId { get; set; }
        public virtual ICollection<Department> Departments { get; set; }
        //public virtual ICollection<AppUserRole> Roles { get; set; }
        public ICollection<UserApp> UserApps { get; set; }
        public ICollection<AppRole> AppRoles { get; set; }
    }

    public class ClientTalk
    {
        public ClientTalk()
        {

        }
        public string Id { get; set; }
        public string PartnerId { get; set; }
        public virtual Client Partner { get; set; }
        public string AppId { get; set; }
        public virtual TDObject App { get; set; }
        public string Content { get; set; }
        public bool MainPage { get; set; }
    }

    public class Department
    {

        public Department()
        {

        }
        public string Id { get; set; }
        public string Name { get; set; }
        public string ManagerId { get; set; }
        public virtual User Manager { get; set; }
        public string PartnerId { get; set; }
        public virtual Client Partner { get; set; }
    }
}