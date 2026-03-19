window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'Conditional & Biconditional',
    subtitle: 'If P then Q: the heart of mathematical reasoning',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Conditionals?',
            content: `
<h2>Why Conditionals?</h2>

<div class="env-block intuition">
    <div class="env-title">A Puzzle to Start</div>
    <div class="env-body">
        <p>Your teacher promises: "If you score 90 or above, you get an A." You score 85 and get a B. Did your teacher lie?</p>
        <p>Most people say no, and they are right. The promise only commits to what happens <em>when you score 90 or above</em>. It says nothing about what happens otherwise. But now consider: you score 95 and get a B. Did your teacher lie? Absolutely. The condition was met, but the promised consequence did not follow.</p>
        <p>This asymmetry, that a conditional claim can only be violated when the hypothesis holds, is the key insight of this chapter.</p>
    </div>
</div>

<p>In Chapter 0 we studied the connectives \\(\\land\\), \\(\\lor\\), and \\(\\neg\\). These let us combine propositions, but they do not capture the most fundamental pattern in mathematical reasoning: the <strong>implication</strong>.</p>

<p>Nearly every theorem in mathematics has the form "If P, then Q": if \\(n\\) is even, then \\(n^2\\) is even; if \\(f\\) is differentiable, then \\(f\\) is continuous; if a group has prime order, then it is cyclic. Learning to work with conditionals precisely is the single most important skill in proof-writing.</p>

<h3>What This Chapter Covers</h3>

<p>We will build up the conditional \\(P \\to Q\\) from its truth table, confront the initially surprising concept of <em>vacuous truth</em>, explore the family of related statements (converse, inverse, contrapositive), introduce the biconditional \\(P \\leftrightarrow Q\\), and connect everything to the language of necessary and sufficient conditions that pervades mathematics.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>The material conditional as we define it today was formalized by Gottlob Frege in his 1879 <em>Begriffsschrift</em> and refined by Bertrand Russell and Alfred North Whitehead in <em>Principia Mathematica</em> (1910). The truth-table method was independently developed by Ludwig Wittgenstein, Emil Post, and Charles Sanders Peirce.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: The Conditional P -> Q
        // ================================================================
        {
            id: 'sec-conditional',
            title: 'The Conditional P → Q',
            content: `
<h2>The Conditional \\(P \\to Q\\)</h2>

<div class="env-block definition">
    <div class="env-title">Definition: Conditional Statement</div>
    <div class="env-body">
        <p>If \\(P\\) and \\(Q\\) are propositions, the <strong>conditional statement</strong> \\(P \\to Q\\) (read "if P then Q") is the proposition that is false when \\(P\\) is true and \\(Q\\) is false, and true otherwise.</p>
    </div>
</div>

<p>The proposition \\(P\\) is called the <strong>hypothesis</strong> (or antecedent), and \\(Q\\) is the <strong>conclusion</strong> (or consequent). The truth table is:</p>

<table class="truth-table">
<thead><tr><th>\\(P\\)</th><th>\\(Q\\)</th><th>\\(P \\to Q\\)</th></tr></thead>
<tbody>
<tr><td>T</td><td>T</td><td>T</td></tr>
<tr><td>T</td><td>F</td><td>F</td></tr>
<tr><td>F</td><td>T</td><td>T</td></tr>
<tr><td>F</td><td>F</td><td>T</td></tr>
</tbody>
</table>

<p>The only row where \\(P \\to Q\\) is false is <strong>row 2</strong>: the hypothesis is true but the conclusion is false. This matches our intuition about promises. A promise is broken only when the condition is met but the promise is not fulfilled.</p>

<h3>Vacuous Truth</h3>

<div class="env-block definition">
    <div class="env-title">Vacuous Truth</div>
    <div class="env-body">
        <p>When the hypothesis \\(P\\) is false, the conditional \\(P \\to Q\\) is automatically true regardless of \\(Q\\). This is called <strong>vacuous truth</strong>. The conditional makes no claim about what happens when the hypothesis fails.</p>
    </div>
</div>

<p>Rows 3 and 4 of the truth table trouble many students. Consider: "If the moon is made of cheese, then 2 + 2 = 5." This is vacuously true, because the hypothesis is false. The statement does not assert that 2 + 2 = 5; it asserts a relationship between hypothesis and conclusion, and that relationship is not violated when the hypothesis fails.</p>

<div class="env-block example">
    <div class="env-title">Example: Vacuous Truth in Mathematics</div>
    <div class="env-body">
        <p>The statement "If \\(n\\) is an even prime greater than 2, then \\(n^2 < 0\\)" is <em>true</em>. There are no even primes greater than 2, so the hypothesis is always false, making every instance of the conditional vacuously true. No counterexample exists because no qualifying \\(n\\) exists.</p>
    </div>
</div>

<h3>Equivalent English Phrasings</h3>

<p>All of the following express \\(P \\to Q\\):</p>
<ul>
    <li>If P, then Q</li>
    <li>P implies Q</li>
    <li>P only if Q</li>
    <li>Q if P</li>
    <li>Q whenever P</li>
    <li>P is sufficient for Q</li>
    <li>Q is necessary for P</li>
</ul>

<p>The phrasing "P only if Q" deserves attention. It means: the only way P can be true is if Q is also true. Equivalently, if Q is false then P must be false, which is exactly \\(P \\to Q\\).</p>

<div class="env-block warning">
    <div class="env-title">Common Mistake</div>
    <div class="env-body">
        <p>"P only if Q" is \\(P \\to Q\\), <strong>not</strong> \\(Q \\to P\\). The word "only" restricts P, not Q. Compare: "I go outside only if it is sunny" means \\(\\text{outside} \\to \\text{sunny}\\), not the other way around.</p>
    </div>
</div>

<h3>The Conditional as a Disjunction</h3>

<p>An important logical equivalence:</p>

\\[
P \\to Q \\equiv \\neg P \\lor Q
\\]

<p>You can verify this by truth table: both have the same truth values in all four rows. This equivalence is frequently used in proofs and in converting between logical forms.</p>

