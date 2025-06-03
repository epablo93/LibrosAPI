using Domain.Model;

namespace Services.Interfaces
{
    public interface ILibroService
    {
        Task<IEnumerable<Libro>> GetAllAsync();
        Task<Libro?> GetByIdAsync(int id);
        Task<Libro> CreateAsync(Libro libro);
        Task<bool> UpdateAsync(int id, Libro libro);
        Task<bool> DeleteAsync(int id);
    }
}