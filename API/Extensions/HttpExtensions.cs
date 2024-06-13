using API.Entities;
using API.RequestHelpers;
using System.Text.Json;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static  void AddPaginarionHeader(this HttpResponse response, MetaData metaData)
        {
            response.Headers.Append("Pagination", JsonSerializer.Serialize(metaData));
            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }

    }
}
