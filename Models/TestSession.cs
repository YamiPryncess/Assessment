using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace Assessment.Models
{
    [Keyless]
    public class TestSession
    {
        [AllowNull]
        public int? Id { get; set; }
        public Guid? Guid { get; set; }
        [AllowNull]
        public int? CandidateId { get; set; }
        public int TestId { get; set; }
        [AllowNull]
        public DateTime? CreatedDateTime { get; set; } = DateTime.Now;
        [AllowNull]
        public SessionStatus? Status { get; set; }
        public string Name { get; set; } = String.Empty;
        public int QuestionsAsked { get; set; } = 0;
        
    }
}