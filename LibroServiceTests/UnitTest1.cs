using Domain.Model;
using FluentValidation;
using Moq;
using Repos.Interfaces;
using Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace LibroServiceTests
{
    public class LibroServiceTests
    {
        private readonly Mock<ILibroRepository> _repoMock;
        private readonly Mock<IValidator<Libro>> _validatorMock;
        private readonly LibroService _service;

        public LibroServiceTests()
        {
            _repoMock = new Mock<ILibroRepository>();
            _validatorMock = new Mock<IValidator<Libro>>();
            _service = new LibroService(_repoMock.Object, _validatorMock.Object);
        }

        [Fact]
        public async Task GetAllAsync_ReturnsAllLibros()
        {
            var libros = new List<Libro> { new() { Titulo = "A", Autor = "B", Descripcion = "C" } };
            _repoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(libros);
            var result = await _service.GetAllAsync();
            Assert.Single(result);
        }

        [Fact]
        public async Task GetByIdAsync_ReturnsLibro_WhenExists()
        {
            var libro = new Libro { Titulo = "A", Autor = "B", Descripcion = "C" };
            _repoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(libro);
            var result = await _service.GetByIdAsync(1);
            Assert.NotNull(result);
        }

        [Fact]
        public async Task GetByIdAsync_ReturnsNull_WhenNotExists()
        {
            _repoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync((Libro?)null);
            var result = await _service.GetByIdAsync(1);
            Assert.Null(result);
        }

        [Fact]
        public async Task CreateAsync_ThrowsValidationException_WhenInvalid()
        {
            var libro = new Libro();
            _validatorMock.Setup(v => v.ValidateAsync(libro, default)).ReturnsAsync(new FluentValidation.Results.ValidationResult(new[] { new FluentValidation.Results.ValidationFailure("Titulo", "Required") }));
            await Assert.ThrowsAsync<ValidationException>(() => _service.CreateAsync(libro));
        }

        [Fact]
        public async Task CreateAsync_AddsLibro_WhenValid()
        {
            var libro = new Libro { Titulo = "A", Autor = "B", Descripcion = "C" };
            _validatorMock.Setup(v => v.ValidateAsync(libro, default)).ReturnsAsync(new FluentValidation.Results.ValidationResult());
            _repoMock.Setup(r => r.AddAsync(libro)).Returns(Task.CompletedTask);
            _repoMock.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);
            var result = await _service.CreateAsync(libro);
            Assert.Equal(libro, result);
        }

        [Fact]
        public async Task UpdateAsync_ThrowsValidationException_WhenInvalid()
        {
            var libro = new Libro();
            _validatorMock.Setup(v => v.ValidateAsync(libro, default)).ReturnsAsync(new FluentValidation.Results.ValidationResult(new[] { new FluentValidation.Results.ValidationFailure("Titulo", "Required") }));
            await Assert.ThrowsAsync<ValidationException>(() => _service.UpdateAsync(1, libro));
        }

        [Fact]
        public async Task UpdateAsync_ReturnsFalse_WhenNotFound()
        {
            var libro = new Libro { Titulo = "A", Autor = "B", Descripcion = "C" };
            _validatorMock.Setup(v => v.ValidateAsync(libro, default)).ReturnsAsync(new FluentValidation.Results.ValidationResult());
            _repoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync((Libro?)null);
            var result = await _service.UpdateAsync(1, libro);
            Assert.False(result);
        }

        [Fact]
        public async Task UpdateAsync_UpdatesLibro_WhenValid()
        {
            var libro = new Libro { Titulo = "A", Autor = "B", Descripcion = "C" };
            var existing = new Libro { Titulo = "X", Autor = "Y", Descripcion = "Z" };
            _validatorMock.Setup(v => v.ValidateAsync(libro, default)).ReturnsAsync(new FluentValidation.Results.ValidationResult());
            _repoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(existing);
            _repoMock.Setup(r => r.Update(existing));
            _repoMock.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);
            var result = await _service.UpdateAsync(1, libro);
            Assert.True(result);
            Assert.Equal("A", existing.Titulo);
        }

        [Fact]
        public async Task DeleteAsync_ReturnsFalse_WhenNotFound()
        {
            _repoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync((Libro?)null);
            var result = await _service.DeleteAsync(1);
            Assert.False(result);
        }

        [Fact]
        public async Task DeleteAsync_DeletesLibro_WhenFound()
        {
            var libro = new Libro { Titulo = "A", Autor = "B", Descripcion = "C" };
            _repoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(libro);
            _repoMock.Setup(r => r.Delete(libro));
            _repoMock.Setup(r => r.SaveChangesAsync()).Returns(Task.CompletedTask);
            var result = await _service.DeleteAsync(1);
            Assert.True(result);
        }
    }
}