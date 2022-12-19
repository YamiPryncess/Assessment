using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Assessment.Models
{
    public class Test
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string Name { get; set; } = String.Empty;
        public int QuestionsAsked { get; set; } = 0;
        [Required]
        public float minutes { get; set; } = 0.25f;
        public virtual ICollection<Session>? Sessions { get; set; } = new List<Session>();
        public virtual ICollection<Question>? Questions { get; set; } = new List<Question>();
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
    }
}