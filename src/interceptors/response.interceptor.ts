import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface SuccessfulResponseDto {
  data: unknown;
}

/**
 * Transforms the value returned by the controllers into a valid
 * `SuccessfulResponseDto` only if needed
 */
@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, SuccessfulResponseDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessfulResponseDto> {
    const contextType = context.getType<'http' | 'stripe_webhook'>();
    if (contextType === 'stripe_webhook') {
      return next.handle();
    }
    return next.handle().pipe(
      map((data) => {
        if (
          data != null &&
          typeof data === 'object' &&
          ('data' in data || 'meta' in data)
        ) {
          return data;
        }
        return {
          data,
        };
      }),
    );
  }
}
