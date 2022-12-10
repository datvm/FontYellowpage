export const DefaultDemoText = "The quick brown fox jumps over the lazy dog";

export function addDelegate(
    el: Element, event: string, cssSelector: string,
    callback: (e: Event, el: Element) => void) {

    el.addEventListener(event, e => {
        for (
            let target: Element | null = e.target as Element;
            target && target != el;
            target = target.parentNode as Element) {
            if (target?.matches(cssSelector)) {
                callback(e, target);
                break;
            }
        }
    });

}