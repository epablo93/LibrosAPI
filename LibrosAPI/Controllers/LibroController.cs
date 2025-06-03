using Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace LibrosAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class LibroController : ControllerBase
    {
        private readonly ILibroService _libroService;

        public LibroController(ILibroService libroService)
        {
            _libroService = libroService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Libro>>> GetAll()
        {
            var libros = await _libroService.GetAllAsync();
            return Ok(libros);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Libro>> GetById(int id)
        {
            var libro = await _libroService.GetByIdAsync(id);
            if (libro == null)
                return NotFound();
            return Ok(libro);
        }

        [HttpPost]
        public async Task<ActionResult<Libro>> Create([FromBody] Libro libro)
        {
            if (libro == null)
                return BadRequest();
            var created = await _libroService.CreateAsync(libro);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Libro libro)
        {
            var updated = await _libroService.UpdateAsync(id, libro);
            if (!updated)
                return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _libroService.DeleteAsync(id);
            if (!deleted)
                return NotFound();
            return NoContent();
        }
    }
}
