import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
@Injectable()
export class SessionGuard implements CanActivate {
canActivate(
context: ExecutionContext,
): boolean{
const request = context.switchToHttp().getRequest();
if(!request.session.email)
{
    console.log("false")
    return false;
}
else
{
    console.log("true")

    return true;
}
}
}