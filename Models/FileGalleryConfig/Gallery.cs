using System;
using System.Collections.Generic;

namespace TD.Models
{
    public class Gallery
    {

        public Gallery()
        {

            AppFiles = new List<AppFile>();
        }
        public Gallery(string Id) : this()
        {
            this.Id = Id;
        }
        public Gallery(string Id, string Name, string Subtitle, string ButtonText, string Link, bool InHome = true, string AppId = null) : this(Id)
        {
            this.Name = Name;
            this.ButtonText = ButtonText;
            this.Subtitle = Subtitle;
            this.Link = Link;
            this.InHome = InHome;
            this.AppId = AppId;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Subtitle { get; set; }
        public string ButtonText { get; set; }
        public bool InHome { get; set; }
        public string VideoLink { get; set; }
        public string Link { get; set; }
        public string AppId { get; set; }
        public virtual App App { get; set; }
        public virtual ICollection<AppFile> AppFiles { get; set; }
        public string BlogId { get; set; }
        public virtual Blog Blog { get; set; }
    }
    public class AppFile
    {
        public AppFile()
        {
       
            Avatars = new List<User>();
        }
        public AppFile(string Id, string FileName) : this()
        {
            this.Id = Id;
            this.FileName = FileName;
        }
        public UploadType UploadType { get; set; }
        public string Id { get; set; }
        public string FileName { get; set; }
        public string FullPath { get; set; } = "/data/site_svg/noavatar.png";
        public string UploaderId { get; set; }
        public virtual User Uploader { get; set; }
        public virtual Gallery Gallery { get; set; }
        public string GalleryId { get; set; }    
        public virtual ICollection<User> Avatars { get; set; }
    
        public bool IsMain { get; set; }
    }
}