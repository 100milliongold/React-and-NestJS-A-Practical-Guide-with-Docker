import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginated-result.interface';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService extends AbstractService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>
    ){
        super(orderRepository)
    }

    async paginate(page = 1, relations= []) : Promise<PaginatedResult>{
        const { data , meta } = await super.paginate(page, relations)

        return {
            data: data.map((order: Order) => ({
                id: order.id,
                name: order.name,
                email: order.email,
                total: order.total,
                created_at: order.created_at,
                order_items: order.order_items
            })),
            meta
        }
    }

    async chart(){
        return this.orderRepository.query(`
            SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') as date, SUM(i.price * i.quantity) as sum
            FROM orders o
            JOIN order_items i ON o.id = i.order_id
            GROUP BY date;
        `)
    }

}
