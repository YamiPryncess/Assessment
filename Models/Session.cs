using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using static AutoMapper.Internal.ExpressionFactory;

namespace Assessment.Models
{
    public class Session
    {
        [Key]
        public int Id { get; set; }
        public Guid Guid { get; set; }
        public int TestId { get; set; }
        public virtual Test? Test { get; set; }
        public int CandidateId { get; set; }
        public virtual Candidate? Candidate { get; set; }
        public virtual ICollection<Answer>? Answers { get; set; } = new List<Answer>();
        [Required]
        public SessionStatus Status { get; set; }
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
        [AllowNull]
        public DateTime? StartTime { get; set; }
        [AllowNull]
        public DateTime? EndTime { get; set; }
        public EndingMethod EndMethod { get; set; }
        public int Score { get; set; } = 0;
        public int QuestionsAnswered { get; set; } = 0;
    }
}
//[AllowedToTakeTest]  AS (case when [TestStartTimeET] IS NULL OR dateadd(minute,(20),[TestStartTimeET])> getdate() then CONVERT([bit], (1),(0)) else CONVERT([bit],(0),(0)) end),
//[TestGuid] [uniqueidentifier] NOT NULL,
public enum SessionStatus {
    Assigned,
    Started,
    Finished
}

public enum EndingMethod {
    NotEnded,
    ManualSubmission,
    TimeExpired,
    BrowserClose
}