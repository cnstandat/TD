using System;
using System.ComponentModel;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;

namespace TD
{
    public interface IAppOption
    {

        [DisplayName("Tự động in hóa đơn")]
        bool AutoPrintCalc { get; set; }
        [DisplayName("Kiểu giấy")]
        PageType PageType { get; set; }
        [DisplayName("Đơn vị tiền tệ")]
        string Currency { get; set; }
        [DisplayName("Phím tắt thêm mới")]
        Keys NewKey { get; set; }
        [DisplayName("Phím tắt Lưu dữ liệu")]
        Keys SaveKey { get; set; }
        [DisplayName("Phím tắt lưu và thêm mới")]
        Keys SaveAddKey { get; set; }
        [DisplayName("Phím tắt Xóa dữ liệu")]
        Keys DeleteKey { get; set; }
        [DisplayName("Phím tắt nạp lại dữ liệu")]
        Keys LoadKey { get; set; }
        [DisplayName("Phím tắt In dữ liệu")]
        Keys PrintKey { get; set; }
        [DisplayName("Phím tắt nạp dữ liệu từ File")]
        Keys ImportDKey { get; set; }
        [DisplayName("Phím tắt trích xuất dữ liệu ra File")]
        Keys ExportKey { get; set; }
        [DisplayName("Màu dữ liệu mới")]

        Color ColorNew { get; set; }

        [DisplayName("Màu dữ liệu đã thay đổi")]
        Color ColorChange { get; set; }
        [DisplayName("Màu dữ liệu đánh dấu xóa")]
        Color ColorDelete { get; set; }
        [DisplayName("Phím tắt thêm mới dữ liệu trên thanh tìm kiếm")]
        Keys ControlNewKey { get; set; }
        [DisplayName("Phím tắt nạp lại dữ liệu thanh tìm kiếm")]
        Keys ControlLoadKey { get; set; }
        [DisplayName("Thời gian kiểm tra bàn đã đặt")]
        int ReserverTimeNotify { get; set; }
        bool CanExportWhenEmpty { get; set; }
         string BarCodePrinter { get; set; }
         string BillPrinter { get; set; }
        string Format { get; set; }
    }
}
