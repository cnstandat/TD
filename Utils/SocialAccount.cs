using System;
using System.Linq;

namespace TD
{
    public class TDSettings
    {
        public string ID { get; set; }
        public string Key { get; set; }
        public string OtherInformation { get; set; }
        public TDSettings() { }
        public TDSettings(string ID, string Key)
        {
            this.ID = ID;
            this.Key = Key;
        }
        public static TDSettings DefaultGoogle() => new TDSettings("890052476713-sjam93jfa7a0487qj896eocpdmjkjnhq.apps.googleusercontent.com", "LMOTX2MpA0fKXzY-J5GWs7xj");
        public static TDSettings DefaultFacebook() => new TDSettings("925070987549366", "b59e70656d05c87d4730bc6a4fd2e798");
        public static TDSettings DefaultTwitter() => new TDSettings("Oao7uP593rQVYOcRIHrHliuRH", "V2DZQEVYejFrDQvMp5lZXftoDQusXOP4gLtyefpYNsKsLNcZ46");
        public static TDSettings DefaultGmail() => new TDSettings("mrnguyendung.na@gmail.com", "HIENANHHuuLong31052016");
        public static TDSettings DefaultTwilio() => new TDSettings("AC292e5eab90b65cbce5502844a2909d25", "6b9701ebe612fc6fd65b8a3894c09e3d")
        {
            OtherInformation = "18886761161"
        };
        public static TDSettings DefaultConnectionString() => new TDSettings() { OtherInformation = "Server=.\\sqlexpress;Database=TD;Trusted_Connection=True;MultipleActiveResultSets=true" };
    }
}
