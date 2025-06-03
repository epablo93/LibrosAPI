using Microsoft.EntityFrameworkCore;
using Domain.Model;

namespace Domain
{
    public class LibrosDbContext : DbContext
    {
        public LibrosDbContext(DbContextOptions<LibrosDbContext> options) : base(options) { }

        public DbSet<Libro> Libros { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Libro>()
                .HasKey(l => l.Id);
            modelBuilder.Entity<Libro>()
                .Property(l => l.Id)
                .ValueGeneratedOnAdd();
        }
    }
}