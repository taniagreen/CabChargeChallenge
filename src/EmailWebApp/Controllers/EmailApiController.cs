using Microsoft.AspNetCore.Mvc;
using EmailWebApp.Models;
using EmailService;
using System.Threading.Tasks;

namespace EmailWebApp.Controllers
{
    [Route("api/email")]
    public class EmailApiController : Controller
    {
        private readonly IEmailSendService _emailSendService;

        public EmailApiController(IEmailSendService emailSendService)
        {
            _emailSendService = emailSendService;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]MessageVm message)
        {
            var emailSendResult =  await _emailSendService.Send(
                new EmailMessage
                {
                    To = message.To,
                    Cc = message.Cc,
                    Bcc = message.Bcc,
                    Subject = message.Subject,
                    Text = message.Text
                }
            );

            if(emailSendResult.IsSuccessful)
            {
                return Ok(emailSendResult.Message);
            }
            
            return BadRequest(emailSendResult.Message);
        }
    }
}
