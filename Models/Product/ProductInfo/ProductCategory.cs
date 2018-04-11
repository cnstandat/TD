using System;
using System.Collections.Generic;
using TD.Models.Views;

namespace TD.Models
{

    public class InfoApp
    {

        public InfoApp()
        {

        }
        public string Id { get; set; } //Key
        public string Name { get; set; }
        public ValueType ValueType { get; set; }
        public virtual ICollection<AppInfo> Information { get; set; }
        public virtual ICollection<VersionInfo> Versions { get; set; }
        public ICollection<AppCategoryFeature> CategoryInformation { get; set; }
    }
    public class AppInfo
    {

        public AppInfo()
        {

        }
        public string AppId { get; set; } //Key
        public string InfoAppId { get; set; }//Key
        public virtual App App { get; set; }
        public virtual InfoApp InfoApp { get; set; }
        public string Value { get; set; }

    }
    public class VersionInfo
    {

        public VersionInfo()
        {

        }
        public string AppId { get; set; }//Key
        public string InfoAppId { get; set; }//Key
        public LicenseType LicenseType { get; set; }//Key
        public virtual App App { get; set; }
        public virtual InfoApp InfoApp { get; set; }
    }
}