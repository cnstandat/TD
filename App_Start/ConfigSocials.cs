using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Google;
using Owin;
using TD.Models;
using Microsoft.Owin.Security.OAuth;
using Microsoft.Owin.Security.Facebook;
using System.Security.Claims;
using Microsoft.Owin.Security;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Globalization;

namespace TD
{
   
    public partial class Startup
    {
        private static void ConfigSocials(IAppBuilder app)
        {
            ConfigTwitter(app);
            ConfigFacebook(app);
            ConfigGoogle(app);
            // Configure the application for OAuth based flow
            PublicClientId = "2C0E11D287114C0A8C3273E9ED395FC7";
            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/Token"),
                Provider = new ApplicationOAuthProvider(PublicClientId),
                AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(14),
                // In production mode set AllowInsecureHttp = false
                AllowInsecureHttp = true
            };
        }

        private static void ConfigFacebook(IAppBuilder app)
        {
            var facebook = TDSettings.DefaultFacebook();
            var facebookOptions = new FacebookAuthenticationOptions
            {
                AppId = facebook.ID,
                AppSecret = facebook.Key,
                BackchannelHttpHandler = new FacebookBackChannelHandler(),
                UserInformationEndpoint = "https://graph.facebook.com/v2.8/me?fields=id,name,email",
                Scope = { "email" }
            };

            app.UseFacebookAuthentication(facebookOptions);
        }

        private static void ConfigGoogle(IAppBuilder app)
        {
            var google = TDSettings.DefaultGoogle();
            app.UseGoogleAuthentication(new GoogleOAuth2AuthenticationOptions()
            {
                ClientId = google.ID,
                ClientSecret = google.Key
            });
        }

        private static void ConfigTwitter(IAppBuilder app)
        {
            var twitter = TDSettings.DefaultTwitter();
            var twitterOptions = new Microsoft.Owin.Security.Twitter.TwitterAuthenticationOptions()
            {
                ConsumerKey = twitter.ID,
                ConsumerSecret = twitter.Key,
                Provider = new Microsoft.Owin.Security.Twitter.TwitterAuthenticationProvider
                {
                    OnAuthenticated = context =>
                    {
                        context.Identity.AddClaim(new Claim("urn:twitter:access_token", context.AccessToken));
                        context.Identity.AddClaim(new Claim("urn:twitter:access_secret", context.AccessTokenSecret));
                        return Task.FromResult(0);
                    }
                },
                BackchannelCertificateValidator = new Microsoft.Owin.Security.CertificateSubjectKeyIdentifierValidator(new[]
   {
      "A5EF0B11CEC04103A34A659048B21CE0572D7D47", // VeriSign Class 3 Secure Server CA - G2
      "0D445C165344C1827E1D20AB25F40163D8BE79A5", // VeriSign Class 3 Secure Server CA - G3
      "7FD365A7C2DDECBBF03009F34339FA02AF333133", // VeriSign Class 3 Public Primary Certification Authority - G5
      "39A55D933676616E73A761DFA16A7E59CDE66FAD", // Symantec Class 3 Secure Server CA - G4
      "‎add53f6680fe66e383cbac3e60922e3b4c412bed", // Symantec Class 3 EV SSL CA - G3
      "4eb6d578499b1ccf5f581ead56be3d9b6744a5e5", // VeriSign Class 3 Primary CA - G5
      "5168FF90AF0207753CCCD9656462A212B859723B", // DigiCert SHA2 High Assurance Server C‎A 
      "B13EC36903F8BF4701D498261A0802EF63642BC3" // DigiCert High Assurance EV Root CA
    })
            };
            app.UseTwitterAuthentication(twitterOptions);
        }
    }


}