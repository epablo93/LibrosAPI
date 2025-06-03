using Domain.Model;
using Microsoft.EntityFrameworkCore;
using Repos.Interfaces;

namespace Repos.Repository
{
    public class LibroRepository : Repository<Libro>, ILibroRepository
    {
        public LibroRepository(DbContext context) : base(context)
        {
        }
    }
}