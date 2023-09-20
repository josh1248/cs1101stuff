/*Content and functions thought of by the AY23/24 CS1101 teaching team*/
function is_variable(x) {
    return is_string(x);
}

function is_same_variable(v1, v2) {
    return is_variable(v1) && is_variable(v2) && v1 === v2;
}

function is_sum(x) {
    return is_pair(x) && head(x) === "+";
}

function is_product(x) {
    return is_pair(x) && head(x) === "*";
}

function addend(s) {
    return head(tail(s));
}

function augend(s) {
    return head(tail(tail(s)));
}

function multiplier(s) {
    return head(tail(s));
}

function multiplicand(s) {
    return head(tail(tail(s)));
}

function make_sum(a1, a2) {
    return list("+", a1, a2);
}

function make_product(m1, m2) {
    return list("*", m1, m2);
}

function eval_symbolic(exp, name, val) {
    return is_number(exp)
           ? exp
           : is_variable(exp)
           ? (is_same_variable(exp, name) ? val : NaN)
           : is_sum(exp)
           ? eval_symbolic(addend(exp), name, val) +
               eval_symbolic(augend(exp), name, val)
           : is_product(exp)
           ? eval_symbolic(multiplier(exp), name, val) *
               eval_symbolic(multiplicand(exp), name, val)
           : error(exp, "unknown expression type");
}


// x^2 + x + 4
const exp1 = make_sum(make_product("x", "x"), make_sum("x", 4));

// 3 * x^2 + 4 * x + 5
const exp2 = make_sum(make_product(3, make_product("x", "x")),
                      make_sum(make_product(4, "x"), 5));

eval_symbolic(exp1, "x", 3);  // 16
//eval_symbolic(exp2, "x", 2);  // 25
