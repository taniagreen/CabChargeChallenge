using System.Threading.Tasks;

namespace EmailService
{
    public abstract class HandlerBase
    {
        public HandlerBase Successor { get; set; }
        public abstract Task<EmailSendResult> SendEmail(EmailMessage message);
        public async Task<EmailSendResult> HandleRequest(EmailMessage message)
        {
            var emailSendResult = await SendEmail(message);
            if (!emailSendResult.IsSuccessful)
            {
                if (Successor != null)
                {
                    await Successor.HandleRequest(message);
                }
                else
                {
                    return emailSendResult;
                }
            }
            return emailSendResult;
        }
    }
}
