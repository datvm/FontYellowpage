const RegularStyle = "Regular";
export const fonts = new class {
    isSupported() {
        return Boolean(globalThis.queryLocalFonts);
    }
    async checkPermAsync() {
        const perm = await navigator.permissions.query({
            name: "local-fonts"
        });
        return perm.state !== "denied";
    }
    async getFontsAsync() {
        if (!this.isSupported) {
            throw new Error("NOT_SUPPORTED");
        }
        if (!await this.checkPermAsync()) {
            return undefined;
        }
        const fonts = await queryLocalFonts();
        const fontDict = {};
        const styleDict = {};
        for (const f of fonts) {
            let arr = fontDict[f.family];
            if (!arr) {
                arr = fontDict[f.family] = [];
            }
            arr.push(f);
            styleDict[f.style] = true;
        }
        const fontsByFamily = [];
        for (const [name, familyFonts] of Object.entries(fontDict)) {
            fontsByFamily.push({
                name,
                fonts: familyFonts,
            });
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
//# sourceMappingURL=FontService.js.map