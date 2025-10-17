import { BadRequestException, Injectable } from "@nestjs/common";
import * as fs from "fs";
import { readFileSync } from "fs";
import * as path from "path";

@Injectable()
export class FileUploadService {
	handleFileUpload(file: Express.Multer.File) {
		if (!file) {
			throw new BadRequestException("No file uploaded");
		}

		const allowedMimeTypes = [
			"text/markdown",
			"text/plain",
			"application/octet-stream",
		];
		if (!allowedMimeTypes.includes(file.mimetype)) {
			throw new BadRequestException("Invalid file type");
		}

		return {
			success: true,
			message: "File uploaded successfully",
			filename: file.filename,
			url: `/uploads/${file.filename}`,
		};
	}

	returnFileName(name: string): string {
		const uploadDir = path.join(__dirname, "../..", "uploads");

		if (!fs.existsSync(uploadDir)) {
			throw new Error("Uploads directory does not exist");
		}

		const files = fs.readdirSync(uploadDir);

		for (const file of files) {
			const [, ...rest] = file.split("-");
			const nameAfterHyphen = rest.join("-");
			if (nameAfterHyphen === name) {
				return path.join(uploadDir, file);
			}
		}
		return "";
	}

	getFileContent(filePath: string): string {
		try {
			const content = readFileSync(filePath, "utf8");
			return content;
		} catch (error) {
			console.error("Error reading markdown file:", error.message);
			throw new Error("Unable to read the markdown file.");
		}
	}
}
