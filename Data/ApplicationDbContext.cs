using Assessment.Models;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using static AutoMapper.Internal.ExpressionFactory;
using static IdentityModel.ClaimComparer;

namespace Assessment.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Candidate> Candidate { get; set; }
        public DbSet<Test> Test { get; set; }
        public DbSet<TestResult> TestResult { get; set; }
        public DbSet<Question> Question { get; set; }

        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
            //optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TestResult>()
                .HasOne(ct => ct.Test)
                .WithMany(t => t.TestResults)
                .HasForeignKey(ct => ct.TestId);

            modelBuilder.Entity<TestResult>()
                .HasOne(ct => ct.Candidate)
                .WithMany(c => c.TestResults)
                .HasForeignKey(ct => ct.CandidateId);

            modelBuilder.Entity<Question>()
                .HasOne(q => q.Test)
                .WithMany(t => t.Questions)
                .HasForeignKey(q => q.TestId);
        }
    }
}