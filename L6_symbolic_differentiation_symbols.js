//Thought of the AY 23/24 CS1101 teaching team
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

function deriv_symbolic(exp, variable) {
    return is_number(exp)
           ? 0
           : is_variable(exp)
           ? (is_same_variable(exp, variable)) ? 1 : 0
           : is_sum(exp)
           ? make_sum(deriv_symbolic(addend(exp), variable),
                      deriv_symbolic(augend(exp), variable))
           : is_product(exp)
           ? make_sum(make_product(multiplier(exp),
                                   deriv_symbolic(multiplicand(exp),
                                                  variable)),
                      make_product(deriv_symbolic(multiplier(exp),
                                                  variable),
                                   multiplicand(exp))) //chain rule
           : error(exp, "unknown expression type");
}

// x^2 + x + 4
const exp1 = make_sum(make_product("x", "x"), make_sum("x", 4));

// 3 * x^2 + 4 * x + 5
const exp2 = make_sum(make_product(3, make_product("x", "x")),
                      make_sum(make_product(4, "x"), 5));

// x * y * (x + 3)
const exp3 = make_product(make_product("x", "y"),
                          make_sum("x", 3));

display_list(deriv_symbolic(exp1, "x"));
display_list(deriv_symbolic(exp2, "x"));
display_list(deriv_symbolic(exp3, "x"));