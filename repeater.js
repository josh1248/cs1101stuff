import {
heart, blank, square, ribbon, circle,
show, stack, stack_frac, stackn, beside, beside_frac
} from "rune";

function squared(n){
    return n * n;
}

function repeater(func, n)
{
    return n === 1
           ? func
           : x => func(repeater(func, n - 1)(x));
}

const power_of_8 = repeater(squared, 3);

power_of_8(3);