using System;
using TD.Models.Views;

namespace TD.Models
{
    public class DPage
    {

        public DPage()
        {

        }
        public DPage(DPageViewModel data)
        {
            this.Id = data.Id;
            this.Content = data.Content;
            this.Name = data.Name;
        }
        public string Id { get; set; }
        public string Content { get; set; }
        public string CreatorId { get; set; }
        public string ModifyId { get; set; }
        public virtual User Creator { get; set; }
        public virtual User Modifier { get; set; }
        public DateTime LastModify { get; set; }
        public string Name { get; set; }
        public bool IsPage { get; set; }

    }
}