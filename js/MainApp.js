import { fonts } from "./Services/FontService.js";
import { FontList } from "./UI/FontList.js";
FontList.register();
customElements.define("main-app", class extends HTMLElement {
    #loader = this.querySelector(".loader");
    #lstFonts = this.querySelector("font-list");
    #txtDemo = this.querySelector(".txt-demo-text");
    constructor() {
        super();
        if (!this.#checkApi()) {
            return;
        }
        this.querySelector(".btn-load")?.addEventListener("click", () => void this.#loadFontList());
        this.#txtDemo.addEventListener("change", () => void this.#demoTextChanged());
        this.#loading = false;
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
        this.#lstFonts.fonts = await fonts.getFontsAsync();
        this.#loading = false;
    }
    set #loading(loading) {
        this.#loader.classList.toggle("d-none", !loading);
    }
});
//# sourceMappingURL=MainApp.js.map