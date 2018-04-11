using System;
using System.Linq;

namespace TD
{
    public class AppConfig
    {
        public int DefaultPageSize { get; set; } = 10;
        public string CommentId { get; set; } = "C{0:00000000000}";
        public string BlogId { get; set; } = "B{0:000000}";
        public string TagBlogId { get; set; } = "TB{0:000}";
        
        public string GalleryId { get; set; } = "G{0:000000}";
        public string AppFileId { get; set; } = "U{0:000000}";
        public string AppRoleId { get; set; } = "AR{0:0000000000}";
        public string AppTaskId { get; set; } = "T{0:000000";
        public string TagTaskId { get; set; } = "TT{0:000}";
        public string PartnerId { get; set; } = "PA{0:000000}";
        public string ExpId { get; set; } = "E{0:000}";
        public string AppCategoryId { get; set; } = "PC{0:00000}";
        public int PageCount { get; set; } = 10;
        //using string.format(action,createlink,link)
        #region Apps
        public string AppId { get; set; } = "A{0:000000}";
        public int AppW { get; set; } = 300;
        public int AppH { get; set; } = 200;
        public string AppAdded { get; set; } = "Đã thêm ứng dụng <a href='{0}' class='btn'>Tiếp tục thêm</a>  <a href='{1}' class='btn btn-primary'>Quay về</a>";
        public string AppEdit { get; set; } = "Đã cập nhật ứng dụng <a href='{0}' class='btn btn-primary'>Quay về</a>";
        public string AppRemove { get; set; } = "Đã xóa ứng dụng <a href='{0}' class='btn btn-primary'>Quay về</a>";
        public string AppEditLink { get; set; } = "/admin/products/edit/";
        public string AppCreateLink { get; set; } = "/admin/products/create";
        public string AppLink { get; set; } = "/admin/products";
        public string PromoImage { get; set; } = "/data/img/megakit/970x970/03.jpg";
        public string PromoText { get; set; } = "Chúng tôi tập trung vào mục tiêu xây dựng mối quan hệ với khách hàng và cộng đồng.Với tiêu chí sự hài lòng của khách hàng được đặt lên hàng đầu,chúng tôi hi vọng các sản phẩm của mình sẽ thực sự đem lại hiệu quả trong thực tế cho quý khách.";
        public string ServiceImage { get; set; } = "/data/img/megakit/1920x1080/03.jpg";
        public string TalkImage { get; set; } = "/data/img/megakit/1920x1080/04.jpg";
        public string SubImage { get; set; } = "/data/img/megakit/1920x1080/07.jpg";
        public string CounterImage { get; set; } = "/data/img/megakit/1920x1080/06.jpg";
        public string FooterImage { get; set; } = "/data/img/megakit/widgets/worldmap.png";
        public string YoutubeLink { get; set; } = "#";
        public string FacebookLink { get; set; } = "#";
        public string GoogleLink { get; set; } = "#";
        public string TwitterLink { get; set; } = "#";
        #endregion

    }
}