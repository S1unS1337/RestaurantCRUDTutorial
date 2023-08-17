using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantCRUDTutorial.Models;

namespace RestaurantCRUDTutorial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly RestaurantDbContext _context;

        public OrderController(RestaurantDbContext context)
        {
            _context = context;
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderMaster>>> GetOrderMasters()
        {
          if (_context.OrderMasters == null)
          {
              return NotFound();
          }
            return await _context.OrderMasters
                .Include(x => x.Customer)
                .ToListAsync();
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderMaster>> GetOrderMaster(long id)
        {
            if (_context.OrderMasters == null)
            {
              return NotFound();
            }

            var orderDetails = await (from master in _context.Set<OrderMaster>()
                                      join detail in _context.Set<OrderDetail>()
                                      on master.OrderMasterId equals detail.OrderMasterId
                                      where master.OrderMasterId == id
                                      join foodItem in _context.Set<FoodItem>()
                                      on detail.FoodItemId equals foodItem.FoodItemId
                                      select new
                                          {
                                            master.OrderMasterId,
                                            detail.OrderDetailId,
                                            detail.FoodItemId,
                                            detail.Quantity,
                                            detail.FoodItemPrice,
                                            foodItem.FoodItemName
                                          }).ToListAsync();

            var orderMaster = await (from a in _context.Set<OrderMaster>()
                                     where a.OrderMasterId == id

                                     select new
                                         {
                                          a.OrderMasterId,
                                          a.OrderNumber,
                                          a.CustomerId,
                                          a.PMethod,
                                          a.GTotal,
                                          deletedOrderItemIds="",
                                          orderDetails = orderDetails
                                         }
                                     ).FirstOrDefaultAsync();

            if (orderMaster == null)
            {
                return NotFound();
            }

            return Ok(orderMaster);
        }

        // PUT: api/Order/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderMaster(long id, OrderMaster orderMaster)
        {
            if (id != orderMaster.OrderMasterId)
            {
                return BadRequest();
            }

            _context.Entry(orderMaster).State = EntityState.Modified;

            foreach(var item in orderMaster.OrderDetails)
            {
                if(item.OrderDetailId == id)
                {
                    _context.OrderDetails.Add(item);
                }
                else
                {
                    _context.Entry(item).State = EntityState.Modified;
                }

            }

            foreach(var item in orderMaster.DeletedOrderItemIds.Split(',').Where(x => x != ""))
            {
                var y = _context.OrderDetails.Find(Convert.ToInt64(item));
                _context.OrderDetails.Remove(y);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderMasterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Order
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrderMaster>> PostOrderMaster(OrderMaster orderMaster)
        {
          if (_context.OrderMasters == null)
          {
              return Problem("Entity set 'RestaurantDbContext.OrderMasters'  is null.");
          }
            _context.OrderMasters.Add(orderMaster);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderMaster", new { id = orderMaster.OrderMasterId }, orderMaster);
        }

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderMaster(long id)
        {
            if (_context.OrderMasters == null)
            {
                return NotFound();
            }
            var orderMaster = await _context.OrderMasters.FindAsync(id);
            if (orderMaster == null)
            {
                return NotFound();
            }

            _context.OrderMasters.Remove(orderMaster);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderMasterExists(long id)
        {
            return (_context.OrderMasters?.Any(e => e.OrderMasterId == id)).GetValueOrDefault();
        }
    }
}
