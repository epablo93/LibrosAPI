using Domain.Model;
using FluentValidation;

namespace Services.Validators
{
    public class LibroValidator : AbstractValidator<Libro>
    {
        public LibroValidator()
        {
            RuleFor(x => x.Titulo)
                .NotEmpty().WithMessage("El título es obligatorio.")
                .MaximumLength(200).WithMessage("El título no puede superar los 200 caracteres.");

            RuleFor(x => x.Autor)
                .NotEmpty().WithMessage("El autor es obligatorio.")
                .MaximumLength(100).WithMessage("El autor no puede superar los 100 caracteres.");

            RuleFor(x => x.Descripcion)
                .MaximumLength(1000).WithMessage("La descripción no puede superar los 1000 caracteres.");
        }
    }
}