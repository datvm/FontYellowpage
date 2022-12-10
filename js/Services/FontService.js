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
            return [];
        }
        const fonts = await queryLocalFonts();
        const fontDict = {};
        for (const f of fonts) {
            let arr = fontDict[f.family];
            if (!arr) {
                arr = fontDict[f.family] = [];
            }
            arr.push(f);
        }
        const result = [];
        for (const [name, familyFonts] of Object.entries(fontDict)) {
            result.push({
                name,
                fonts: familyFonts,
            });
        }
        return result;
    }
}();
//# sourceMappingURL=FontService.js.map