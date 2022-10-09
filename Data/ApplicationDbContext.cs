using Assessment.Models;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using static AutoMapper.Internal.ExpressionFactory;

namespace Assessment.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Candidate> Candidate { get; set; }
        public DbSet<Test> Test { get; set; }
        public DbSet<TestResult> TestResult { get; set; }

        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TestResult>().HasKey(ct => new { ct.CandidateId, ct.TestId });

            modelBuilder.Entity<TestResult>()
                .HasOne(c => c.Test)
                .WithMany(t => t.TestResults)
                .HasForeignKey(ct => ct.TestId);

            modelBuilder.Entity<TestResult>()
                .HasOne(c => c.Candidate)
                .WithMany(t => t.TestResults)
                .HasForeignKey(ct => ct.CandidateId);
        }
    }
}