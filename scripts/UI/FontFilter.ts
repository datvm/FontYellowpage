declare global {

    interface IFontFilters {
        name: string;
        style: string;
    }

}

export class FontFilter extends HTMLElement {

    #txtName: HTMLInputElement = this.querySelector(".txt-filter-name")!;
    #cboStyles: HTMLSelectElement = this.querySelector(".cbo-styles")!;

    constructor() {
        super();

        this.#cboStyles.addEventListener("change", () => void this.#dispatchChange());
    }

    #dispatchChange() {
        this.dispatchEvent(new Event("change"));
    }

    get filters(): IFontFilters {
        return {
            name: this.#txtName.value,
            style: this.#cboStyles.value,
        };
    }

    set fontStyles(styles: string[]) {
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