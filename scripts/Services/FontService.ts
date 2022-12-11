declare global {

    interface IFontListInfo {
        fonts: IFontFamily[];
        styles: string[];
    }

    interface IFontFamily {
        name: string;
        fonts: ILocalFont[];
    }
}

const RegularStyle = "Regular";
export const fonts = new class {

    isSupported() {
        return Boolean(globalThis.queryLocalFonts);
    }

    async checkPermAsync() {
        const perm = await navigator.permissions.query({
            name: <any>"local-fonts"
        });

        return perm.state !== "denied";
    }

    async getFontsAsync(): Promise<IFontListInfo | undefined> {
        if (!this.isSupported) {
            throw new Error("NOT_SUPPORTED");
        }

        if (!await this.checkPermAsync()) {
            return undefined;
        }

        const fonts = await queryLocalFonts();
        const fontDict: { [key: string]: ILocalFont[] } = {};
        const styleDict: { [key: string]: boolean } = {};
        for (const f of fonts) {
            let arr = fontDict[f.family];
            if (!arr) {
                arr = fontDict[f.family] = [];
            }

            arr.push(f);
            styleDict[f.style] = true;
        }

        const fontsByFamily: IFontFamily[] = [];
        for (const [name, familyFonts] of Object.entries(fontDict)) {
            fontsByFamily.push({
                name,
                fonts: familyFonts,
            })
        }

        // Move Regular up
        delete styleDict[RegularStyle];
        const stylesArr = [RegularStyle, ...Object.keys(styleDict)];

        return {
            fonts: fontsByFamily,
            styles: stylesArr,
        };
    }

}();