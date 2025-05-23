import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('App')
export class AppController {
    @Get()
    @ApiOperation({ summary: 'Health check' })
    ping() {
        return 'pong';
    }
}
