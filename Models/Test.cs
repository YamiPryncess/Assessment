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
        public virtual ICollection<TestResult>? TestResults { get; set; } = new List<TestResult>();
        public virtual ICollection<Question>? Questions { get; set; } = new List<Question>();
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
    }
}
//[TestGuid] [uniqueidentifier] NOT NULL,