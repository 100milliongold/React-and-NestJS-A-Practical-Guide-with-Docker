import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private readonly roleRepositiry : Repository<Role>
    ){}

    async all(): Promise<Role[]>{
        return this.roleRepositiry.find();
    }

    async create(data): Promise<Role> {
        return this.roleRepositiry.save(data);
    }

    async findOne(condition) : Promise<Role> {
        return this.roleRepositiry.findOne(condition, { relations: ['permissions'] })
    }

    async update(id: number , data ) : Promise<any> {
        return this.roleRepositiry.update(id , data);
    }

    async delete(id: number) : Promise<any> {
        return this.roleRepositiry.delete(id)
    }
}
