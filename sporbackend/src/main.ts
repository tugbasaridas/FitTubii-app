import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 🔓 CORS (Frontend için)
  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true,
  });

  // 🖼 uploads klasörü (egzersiz resimleri)
  app.useStaticAssets(join(__dirname, "..", "uploads"), {
    prefix: "/uploads",
  });

  // ✅ DTO validation ZORUNLU
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             // DTO dışı alanları at
      forbidNonWhitelisted: true,  // DTO dışı alan varsa hata ver
      transform: true,             // string → number vs
    })
  );

  await app.listen(3000);
  console.log("🚀 Backend çalışıyor: http://localhost:3000");
}

bootstrap();
