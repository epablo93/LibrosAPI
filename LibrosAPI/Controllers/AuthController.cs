using LibrosAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LibrosAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JwtHelper _jwtHelper;
        public AuthController(JwtHelper jwtHelper)
        {
            _jwtHelper = jwtHelper;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            // Dummy user validation for demonstration
            if (loginDto.UserName == "admin" && loginDto.Password == "password")
            {
                var token = _jwtHelper.GenerateToken("1", loginDto.UserName, new List<string> { "Admin" });
                return Ok(new { token });
            }
            return Unauthorized();
        }
    }
}