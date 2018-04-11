using System;
using System.Collections.Generic;

namespace TD.Models
{
    public class AppTask
    {

        public AppTask()
        {
            Children = new List<AppTask>();
            TaskTags = new List<TaskTag>();
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Note { get; set; }
        public int Step { get; set; }
        public int CurrentStep { get; set; }
        public int MaxStep { get; set; }
        public string ParentId { get; set; }
        public virtual AppTask Parent { get; set; }
        public virtual ICollection<AppTask> Children { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public string AcceptId { get; set; }
        public virtual User Accept { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Expired { get; set; }
        public virtual ICollection<TaskTag> TaskTags { get; set; }
        public TaskLevel Level { get; set; }
        public bool Complete { get; set; }
    }
    public class TagTask
    {

        public TagTask()
        {
            TaskTags = new List<TaskTag>();
        }
        public TagTask(string Id, string Name) : this()
        {
            this.Id = Id;
            this.Name = Name;
        }
        public string Name { get; set; }
        public string Id { get; set; }
        public virtual ICollection<TaskTag> TaskTags { get; set; }
    }
    public class TaskTag
    {
        public virtual AppTask AppTask { get; set; }
        public string AppTaskId { get; set; }
        public virtual TagTask TagTask { get; set; }
        public string TagTaskId { get; set; }
    }
}