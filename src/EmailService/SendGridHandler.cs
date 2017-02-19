using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace EmailService
{
    public class SendGridHandler : HandlerBase
    {
        private JArray ConvertToJArray(string emails)
        {
            var res = new JArray();
            foreach (var item in emails.Split(','))
            {
                res.Add(new JObject(new JProperty("email", item.Trim())));
            }
            return res;
        }

        public override async Task<EmailSendResult> SendEmail(EmailMessage message)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", "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");

                dynamic messageJson = new JObject();
                messageJson.from = new JObject(new JProperty("name", "Tetiana Tkachuk"), new JProperty("email", "green.tetiana@gmail.com"));

                dynamic personalization = new JObject();

                if (!string.IsNullOrEmpty(message.To))
                {
                    personalization.to = ConvertToJArray(message.To);
                }

                if (!string.IsNullOrEmpty(message.Cc))
                {
                    personalization.cc = ConvertToJArray(message.Cc);
                }

                if (!string.IsNullOrEmpty(message.Bcc))
                {
                    personalization.bcc = ConvertToJArray(message.Bcc);
                }

                personalization.subject = message.Subject;

                messageJson.personalizations = new JArray(personalization);
                messageJson.content = new JArray(new JObject(new JProperty("type", "text/plain"), new JProperty("value", message.Text)));

                var content = new StringContent(messageJson.ToString(), Encoding.UTF8, "application/json");
                var response = await client.PostAsync("https://api.sendgrid.com/v3/mail/send", content);

                var responseString = await response.Content.ReadAsStringAsync();

                return new EmailSendResult
                {
                    IsSuccessful = responseString == string.Empty,
                    Message = responseString
                };
                    
            }
        }
    }
}
