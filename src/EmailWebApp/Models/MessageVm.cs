namespace EmailWebApp.Models
{
    public class MessageVm
    {
        public string To { get; set; }
        public string Cc { get; set; }
        public string Bcc { get; set; }
        public string Subject { get; set; }
        public string Text { get; set; }
    }
}
