using Microsoft.AspNetCore.CookiePolicy;
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
        private BookDbContext _context;
        
        public BookController(BookDbContext temp)
        {
            _context = temp;
        }
        
        [HttpGet("AllBooks")]
        public IActionResult GetProjects(int pageAmount = 5, int pagenum = 1, string sortOrder = "asc")
        {
            
            HttpContext.Response.Cookies.Append("FavoriteClassification", "Non-Fiction", new CookieOptions {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(20)
                });
            
            var query = _context.Books.AsQueryable();
            
            // Apply sorting
            if (sortOrder.ToLower() == "desc")
            {
                query = query.OrderByDescending(b => b.Title);
            }
            else
            {
                query = query.OrderBy(b => b.Title);
            }
            
            var bookitems = query.Skip((pagenum - 1) * pageAmount).Take(pageAmount).ToList();
            var totalnumbooks = _context.Books.Count();
            
            return Ok(new {
                Books = bookitems,
                TotalNumBooks = totalnumbooks
            });
        }
    }
}