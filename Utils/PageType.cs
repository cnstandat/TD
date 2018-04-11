using System;
using System.ComponentModel;

namespace TD
{
    public enum PageType
    {
        [Description("Giấy in bill 57mm")]
        K57,
        [Description("Giấy in bill 80mm")]
        K80,
        [Description("Giấy A5 dọc")]
        A5,
        [Description("Giấy A5 ngang")]
        A52,
        [Description("Giấy A4")]
        A4
    }
}
