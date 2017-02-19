using System.Threading.Tasks;

namespace EmailService
{
    public interface IEmailSendService
    {
        Task<EmailSendResult> Send(EmailMessage message);
    }
}