<div class="viz-placeholder" data-viz="viz-conditional-truth"></div>
`,
            visualizations: [
                {
                    id: 'viz-conditional-truth',
                    title: 'Truth Table for \\(P \\to Q\\)',
                    description: 'The conditional is false only when P is true and Q is false (highlighted in red). The vacuously true rows where P is false are highlighted separately.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var highlightRow = -1;
                        VizEngine.createButton(controls, 'Highlight Vacuous Truth', function() {
                            highlightRow = (highlightRow === 34) ? -1 : 34;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Truth Table: P → Q', viz.width / 2, 25, viz.colors.white, 16);

                            var rows = [
                                { p: true,  q: true,  r: true,  label: 'Promise kept' },
                                { p: true,  q: false, r: false, label: 'Promise broken!' },
                                { p: false, q: true,  r: true,  label: 'Vacuously true' },
                                { p: false, q: false, r: true,  label: 'Vacuously true' }
                            ];

                            var tableX = 80;
                            var tableY = 60;
                            var colW = [80, 80, 100, 180];
                            var rowH = 50;
                            var totalW = colW.reduce(function(a, b) { return a + b; }, 0);

                            // Header
                            ctx.fillStyle = '#1a1a40';
                            ctx.fillRect(tableX, tableY, totalW, rowH);
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(tableX, tableY, totalW, rowH);

                            var headers = ['P', 'Q', 'P → Q', 'Interpretation'];
                            var cx = tableX;
                            for (var h = 0; h < headers.length; h++) {
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(headers[h], cx + colW[h] / 2, tableY + rowH / 2);
                                cx += colW[h];
                            }

                            // Data rows
                            for (var i = 0; i < rows.length; i++) {
                                var ry = tableY + rowH * (i + 1);
                                var row = rows[i];

                                // Background highlighting
                                if (!row.r) {
                                    ctx.fillStyle = viz.colors.red + '22';
                                    ctx.fillRect(tableX, ry, totalW, rowH);
                                } else if (!row.p && highlightRow === 34) {
                                    ctx.fillStyle = viz.colors.yellow + '18';
                                    ctx.fillRect(tableX, ry, totalW, rowH);
                                }

                                ctx.strokeStyle = viz.colors.axis + '88';
                                ctx.lineWidth = 0.5;
                                ctx.strokeRect(tableX, ry, totalW, rowH);

                                var vals = [
                                    row.p ? 'T' : 'F',
                                    row.q ? 'T' : 'F',
                                    row.r ? 'T' : 'F',
                                    row.label
                                ];
                                var valColors = [
                                    row.p ? viz.colors.green : viz.colors.red,
                                    row.q ? viz.colors.green : viz.colors.red,
                                    row.r ? viz.colors.green : viz.colors.red,
                                    !row.r ? viz.colors.red : (!row.p ? viz.colors.yellow : viz.colors.text)
                                ];
                                cx = tableX;
                                for (var j = 0; j < vals.length; j++) {
                                    ctx.fillStyle = valColors[j];
                                    ctx.font = j === 3 ? '12px -apple-system,sans-serif' : 'bold 16px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(vals[j], cx + colW[j] / 2, ry + rowH / 2);
                                    cx += colW[j];
                                }
                            }

                            // Annotation
                            var noteY = tableY + rowH * 5 + 20;
                            viz.screenText('The conditional is only false in row 2: P is true but Q is false.', viz.width / 2, noteY, viz.colors.teal, 13);
                            viz.screenText('When P is false (rows 3–4), P → Q is automatically true (vacuous truth).', viz.width / 2, noteY + 22, viz.colors.yellow, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let P be "it is raining" and Q be "the ground is wet." Write \\(P \\to Q\\) in English and determine its truth value if it is not raining and the ground is dry.',
                    hint: 'When the hypothesis is false, what is the truth value of a conditional?',
                    solution: '\\(P \\to Q\\) is "If it is raining, then the ground is wet." When P is false (not raining) and Q is false (ground is dry), \\(P \\to Q\\) is <strong>true</strong> (vacuously true, row 4 of the truth table).'
                },
                {
                    question: 'Construct a truth table for \\(\\neg P \\lor Q\\) and verify that it is logically equivalent to \\(P \\to Q\\).',
                    hint: 'Compute \\(\\neg P\\) first, then take the disjunction with Q. Compare all four rows with the \\(P \\to Q\\) truth table.',
                    solution: 'Row by row: (T,T): \\(\\neg T \\lor T = F \\lor T = T\\). (T,F): \\(F \\lor F = F\\). (F,T): \\(T \\lor T = T\\). (F,F): \\(T \\lor F = T\\). This matches \\(P \\to Q\\) in every row, confirming \\(P \\to Q \\equiv \\neg P \\lor Q\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Converse, Inverse, Contrapositive
        // ================================================================
        {
            id: 'sec-converse',
            title: 'Converse, Inverse, Contrapositive',
            content: `
<h2>Converse, Inverse, Contrapositive</h2>

<p>Given a conditional \\(P \\to Q\\), three related statements arise naturally by negating and/or swapping the hypothesis and conclusion:</p>

<div class="env-block definition">
    <div class="env-title">Definition: Related Conditionals</div>
    <div class="env-body">
        <table class="truth-table">
        <thead><tr><th>Name</th><th>Form</th><th>Relationship to \\(P \\to Q\\)</th></tr></thead>
        <tbody>
        <tr><td><strong>Original</strong></td><td>\\(P \\to Q\\)</td><td>The given statement</td></tr>
        <tr><td><strong>Converse</strong></td><td>\\(Q \\to P\\)</td><td>Swap hypothesis and conclusion</td></tr>
        <tr><td><strong>Inverse</strong></td><td>\\(\\neg P \\to \\neg Q\\)</td><td>Negate both</td></tr>
        <tr><td><strong>Contrapositive</strong></td><td>\\(\\neg Q \\to \\neg P\\)</td><td>Swap and negate both</td></tr>
        </tbody>
        </table>
    </div>
</div>

<h3>Which Are Logically Equivalent?</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem: Contrapositive Equivalence</div>
    <div class="env-body">
        <p>A conditional and its contrapositive are logically equivalent:</p>
        \\[ P \\to Q \\equiv \\neg Q \\to \\neg P \\]
        <p>The converse and inverse are logically equivalent to <em>each other</em>, but generally <strong>not</strong> equivalent to the original.</p>
        \\[ Q \\to P \\equiv \\neg P \\to \\neg Q \\]
    </div>
</div>

<p>Let us verify these claims with a truth table:</p>

