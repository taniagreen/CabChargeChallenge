using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace EmailService
{
    public class MailGunHandler : HandlerBase
    {
        public override async Task<EmailSendResult> SendEmail(EmailMessage message)
        {
            using (var client = new HttpClient())
            {
                var byteArray = Encoding.ASCII.GetBytes("api:key-c358253bc6158d01b94c81018717c613");
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));

                var messageParams = new Dictionary<string, string>
                {
                   { "from", "green.tetiana@gmail.com" },
                   { "subject", message.Subject },
                   { "text", message.Text }
                };

                if(!string.IsNullOrEmpty(message.To))
                {
                    messageParams.Add("to", message.To);
                }
                if (!string.IsNullOrEmpty(message.Cc))
                {
                    messageParams.Add("cc", message.Cc);
                }
                if (!string.IsNullOrEmpty(message.Bcc))
                {
                    messageParams.Add("bcc", message.Bcc);
                }


                var content = new FormUrlEncodedContent(messageParams);
                var response = await client.PostAsync("https://api.mailgun.net/v3/sandbox789bc2637c7f42bb8006ec2b3c0c8941.mailgun.org/messages", content);

                var responseString = await response.Content.ReadAsStringAsync();
                var responseJSon = JObject.Parse(responseString);

                var res = responseJSon["id"];

                return  new EmailSendResult
                {
                    IsSuccessful = res != null,
                    Message = responseJSon["message"].ToString()
                };
            }
        }

    }
}
