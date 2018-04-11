using System;
using System.Data.Entity;

namespace TD.Models
{
    public partial class TDContext
    {
        public DbSet<AppTask> AppTasks { get; set; }
        public DbSet<TagTask> TagTasks { get; set; }
        public DbSet<TaskTag> TaskTags { get; set; }
        private void RegisterTask(DbModelBuilder modelBuilder)
        {
            var task = modelBuilder.Entity<AppTask>();
            task.HasKey(x => x.Id);
            task.Property(x => x.Id).HasMaxLength(20);
            task.HasRequired(x => x.User).WithMany(x => x.TaskCreated).HasForeignKey(x => x.UserId).WillCascadeOnDelete(false);
            task.HasOptional(x => x.Accept).WithMany(x => x.TaskAccepted).HasForeignKey(x => x.AcceptId).WillCascadeOnDelete(false);
            task.HasOptional(x => x.Parent).WithMany(x => x.Children).HasForeignKey(x => x.ParentId).WillCascadeOnDelete(false);
            var taskT = modelBuilder.Entity<TagTask>();
            taskT.HasKey(x => x.Id);
            taskT.Property(x => x.Id).HasMaxLength(20);
            var TagTask = modelBuilder.Entity<TaskTag>();
            TagTask.HasKey(x => new
            {
                x.AppTaskId,
                x.TagTaskId
            });
            TagTask.HasRequired(x => x.AppTask).WithMany(x => x.TaskTags).HasForeignKey(x => x.AppTaskId);
            TagTask.HasRequired(x => x.TagTask).WithMany(x => x.TaskTags).HasForeignKey(x => x.TagTaskId);
        }
      
    }
}