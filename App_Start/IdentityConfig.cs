using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using TD.Models;
using System.Net.Mail;
using System.Text;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using Twilio.Clients;

namespace TD
{
    public class TwilioHelper
    {
        public static bool GetNumber(string Number)
        {
            var twilio = TDSettings.DefaultTwilio();
            Twilio.TwilioClient.Init(twilio.ID, twilio.Key);

            var callerIds = OutgoingCallerIdResource.Read(
           phoneNumber: new PhoneNumber(twilio.OtherInformation));
            foreach (var callerId in callerIds)
            {
                if (callerId.PhoneNumber.ToString() == Number) return true;
            }
            return false;
        }
        public static bool CreateNumber(string Number)
        {
            try
            {
                var twilio = TDSettings.DefaultTwilio();
                Twilio.TwilioClient.Init(twilio.ID, twilio.Key);
                var phoneNumber = new PhoneNumber(Number);
                //var tw = new TwilioRestClient(twilio.ID, twilio.Key);
                //var callerId = tw..AddOutgoingCallerId("+14158675309", "My Home Phone Number", null, null);
                var validationRequest = ValidationRequestResource.Create(
                    phoneNumber,
                    friendlyName: "Auto AddNumber");
                Console.WriteLine(validationRequest.ValidationCode);
            }
            catch
            {

            }
            return true;

        }
    }
    public class EmailService : IIdentityMessageService
    {
        public System.Threading.Tasks.Task SendAsync(IdentityMessage message)
        {
            var mm = new MailMessage("mrnguyendung@cnstandat.net", message.Destination, message.Subject, message.Body) { IsBodyHtml = true, SubjectEncoding = Encoding.UTF8, BodyEncoding = Encoding.UTF8 };
            var gmail = TDSettings.DefaultGmail();
            var smtp = new SmtpClient()
            {
                Host = "smtp.gmail.com",
                UseDefaultCredentials = false,
                EnableSsl = true,
                Port = 25,
                Credentials = new System.Net.NetworkCredential(gmail.ID, gmail.Key)
            };

            return smtp.SendMailAsync(mm);
        }
    }
    public class SmsService : IIdentityMessageService
    {
        public System.Threading.Tasks.Task SendAsync(IdentityMessage message)
        {
            var twilio = TDSettings.DefaultTwilio();
            Twilio.TwilioClient.Init(twilio.ID, twilio.Key);
            var mes = MessageResource.Create(to: new Twilio.Types.PhoneNumber(message.Destination), from: new Twilio.Types.PhoneNumber(twilio.OtherInformation), body: message.Body);
            //var result = client.SendMessage(Options.SendNumber, number, message);
            // Use the debug output for testing without receiving a SMS message.
            // Remove the Debug.WriteLine(message) line after debugging.
            // System.Diagnostics.Debug.WriteLine(message);
            return System.Threading.Tasks.Task.FromResult(0);
        }
    }

    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.
    public class UserManager : UserManager<User>
    {
        public UserManager(IUserStore<User> store)
            : base(store)
        {
            PasswordHasher = new TDPassword();
        }

        public static UserManager Create(IdentityFactoryOptions<UserManager> options, IOwinContext context)
        {
            var manager = new UserManager(new UserStore<User>(context.Get<TDContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<User>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };

            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 4,
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = false,
                RequireUppercase = false,
            };

            // Configure user lockout defaults
            manager.UserLockoutEnabledByDefault = true;
            manager.DefaultAccountLockoutTimeSpan = TimeSpan.FromMinutes(5);
            manager.MaxFailedAccessAttemptsBeforeLockout = 5;

            // Register two factor authentication providers. This application uses Phone and Emails as a step of receiving a code for verifying the user
            // You can write your own provider and plug it in here.
            //manager.RegisterTwoFactorProvider("Phone Code", new PhoneNumberTokenProvider<User>
            //{
            //    MessageFormat = "Your security code is {0}"
            //});
            //manager.RegisterTwoFactorProvider("Email Code", new EmailTokenProvider<User>
            //{
            //    Subject = "Security Code",
            //    BodyFormat = "Your security code is {0}"
            //});
            manager.EmailService = new EmailService();
            manager.SmsService = new SmsService();
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider =
                    new DataProtectorTokenProvider<User>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }

    // Configure the application sign-in manager which is used in this application.
    public class SignInManager : SignInManager<User, string>
    {
        public SignInManager(UserManager userManager, IAuthenticationManager authenticationManager)
            : base(userManager, authenticationManager)
        {
        }

        public override Task<ClaimsIdentity> CreateUserIdentityAsync(User user)
        {
            return user.GenerateUserIdentityAsync((UserManager)UserManager);
        }

        public static SignInManager Create(IdentityFactoryOptions<SignInManager> options, IOwinContext context)
        {
            return new SignInManager(context.GetUserManager<UserManager>(), context.Authentication);
        }
    }
    public class TDPassword : IPasswordHasher
    {
        public string HashPassword(string password)
        {
            return password.ToEncrypt();
        }

        public PasswordVerificationResult VerifyHashedPassword(string hashedPassword, string providedPassword)
        {
            if (providedPassword == hashedPassword.ToDecrypt())
                return PasswordVerificationResult.Success;
            else return PasswordVerificationResult.Failed;
        }
    }
}
