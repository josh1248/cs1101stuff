//Studio S11 work on Q2, the 
//representation of functions as a power series
function scale_stream(c, stream) {
    return stream_map(x => c * x, stream);
}
//powers of 2, a_i = 2^i
const A = pair(1, () => scale_stream(2, A));
function mul_streams(a,b) {
return pair(head(a) * head(b),
                    () => mul_streams(stream_tail(a), stream_tail(b)));
}
const integers = integers_from(1);
//factorials, b_i = i!
const B = pair(1, () => mul_streams(B, integers));


//Functions provided
function add_streams(s1, s2) { 
    return is_null(s1)
            ? s2
            : is_null(s2)
                ? s1
                : pair(head(s1) + head(s2),
                       () => add_streams(stream_tail(s1),
                                         stream_tail(s2)));
}

const add_series = add_streams;
const scale_series = scale_stream;
function negate_series(s) { 
    return scale_series(-1, s);
}
function subtract_series(s1, s2) {
    return add_series(s1, negate_series(s2));
}

//alt_ones
const alt_ones = pair(1, () => pair(-1, () => alt_ones));
const alt_ones_1 = pair(1, () => scale_stream(-1, alt_ones_1));
function alt_ones_2() {
    let value = 1;
    function helper() {
        const temp = value;
        value = -value;
        return pair(temp, helper);
    }
    return helper();
}

//zeros
const zeros = pair(0, () => zeros);
const zeros_1 = subtract_series(zeros, zeros);

//series definition
const non_neg_integers = integers_from(0);
function fun_to_series(fun) {
    return stream_map(fun, non_neg_integers);
}
const s1_coefficients = fun_to_series(x => 1);
const s2_coefficients = fun_to_series(x => x + 1);


