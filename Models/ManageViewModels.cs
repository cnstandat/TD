using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;

namespace TD.Models
{
    public class UserManageIndexViewModel
    {
        [Display(Name = "Tên")]
        public string UserName { get; set; }
        public string Email { get; set; }
        public string MessageCount { get; set; }
        public bool HasPassword { get; set; }
        public ManageLoginsViewModel LoginView { get; set; }
        [Display(Name = "Điện thoại")]
        public string PhoneNumber { get; set; }
        public bool TwoFactor { get; set; }
        public bool BrowserRemembered { get; set; }
        [Display(Name = "Ảnh đại diện")]
        public string Avatar { get; set; }
        public string Sign { get; set; }
        public int CommentCount { get; set; }
        public int ReadBlog { get; set; }
        public int LikeBlog { get; set; }

    }

    public class ManageLoginsViewModel
    {
        public IList<UserLoginInfo> CurrentLogins { get; set; }
        public IList<AuthenticationDescription> OtherLogins { get; set; }
    }

    public class FactorViewModel
    {
        public string Purpose { get; set; }
    }

    public class SetPasswordViewModel
    {
        [Required(ErrorMessage = "{0} không được để trống")]
        [StringLength(100, ErrorMessage = "{0} phải dài tối thiểu {2} ký tự.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu mới")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Xác nhận")]
        [Compare("NewPassword", ErrorMessage = "Mật khẩu không khớp.")]
        public string ConfirmPassword { get; set; }
    }
    public class ErrorViewModel
    {
        public string LinkReturn { get; set; }
        public string Title { get; set; }
        public string Error { get; set; }
        public string Description { get; set; }
    }
    public class DeleteAccountViewModel
    {
        [Required(ErrorMessage = "{0} không được để trống")]
        [StringLength(100, ErrorMessage = "{0} phải dài tối thiểu {2} ký tự.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu hiện tại")]
        public string Password { get; set; }

    }
    public class ChangeUserNameViewModel
    {
        [Required(ErrorMessage = "{0} không được để trống")]
        [StringLength(100, ErrorMessage = "{0} phải dài tối thiểu {2} ký tự.", MinimumLength = 4)]
        [Display(Name = "Tên đăng nhập")]
        public string UserName { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 4)]
        public string Password { get; set; }

    }
    public class ChangePasswordViewModel
    {
        [Required(ErrorMessage = "{0} không được để trống")]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu hiện tại")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "{0} không được để trống")]
        [StringLength(100, ErrorMessage = "{0} phải dài tối thiểu {2} ký tự.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu mới")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Xác nhận")]
        [Compare("NewPassword", ErrorMessage = "Mật khẩu không khớp.")]
        public string ConfirmPassword { get; set; }
    }
    public class ImageViewModel
    {
        public string Data { get; set; }
        public string ContentType { get; set; }
    }
    public class CommentOnlyViewModel
    {

        public CommentOnlyViewModel(IEnumerable<Comment> comments, int Count, int CurrentPage)
        {
            var lst = new List<CommentViewModel>();
            foreach (var cm in comments)
            {
                lst.Add(new CommentViewModel(cm, 0));
            }
            Comments = lst;
            ChildCount = Count - CurrentPage * 5;
        }
        public int ChildCount { get; set; }
        public List<CommentViewModel> Comments { get; set; }
    }
    public class CommentViewModel
    {

        public CommentViewModel(Comment model, int CurrentPage)
        {
            this.Id = model.Id;
            this.Creator = model.User.UserName;
            this.Content = model.Content;
            this.Created = model.Created;
            this.CreatorAvatar = model.User.Avatar != null ? model.User.Id : null;
            this.HasChild = model.Children.Count > 0;
            this.CurrentPage = CurrentPage;
            if (model.Children.Count > 0)
            {
                Children = GetChildrens(model, CurrentPage);
            }
            ChildCount = model.Children.Count - CurrentPage * 5;
        }
        public Guid Id { get; set; }
        public string Creator { get; set; }
        public string CreatorAvatar { get; set; }
        public bool HasChild { get; set; }
        public int ChildCount { get; set; }
        public string Content { get; set; }
        public DateTime Created { get; set; }
        public int CurrentPage { get; set; }
        public List<CommentViewModel> Children { get; set; }
        List<CommentViewModel> GetChildrens(Comment cm, int CurrentPage)
        {
            var lst = new List<CommentViewModel>();
            //foreach (var c in cm.Children.OrderByDescending(x=>x.Created).Skip((Current1)*5).Take(5))
            //{
            //    lst.Add(new CommentViewModel(c));
            //}
            return lst;
        }

    }
    public class AddPhoneNumberViewModel
    {
        [Required(ErrorMessage = "{0} không được để trống")]
        [Phone]
        [Display(Name = "Điện thoại")]
        public string Number { get; set; }
    }

    public class VerifyPhoneNumberViewModel
    {
        [Required(ErrorMessage = "{0} không được để trống")]
        [Display(Name = "Mã nhận được")]
        public string Code { get; set; }

        [Required(ErrorMessage = "{0} không được để trống")]
        [Phone]
        [Display(Name = "Điện thoại")]
        public string PhoneNumber { get; set; }
    }

    public class ConfigureTwoFactorViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
    }
}