using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using TD.Models.Views;

namespace TD.Models
{

    public class Blog
    {

        public Blog()
        {
            BlogTags = new List<BlogTag>();
            Comments = new List<Comment>();
            MarkDelete = false;
        }
        public Blog(BlogEditModel model) : this()
        {
            this.Id = model.Id;
            this.FullName = model.FullName;
            this.Name = model.Name;
            this.Content = model.Content;
            this.Summary = model.Summary;
            this.LongSummary = model.LongSummary;
            this.AppId = model.AppId;
            this.UserId = model.UserId;
            this.LastModify = DateTime.UtcNow;
        }
        public string AppId { get; set; }
        public virtual App App { get; set; }
        public string ProductId { get; set; }
        public virtual Product Product { get; set; }
        public string Id { get; set; }

        public string Name { get; set; }

        public string FullName { get; set; }

        public string Summary { get; set; }

        public string LongSummary { get; set; }

        public string Content { get; set; }

        public virtual ICollection<BlogTag> BlogTags { get; set; }

        public virtual ICollection<Gallery> Galleries { get; set; }

        public virtual User User { get; set; }
        public string UserId { get; set; }

        public virtual User Modifier { get; set; }
        public string ModifierId { get; set; }

        public DateTime LastModify { get; set; }
        public string ReasonModify { get; set; }

        public bool MarkDelete { get; set; }

        public int Viewed { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public bool Closed { get; set; }
        public virtual ICollection<UserLike> UserLikes { get; set; }
        public string ParentId { get; set; }
        public virtual Blog Parent { get; set; }
        public virtual ICollection<Blog> Children { get; set; }

    }
    public class UserLike
    {

        public UserLike()
        {

        }
        public string BlogId { get; set; }
        public virtual Blog Blog { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public DateTime Time { get; set; }

    }
    public class BlogTag
    {
        public BlogTag()
        {

        }
        public BlogTag(string TagBlogId, string BlogId)
        {
            this.BlogId = BlogId;
            this.TagBlogId = TagBlogId;
        }
        public string TagBlogId { get; set; }
        public string BlogId { get; set; }
        public virtual TagBlog TagBlog { get; set; }
        public virtual Blog Blog { get; set; }
    }
    public class Comment
    {

        public Comment()
        {
            Created = DateTime.UtcNow;
            Children = new List<Comment>();
        }
        public Comment(string Id,string Content) : this()
        {
            this.Id = Id;
            this.Content = Content;
            this.LastModify = DateTime.Now;
        }
        public string Id { get; set; }
        public string Content { get; set; }
        public virtual Blog Blog { get; set; }
        public string AppId { get; set; }
        public virtual App  App{ get; set; }
        public string BlogId { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public DateTime Created { get; set; }
        public string ParentId { get; set; }
        public virtual Comment Parent { get; set; }
        public List<Comment> Children { get; set; }
        public ICollection<LikeComment> LikeComments { get; set; }
        public string Reason { get; set; }
        public string ModifyId { get; set; }
        public virtual User Modify { get; set; }
        public DateTime? LastModify { get; set; }
    }
    public class TagBlog
    {

        public TagBlog()
        {

            BlogTags = new List<BlogTag>();
        }

        public TagBlog(string Id, string Name, string FullName) : this()
        {
            this.Id = Id;
            this.Name = Name;
            this.FullName = FullName;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public virtual ICollection<BlogTag> BlogTags { get; set; }
    }
    public class LikeComment
    {
        public string UserId { get; set; }
        public string CommentId { get; set; }
        public virtual User User { get; set; }
        public virtual Comment Comment { get; set; }
        public DateTime Time { get; set; }
    }

}