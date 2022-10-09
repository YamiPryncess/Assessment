using System.ComponentModel.DataAnnotations;
using static AutoMapper.Internal.ExpressionFactory;

namespace Assessment.Models
{
    public class TestResult
    {
        [Key]
        public int Id { get; set; }
        public int TestId { get; set; }
        public virtual Test? Test { get; set; }
        public int CandidateId { get; set; }
        public virtual Candidate? Candidate { get; set; }
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
        public DateTime StartTime { get; set; } = DateTime.MinValue;
        public DateTime EndTime { get; set; } = DateTime.MinValue;
        [MaxLength(50)]
        public string EndMethod { get; set; } = String.Empty;
        public int Score { get; set; } = 0;
        public int QuestionsAnswered { get; set; } = 0;
    }
}
//[AllowedToTakeTest]  AS (case when [TestStartTimeET] IS NULL OR dateadd(minute,(20),[TestStartTimeET])> getdate() then CONVERT([bit], (1),(0)) else CONVERT([bit],(0),(0)) end),