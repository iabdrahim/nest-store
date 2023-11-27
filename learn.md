# Module

@Module({})
providers and controllers imports

# Controller

is where the routes live.
@Controller()

## @Get @Post @Put @Delete

@Get(":id")

## @Param @Body @Query

@Param("name",Pipe or your own pipe)

## HttpException

its like res.send its for errors: throw new HttpException("msg",HttpStatus.NOT_FOUND)

# Service

to use it: constructor(private usersService: UsersService) {}
@Injectable()

# Middlewares

## Create one

@Injectable()
export class AuthMiddleware implements NestMiddleware {
use(req: Request, res: Response, next: () => void) {

    next();

}
}

## using in a module

export class AppModule implements NestModule {
configure(client: MiddlewareConsumer) {
client
.apply(YourMiddleware)
.forRoutes({ path: '/users', method: RequestMethod.POST });
}
}
