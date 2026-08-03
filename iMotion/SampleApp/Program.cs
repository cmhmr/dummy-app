using System;
using Newtonsoft.Json;

namespace SampleApp
{
    internal static class Program
    {
        private static void Main()
        {
            var payload = new { app = "workflows-library", status = "ok" };
            string json = JsonConvert.SerializeObject(payload);
            Console.WriteLine(json);
        }
    }
}