<table class="truth-table">
<thead><tr><th>\\(P\\)</th><th>\\(Q\\)</th><th>\\(P \\to Q\\)</th><th>\\(Q \\to P\\)</th><th>\\(\\neg P \\to \\neg Q\\)</th><th>\\(\\neg Q \\to \\neg P\\)</th></tr></thead>
<tbody>
<tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr>
<tr><td>T</td><td>F</td><td>F</td><td>T</td><td>T</td><td>F</td></tr>
<tr><td>F</td><td>T</td><td>T</td><td>F</td><td>F</td><td>T</td></tr>
<tr><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td></tr>
</tbody>
</table>

<p>Columns 3 and 6 are identical (original ≡ contrapositive). Columns 4 and 5 are identical (converse ≡ inverse). But columns 3 and 4 differ in rows 2 and 3.</p>

<div class="env-block warning">
    <div class="env-title">The Converse Error</div>
    <div class="env-body">
        <p>Confusing a conditional with its converse is one of the most common logical errors. "If it is raining, then the ground is wet" does <strong>not</strong> mean "If the ground is wet, then it is raining." The ground could be wet from a sprinkler. The converse of a true statement can be false.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <p>Original: "If \\(n\\) is divisible by 4, then \\(n\\) is even." (True)</p>
        <p>Converse: "If \\(n\\) is even, then \\(n\\) is divisible by 4." (False: \\(n = 6\\))</p>
        <p>Inverse: "If \\(n\\) is not divisible by 4, then \\(n\\) is not even." (False: \\(n = 6\\))</p>
        <p>Contrapositive: "If \\(n\\) is not even, then \\(n\\) is not divisible by 4." (True, equivalent to original)</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-converse-family"></div>
`,
            visualizations: [
                {
                    id: 'viz-converse-family',
                    title: 'The Four Related Conditionals',
                    description: 'See all four forms and which pairs are logically equivalent. Toggle rows to compare truth values.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var pVal = true;
                        var qVal = true;

                        VizEngine.createButton(controls, 'Toggle P', function() {
                            pVal = !pVal; draw();
                        });
                        VizEngine.createButton(controls, 'Toggle Q', function() {
                            qVal = !qVal; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('P → Q  and Its Relatives', viz.width / 2, 22, viz.colors.white, 16);

                            var p = pVal, q = qVal;
                            var np = !p, nq = !q;

                            var forms = [
                                { name: 'Original',        sym: 'P → Q',    val: !p || q,   color: viz.colors.blue },
                                { name: 'Converse',        sym: 'Q → P',    val: !q || p,   color: viz.colors.orange },
                                { name: 'Inverse',         sym: '¬P → ¬Q',  val: p || nq,   color: viz.colors.orange },
                                { name: 'Contrapositive',  sym: '¬Q → ¬P',  val: q || np,   color: viz.colors.blue }
                            ];

                            // Current values
                            viz.screenText('P = ' + (p ? 'T' : 'F'), 140, 55, p ? viz.colors.green : viz.colors.red, 15);
                            viz.screenText('Q = ' + (q ? 'T' : 'F'), 420, 55, q ? viz.colors.green : viz.colors.red, 15);

                            var startY = 85;
                            var boxH = 60;
                            var gap = 12;

                            for (var i = 0; i < forms.length; i++) {
                                var f = forms[i];
                                var y = startY + i * (boxH + gap);

                                // Box
                                ctx.fillStyle = f.val ? f.color + '18' : viz.colors.red + '18';
                                ctx.strokeStyle = f.val ? f.color : viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.roundRect(40, y, viz.width - 80, boxH, 8);
                                ctx.fill(); ctx.stroke();

                                // Name
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(f.name, 60, y + boxH / 2 - 8);

                                // Symbolic form
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillText(f.sym, 60, y + boxH / 2 + 12);

                                // Truth value
                                ctx.fillStyle = f.val ? viz.colors.green : viz.colors.red;
                                ctx.font = 'bold 20px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(f.val ? 'TRUE' : 'FALSE', viz.width - 60, y + boxH / 2);
                            }

                            // Equivalence arrows
                            var midX = viz.width / 2 + 70;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([4, 3]);

                            // Original ↔ Contrapositive
                            var y1 = startY + boxH / 2;
                            var y4 = startY + 3 * (boxH + gap) + boxH / 2;
                            ctx.beginPath();
                            ctx.moveTo(midX, y1); ctx.lineTo(midX + 40, (y1 + y4) / 2); ctx.lineTo(midX, y4);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('≡', midX + 45, (y1 + y4) / 2);

                            // Converse ↔ Inverse
                            ctx.strokeStyle = viz.colors.orange;
                            var y2 = startY + 1 * (boxH + gap) + boxH / 2;
                            var y3 = startY + 2 * (boxH + gap) + boxH / 2;
                            ctx.beginPath();
                            ctx.moveTo(midX - 20, y2); ctx.lineTo(midX + 10, (y2 + y3) / 2); ctx.lineTo(midX - 20, y3);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('≡', midX + 15, (y2 + y3) / 2);

                            ctx.setLineDash([]);

                            // Legend
                            viz.screenText('Blue pair: always match.  Orange pair: always match.  But blue ≠ orange in general.', viz.width / 2, startY + 4 * (boxH + gap) + 10, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Write the converse, inverse, and contrapositive of: "If a function is differentiable, then it is continuous."',
                    hint: 'Let P = "differentiable" and Q = "continuous." Apply the definitions.',
                    solution: 'Converse: "If a function is continuous, then it is differentiable." (False: \\(f(x) = |x|\\) at \\(x = 0\\).)<br>Inverse: "If a function is not differentiable, then it is not continuous." (False: same counterexample.)<br>Contrapositive: "If a function is not continuous, then it is not differentiable." (True: equivalent to original.)'
                },
                {
                    question: 'Give a concrete example showing that a true conditional can have a false converse.',
                    hint: 'Think of a mathematical statement where \\(P \\to Q\\) is true but \\(Q \\to P\\) fails.',
                    solution: '"If \\(n\\) is a prime greater than 2, then \\(n\\) is odd." (True.) Converse: "If \\(n\\) is odd, then \\(n\\) is a prime greater than 2." (False: \\(n = 9\\) is odd but not prime.)'
                }
            ]
        },

        // ================================================================
        // SECTION 4: The Biconditional P <-> Q
        // ================================================================
        {
            id: 'sec-biconditional',
            title: 'The Biconditional P ↔ Q',
            content: `
