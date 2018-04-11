using System;
using System.ComponentModel;
namespace TD.Models
{
    public enum LicenseType
    {
        [Description("Demo")]
        Demo,
        [Description("Standard")]
        Standard,
        [Description("Business")]
        Business,
        [Description("Enterprice")]
        Enterprise
    }
}