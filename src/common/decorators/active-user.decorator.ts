import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const ActiveUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest(); // leer el request

        return request.user; // devolver el usuario activo
    }
);