<h2>The Biconditional \\(P \\leftrightarrow Q\\)</h2>

<div class="env-block definition">
    <div class="env-title">Definition: Biconditional</div>
    <div class="env-body">
        <p>The <strong>biconditional</strong> \\(P \\leftrightarrow Q\\) (read "P if and only if Q") is the proposition that is true when \\(P\\) and \\(Q\\) have the <em>same</em> truth value, and false otherwise.</p>
    </div>
</div>

<table class="truth-table">
<thead><tr><th>\\(P\\)</th><th>\\(Q\\)</th><th>\\(P \\to Q\\)</th><th>\\(Q \\to P\\)</th><th>\\(P \\leftrightarrow Q\\)</th></tr></thead>
<tbody>
<tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr>
<tr><td>T</td><td>F</td><td>F</td><td>T</td><td>F</td></tr>
<tr><td>F</td><td>T</td><td>T</td><td>F</td><td>F</td></tr>
<tr><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td></tr>
</tbody>
</table>

<div class="env-block theorem">
    <div class="env-title">Theorem: Biconditional as Conjunction of Conditionals</div>
    <div class="env-body">
        \\[ P \\leftrightarrow Q \\equiv (P \\to Q) \\land (Q \\to P) \\]
        <p>The biconditional holds exactly when both the conditional and its converse hold simultaneously.</p>
    </div>
</div>

<p>This is why "if and only if" proofs typically have two parts: one proves \\(P \\to Q\\), the other proves \\(Q \\to P\\). Both directions must hold for the biconditional to be true.</p>

<h3>English Phrasings</h3>

<p>All of the following express \\(P \\leftrightarrow Q\\):</p>
<ul>
    <li>P if and only if Q (abbreviated "P iff Q")</li>
    <li>P is equivalent to Q</li>
    <li>P is necessary and sufficient for Q</li>
    <li>P exactly when Q</li>
</ul>

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <p>"An integer is even if and only if its square is even."</p>
        <p>This biconditional consists of two claims:</p>
        <ol>
            <li>(\\(\\Rightarrow\\)) If \\(n\\) is even, then \\(n^2\\) is even.</li>
            <li>(\\(\\Leftarrow\\)) If \\(n^2\\) is even, then \\(n\\) is even.</li>
        </ol>
        <p>Both directions are true (we will prove both later in the course), so the biconditional is true.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Notation</div>
    <div class="env-body">
        <p>In mathematical writing, "iff" is a standard abbreviation for "if and only if." Some authors use \\(\\Leftrightarrow\\) for logical equivalence between statements and \\(\\leftrightarrow\\) for the connective; in this course we use \\(\\leftrightarrow\\) for both.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-biconditional"></div>
`,
            visualizations: [
                {
                    id: 'viz-biconditional',
                    title: 'Biconditional = Both Directions',
                    description: 'The biconditional \\(P \\leftrightarrow Q\\) is true exactly when both \\(P \\to Q\\) and \\(Q \\to P\\) are true. Toggle P and Q to see.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 0, originY: 0, scale: 1
                        });

                        var pVal = true;
                        var qVal = true;

                        VizEngine.createButton(controls, 'Toggle P', function() {
                            pVal = !pVal; draw();
                        });
                        VizEngine.createButton(controls, 'Toggle Q', function() {
                            qVal = !qVal; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('P ↔ Q  =  (P → Q) ∧ (Q → P)', viz.width / 2, 25, viz.colors.white, 15);

                            var p = pVal, q = qVal;
                            var pToQ = !p || q;
                            var qToP = !q || p;
                            var bicon = pToQ && qToP;

                            // P and Q circles
                            var circR = 50;
                            var pCx = 160, qCx = 400, circY = 130;

                            // P circle
                            ctx.fillStyle = p ? viz.colors.green + '33' : viz.colors.red + '22';
                            ctx.strokeStyle = p ? viz.colors.green : viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.arc(pCx, circY, circR, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 24px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('P', pCx, circY - 8);
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillText(p ? 'TRUE' : 'FALSE', pCx, circY + 16);

                            // Q circle
                            ctx.fillStyle = q ? viz.colors.green + '33' : viz.colors.red + '22';
                            ctx.strokeStyle = q ? viz.colors.green : viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.arc(qCx, circY, circR, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 24px -apple-system,sans-serif';
                            ctx.fillText('Q', qCx, circY - 8);
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillText(q ? 'TRUE' : 'FALSE', qCx, circY + 16);

                            // Arrows
                            var arrowY1 = circY - 15;
                            var arrowY2 = circY + 15;
                            var ax1 = pCx + circR + 10;
                            var ax2 = qCx - circR - 10;

                            // P → Q arrow (top)
                            ctx.strokeStyle = pToQ ? viz.colors.green : viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(ax1, arrowY1); ctx.lineTo(ax2 - 10, arrowY1); ctx.stroke();
                            // arrowhead
                            ctx.fillStyle = pToQ ? viz.colors.green : viz.colors.red;
                            ctx.beginPath();
                            ctx.moveTo(ax2, arrowY1);
                            ctx.lineTo(ax2 - 12, arrowY1 - 6);
                            ctx.lineTo(ax2 - 12, arrowY1 + 6);
                            ctx.closePath(); ctx.fill();

                            ctx.fillStyle = pToQ ? viz.colors.green : viz.colors.red;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('P → Q: ' + (pToQ ? 'T' : 'F'), (ax1 + ax2) / 2, arrowY1 - 12);

                            // Q → P arrow (bottom)
                            ctx.strokeStyle = qToP ? viz.colors.green : viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(ax2, arrowY2); ctx.lineTo(ax1 + 10, arrowY2); ctx.stroke();
                            ctx.fillStyle = qToP ? viz.colors.green : viz.colors.red;
                            ctx.beginPath();
                            ctx.moveTo(ax1, arrowY2);
                            ctx.lineTo(ax1 + 12, arrowY2 - 6);
                            ctx.lineTo(ax1 + 12, arrowY2 + 6);
                            ctx.closePath(); ctx.fill();

                            ctx.fillStyle = qToP ? viz.colors.green : viz.colors.red;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Q → P: ' + (qToP ? 'T' : 'F'), (ax1 + ax2) / 2, arrowY2 + 16);

                            // Result box
                            var boxY = 220;
                            ctx.fillStyle = bicon ? viz.colors.blue + '22' : viz.colors.red + '22';
                            ctx.strokeStyle = bicon ? viz.colors.blue : viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.roundRect(100, boxY, viz.width - 200, 60, 10);
                            ctx.fill(); ctx.stroke();

                            ctx.fillStyle = bicon ? viz.colors.blue : viz.colors.red;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('P ↔ Q  =  ' + (bicon ? 'TRUE' : 'FALSE'), viz.width / 2, boxY + 30);

                            // Explanation
                            var reason = bicon
                                ? (p ? 'Both true: both directions hold.' : 'Both false: both directions hold (vacuously).')
                                : 'P and Q differ, so one direction fails.';
                            viz.screenText(reason, viz.width / 2, boxY + 85, viz.colors.text, 13);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show by truth table that \\(P \\leftrightarrow Q \\equiv (P \\land Q) \\lor (\\neg P \\land \\neg Q)\\).',
                    hint: 'The biconditional is true when P and Q have the same truth value. When are both true simultaneously? When are both false simultaneously?',
                    solution: 'Row (T,T): \\((T \\land T) \\lor (F \\land F) = T \\lor F = T\\). Row (T,F): \\((T \\land F) \\lor (F \\land T) = F \\lor F = F\\). Row (F,T): \\((F \\land T) \\lor (T \\land F) = F \\lor F = F\\). Row (F,F): \\((F \\land F) \\lor (T \\land T) = F \\lor T = T\\). This matches \\(P \\leftrightarrow Q\\) exactly.'
                },
                {
                    question: 'Is the following true or false? "An integer \\(n\\) is divisible by 6 if and only if \\(n\\) is divisible by 2 and by 3."',
                    hint: 'Check both directions: (1) if \\(6 | n\\), is \\(n\\) divisible by 2 and 3? (2) if \\(2|n\\) and \\(3|n\\), is \\(6|n\\)?',
                    solution: 'True. (\\(\\Rightarrow\\)) If \\(6|n\\), then \\(n = 6k\\) which is divisible by both 2 and 3. (\\(\\Leftarrow\\)) If \\(2|n\\) and \\(3|n\\), since \\(\\gcd(2,3)=1\\), we have \\(6|n\\). Both directions hold, so the biconditional is true.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Necessary & Sufficient Conditions
        // ================================================================
        {
            id: 'sec-necessary',
            title: 'Necessary & Sufficient Conditions',
            content: `
