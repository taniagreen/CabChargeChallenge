namespace EmailService
{
    public class EmailMessage
    {
        public string To { get; set; }
        public string Cc { get; set; }
        public string Bcc { get; set; }
        public string Subject { get; set; }
        public string Text { get; set; }
    }
}
