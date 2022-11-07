using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Assessment.Models
{
    public class Question
    {
        [Key]
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string Text { get; set; } = String.Empty;
        [MaxLength(100)]
        public string Image { get; set; } = String.Empty;
        public int Index { get; set; } = 0;
        [Required, ForeignKey("TestId")]
        public int TestId { get; set; }
        public virtual Test? Test { get; set; }
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;
    }
}