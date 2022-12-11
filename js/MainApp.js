import { DefaultFontSize } from "./AppUtils.js";
import { fonts } from "./Services/FontService.js";
import { FontFilter } from "./UI/FontFilter.js";
import { FontList } from "./UI/FontList.js";
FontFilter.register();
FontList.register();
customElements.define("main-app", class extends HTMLElement {
    #loader = this.querySelector(".loader");
    #lstFonts = this.querySelector("font-list");
    #pnlFilter = this.querySelector("font-filter");
    #currInfo;
    #txtDemo = this.querySelector(".txt-demo-text");
    #txtFontSize = this.querySelector(".txt-font-size");
    constructor() {
        super();
        if (!this.#checkApi()) {
            return;
        }
        this.querySelector(".btn-load")?.addEventListener("click", () => void this.#loadFontList());
        this.#txtDemo.addEventListener("change", () => void this.#demoTextChanged());
        this.#txtFontSize.value = DefaultFontSize.toString();
        this.#txtFontSize.addEventListener("change", () => void this.#onFontSizeChanged());
        this.#onFontSizeChanged();
        this.#pnlFilter.addEventListener("change", () => void this.#onFilterChanged());
        this.#onFilterChanged();
        this.#loading = false;
    }
    #onFilterChanged() {
        this.#lstFonts.filters = this.#pnlFilter.filters;
    }
    #onFontSizeChanged() {
        let num = parseInt(this.#txtFontSize.value) || DefaultFontSize;
        num = Math.max(1, num);
        this.#txtFontSize.value = num.toString();
        this.#lstFonts.fontSize = num + "px";
    }
    #demoTextChanged() {
        this.#lstFonts.demoText = this.#txtDemo.value;
    }
    #checkApi() {
        if (!fonts.isSupported()) {
            this.querySelector(".not-supported")?.classList.remove("d-none");
            return false;
        }
        return true;
    }
    async #loadFontList() {
        this.#loading = true;
        const info = this.#currInfo = await fonts.getFontsAsync();
        this.#pnlFilter.fontStyles = info?.styles ?? [];
        this.#lstFonts.filters = this.#pnlFilter.filters;
        this.#lstFonts.fonts = info?.fonts;
        this.#loading = false;
    }
    set #loading(loading) {
        this.#loader.classList.toggle("d-none", !loading);
    }
});
//# sourceMappingURL=MainApp.js.map