using System;
using System.ComponentModel;

namespace TD.Models
{
    public enum TaskLevel
    {
        [Description("Thấp")]
        Low,
        [Description("Bình thường")]
        Normal,
        [Description("Cao")]
        High,
        [Description("Quan trọng")]
        Important
    }
}