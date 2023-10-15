function d_filter(pred, xs) {
    if (is_null(xs)) {
        return xs;
    } else if (pred(head(xs))) {
        //element satisfies predicate, belongs in the list. keep it as is.
        //wishfully filter the remaining elements.
        set_tail(xs, d_filter(pred, tail(xs)));
        return xs;
    } else {
        //element does not belong in the list. ignore element.
        return d_filter(pred,tail(xs));
    }
}

const L = list(1, 2, 3, 4, 5, 6, 7, 8, 9, 11);
const filtered = d_filter(x => x % 2 === 0, L); // returns [2, [4, [6, [8, null]]]]
L; // What is L now?
filtered;