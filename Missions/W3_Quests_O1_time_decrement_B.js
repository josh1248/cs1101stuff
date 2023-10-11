const zero_repeater = f => x => x;
const one_repeater = f => x => f(zero_repeater, () => zero_repeater(f)(x));
const two_repeater = f => x => f(one_repeater, () => one_repeater(f)(x));
const three_repeater = f => x => f(two_repeater, () => two_repeater(f)(x));

const to_int = repeater => repeater((iter_count, x) => x() + 1)(0);

const pair = (x, y) => f => f(x, y);
const head = p => p((a, b) => a);
const decrement_repeater = repeater => 
                                head(repeater(pair)
                                     (pair(zero_repeater, "hellooo"))
                                    );

to_int(decrement_repeater(three_repeater));  // should return 2

/* Process of coming up with decrement_repeater
Well, let me examine the input and desired output of decrement_repater:
Input: f => x => f(nMinus1_repeater, () => nMinus1_repeater(f)(x))
Output: f => x => f(nMinus2_repeater, () => nMinus2_repeater(f)(x))

I need to access nMinus1_repeater in the input, because the output is
exactly equal to the definition of nMinus1_repeater.

This reminds me of Q2, whose head function can extract the first argument
in a pair.

The end result desired is nMinus1_repeater.
Using Q2, it would be nice if the penultimate step is
head(pair(nMinus1_repeater, () => nMinus1_repeater(pair)(x)))

The 2nd field in the pair doesn't really make sense, but I am 
going to throw it away anyways so no issues

Ok, so I need to figure out how to generate
pair(nMinus1_repeater, () => nMinus1_repeater(pair)(x)) from
n_repeater, which equals
f => x => f(nMinus1_repeater, () => nMinus1_repeater(f)(x))

f must obviously equal pair, so that is nicely fixed:
n_repeater(pair) must equal
x => pair(nMinus1_repeater, () => nMinus1_repeater(pair)(x))

i dont really care what this evaluates to. just throw a junk value at it.
Thus, n_repeater(pair)(junkvalue) equals
pair(nMinus1_repeater, () => nMinus1_repeater(pair)(junkvalue))

ok! The last step then is the extraction of the first input only:
head(n_repeater(pair)(junkvalue))
equals
nMinus1_repeater.

Therefore, decrement_repeater must equal to
repeater => head(repeater(pair)(junkvalue))
            
Issue: problem when input is zero_repeater, which equals
f => x => x. the desired output is
f => x => x as well. When I tested this edge case, it doesn't work. So let me 
work through it.

(repeater => head(repeater(pair)(junkvalue)))(one_repeater)
head(one_repeater(pair)(junkvalue))
head(pair(junkvalue))
well, this is easy to fix. Have junk value be a pair where the first value
is zero_repeater! Not so much a junk value after all.

*/