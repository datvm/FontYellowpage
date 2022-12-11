import { addDelegate, DefaultDemoText } from "../AppUtils.js";

export class FontList extends HTMLElement {

    #fonts?: IFontFamily[];
    #filters?: IFontFilters;
    #template: HTMLTemplateElement = this.querySelector(".template-item")!;
    #templateEmpty: HTMLTemplateElement = this.querySelector(".template-permission")!;

    #demoText = DefaultDemoText;
    #fontSize = "16px";

    constructor() {
        super();

        this.#template.remove();
        this.#templateEmpty.remove();
        addDelegate(this, "click", "[data-copy]", (_, el) => void this.#onCopy(el));
    }

    async #onCopy(el: Element) {
        const selector = el.getAttribute("data-copy")!;
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
        if (!this.#filters || !this.#fonts) { return; }

        const frag = new DocumentFragment();

        const kw = this.#filters.name.toLowerCase().trim();
        const style = this.#filters.style;

        for (const family of this.#fonts) {
            // Filter
            if (kw && !family.name.toLowerCase().includes(kw)) {
                continue;
            }
            const font = family.fonts.find(q => q.style === style);
            if (!font) {continue;}

            const el = this.#template.content.firstElementChild!.cloneNode(true) as Element;

            el.querySelector(".name")!.textContent = font.family;

            const demo = el.querySelector<HTMLElement>(".demo")!;
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

    set filters(v: IFontFilters) {
        this.#filters = v;
        this.#render();
    }

    get demoText() {
        return this.#demoText;
    }

    set demoText(v) {
        v ||= DefaultDemoText;
        this.#demoText = v;

        this.querySelectorAll(".demo").forEach(el =>
            el.textContent = v);
    }

    get fontSize() {
        return this.#fontSize;
    }

    set fontSize(v) {
        this.#fontSize = v;
        this.#setFontSizeCss();
    }

    set fonts(fonts: IFontFamily[] | undefined) {
        this.#fonts = fonts;
        this.#render();
    }

    static register() {
        customElements.define("font-list", this);
    }

}