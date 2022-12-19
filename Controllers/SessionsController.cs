using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Assessment.Data;
using Assessment.Models;
using Microsoft.Data.SqlClient;
using System.ComponentModel;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Assessment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SessionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Sessions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Session>>> GetSession()
        {
            return await _context.Session.Include(s => s.Answers).ToListAsync();
        }

        // GET: api/Sessions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Session>> GetSession(int id)
        {
            var session = await _context.Session.FindAsync(id);

            if (session == null)
            {
                return NotFound();
            }

            return session;
        }

        // GET: api/Sessions/Guid/:Guid
        [HttpGet("guid/{Guid}")]
        public async Task<ActionResult<Session>> GetSessionByGuid(string Guid)
        {
            return await _context.Session.Where(s => s.Guid.ToString() == Guid).
                Include(s => s.Answers).Include(s => s.Test).ThenInclude(t => t.Questions).SingleAsync();
        }

        // GET: api/Sessions/Candidates/5/Assigned
        [HttpGet("Candidates/{id:int}/Assigned")]
        public async Task<ActionResult<IEnumerable<TestSession>>> GetAssignedSessions(int id)
        {
            return _context.TestSession.FromSqlRaw(
                "SELECT s.id, s.CandidateId, s.CreatedDateTime, s.Status, s.Guid, " +
                "t.Id AS TestId, t.Name, t.QuestionsAsked " +
                "FROM Session AS s " +
                "RIGHT JOIN Test AS t " +
                "ON s.TestId = t.Id " +
                "AND s.Status = 'Assigned' " +
                "AND s.CandidateId = @Id",
                new SqlParameter("@Id", id)).ToList();
        }

        // PUT: api/Sessions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSession(int id, Session session)
        {
            if (id != session.Id)
            {
                return BadRequest();
            }

            Session? dbSession = await _context.Session.Include(s => s.Answers).FirstOrDefaultAsync(s => s.Id == id);

            try
            {
                dbSession.Status = session.Status;

                dbSession.StartTime = session.StartTime;
                dbSession.EndTime = session.EndTime;

                dbSession.EndMethod = session.EndMethod;

                dbSession.Score = session.Score;
                dbSession.QuestionsAnswered = session.QuestionsAnswered;

                dbSession.Answers = session.Answers;

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SessionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sessions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Session>> PostSession(Session session)
        {
            _context.Session.Add(session);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSession", new { id = session.Id }, session);
        }

        // DELETE: api/Sessions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSession(int id)
        {
            var session = await _context.Session.FindAsync(id);
            if (session == null)
            {
                return NotFound();
            }

            _context.Session.Remove(session);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SessionExists(int id)
        {
            return _context.Session.Any(e => e.Id == id);
        }
    }
}
