using System;
using System.Linq;

namespace TD
{
    public static class CryptExtensions
    {
        public const string PublicPassword = "{207D38A7-BF94-4506-A8FB-F6E17A63968B}cnstandat.net2017";
        public static string ToEncrypt(this object str, string publicPassword = PublicPassword)
        {
            if (str == DBNull.Value) return null;
            if (str == null) return null;
            return StringCipher.Encrypt(str.ToString(), publicPassword);
        }
        public static string ToDecrypt(this object str, string publicPassword = PublicPassword)
        {
            if (str == DBNull.Value) return null;
            if (str == null) return null;
            return StringCipher.Decrypt(str.ToString(), publicPassword);
        }

    }
}
