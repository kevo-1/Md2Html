import { Controller, Get, Post, Param, HttpStatus, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import type { Response } from "express";
import { FileUploadService } from "./file-upload/file-upload.service";

@Controller("markdown")
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly fileService: FileUploadService
	) {}

	@Get("converted/:name")
	getConvertedMd(@Param("name") name: string, @Res() res: Response) {
		try {
			const fileName = this.fileService.returnFileName(name);

			if (!fileName) {
				return res.status(HttpStatus.NOT_FOUND).json({
					msg: "File not found",
				});
			}

			const content = this.fileService.getFileContent(fileName);
			const htmlText = this.appService.convertToHtml(content);

			if (!htmlText) {
				return res.status(HttpStatus.BAD_GATEWAY).json({
					msg: "An error occurred while converting",
				});
			}

			return res.status(HttpStatus.OK).json({
				data: htmlText,
			});
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				msg: error.message,
			});
		}
	}
}
