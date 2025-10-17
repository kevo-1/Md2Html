import { Module } from "@nestjs/common";
import { FileUploadModule } from "./file-upload/file-upload.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [FileUploadModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
