import {
	Controller,
	Get,
	Post,
	UseInterceptors,
	UploadedFile,
} from "@nestjs/common";
import { FileUploadService } from "./file-upload.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("markdown")
export class FileUploadController {
	constructor(private readonly fileUploadService: FileUploadService) {}

	@Post("upload")
	@UseInterceptors(FileInterceptor("file"))
	create(@UploadedFile() file: Express.Multer.File) {
		return this.fileUploadService.handleFileUpload(file);
	}
}
