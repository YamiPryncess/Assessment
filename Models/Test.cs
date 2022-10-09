using System.ComponentModel.DataAnnotations;

namespace Assessment.Models
{
    public class Test
    {
        [Key]
        public int Id { get; set; }

        public virtual ICollection<TestResult>? TestResults { get; set; } = new List<TestResult>();
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
        public int QuestionsAsked { get; set; } = 0;
    }
}
//[TestGuid] [uniqueidentifier] NOT NULL,