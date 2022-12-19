using Assessment.Models;
using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Reflection.Metadata;
using static AutoMapper.Internal.ExpressionFactory;
using static IdentityModel.ClaimComparer;

namespace Assessment.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Candidate> Candidate { get; set; }
        public DbSet<Test> Test { get; set; }
        public DbSet<Session> Session { get; set; }
        public DbSet<TestSession> TestSession { get; set; }
        public DbSet<Question> Question { get; set; }
        public DbSet<Answer> Answer { get; set; }

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

            //Enum
            modelBuilder
                .Entity<Session>()
                .Property(s => s.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => (SessionStatus)Enum.Parse(typeof(SessionStatus), v));
            
            modelBuilder
                .Entity<Session>()
                .Property(s => s.EndMethod)
                .HasConversion(
                    v => v.ToString(),
                    v => (EndingMethod)Enum.Parse(typeof(EndingMethod), v));

            modelBuilder
                .Entity<TestSession>()
                .Property(s => s.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => (SessionStatus)Enum.Parse(typeof(SessionStatus), v));

            //Session Values
            modelBuilder.Entity<Session>()
                .Property(s => s.Guid)
                .HasDefaultValueSql("NewId()");

            /*modelBuilder.Entity<Session>()
                .Property(p => p.Time)
                .HasComputedColumnSql("", stored: true);*/

            //Session Associations
            modelBuilder.Entity<Session>()
                .HasOne(s => s.Test)
                .WithMany(t => t.Sessions)
                .HasForeignKey(s => s.TestId);

            modelBuilder.Entity<Session>()
                .HasOne(s => s.Candidate)
                .WithMany(c => c.Sessions)
                .HasForeignKey(s => s.CandidateId);

            //Question Associations
            modelBuilder.Entity<Question>()
                .HasOne(q => q.Test)
                .WithMany(t => t.Questions)
                .HasForeignKey(q => q.TestId);

            //Answer Associations
            modelBuilder.Entity<Answer>()
                .HasOne(a => a.Session)
                .WithMany(s => s.Answers)
                .HasForeignKey(a => a.SessionId);

            modelBuilder.Entity<Answer>()
                .HasOne(a => a.Question)
                .WithMany(q => q.Answers)
                .HasForeignKey(a => a.QuestionId);
        }
    }
}