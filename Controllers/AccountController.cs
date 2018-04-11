using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using TD.Models;
using System.Text;
using System.Net;
using System.IO;
using System.Collections.Generic;
using TD;
using TD.Models.Views;
using Newtonsoft.Json;
using TweetSharp;

namespace TD.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        #region Variable
        private SignInManager _signInManager;
        private UserManager _userManager;
        private TDContext db = new TDContext();
        public AccountController()
        { }

        public AccountController(UserManager userManager, SignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public SignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<SignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public UserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<UserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        #endregion


        #region Check
        private bool HasPassword()
        {
            var user = UserManager.FindById(User.Identity.GetUserId());
            if (user != null)
            {
                return user.PasswordHash != null;
            }
            return false;
        }
        #endregion

        [AllowAnonymous]
        public ActionResult UserInfo()
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null)
                return PartialView("_LoginRegister");
            else return PartialView("_UserInfo", new UserInfoView(user));
        }

        [AllowAnonymous]
        public ActionResult _ForgotPassword()
        {
            return PartialView("_ForgotPassword");
        }
        [AllowAnonymous]
        public ActionResult _Login()
        {
            return PartialView("_Login");
        }


        [AllowAnonymous]
        public ActionResult _Register()
        {
            return PartialView("_Register");
        }
        [AllowAnonymous]
        public ActionResult _LoginRegister()
        {
            return PartialView("_LoginRegister");
        }


        #region Profile - Set Avatar
        public async Task<ActionResult> _UserProfile()
        {
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user == null) return HttpNotFound();
            return PartialView(new UserInfoView(user));
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SetAvatar(string ImageData)
        {


            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return Json(Js.Error(TD.Global.UserNotFound)); ;
            if (string.IsNullOrEmpty(ImageData)) return Json(Js.Error("Dữ liệu ảnh trống"));
            if (string.IsNullOrEmpty(user.AvatarId))
            {
                var saveFile = ImageData.WriteImageString(("users"));
                if (!saveFile.Success) return Json(Js.Error(saveFile.Message));

                var image = await ImageHelper.SaveImage(db, ImageData, "users", null);
                if (!image.OK) return Json(image.Message.GetError());
                user.Avatar = image.Image;
                db.Entry(user).State = EntityState.Modified;
                var result = await db.SaveMessageAsync();
                if (!string.IsNullOrEmpty(result)) return Json(Js.Error(result));
            }
            else
            {
                var saveFile = await ImageHelper.SaveImage(db, ImageData, "users", user.AvatarId);
                if (!saveFile.OK) return Json(Js.Error(saveFile.Message));

            }
            return Json(Js.SuccessLoad(Global.YourAvatarHasBeenSet)); ;
        }
        #endregion

        #region Change Password
        public ActionResult _Password()
        {
            if (HasPassword())
                return PartialView("_ChangePassword");
            else return PartialView("_SetPassword");
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SetPassword(string NewPassword)
        {
            if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return Json(Js.Error(TD.Global.UserNotFound)); ;
            if (!string.IsNullOrEmpty(user.PasswordHash)) return Json(Js.Error(TD.Global.PasswordNotValid));

            var result = await UserManager.AddPasswordAsync(User.Identity.GetUserId(), NewPassword);
            if (result.Succeeded)
            {
                user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                if (user != null)
                {
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                }
                return Json(Js.Success(Global.YourPasswordHasBeenSet)); ;
            }

            return Json(Js.Error(Global.GenericError)); ;
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ChangePassword(string OldPassword, string NewPassword)
        {
            if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return Json(Js.Error(TD.Global.UserNotFound)); ;
            if (user.PasswordHash.ToDecrypt() != OldPassword) return Json(Js.Error(TD.Global.PasswordNotValid)); ;
            user.PasswordHash = NewPassword.ToEncrypt();
            db.Entry(user).State = EntityState.Modified;
            await db.SaveChangesAsync();
            user = await UserManager.FindByIdAsync(User.Identity.GetUserId());

            if (user != null)
            {
                await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
            }
            return Json(Js.SuccessComponent(Global.YourPasswordHasBeenSet, "profiles")); ;
        }
        #endregion

        #region UserBlog
        const int blogSize = 5;
        public ActionResult _Blog(int? id)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return HttpNotFound();
            List<UserBlogView> lst = GetBlogCreateds(id, user);

            return PartialView(lst);
        }
        public ActionResult _BlogGetMore(int? id)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return HttpNotFound();
            List<UserBlogView> lst = GetBlogCreateds(id, user);

            return PartialView(lst);
        }
        List<UserBlogView> GetBlogCreateds(int? id, User user, bool like = false)
        {
            int page = id ?? 1;
            IQueryable<Blog> blogs;
            if (!like) blogs = db.Blogs.Include(X => X.Comments).Where(x => x.UserId == user.Id).OrderByDescending(x => x.LastModify).Skip(blogSize * (page - 1)).Take(blogSize);
            else
                blogs = db.Blogs.Include(X => X.Comments).Where(x => x.UserLikes.Select(y => y.UserId).Contains(user.Id)).OrderByDescending(x => x.LastModify).Skip(blogSize * (page - 1)).Take(blogSize);
            var lst = new List<UserBlogView>();
            foreach (var item in blogs)
                lst.Add(new UserBlogView(item));
            if (db.Blogs.Count() > page * blogSize)
            {
                ViewBag.Page = page + 1;
            }
            return lst;
        }
        public ActionResult _LikeBlog(int? id)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return HttpNotFound();
            List<UserBlogView> lst = GetBlogCreateds(id, user, true);
            return PartialView(lst);
        }
        public ActionResult _LikeBlogMore(int? id)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return HttpNotFound();
            List<UserBlogView> lst = GetBlogCreateds(id, user, true);
            return PartialView(lst);
        }
        public ActionResult _Comment(int? id)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return HttpNotFound();
            var lst = GetComments(id, user);
            return PartialView(lst);
        }
        public ActionResult _CommentMore(int? id)
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return HttpNotFound();
            var lst = GetComments(id, user);
            return PartialView(lst);
        }
        List<UserCommentView> GetComments(int? id, User user)
        {
            int page = id ?? 1;
            IQueryable<Comment> blogs = db.Comments.Where(x => x.UserId == user.Id).OrderByDescending(x => x.LastModify).Skip(blogSize * (page - 1)).Take(blogSize);
            var lst = new List<UserCommentView>();
            foreach (var item in blogs)
                lst.Add(new UserCommentView(item));
            if (db.Comments.Count(x => x.UserId == user.Id) > page * blogSize)
            {
                ViewBag.Page = page + 1;
            }
            return lst;
        }
        #endregion

        public ActionResult _Apps()
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return PartialView();
            var apps = db.UserApps.Where(x => x.UserId == user.Id);
            return PartialView(apps);
        }

        private const string NotExits = "DataNotExits";



        #region Change Username
        public ActionResult _ChangeUserName()
        {

            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return PartialView(NotExits);
            ViewBag.UserName = user.UserName;
            return PartialView();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ChangeUserName(string UserName, string Password)
        {
            if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));
            var user = db.Users.Find(User.Identity.GetUserId());

            if (user == null) return Json(Js.Error(TD.Global.UserNotFound)); ;
            if (user.PasswordHash.ToDecrypt() != Password) return Json(Js.Error(TD.Global.PasswordNotValid)); ;
            if (db.Users.Any(x => x.Id != user.Id && x.UserName == UserName)) return Json(Js.Error(Global.UserNameUsed)); ;

            user.UserName = UserName;
            db.Entry(user).State = EntityState.Modified;
            var str = await db.SaveMessageAsync();
            if (str != null) return Json(str.GetError());

            user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user != null)
            {
                await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
            }
            return Json(Js.SuccessComponent(Global.YourUsernameHasBeenSet, "profiles")); ;
        }
        #endregion

        #region Delete Account
        public ActionResult _DeleteAccount()
        {
            return PartialView();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteAccount(string Password)
        {
            if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));

            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user.PasswordHash == Password.ToEncrypt())
            {
                var result = await UserManager.DeleteAsync(user);
                if (result.Succeeded)
                    return Json(Js.SuccessRedirect(Global.YourAccountHasBeenDelete, "/Home/Index"));
                return Json(result.GetError()); ;
            }
            else
            {
                return Json(Js.Error(Global.PleaseEnterValidPassword)); ;
            }


        }
        #endregion

        #region Change Full Name
        public ActionResult _ChangeName()
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) PartialView("DataNotExist");// return HttpNotFound();
            ViewBag.FullName = user.FullName;
            return PartialView();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ChangeName(string FullName, string Password)
        {
            if (string.IsNullOrEmpty(FullName)) return Json("Vui lòng nhập họ tên".GetError());
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return Json(Js.Error(TD.Global.UserNotFound)); ;
            if (user.PasswordHash.ToDecrypt() != Password) return Json(LanguageDB.PasswordNotValid.GetError()); ;
            user.FullName = FullName;
            db.Entry(user).State = EntityState.Modified;
            var str = await db.SaveMessageAsync();
            if (str != null) return Json(str.GetError());
            return Json(Js.SuccessComponent(TD.Global.NameChanged, "profiles")); ;
        }
        #endregion

        #region Change Phone
        public ActionResult _ChangePhone()
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return PartialView(NotExits);
            ViewBag.PhoneNumber = user.PhoneNumber;
            return PartialView();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ChangePhone(string PhoneNumber, string Password)
        {
            if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));

            if (UserManager.SmsService == null) return Json(Js.Error(TD.Global.SMSOff));
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return Json(Js.Error(TD.Global.UserNotFound)); ;
            if (db.Users.Any(x => x.Id != user.Id && x.PhoneNumber == PhoneNumber))
                return Json(LanguageDB.PhoneNumberExits.GetError());

            var code = await UserManager.GenerateChangePhoneNumberTokenAsync(User.Identity.GetUserId(), PhoneNumber);
            string phoneNumber = string.Format("+{0}", PhoneNumber);
            var message = new IdentityMessage
            {
                Destination = phoneNumber,
                Body = "Mã xác nhận của bạn là : " + code
            };
            try
            {

                TwilioHelper.CreateNumber(phoneNumber);
                await UserManager.SmsService.SendAsync(message);

            }
            catch (Exception e)
            {
                await UserManager.SmsService.SendAsync(new IdentityMessage
                {
                    Destination = "+84985569705",
                    Body = e.Message
                });
                return Json(Js.Error(e.Message)); ;
            }
            return Json(Js.WarningComponent("Vui lòng xác nhận mã điện thoại", "verifyphone", PhoneNumber)); ;
        }

        public ActionResult _VerifyPhone(string id)
        {
            if (string.IsNullOrEmpty(id)) return PartialView(NotExits);
            ViewBag.PhoneNumber = id;
            return PartialView();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyPhone(string PhoneNumber, string Code)
        {

            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return Json(Js.Error(TD.Global.UserNotFound)); ;

            string phoneNumber = UserManager.GetPhoneNumber(User.Identity.GetUserId());

            var code = await UserManager.GenerateChangePhoneNumberTokenAsync(User.Identity.GetUserId(), PhoneNumber);
            if (code != Code)

                return Json(Js.Error("Mã xác minh không chính xác")); ;

            user.PhoneNumber = PhoneNumber;
            user.PhoneNumberConfirmed = true;
            db.Entry(user).State = EntityState.Modified;
            await db.SaveChangesAsync();
            user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user != null)
            {
                await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
            }
            return Json(Js.SuccessComponent(Global.YourPhoneNumberHasBeenSet, "profiles")); ;
        }
        #endregion

        #region Change Email
        public ActionResult _ChangeEmail()
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return PartialView(NotExits);
            ViewBag.Email = user.Email;
            ViewBag.Confirmed = user.EmailConfirmed;
            return PartialView();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ChangeEmail(string Email, string Password)
        {


            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return Json(Js.Error(TD.Global.UserNotFound)); ;
            if (user.PasswordHash.ToDecrypt() != Password) return Json(Js.Error(TD.Global.PasswordNotValid));
            if (db.Users.Any(x => x.Id != user.Id && x.Email == Email))
                return Json(Js.Error(TD.Global.EmailUsed)); ;
            user.Email = Email;
            user.EmailConfirmed = false;
            db.Entry(user).State = EntityState.Modified;
            await db.SaveChangesAsync();
            await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
            string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
            var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
            await UserManager.SendEmailAsync(user.Id, "Confirm your account", string.Format(Global.PleaseVerifyYourAccount, "https://cnstandat.net", callbackUrl));

            return Json(Js.Warning(string.Format(Global.HelpVerifyAccount, Email), "profiles")); ;

        }
        #endregion

        #region Change Sign
        public ActionResult _ChangeSign()
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return PartialView(NotExits);
            ViewBag.Sign = string.IsNullOrEmpty(user.Sign) ? "" : user.Sign;
            return PartialView();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ChangeSign(string Sign, string Password)
        {
            if (string.IsNullOrEmpty(Sign)) return Json(Js.Error(this.GetModelStateError()));
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return Json(Js.Error(TD.Global.UserNotFound)); ;
            if (user.PasswordHash.ToDecrypt() != Password) return Json(Js.Error(TD.Global.PasswordNotValid)); ;
            user.Sign = await Sign.GetValidHtml();
            db.Entry(user).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return Json(Js.SuccessComponent(TD.Global.SignChanged, "profiles")); ;
        }
        #endregion

        #region Login

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            if (!User.Identity.IsAuthenticated)
            {
                ViewBag.ReturnUrl = returnUrl;
                return View();
            }
            else return RedirectToLocal("Index");
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(string UserName, string Password, string ReturnUrl)
        {
            //if (!ModelState.IsValid)
            //{
            //    return Json(Js.Error(this.GetModelStateError()));
            //}
            var result = await SignInManager.PasswordSignInAsync(UserName, Password, true, shouldLockout: true);
            switch (result)
            {
                case SignInStatus.Success:
                    if (!string.IsNullOrEmpty(ReturnUrl))
                        return Json(Js.SuccessRedirect("Wellcome Back " + UserName, ReturnUrl));
                    else return Json(Js.Reload("Wellcome Back" + UserName)); ;
                case SignInStatus.LockedOut:
                    return Json(Js.Error(Global.YourAccountHasBeenLockout)); ;
                case SignInStatus.RequiresVerification:
                    return Json(Js.Warning(Global.HelpVerifyAccount, "/Account/SendCode")); ;
                case SignInStatus.Failure:
                default:
                    return Json(Js.Error(Global.InvalidLoginInfo)); ;
            }
        }
        #endregion



        #region Register
        [AllowAnonymous]
        public ActionResult _FastRegister()
        {
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null)
                return PartialView("_FastRegister");
            else return new EmptyResult();
        }
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(string Email, string Password, string UserName)
        {
            if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));
            if (db.Users.Any(x => x.UserName == UserName)) return Json(Js.Error(Global.UserNameUsed)); ;
            if (db.Users.Any(x => x.Email == Email)) return Json(Js.Error(Global.EmailUsed)); ;

            var user = new User()
            {
                UserName = UserName,
                Email = Email,
            };
            var result = await UserManager.CreateAsync(user, Password);
            if (result.Succeeded)
            {
                await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);


                string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                await UserManager.SendEmailAsync(user.Id, "Confirm your account", string.Format(Global.PleaseVerifyYourAccount, "https://cnstandat.net", callbackUrl));

                return Json(Js.Warning(string.Format(Global.HelpVerifyAccount, Email))); ;
            }

            return Json((result.GetError())); ;

        }
        [HttpPost]

        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResendActiveEmail()
        {
            if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));
            var user = db.Users.Find(User.Identity.GetUserId());
            if (user == null) return Json(Js.Error(TD.Global.UserNotFound)); ;
            string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
            var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
            await UserManager.SendEmailAsync(user.Id, "Confirm your account", string.Format(Global.PleaseVerifyYourAccount, "https://cnstandat.net", callbackUrl));

            return Json(Js.Warning(string.Format(Global.HelpVerifyAccount, user.Email))); ;



        }
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> RegisterFast(string Email, string Password)
        {
            if (ModelState.IsValid)
            {
                var user = new User { Email = Email, UserName = Email };
                var result = await UserManager.CreateAsync(user, Password);
                if (result.Succeeded)
                {
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);


                    string code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                    var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                    await UserManager.SendEmailAsync(user.Id, "Confirm your account", string.Format(Global.PleaseVerifyYourAccount, "https://cnstandat.net", callbackUrl));

                    return Json(Js.Warning(string.Format(Global.HelpVerifyAccount, Email)));
                }

                return Json((result.GetError())); ;
            }
            return Json(Js.Error(Global.GenericError)); ;
            // If we got this far, something failed, redisplay form
        }
        #endregion

        #region Confirm Email
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string userId, string code)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(code))
            {
                return View("Error");
            }
            var result = await UserManager.ConfirmEmailAsync(userId, code);
            return View(result.Succeeded ? "Index" : "Error");
        }
        #endregion

        #region Forgor Password
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(string Email)
        {
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByNameAsync(Email);
                if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return Json(Js.Error("Email không được ghi nhận trong hệ thống")); ;
                }

                string code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
                var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                await UserManager.SendEmailAsync(user.Id, "Reset Password", string.Format(Global.ResetPasswordMail, callbackUrl));
                return Json(Js.SuccessRedirect(string.Format(Global.ResetPasswordHelp, Email), "/")); ;
            }


            return Json(Js.Error(Global.GenericError)); ;
        }
        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            return View();
        }
        #endregion

        #region Reset Password
        [AllowAnonymous]
        public ActionResult ResetPassword(string code)
        {
            return code == null ? View("Error") : View();
        }


        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(string Email, string Code, string Password)
        {

            var user = await UserManager.FindByEmailAsync(Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return View("Error", new ErrorViewModel
                {
                    Error = "Dont Have User",
                    Description = "Our database not have this email"
                });
            }
            var result = await UserManager.ResetPasswordAsync(user.Id, Code, Password);
            if (result.Succeeded)
            {
                await SignInManager.SignInAsync(user, false, false);
                return RedirectToAction("Index", "Home");
            }

            return View();
        }


        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }
        #endregion





        #region External Login

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {

            return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl }));
        }

        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl)
        {

            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (loginInfo == null)
                return RedirectToAction("Login");

            var result = await SignInManager.ExternalSignInAsync(loginInfo, isPersistent: false);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(returnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = false });
                case SignInStatus.Failure:
                default:
                    ViewBag.ReturnUrl = returnUrl;
                    ViewBag.LoginProvider = loginInfo.Login.LoginProvider;
                    if (!string.IsNullOrEmpty(loginInfo.Email))
                    {
                        var user = await UserManager.FindByEmailAsync(loginInfo.Email);
                        if (user != null)
                        {
                            var result2 = await UserManager.AddLoginAsync(user.Id, loginInfo.Login);
                            if (result2.Succeeded)
                            {
                                await StoreAuthTokenClaims(user);
                                await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                                return string.IsNullOrEmpty(returnUrl) ? View("Index") : RedirectToLocal(returnUrl);
                            }
                        }
                    }
                    ViewBag.Email = loginInfo.Email;
                    ViewBag.UserName = loginInfo.DefaultUserName;
                    return View("ExternalLoginConfirmation");
            }
        }


        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(string Email, string UserName, string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
                return Json(Js.SuccessRedirect("Tài khoản của bạn đã được liên kết", "/Account")); ;

            if (!ModelState.IsValid) return Json(Js.Error(this.GetModelStateError()));

            var info = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (info == null)

                return Json(Js.Error("Lỗi liên kết tài khoản mạng xã hội")); ;

            var user = new User()
            {
                UserName = UserName,
                Email = Email
            };
            var result = await UserManager.CreateAsync(user);
            if (result.Succeeded)
            {

                result = await UserManager.AddLoginAsync(user.Id, info.Login);
                if (result.Succeeded)
                {
                    await StoreAuthTokenClaims(user);
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                    return Json(Js.SuccessRedirect("Đăng nhập thành công", string.IsNullOrEmpty(returnUrl) ? "/Account" : returnUrl)); ;
                }
            }

            return Json(result.GetError()); ;

        }
        public async Task<byte[]> DownloadData(string url)
        {
            TaskCompletionSource<byte[]> tcs = new TaskCompletionSource<byte[]>();
            HttpWebRequest request = WebRequest.CreateHttp(url);
            using (HttpWebResponse response = (HttpWebResponse)(await request.GetResponseAsync()))
            using (Stream stream = response.GetResponseStream())
            using (MemoryStream ms = new MemoryStream())
            {
                await stream.CopyToAsync(ms);
                tcs.SetResult(ms.ToArray());
                return await tcs.Task;
            }
        }
        async Task<byte[]> DownloadTwitterProfileImage(IEnumerable<Claim> claims)
        {

            var accessTokenClaim = claims.FirstOrDefault(x => x.Type == "urn:tokens:twitter:accesstoken");
            var accessTokenSecretClaim = claims.FirstOrDefault(x => x.Type == "urn:tokens:twitter:accesstokensecret");

            if (accessTokenClaim != null && accessTokenSecretClaim != null)
            {

                var twitter = TDSettings.DefaultTwitter();
                var service = new TwitterService(
                    twitter.ID,
                    twitter.Key,
                    accessTokenClaim.Value,
                    accessTokenSecretClaim.Value
                    );

                var profile = service.GetUserProfile(new GetUserProfileOptions());
                if (profile != null && !String.IsNullOrWhiteSpace(profile.ProfileImageUrlHttps))
                {
                    return await DownloadData(profile.ProfileImageUrlHttps);
                }
            }
            return null;
        }
        async Task StoreAuthTokenClaims(User user)
        {

            ClaimsIdentity claimsIdentity =
                await AuthenticationManager.GetExternalIdentityAsync(DefaultAuthenticationTypes.ExternalCookie);

            if (claimsIdentity != null)
            {
                var currentClaims = await UserManager.GetClaimsAsync(user.Id);
                var tokenClaims = claimsIdentity.Claims
                    .Where(c => c.Type.StartsWith("urn:tokens:"));
                foreach (var tokenClaim in tokenClaims)
                {
                    if (!currentClaims.Contains(tokenClaim))
                    {
                        await UserManager.AddClaimAsync(user.Id, tokenClaim);
                    }
                }

                var content = await DownloadTwitterProfileImage(tokenClaims);

                string filePath = Server.MapPath(string.Format("~/data/img/users/{0}.jpg", user.Id));
                if (string.IsNullOrEmpty(user.AvatarId))
                {

                    var image = new AppFile(new DBHelper().GetAppFileId(db), user.Id + ".jpg");
                    user.AvatarId = image.Id;
                    db.AppFiles.Add(image);
                    db.SaveChanges();
                    System.IO.File.WriteAllBytes(filePath, content);
                }
                else
                {
                    System.IO.File.WriteAllBytes(filePath, content);
                }

            }

        }
        #endregion

        #region LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return RedirectToAction("Index", "Home");
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult _LogOff()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return Json(Js.SuccessRedirect("Đã thoát tài khoản", "/")); ;
        }
        #endregion


        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }


        public async Task<ActionResult> Index()
        {
            var userId = User.Identity.GetUserId();
            var user = UserManager.FindById(userId);
            if (user == null)
            {
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                return RedirectToAction("Index", "Home");
            }

            var userLogins = await UserManager.GetLoginsAsync(User.Identity.GetUserId());
            var otherLogins = AuthenticationManager.GetExternalAuthenticationTypes().Where(auth => userLogins.All(ul => auth.AuthenticationType != ul.LoginProvider)).ToList();

            return View();
        }

        #region Two Factor

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> EnableTwoFactorAuthentication()
        {
            await UserManager.SetTwoFactorEnabledAsync(User.Identity.GetUserId(), true);
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user != null)
            {
                await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
            }
            return RedirectToAction("Index", "Manage");
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DisableTwoFactorAuthentication()
        {
            await UserManager.SetTwoFactorEnabledAsync(User.Identity.GetUserId(), false);
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user != null)
            {
                await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
            }
            return RedirectToAction("Index", "Manage");
        }
        #endregion



        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyPhoneNumber(string PhoneNumber, string Code)
        {
            if (!ModelState.IsValid)
            {
                return Json(Js.Error(Global.PleaseCheckYourCode)); ;
            }
            string phoneNumber = UserManager.GetPhoneNumber(User.Identity.GetUserId());

            var code = await UserManager.GenerateChangePhoneNumberTokenAsync(User.Identity.GetUserId(), PhoneNumber);
            if (code == Code)
            {
                using (var db = new TDContext())
                {
                    var dbUser = db.Users.Find(User.Identity.GetUserId());
                    dbUser.PhoneNumber = PhoneNumber;
                    dbUser.PhoneNumberConfirmed = true;
                    db.SaveChanges();
                }

                var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                if (user != null)
                {
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                }
                return Json(Js.SuccessLoad(Global.YourPhoneNumberHasBeenSet)); ;
            }
            return Json(Js.Error(Global.GenericError)); ;

        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> RemovePhoneNumber()
        {
            var result = await UserManager.SetPhoneNumberAsync(User.Identity.GetUserId(), null);
            if (!result.Succeeded)
            {
                return Json(Js.Error(Global.CantRemoveYourPhoneNumber)); ;
            }
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user != null)
            {
                await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
            }
            return Json(Js.SuccessLoad(Global.YourPhoneNumberHasBeenSet)); ;
        }

        #region Manage Login
        public async Task<ActionResult> ManageLogins()
        {

            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user == null)
            {
                return View("Error");
            }
            var userLogins = await UserManager.GetLoginsAsync(User.Identity.GetUserId());
            var otherLogins = AuthenticationManager.GetExternalAuthenticationTypes().Where(auth => userLogins.All(ul => auth.AuthenticationType != ul.LoginProvider)).ToList();
            ViewBag.ShowRemoveButton = user.PasswordHash != null || userLogins.Count > 1;
            return PartialView("_ManageLogin", new ManageLoginsViewModel
            {
                CurrentLogins = userLogins,
                OtherLogins = otherLogins
            });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LinkLogin(string provider)
        {

            return new AccountController.ChallengeResult(provider, Url.Action("LinkLoginCallback", "Account"), User.Identity.GetUserId());
        }

        public async Task<ActionResult> LinkLoginCallback()
        {
            var man = AuthenticationManager;
            if (man != null)
            {
                var loginInfo = await man.GetExternalLoginInfoAsync(XsrfKey, User.Identity.GetUserId());
                if (loginInfo == null)
                {
                    return RedirectToLocal("Account");
                }
                var user = db.Users.Find(User.Identity.GetUserId());
                if (user != null)
                {
                    if (string.IsNullOrEmpty(user.Email))
                    {
                        user.Email = loginInfo.Email;
                        user.EmailConfirmed = true;
                        db.Entry(user).State = EntityState.Modified;
                        await db.SaveAsync();
                    }
                    if (string.IsNullOrEmpty(user.FullName))
                    {
                        user.FullName = loginInfo.DefaultUserName;
                        db.Entry(user).State = EntityState.Modified;
                        await db.SaveAsync();
                    }
                }
                var result = await UserManager.AddLoginAsync(User.Identity.GetUserId(), loginInfo.Login);
                if (result.Succeeded)
                {
                    return RedirectToLocal("Account");
                }
                else
                {
                    return Json(result.GetError(), JsonRequestBehavior.AllowGet);
                }
            }
            return Json("Có lỗi xảy ra".GetError(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> RemoveLogin(string loginProvider, string providerKey)
        {

            var result = await UserManager.RemoveLoginAsync(User.Identity.GetUserId(), new UserLoginInfo(loginProvider, providerKey));
            if (result.Succeeded)
            {
                var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                if (user != null)
                {
                    await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                }
            }

            return Json(Js.SuccessComponent("Đã xóa liên kết mạng xã hội", "socials")); ;
        }
        #endregion

        #region Helpers
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }
                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
                if (db != null)
                {
                    db.Dispose();
                }
            }
            base.Dispose(disposing);
        }
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "2C0E11D287114C0A8C3273E9ED395F7C";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }




        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }
        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }

        #endregion

    }
}