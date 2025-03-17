using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11_Taylor.API.Data;

namespace Mission11_Taylor.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _context;
        
        public BookController(BookDbContext temp)
        {
            _context = temp;
        }
        
        [HttpGet("AllBooks")]
        public IEnumerable<Book> GetProjects()
        {
            return _context.Books.ToList();
        }
        
    }
}
