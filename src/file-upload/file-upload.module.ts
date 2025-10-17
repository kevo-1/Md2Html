import { Module } from "@nestjs/common";
import { FileUploadService } from "./file-upload.service";
import { FileUploadController } from "./file-upload.controller";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as fs from "fs";
import { join } from "path";

@Module({
	imports: [
		MulterModule.register({
			storage: diskStorage({
				destination: (req, file, cb) => {
					const uploadPath = join(__dirname, "..", "uploads");
					if (!fs.existsSync(uploadPath)) {
						fs.mkdirSync(uploadPath, { recursive: true });
					}
					cb(null, uploadPath);
				},
				filename: (req, file, cb) => {
					const filename = `${Date.now()}-${file.originalname}`;
					cb(null, filename);
				},
			}),
		}),
	],
	controllers: [FileUploadController],
	providers: [FileUploadService],
	exports: [FileUploadService],
})
export class FileUploadModule {}
