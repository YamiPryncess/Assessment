using IdentityModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Intrinsics.X86;

namespace Assessment.Models
{
    public class Candidate
    {
        [Key]
        public int Id { get; set; }
        public virtual ICollection<Session>? Sessions { get; set; } = new List<Session>();
        public DateTime CreatedDateTime { get; set; } = DateTime.Now;

        [Required, MaxLength(100)]
        public string FirstName { get; set; } = String.Empty;
        [Required, MaxLength(100)]
        public string LastName { get; set; } = String.Empty;
        [Required, MaxLength(11)]
        public string SSN { get; set; } = String.Empty;
        public DateTime DOB { get; set; } = DateTime.MinValue;
        [MaxLength(500)]
        public string Email { get; set; } = String.Empty;

        [Required]
        public string Source1 { get; set; } = String.Empty;
        public string Source2 { get; set; } = String.Empty;
        [Required]
        public string DesiredJobTitle { get; set; } = String.Empty;
        public DateTime BackgroundCheckAuthorizationTimestampET { get; set; } = DateTime.MinValue;
        [MaxLength(50)]
        public String BackGroundCheckLevel { get; set; } = String.Empty;
        [MaxLength(20)]
        public String DriversLicenseState { get; set; } = String.Empty;
        [MaxLength(20)]
        public String DriversLicenseNumber { get; set; } = String.Empty;
        [Required, MaxLength(50)]
        public string Status { get; set; } = String.Empty;
        [MaxLength(200)]
        public string CreatedBy { get; set; } = String.Empty;
    }
}