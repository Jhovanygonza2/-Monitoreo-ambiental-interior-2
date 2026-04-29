// ASP.NET MVC / .NET Core Example
// Muy potente para APIs y sistemas gubernamentales.

using Microsoft.AspNetCore.Mvc;

namespace MobilityApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StationsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { status = "Optimal", count = 42 });
        }
    }
}
