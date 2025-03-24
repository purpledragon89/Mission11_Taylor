using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11_Taylor.API.Data;
using System.Linq;

namespace Mission11_Taylor.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _context;
        
        public BookController(BookDbContext temp)
        {
            _context = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetProjects(int pageAmount = 5, int pagenum = 1, string sortOrder = "asc", [FromQuery] List<string>? booktypes = null)
        {

            var query = _context.Books.AsQueryable();

            if (booktypes != null && booktypes.Any())
            {
                query = query.Where(b => booktypes.Contains(b.Category));
            }
            // Apply sorting
            if (sortOrder.ToLower() == "desc")
            {
                query = query.OrderByDescending(b => b.Title);
            }
            else
            {
                query = query.OrderBy(b => b.Title);
            }
            var totalnumbooks = query.Count();


            var bookitems = query.Skip((pagenum - 1) * pageAmount).Take(pageAmount).ToList();
            
            return Ok(new {
                Books = bookitems,
                TotalNumBooks = totalnumbooks
            });
        } // ✅ **Properly closed GetProjects method**

        [HttpGet("BookCategory")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookCategories);
        }
    }
}
