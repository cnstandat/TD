using System;
using System.Linq;

namespace TD
{
    public class LanguageDB
    {
        internal static string NotFound { get; set; } = "Không tìm thấy dữ liệu";
        public static string ClientAppAdded { get; set; }
        public static string ClientAppChanged { get; set; }
        public static string ClientAppRemoved { get; set; }
        public static string AppTaskAdded { get; set; } = "Đã thêm mới công việc";
        public static string AppTaskChanged { get; set; } = "Đã cập nhật công việc";
        public static string AppTaskRemoved { get; set; } = "Đã xóa công việc";
        public static string PasswordNotValid { get; set; } = "Mật khẩu không chính xác";
        public static string PhoneNumberExits { get; set; } = "Số điện thoại đã được sử dụng";
    }
}