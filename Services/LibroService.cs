using Domain.Model;
using FluentValidation;
using Repos.Interfaces;
using Services.Interfaces;

namespace Services
{
    public class LibroService : ILibroService
    {
        private readonly ILibroRepository _libroRepository;
        private readonly IValidator<Libro> _validator;

        public LibroService(ILibroRepository libroRepository, IValidator<Libro> validator)
        {
            _libroRepository = libroRepository;
            _validator = validator;
        }

        public async Task<IEnumerable<Libro>> GetAllAsync()
            => await _libroRepository.GetAllAsync();

        public async Task<Libro?> GetByIdAsync(int id)
            => await _libroRepository.GetByIdAsync(id);

        public async Task<Libro> CreateAsync(Libro libro)
        {
            var validation = await _validator.ValidateAsync(libro);
            if (!validation.IsValid)
                throw new ValidationException(validation.Errors);
            await _libroRepository.AddAsync(libro);
            await _libroRepository.SaveChangesAsync();
            return libro;
        }

        public async Task<bool> UpdateAsync(int id, Libro libro)
        {
            var validation = await _validator.ValidateAsync(libro);
            if (!validation.IsValid)
                throw new ValidationException(validation.Errors);
            var existing = await _libroRepository.GetByIdAsync(id);
            if (existing == null) return false;
            existing.Titulo = libro.Titulo;
            existing.Autor = libro.Autor;
            existing.Descripcion = libro.Descripcion;
            _libroRepository.Update(existing);
            await _libroRepository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var libro = await _libroRepository.GetByIdAsync(id);
            if (libro == null) return false;
            _libroRepository.Delete(libro);
            await _libroRepository.SaveChangesAsync();
            return true;
        }
    }
}