const zero_repeater = f => x => x;
const one_repeater = f => x => f(zero_repeater, () => zero_repeater(f)(x));
const two_repeater = f => x => f(one_repeater, () => one_repeater(f)(x));
const three_repeater = f => x => f(two_repeater, () => two_repeater(f)(x));

const to_int = repeater => repeater((iter_count, x) => x() + 1)(0);

//pattern recognition :D
const increment_repeater = repeater =>
                            f => x => f(repeater, () => repeater(f)(x));

/*
Thankfully, a nice example of how the new repeater function is applied was given:
const warn = three_repeater((iter_count, x) => display(x()));
so warn equals x => display^3(x)
in Q1, it was declared differently (and definitely more intuitively):
const warn = thrice(display)
it seems then that I would need to "package" the function i want to repeat into 
(iter_count, x) => base(x()) first.


Similarly, Q3's implementation was:
const add_repeaters =
    (repeater1, repeater2) =>
        repeater1(increment_repeater)(repeater2);

Based on my observation of how display works, I will need to substitute
increment_repeater into base in (iter_count, x) => base(x()).

Therefore, I deduce the answer:
const add_repeaters =
    (repeater1, repeater2) =>
        repeater1((iter_count, x) => increment_repeater(x()))
                 (repeater2);
        
I solved it, but really I don't know what's going on. The substitution steps
in the stepper are beyond mortal comprehension. only pure pattern recognition
is at play, and I don't understand how anyone can even come up with this by
themselves. Holy s***, this question took so much time.
*/

const add_repeaters =
    (repeater1, repeater2) =>
        repeater1((iter_count, x) => increment_repeater(x()))(repeater2);

to_int(add_repeaters(two_repeater,
                     three_repeater));  // should return 5