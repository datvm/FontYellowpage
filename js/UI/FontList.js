import { addDelegate, DefaultDemoText } from "../AppUtils.js";
export class FontList extends HTMLElement {
    #fonts = [];
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
        const frag = new DocumentFragment();
        for (const f of this.#fonts) {
            const el = this.#template.content.firstElementChild.cloneNode(true);
            el.querySelector(".name").textContent = f.name;
            const demo = el.querySelector(".demo");
            demo.textContent = this.#demoText;
            demo.style.fontFamily = f.name;
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