<h2>Necessary and Sufficient Conditions</h2>

<p>Mathematicians often describe implications using the language of <em>necessary</em> and <em>sufficient</em> conditions. This language is precise and widely used, so mastering it is essential.</p>

<div class="env-block definition">
    <div class="env-title">Definition: Sufficient Condition</div>
    <div class="env-body">
        <p>"\\(P\\) is <strong>sufficient</strong> for \\(Q\\)" means \\(P \\to Q\\). Having P is enough to guarantee Q.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition: Necessary Condition</div>
    <div class="env-body">
        <p>"\\(P\\) is <strong>necessary</strong> for \\(Q\\)" means \\(Q \\to P\\). You cannot have Q without P. Equivalently, \\(\\neg P \\to \\neg Q\\).</p>
    </div>
</div>

<p>Notice the asymmetry: "P is sufficient for Q" is \\(P \\to Q\\), but "P is necessary for Q" is \\(Q \\to P\\), the <em>converse</em>.</p>

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <p>Consider: "Being a square is sufficient for being a rectangle." This means: if a shape is a square, then it is a rectangle (\\(\\text{square} \\to \\text{rectangle}\\)). True.</p>
        <p>"Being a rectangle is necessary for being a square." This means: if a shape is a square, then it is a rectangle (same thing!). Also expressed as: you cannot be a square without being a rectangle.</p>
        <p>But "being a rectangle is sufficient for being a square" is false (not all rectangles are squares), and "being a square is necessary for being a rectangle" is also false (there exist rectangles that are not squares).</p>
    </div>
</div>

<h3>The Venn Diagram Perspective</h3>

<p>Think of it in terms of sets:</p>
<ul>
    <li><strong>Sufficient:</strong> \\(P \\to Q\\) means the set of things satisfying P is a <em>subset</em> of those satisfying Q. Being in P is enough to land you in Q.</li>
    <li><strong>Necessary:</strong> \\(Q \\to P\\) means Q is a subset of P. Being in Q requires being in P; P is the larger set that you must belong to.</li>
    <li><strong>Necessary and sufficient:</strong> \\(P \\leftrightarrow Q\\) means P and Q describe exactly the same set.</li>
</ul>

<div class="viz-placeholder" data-viz="viz-necessary-sufficient"></div>

