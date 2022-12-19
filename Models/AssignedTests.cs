using System.ComponentModel.DataAnnotations;

namespace Assessment.Models
{
    public class AssignedTests
    {
        public string Name { get; set; } = String.Empty;
        public int QuestionsAsked { get; set; } = 0;
        public SessionStatus Status { get; set; }
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
    }
}
