import { NestFactory } from '@nestjs/core';
import { PrismaService } from 'prisma/prisma.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require('cors');
  const corsOptions = [{
      origin:'http://127.0.0.1:3001', 
      credentials:true,            //access-control-allow-credentials:true
      optionSuccessStatus:200
  },
  {
    origin:'http://localhost:3001', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
  },
  {
    origin:'http://host.docker.internal:3001', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
  }
]
  app.use(cors(corsOptions));
  await app.listen(3000);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app)
}
bootstrap();
