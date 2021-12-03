import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Reflector} from "@nestjs/core";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private relfector: Reflector) {
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const access = this.relfector.get<string>('access' , context.getHandler() );
    console.log(access)
    return true;
  }
}
