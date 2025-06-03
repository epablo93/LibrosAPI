using Domain.Model;
using Repos.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Repos.Repository
{
    public interface ILibrosRepository : IRepository<Libro>
    {
        // Add Libro-specific methods here if needed in the future
    }

    public class LibrosRepository : Repository<Libro>, ILibrosRepository
    {
        public LibrosRepository(DbContext context) : base(context)
        {
        }
    }
}