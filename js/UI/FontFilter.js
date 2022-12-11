export class FontFilter extends HTMLElement {
    #txtName = this.querySelector(".txt-filter-name");
    #cboStyles = this.querySelector(".cbo-styles");
    constructor() {
        super();
        this.#cboStyles.addEventListener("change", () => void this.#dispatchChange());
    }
    #dispatchChange() {
        this.dispatchEvent(new Event("change"));
    }
    get filters() {
        return {
            name: this.#txtName.value,
            style: this.#cboStyles.value,
        };
    }
    set fontStyles(styles) {
        const frag = new DocumentFragment();
        for (const s of styles) {
            const opt = document.createElement("option");
            opt.text = opt.value = s;
            frag.append(opt);
        }
        this.#cboStyles.innerHTML = "";
        this.#cboStyles.append(frag);
    }
    static register() {
        customElements.define("font-filter", this);
    }
}
//# sourceMappingURL=FontFilter.js.map