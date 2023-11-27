import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ProductsModule } from './products/products.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(client: MiddlewareConsumer) {
    client.apply(AuthMiddleware).forRoutes(
      '/auth/me',
      { path: '/products', method: RequestMethod.POST },
      {
        path: '/products/:id',
        method: RequestMethod.DELETE,
      },
      {
        path: '/products/:id',
        method: RequestMethod.PUT,
      },
    );
  }
}
