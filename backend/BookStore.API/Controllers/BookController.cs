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

        [HttpPost("AddBook")]
        public IActionResult addBook([FromBody]Book newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }
        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _context.Books.Find(bookID);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Category = updatedBook.Category;
            existingBook.Classification = updatedBook.Classification;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;
            existingBook.Publisher = updatedBook.Publisher;
           
           _context.Books.Update(existingBook);
           _context.SaveChanges();

           return Ok(existingBook);
        }
        [HttpDelete("DeleteBook/{bookID}")]
public IActionResult DeleteBook(int bookID)  // Method name now matches the route
{
    try
    {
        var book = _context.Books.Find(bookID);

        if (book == null)
        {
            return NotFound(new {message = "Book not found"});
        }
        
        _context.Books.Remove(book);
        _context.SaveChanges();

        return NoContent();
    }
    catch (Exception ex)
    {
        // Log the exception
        Console.WriteLine($"Error deleting book: {ex.Message}");
        return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
    }
}
    }}
