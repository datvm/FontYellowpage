import { addDelegate, DefaultDemoText } from "../AppUtils.js";
export class FontList extends HTMLElement {
    #fonts;
    #filters;
    #template = this.querySelector(".template-item");
    #templateEmpty = this.querySelector(".template-permission");
    #demoText = DefaultDemoText;
    #fontSize = "16px";
    constructor() {
        super();
        this.#template.remove();
        this.#templateEmpty.remove();
        addDelegate(this, "click", "[data-copy]", (_, el) => void this.#onCopy(el));
    }
    async #onCopy(el) {
        const selector = el.getAttribute("data-copy");
        const target = el.parentElement?.querySelector(selector);
        if (!target) {
            console.warn("Copy target not found: " + selector);
            return;
        }
        const content = target.textContent;
        if (content) {
            await navigator.clipboard.writeText(content);
        }
    }
    #render() {
        // Not initialized yet
        if (!this.#filters || !this.#fonts) {
            return;
        }
        const frag = new DocumentFragment();
        const kw = this.#filters.name.toLowerCase().trim();
        const style = this.#filters.style;
        for (const family of this.#fonts) {
            // Filter
            if (kw && !family.name.toLowerCase().includes(kw)) {
                continue;
            }
            const font = family.fonts.find(q => q.style === style);
            if (!font) {
                continue;
            }
            const el = this.#template.content.firstElementChild.cloneNode(true);
            el.querySelector(".name").textContent = font.family;
            const demo = el.querySelector(".demo");
            demo.textContent = this.#demoText;
            demo.style.fontFamily = font.fullName;
            frag.append(el);
        }
        this.innerHTML = "";
        this.#setFontSizeCss();
        this.append(frag);
        if (!this.#fonts?.length) {
            this.innerHTML = this.#templateEmpty.innerHTML;
        }
    }
    #setFontSizeCss() {
        this.style.setProperty("--font-size", this.#fontSize);
    }
    set filters(v) {
        this.#filters = v;
        this.#render();
    }
    get demoText() {
        return this.#demoText;
    }
    set demoText(v) {
        v ||= DefaultDemoText;
        this.#demoText = v;
        this.querySelectorAll(".demo").forEach(el => el.textContent = v);
    }
    get fontSize() {
        return this.#fontSize;
    }
    set fontSize(v) {
        this.#fontSize = v;
        this.#setFontSizeCss();
    }
    set fonts(fonts) {
        this.#fonts = fonts;
        this.#render();
    }
    static register() {
        customElements.define("font-list", this);
    }
}
//# sourceMappingURL=FontList.js.map