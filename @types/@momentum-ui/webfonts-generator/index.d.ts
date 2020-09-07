declare module '@momentum-ui/webfonts-generator' {
    export type WebfontFile = {
        buffer: Buffer,
        fileCreated: string,
    }

    export type WebfontOptions = {
        fontHeight?: number,
        normalize?: boolean
    }

    export type WebfontResult = {
        fontName: string,
        glyphsData: GlyphsData[],
        fontFiles: {
            svg: WebfontFile,
            ttf: WebfontFile,
            woff: WebfontFile,
            woff2: WebfontFile,
        }
    }

    export type GlyphsData = {
        name: string,
        file: any,
        codepoint: number,
        codepointHexa: string,
        unicode: string,
    }

    export function generateFonts(
        fontName: string,
        pattern: string,
        dest: string,
        options: WebfontOptions,
    ): Promise<WebfontResult>
}
