using System.Threading.Tasks;

namespace EmailService
{
    public class EmailSendService:IEmailSendService
    {
        public async Task<EmailSendResult> Send(EmailMessage message)
        {
            HandlerBase mailGunHandler = new MailGunHandler();
            HandlerBase sendGridHandler = new SendGridHandler();
            mailGunHandler.Successor = sendGridHandler;
            
            return await mailGunHandler.HandleRequest(message);
        }
    }
}
