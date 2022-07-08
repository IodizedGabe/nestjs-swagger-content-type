import {INestApplication, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  public static setupApp(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
