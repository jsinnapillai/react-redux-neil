using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class BasketController : BaseAPIController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetriveBasket();

            if (basket == null)
            {
                return NotFound();
            }

            return MapBaskettoDTO(basket);
        }

       

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int proudctId, int quantity)
        {
            // get Basket // create baseket
            var basket = await RetriveBasket();
            if (basket == null)
            {
                // create basket
                basket = CreateBasket();
            }
            // get product 
            var product = await _context.Products.FindAsync(proudctId);
            if (product == null)
            {
                return NotFound();
            }
            // add item
            basket.AddItem(product, quantity);
            // save changes
            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return CreatedAtRoute("GetBasket", MapBaskettoDTO(basket));
            }
            return BadRequest(new ProblemDetails { Title = " Problem saving item to basket" });
        }

  

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // get basket
            var basket = await  RetriveBasket();
            if (basket == null) { return NotFound(); }
            //remove item or reduce quantity
            basket.RemoveItem(productId, quantity);
            //save changes
            var result =  await _context.SaveChangesAsync() >0;

            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });
        
       
          
        }

        private async Task<Basket> RetriveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;

        }
        private BasketDto MapBaskettoDTO(Basket basket)
        {
            return new BasketDto
            {
                BuyerId = basket.BuyerId,
                Id = basket.Id,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    PictureUrl = item.Product.PictureUrl,
                    Quantity = item.Quantity

                }).ToList(),
            };
        }
    }
}