<div class="env-block theorem">
    <div class="env-title">Summary</div>
    <div class="env-body">
        <table class="truth-table">
        <thead><tr><th>English</th><th>Symbolic</th><th>Set relationship</th></tr></thead>
        <tbody>
        <tr><td>P is sufficient for Q</td><td>\\(P \\to Q\\)</td><td>\\(P \\subseteq Q\\)</td></tr>
        <tr><td>P is necessary for Q</td><td>\\(Q \\to P\\)</td><td>\\(Q \\subseteq P\\)</td></tr>
        <tr><td>P is necessary and sufficient for Q</td><td>\\(P \\leftrightarrow Q\\)</td><td>\\(P = Q\\)</td></tr>
        </tbody>
        </table>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-necessary-sufficient',
                    title: 'Necessary vs. Sufficient: Venn Diagram',
                    description: 'Sufficient: P is a subset of Q. Necessary: Q is a subset of P. Both: P and Q are the same set. Click to cycle through the three cases.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 0, originY: 0, scale: 1
                        });

                        var mode = 0; // 0: sufficient, 1: necessary, 2: both
                        var labels = ['P is Sufficient for Q  (P → Q)', 'P is Necessary for Q  (Q → P)', 'P is Necessary & Sufficient  (P ↔ Q)'];

                        VizEngine.createButton(controls, 'Cycle: Sufficient → Necessary → Both', function() {
                            mode = (mode + 1) % 3;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2;
                            var cy = 190;

                            viz.screenText(labels[mode], cx, 30, viz.colors.white, 15);

                            if (mode === 0) {
                                // P ⊆ Q: P is smaller, inside Q
                                ctx.fillStyle = viz.colors.teal + '22';
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.arc(cx, cy, 120, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                                ctx.fillStyle = viz.colors.blue + '33';
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(cx - 20, cy + 10, 55, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

                                viz.screenText('Q', cx + 70, cy - 80, viz.colors.teal, 18);
                                viz.screenText('P', cx - 20, cy + 10, viz.colors.blue, 18);

                                viz.screenText('P is inside Q. Every P-thing is a Q-thing.', cx, 335, viz.colors.text, 12);
                                viz.screenText('Being P is enough (sufficient) to guarantee Q.', cx, 355, viz.colors.teal, 12);
                            } else if (mode === 1) {
                                // Q ⊆ P: Q is smaller, inside P
                                ctx.fillStyle = viz.colors.blue + '22';
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.arc(cx, cy, 120, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                                ctx.fillStyle = viz.colors.teal + '33';
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.beginPath(); ctx.arc(cx + 20, cy + 10, 55, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

                                viz.screenText('P', cx - 70, cy - 80, viz.colors.blue, 18);
                                viz.screenText('Q', cx + 20, cy + 10, viz.colors.teal, 18);

                                viz.screenText('Q is inside P. Every Q-thing is a P-thing.', cx, 335, viz.colors.text, 12);
                                viz.screenText('You cannot have Q without P. P is necessary for Q.', cx, 355, viz.colors.orange, 12);
                            } else {
                                // P = Q: same circle
                                ctx.fillStyle = viz.colors.purple + '22';
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 3;
                                ctx.beginPath(); ctx.arc(cx, cy, 100, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

                                viz.screenText('P = Q', cx, cy, viz.colors.purple, 22);

                                viz.screenText('P and Q are the same set. Every P-thing is Q and vice versa.', cx, 335, viz.colors.text, 12);
                                viz.screenText('P is both necessary and sufficient for Q.', cx, 355, viz.colors.purple, 12);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For integers, is "\\(n\\) is divisible by 4" a necessary condition, a sufficient condition, or both, for "\\(n\\) is even"?',
                    hint: 'Ask: does divisibility by 4 guarantee evenness? Does evenness require divisibility by 4?',
                    solution: 'Divisibility by 4 is <strong>sufficient</strong> for evenness (if \\(4|n\\), then \\(2|n\\)), but not necessary (\\(n=6\\) is even but not divisible by 4). So it is sufficient only.'
                },
                {
                    question: 'State a condition that is necessary but not sufficient for "\\(n\\) is prime."',
                    hint: 'What must be true of any prime? Think about parity.',
                    solution: '"\\(n > 1\\)" is necessary for primality (every prime satisfies \\(n > 1\\)) but not sufficient (\\(n = 4 > 1\\) but 4 is not prime). Alternatively: "\\(n\\) is odd or \\(n = 2\\)" is necessary but not sufficient.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Interactive Exploration
        // ================================================================
        {
            id: 'sec-explore',
            title: 'Interactive Exploration',
            content: `
<h2>Interactive Exploration</h2>

<p>Now that we have the full toolkit, let's use it. The visualizations below let you test specific mathematical implications and see statements side by side with their converses and contrapositives.</p>

<h3>Testing Implications with Examples</h3>

<p>A good way to build intuition for conditionals is to test them against specific cases. For an implication \\(P(x) \\to Q(x)\\):</p>
<ul>
    <li>Find cases where \\(P(x)\\) is true and check whether \\(Q(x)\\) holds. If you find \\(P(x)\\) true and \\(Q(x)\\) false, the implication is <strong>false</strong> (you found a counterexample).</li>
    <li>Cases where \\(P(x)\\) is false tell you nothing about the implication (vacuous truth).</li>
    <li>If no counterexample exists, the implication is true (though you may need a <em>proof</em>, not just case-checking).</li>
</ul>

<div class="viz-placeholder" data-viz="viz-implication-explorer"></div>

<h3>Side-by-Side Comparison</h3>

<p>Given any mathematical statement, we can immediately write down its converse and contrapositive. Practice doing this fluently, as we will use the contrapositive extensively in Chapter 4.</p>

<div class="viz-placeholder" data-viz="viz-logical-forms"></div>
`,
            visualizations: [
                {
                    id: 'viz-implication-explorer',
                    title: 'Implication Tester',
                    description: 'Pick an implication and test it against specific values of n. Green rows confirm the implication; a red row would be a counterexample.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 0, originY: 0, scale: 1
                        });

                        var implications = [
                            {
                                label: 'If n is divisible by 6, then n is divisible by 3',
                                p: function(n) { return n % 6 === 0; },
                                q: function(n) { return n % 3 === 0; },
                                pLabel: '6 | n',
                                qLabel: '3 | n'
                            },
                            {
                                label: 'If n is prime, then n is odd',
                                p: function(n) {
                                    if (n < 2) return false;
                                    for (var i = 2; i * i <= n; i++) { if (n % i === 0) return false; }
                                    return true;
                                },
                                q: function(n) { return n % 2 !== 0; },
                                pLabel: 'n is prime',
                                qLabel: 'n is odd'
                            },
                            {
                                label: 'If n² is even, then n is even',
                                p: function(n) { return (n * n) % 2 === 0; },
                                q: function(n) { return n % 2 === 0; },
                                pLabel: 'n² is even',
                                qLabel: 'n is even'
                            },
                            {
                                label: 'If n > 5, then n > 3',
                                p: function(n) { return n > 5; },
                                q: function(n) { return n > 3; },
                                pLabel: 'n > 5',
                                qLabel: 'n > 3'
                            }
                        ];

                        var currentImpl = 0;
                        var rangeStart = 1;

                        VizEngine.createButton(controls, 'Next Implication', function() {
                            currentImpl = (currentImpl + 1) % implications.length;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Range: 1-20', function() {
                            rangeStart = 1; draw();
                        });
                        VizEngine.createButton(controls, 'Range: 1-10', function() {
                            rangeStart = 1; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var impl = implications[currentImpl];

                            viz.screenText('Test: ' + impl.label, viz.width / 2, 22, viz.colors.white, 13);

                            // Table header
                            var tableX = 30;
                            var tableY = 48;
                            var colW = [50, 90, 90, 100, 170];
                            var rowH = 28;
                            var totalW = colW.reduce(function(a, b) { return a + b; }, 0);
                            var headers = ['n', impl.pLabel, impl.qLabel, 'P → Q', 'Status'];

                            ctx.fillStyle = '#1a1a40';
                            ctx.fillRect(tableX, tableY, totalW, rowH);
                            var cx = tableX;
                            for (var h = 0; h < headers.length; h++) {
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText(headers[h], cx + colW[h] / 2, tableY + rowH / 2);
                                cx += colW[h];
                            }

                            var maxRows = 12;
                            var counterexampleFound = false;

                            for (var i = 0; i < maxRows; i++) {
                                var n = rangeStart + i;
                                var pv = impl.p(n);
                                var qv = impl.q(n);
                                var arrow = !pv || qv;
                                var ry = tableY + rowH * (i + 1);

                                if (pv && !qv) {
                                    ctx.fillStyle = viz.colors.red + '33';
                                    ctx.fillRect(tableX, ry, totalW, rowH);
                                    counterexampleFound = true;
                                } else if (!pv) {
                                    ctx.fillStyle = viz.colors.yellow + '0a';
                                    ctx.fillRect(tableX, ry, totalW, rowH);
                                }

                                ctx.strokeStyle = viz.colors.axis + '44';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(tableX, ry + rowH); ctx.lineTo(tableX + totalW, ry + rowH); ctx.stroke();

                                var vals = [
                                    String(n),
                                    pv ? 'T' : 'F',
                                    qv ? 'T' : 'F',
                                    arrow ? 'T' : 'F',
                                    pv ? (qv ? 'Confirmed' : 'COUNTEREXAMPLE') : 'Vacuous (P false)'
                                ];
                                var valColors = [
                                    viz.colors.white,
                                    pv ? viz.colors.green : viz.colors.red,
                                    qv ? viz.colors.green : viz.colors.red,
                                    arrow ? viz.colors.green : viz.colors.red,
                                    pv ? (qv ? viz.colors.green : viz.colors.red) : viz.colors.text + '88'
                                ];
                                cx = tableX;
                                for (var j = 0; j < vals.length; j++) {
                                    ctx.fillStyle = valColors[j];
                                    ctx.font = (j === 4 ? '10px' : '11px') + ' -apple-system,sans-serif';
                                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                    ctx.fillText(vals[j], cx + colW[j] / 2, ry + rowH / 2);
                                    cx += colW[j];
                                }
                            }

                            var noteY = tableY + rowH * (maxRows + 1) + 10;
                            if (counterexampleFound) {
                                viz.screenText('Counterexample found! The implication is FALSE.', viz.width / 2, noteY, viz.colors.red, 13);
                            } else {
                                viz.screenText('No counterexample in this range. (A proof is still needed for all n.)', viz.width / 2, noteY, viz.colors.green, 12);
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-logical-forms',
                    title: 'Statement + Converse + Contrapositive',
                    description: 'See a statement alongside its converse and contrapositive. Cycle through examples to build fluency.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 340,
                            originX: 0, originY: 0, scale: 1
                        });

                        var examples = [
                            {
                                original: 'If n is divisible by 4, then n is even.',
                                converse: 'If n is even, then n is divisible by 4.',
                                contra:   'If n is not even, then n is not divisible by 4.',
                                origTrue: true, convTrue: false, contraTrue: true
                            },
                            {
                                original: 'If it is raining, then there are clouds.',
                                converse: 'If there are clouds, then it is raining.',
                                contra:   'If there are no clouds, then it is not raining.',
                                origTrue: true, convTrue: false, contraTrue: true
                            },
                            {
                                original: 'If a shape is a square, then it has four sides.',
                                converse: 'If a shape has four sides, then it is a square.',
                                contra:   'If a shape does not have four sides, then it is not a square.',
                                origTrue: true, convTrue: false, contraTrue: true
                            },
                            {
                                original: 'If n = 2, then n is prime.',
                                converse: 'If n is prime, then n = 2.',
                                contra:   'If n is not prime, then n ≠ 2.',
                                origTrue: true, convTrue: false, contraTrue: true
                            },
                            {
                                original: 'If n² = 4, then n = 2.',
                                converse: 'If n = 2, then n² = 4.',
                                contra:   'If n ≠ 2, then n² ≠ 4.',
                                origTrue: false, convTrue: true, contraTrue: false
                            }
                        ];

                        var idx = 0;
                        VizEngine.createButton(controls, 'Next Example', function() {
                            idx = (idx + 1) % examples.length;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var ex = examples[idx];

                            viz.screenText('Three Forms of a Conditional', viz.width / 2, 22, viz.colors.white, 15);

                            var forms = [
                                { name: 'Original (P → Q)', text: ex.original, truth: ex.origTrue, color: viz.colors.blue },
                                { name: 'Converse (Q → P)', text: ex.converse, truth: ex.convTrue, color: viz.colors.orange },
                                { name: 'Contrapositive (¬Q → ¬P)', text: ex.contra, truth: ex.contraTrue, color: viz.colors.teal }
                            ];

                            var startY = 55;
                            var boxH = 72;
                            var gap = 16;

                            for (var i = 0; i < forms.length; i++) {
                                var f = forms[i];
                                var y = startY + i * (boxH + gap);

                                ctx.fillStyle = f.color + '15';
                                ctx.strokeStyle = f.color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.roundRect(30, y, viz.width - 60, boxH, 8);
                                ctx.fill(); ctx.stroke();

                                ctx.fillStyle = f.color;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                                ctx.fillText(f.name, 50, y + 10);

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillText(f.text, 50, y + 32);

                                ctx.fillStyle = f.truth ? viz.colors.green : viz.colors.red;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(f.truth ? 'TRUE' : 'FALSE', viz.width - 50, y + 38);
                            }

                            // Note about equivalence
                            var ny = startY + 3 * (boxH + gap) + 5;
                            var origMatch = ex.origTrue === ex.contraTrue;
                            viz.screenText(
                                origMatch ? 'Original and Contrapositive always agree.' : 'Check: something is off!',
                                viz.width / 2, ny, origMatch ? viz.colors.green : viz.colors.red, 12
                            );
                            viz.screenText('Example ' + (idx + 1) + ' of ' + examples.length, viz.width / 2, ny + 20, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Consider the statement "If \\(n^2\\) is odd, then \\(n\\) is odd." Test this for \\(n = 1, 2, 3, 4, 5\\). Is there a counterexample?',
                    hint: 'For each n, check: is \\(n^2\\) odd? If so, is \\(n\\) odd?',
                    solution: '\\(n=1\\): \\(1\\) is odd, \\(1\\) is odd. Confirmed. \\(n=2\\): \\(4\\) is even, so P is false (vacuous). \\(n=3\\): \\(9\\) is odd, \\(3\\) is odd. Confirmed. \\(n=4\\): \\(16\\) is even, vacuous. \\(n=5\\): \\(25\\) is odd, \\(5\\) is odd. Confirmed. No counterexample in this range, and in fact the statement is true for all integers (proof in Chapter 4 via contrapositive).'
                },
                {
                    question: 'Write the contrapositive of "If \\(ab = 0\\), then \\(a = 0\\) or \\(b = 0\\)." Is the contrapositive true?',
                    hint: 'Negate both parts and swap. The negation of "A or B" is "not A and not B."',
                    solution: 'Contrapositive: "If \\(a \\neq 0\\) and \\(b \\neq 0\\), then \\(ab \\neq 0\\)." Yes, this is true (for real numbers): the product of two nonzero reals is nonzero. The original is also true; both express the zero-product property.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Chapter 2
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead: From Connectives to Quantifiers</h2>

<p>We have now assembled a complete toolkit of propositional connectives:</p>

<table class="truth-table">
<thead><tr><th>Symbol</th><th>Name</th><th>English</th></tr></thead>
<tbody>
<tr><td>\\(\\neg P\\)</td><td>Negation</td><td>not P</td></tr>
<tr><td>\\(P \\land Q\\)</td><td>Conjunction</td><td>P and Q</td></tr>
<tr><td>\\(P \\lor Q\\)</td><td>Disjunction</td><td>P or Q</td></tr>
<tr><td>\\(P \\to Q\\)</td><td>Conditional</td><td>if P then Q</td></tr>
<tr><td>\\(P \\leftrightarrow Q\\)</td><td>Biconditional</td><td>P if and only if Q</td></tr>
</tbody>
</table>

<p>With these connectives, we can build arbitrarily complex compound propositions from simpler ones. But there is a critical limitation: propositional logic deals only with specific, fixed statements.</p>

<p>Mathematics is full of claims about entire classes of objects: "for every integer \\(n\\)," "there exists a prime \\(p\\) such that..." These require <strong>quantifiers</strong>, the subject of Chapter 2. Quantifiers extend our logic from statements about specific cases to statements about entire universes of objects.</p>

<h3>Key Takeaways from This Chapter</h3>

<ol>
    <li>The conditional \\(P \\to Q\\) is false only when \\(P\\) is true and \\(Q\\) is false.</li>
    <li>Vacuous truth: when \\(P\\) is false, \\(P \\to Q\\) is automatically true.</li>
    <li>A conditional is equivalent to its contrapositive, but generally not to its converse.</li>
    <li>The biconditional \\(P \\leftrightarrow Q\\) requires both \\(P \\to Q\\) and \\(Q \\to P\\).</li>
    <li>"Sufficient" means the hypothesis guarantees the conclusion; "necessary" means the conclusion requires the hypothesis.</li>
</ol>

<div class="env-block remark">
    <div class="env-title">What's Next</div>
    <div class="env-body">
        <p>In Chapter 2, we introduce the universal quantifier \\(\\forall\\) and the existential quantifier \\(\\exists\\), learn how to negate quantified statements, and begin to write the kind of formal logical expressions that appear in real mathematical theorems.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Translate into symbols: "Being a multiple of 10 is sufficient but not necessary for being a multiple of 5."',
                    hint: 'What does "sufficient" mean in terms of an implication? What does "not necessary" tell you about the converse?',
                    solution: 'Let P = "n is a multiple of 10" and Q = "n is a multiple of 5." "Sufficient" means \\(P \\to Q\\) (true: \\(10|n \\Rightarrow 5|n\\)). "Not necessary" means \\(\\neg(Q \\to P)\\), i.e., the converse is false (\\(n = 15\\) is a multiple of 5 but not 10).'
                },
                {
                    question: 'Is the following biconditional true or false? "\\(|x| = x\\) if and only if \\(x \\geq 0\\)."',
                    hint: 'Check both directions separately. When is \\(|x| = x\\)? When is \\(x \\geq 0\\)?',
                    solution: 'True. (\\(\\Rightarrow\\)) If \\(|x| = x\\), then \\(x\\) cannot be negative (since \\(|x| \\geq 0\\)), so \\(x \\geq 0\\). (\\(\\Leftarrow\\)) If \\(x \\geq 0\\), then by definition \\(|x| = x\\). Both directions hold.'
                },
                {
                    question: 'Prove or disprove: "The converse of a false conditional is always true."',
                    hint: 'Find a conditional that is false and check its converse. Then try to find another false conditional whose converse is also false.',
                    solution: 'Disproved by counterexample. The conditional "If \\(1 = 2\\), then \\(3 = 4\\)" is actually vacuously true (P is false). For a genuinely false conditional: "If \\(n > 0\\), then \\(n > 100\\)" is false (\\(n = 5\\)). Its converse "If \\(n > 100\\), then \\(n > 0\\)" is true. But consider "If \\(n^2 = 4\\), then \\(n = 2\\)" (false: \\(n = -2\\)) and its converse "If \\(n = 2\\), then \\(n^2 = 4\\)" (true). This might suggest the claim is true, but: "If \\(n\\) is even, then \\(n\\) is divisible by 4" is false (\\(n=6\\)), and its converse "If \\(n\\) is divisible by 4, then \\(n\\) is even" is true. In fact, we can construct a false conditional with a false converse: "If \\(x > 0\\) then \\(x < -1\\)" (false at \\(x=1\\)) and its converse "If \\(x < -1\\) then \\(x > 0\\)" (false at \\(x=-2\\)). So the claim is <strong>false</strong>.'
                }
            ]
        }
    ]
});
