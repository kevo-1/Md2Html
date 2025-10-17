import { Injectable } from "@nestjs/common";
import { Converter } from "showdown";

@Injectable()
export class AppService {
	private readonly converter = new Converter();

	convertToHtml(mdText: string): string {
		try {
			return this.converter.makeHtml(mdText);
		} catch (error) {
			console.error(error);
			return "";
		}
	}
}
