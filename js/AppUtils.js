export const DefaultDemoText = "The quick brown fox jumps over the lazy dog";
export const DefaultFontSize = 32;
export function addDelegate(el, event, cssSelector, callback) {
    el.addEventListener(event, e => {
        for (let target = e.target; target && target != el; target = target.parentNode) {
            if (target?.matches(cssSelector)) {
                callback(e, target);
                break;
            }
        }
    });
}
//# sourceMappingURL=AppUtils.js.map