using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Assessment.Models
{
    public class Answer
    {
        [Key]
        public int Id { get; set; }
        public int? QuestionId { get; set; }
        public virtual Question? Question { get; set; }
        public int? SessionId { get; set; }
        public virtual Session? Session { get; set; }

        [MaxLength(2000)]
        public string Text { get; set; } = String.Empty;
        [Range(0, 10)]
        public int Score { get; set; }
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
    }
}