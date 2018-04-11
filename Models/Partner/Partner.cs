using System;
using System.Collections.Generic;
using TD.Models.Views;

namespace TD.Models
{
    public class Partner
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string TaxNumber { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public string Logo { get; set; }
        public string CreatorId { get; set; }
        public string ModifyId { get; set; }
        public Partner()
        {
            Departments = new List<Department>();
            Apps = new List<ClientApp>();
            PartnerTalks = new List<PartnerTalk>();
            AppRoles = new List<AppRole>();
        }
        public Partner(string Id,string Name)
        {
            this.Id = Id;
            this.Name = Name;
        }
        public Partner(PartnerEditView data)
        {
            this.Id = data.Id;
            this.Name = data.Name;
            this.Address = data.Address;
            this.Phone = data.Phone;
            this.Email = data.Email;
            this.Website = data.Website;
            this.TaxNumber = data.TaxNumber;
        }
     


        public virtual User Modify { get; set; }
        public virtual User Creator { get; set; }
        public virtual ICollection<Department> Departments { get; set; }
        public ICollection<UserApp> UserApps { get; set; }
        public ICollection<AppRole> AppRoles { get; set; }
        public virtual ICollection<ClientApp> Apps { get; set; }
        public virtual ICollection<PartnerTalk> PartnerTalks { get; set; }
    }

    public class PartnerTalk
    {
        public PartnerTalk()
        {

        }
        public string Id { get; set; }
        public string PartnerId { get; set; }
        public virtual Partner Partner { get; set; }
        public string AppId { get; set; }
        public virtual App App { get; set; }
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
        public virtual Partner Partner { get; set; }
    }
}