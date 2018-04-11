using System;
using System.Data.Entity;

namespace TD.Models
{
    public partial class TDContext
    {
        public DbSet<LikeComment> LikeComments { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<TagBlog> TagBlogs { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<BlogTag> BlogTags { get; set; }
        public DbSet<UserLike> UserLikes { get; set; }
        private void RegisterBlog(DbModelBuilder modelBuilder)
        {
            var blog = modelBuilder.Entity<Blog>();
            blog.Property(x => x.Id).HasMaxLength(20);
            blog.HasKey(x => x.Id);
            blog.HasOptional(x => x.Parent).WithMany(x => x.Children).HasForeignKey(x => x.ParentId).WillCascadeOnDelete(false);
            blog.HasOptional(x => x.App).WithMany(x => x.Blogs).HasForeignKey(x => x.AppId);
            blog.HasRequired(x => x.User).WithMany(x => x.BlogCreated).HasForeignKey(x => x.UserId);
            blog.HasOptional(x => x.Modifier).WithMany(x => x.BlogModified).HasForeignKey(x => x.ModifierId);
            blog.HasOptional(x => x.Product).WithMany(x => x.Blogs).HasForeignKey(x => x.ProductId);
            var comment = modelBuilder.Entity<Comment>();
            comment.Property(x => x.Id).HasMaxLength(20);
            comment.HasKey(x => x.Id);
            comment.HasOptional(x => x.Parent).WithMany(x => x.Children).HasForeignKey(x => x.ParentId).WillCascadeOnDelete(false);
            comment.HasOptional(x => x.Blog).WithMany(x => x.Comments).HasForeignKey(x => x.BlogId);
            comment.HasOptional(x => x.App).WithMany(x => x.Comments).HasForeignKey(x => x.AppId);
            comment.HasRequired(x => x.User).WithMany(x => x.CommentCreated).HasForeignKey(x => x.UserId).WillCascadeOnDelete(false);
            comment.HasOptional(x => x.Modify).WithMany(x => x.CommentModify).HasForeignKey(x => x.ModifyId).WillCascadeOnDelete(false);

            var tagblog = modelBuilder.Entity<BlogTag>();
            tagblog.HasKey(x => new { x.TagBlogId, x.BlogId }).HasRequired(x => x.TagBlog).WithMany(x => x.BlogTags).HasForeignKey(x => x.TagBlogId);
            tagblog.HasRequired(x => x.Blog).WithMany(x => x.BlogTags).HasForeignKey(x => x.BlogId);
            var tag = modelBuilder.Entity<TagBlog>();

            tag.HasKey(x => x.Id);
            tag.Property(x => x.Id).HasMaxLength(20);
            var contactMessage = modelBuilder.Entity<UserContact>();
            contactMessage.HasKey(x => x.Id);

            var userLike = modelBuilder.Entity<UserLike>();
            userLike.HasKey(x => new { x.BlogId, x.UserId });
            userLike.HasRequired(x => x.Blog).WithMany(x => x.UserLikes).HasForeignKey(x => x.BlogId).WillCascadeOnDelete(false);
            userLike.HasRequired(x => x.User).WithMany(x => x.UserLikes).HasForeignKey(x => x.UserId).WillCascadeOnDelete(false);
            var likeComment = modelBuilder.Entity<LikeComment>();
            likeComment.HasKey(x => new { x.UserId, x.CommentId });
            likeComment.HasRequired(x => x.User).WithMany(x => x.LikeComments).HasForeignKey(x => x.UserId).WillCascadeOnDelete(false);
            likeComment.HasRequired(x => x.Comment).WithMany(x => x.LikeComments).HasForeignKey(x => x.CommentId).WillCascadeOnDelete(false);
        }
    }
}