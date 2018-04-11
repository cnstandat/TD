using System;
using System.Linq;

namespace TD.Models
{
    public static class Extensions
    {
        public static string GetTwitterLink(this string str)
        {
            return string.Format("https://twitter.com/home?status=http%3A//cnstandat.net/viewpost/{0}", str);
        }
        public static string GetGoogleLink(this string str)
        {
            return string.Format("https://plus.google.com/share?url=http%3A//cnstandat.net/viewpost/{0}", str);
        }
        public static string GetFacebookLink(this string str)
        {
            return string.Format("https://www.facebook.com/sharer/sharer.php?u=http%3A//cnstandat.net/viewpost/{0}", str);
        }
        public static string GetImageLinkBlog(this Guid BlogId)
        {
            return string.Format("/data/img/blogs/blog_{0}.jpg", BlogId);
        }
    }
}