window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch05',
    number: 5,
    title: 'Proof by Contradiction',
    subtitle: 'Assume the opposite, find absurdity',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Assume the Opposite?</h2>

<div class="env-block intuition">
    <div class="env-title">An Everyday Contradiction</div>
    <div class="env-body">
        <p>Suppose someone claims: "I never eat sugar." You then observe them eating a candy bar. You have derived a contradiction: the claim "I never eat sugar" combined with the observed fact "I am eating sugar" cannot both be true. Since the observation is undeniable, the original claim must be false.</p>
        <p>This is precisely the logic of proof by contradiction. Assume something is true, follow the logical consequences, and if you reach an impossibility, the assumption itself must have been wrong.</p>
    </div>
</div>

<p>In the previous chapters, we studied <strong>direct proof</strong> (assume \\(P\\), derive \\(Q\\)) and <strong>contrapositive proof</strong> (assume \\(\\neg Q\\), derive \\(\\neg P\\)). Both are constructive: they build a chain of reasoning toward the desired conclusion. But some statements resist this forward march. Sometimes the most natural path is to assume the conclusion is <em>false</em> and show that this leads to disaster.</p>

<h3>When Direct Proof Fails</h3>

<p>Consider the statement: "\\(\\sqrt{2}\\) is irrational." How would you prove this directly? You would need to show that no fraction \\(a/b\\) equals \\(\\sqrt{2}\\), which means checking infinitely many fractions. There is no obvious starting point for a direct argument.</p>

<p>But suppose you assume the opposite: "\\(\\sqrt{2}\\) is rational." Now you have something concrete to work with. You can write \\(\\sqrt{2} = a/b\\) and chase the algebraic consequences until they blow up in a contradiction. This is the power of proof by contradiction.</p>

<h3>The Logical Foundation</h3>

<p>Proof by contradiction rests on the <strong>law of excluded middle</strong>: for any proposition \\(P\\), either \\(P\\) is true or \\(\\neg P\\) is true. There is no third option. If assuming \\(\\neg P\\) leads to a logical impossibility, then \\(\\neg P\\) cannot hold, so \\(P\\) must be true.</p>

<p>Formally, if \\(\\neg P \\Rightarrow (R \\wedge \\neg R)\\) for some statement \\(R\\), then \\(P\\) must be true. A statement and its negation cannot both hold; if assuming \\(\\neg P\\) forces them to, then \\(\\neg P\\) is untenable.</p>

<div class="env-block remark">
    <div class="env-title">Contradiction vs. Contrapositive</div>
    <div class="env-body">
        <p>Both methods start by assuming a negation. The key difference:</p>
        <ul>
            <li><strong>Contrapositive:</strong> To prove \\(P \\Rightarrow Q\\), you assume \\(\\neg Q\\) and derive \\(\\neg P\\). The structure mirrors the original implication.</li>
            <li><strong>Contradiction:</strong> To prove \\(P\\), you assume \\(\\neg P\\) and derive <em>any</em> contradiction. The target is not a specific statement; it is any logical impossibility.</li>
        </ul>
        <p>Contrapositive is cleaner when you are proving an implication. Contradiction is the weapon of last resort, used when the statement is not naturally an implication, or when you need the full force of the negated hypothesis.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-contradiction-structure"></div>
`,
            visualizations: [
                {
                    id: 'viz-contradiction-structure',
                    title: 'Structure of a Proof by Contradiction',
                    description: 'An animated flowchart showing how a contradiction proof works: assume the negation, follow logical steps, arrive at an impossibility, and conclude the original statement.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 440,
                            originX: 0, originY: 0, scale: 1
                        });

                        var step = 0;
                        var maxStep = 5;
                        var steps = [
                            { label: 'Statement', text: 'Want to prove: P is true', color: viz.colors.white },
                            { label: 'Assume', text: 'Assume for contradiction: ~P is true', color: viz.colors.orange },
                            { label: 'Reason', text: 'Follow logical consequences of ~P ...', color: viz.colors.blue },
                            { label: 'Derive', text: 'Reach statement R (from our reasoning)', color: viz.colors.teal },
                            { label: 'Contradiction!', text: 'But also ~R follows! R and ~R is impossible!', color: viz.colors.red },
                            { label: 'Conclude', text: '~P is false, therefore P is true. QED', color: viz.colors.green }
                        ];

                        VizEngine.createButton(controls, 'Previous', function() {
                            if (step > 0) { step--; draw(); }
                        });
                        VizEngine.createButton(controls, 'Next', function() {
                            if (step < maxStep) { step++; draw(); }
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            step = 0; draw();
                        });

                        function drawRoundedRect(ctx, x, y, w, h, r) {
                            ctx.beginPath();
                            ctx.moveTo(x + r, y);
                            ctx.lineTo(x + w - r, y);
                            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
                            ctx.lineTo(x + w, y + h - r);
                            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
                            ctx.lineTo(x + r, y + h);
                            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
                            ctx.lineTo(x, y + r);
                            ctx.quadraticCurveTo(x, y, x + r, y);
                            ctx.closePath();
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            viz.screenText('Proof by Contradiction', viz.width / 2, 22, viz.colors.white, 16);

                            var boxW = 420;
                            var boxH = 44;
                            var gap = 14;
                            var startY = 50;
                            var cx = viz.width / 2;

                            for (var i = 0; i <= maxStep; i++) {
                                var y = startY + i * (boxH + gap);
                                var s = steps[i];
                                var active = (i <= step);
                                var current = (i === step);

                                if (i > 0 && active) {
                                    ctx.strokeStyle = s.color + '66';
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(cx, y - gap + 2);
                                    ctx.lineTo(cx, y - 2);
                                    ctx.stroke();
                                    ctx.fillStyle = s.color + '66';
                                    ctx.beginPath();
                                    ctx.moveTo(cx, y);
                                    ctx.lineTo(cx - 5, y - 8);
                                    ctx.lineTo(cx + 5, y - 8);
                                    ctx.closePath();
                                    ctx.fill();
                                }

                                var rx = cx - boxW / 2;
                                ctx.fillStyle = active ? (current ? s.color + '33' : '#1a1a3088') : '#0c0c20';
                                ctx.strokeStyle = active ? s.color : '#1a1a40';
                                ctx.lineWidth = current ? 2.5 : 1;
                                drawRoundedRect(ctx, rx, y, boxW, boxH, 6);
                                ctx.fill();
                                ctx.stroke();

                                ctx.fillStyle = active ? (current ? viz.colors.white : s.color + 'aa') : '#333';
                                ctx.font = (current ? 'bold ' : '') + '13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(s.label + ': ' + s.text, cx, y + boxH / 2);
                            }

                            // Explosion effect on contradiction step
                            if (step >= 4) {
                                var cy = startY + 4 * (boxH + gap) + boxH / 2;
                                ctx.strokeStyle = viz.colors.red + '44';
                                ctx.lineWidth = 3;
                                for (var a = 0; a < 8; a++) {
                                    var angle = a * Math.PI / 4;
                                    var r1 = boxW / 2 + 10;
                                    var r2 = boxW / 2 + 30;
                                    ctx.beginPath();
                                    ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * (boxH / 2 + 5));
                                    ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * (boxH / 2 + 18));
                                    ctx.stroke();
                                }
                            }

                            var msgY = startY + 6 * (boxH + gap) + 5;
                            if (step === 0) {
                                viz.screenText('We want to prove P. Click Next to begin.', cx, msgY, viz.colors.text, 11);
                            } else if (step === 1) {
                                viz.screenText('The key move: assume the negation ~P.', cx, msgY, viz.colors.text, 11);
                            } else if (step === 2) {
                                viz.screenText('Use ~P together with known facts to reason forward.', cx, msgY, viz.colors.text, 11);
                            } else if (step === 3) {
                                viz.screenText('We derive some statement R from our reasoning.', cx, msgY, viz.colors.text, 11);
                            } else if (step === 4) {
                                viz.screenText('But we can also show ~R! This is a contradiction: R and ~R cannot both hold.', cx, msgY, viz.colors.text, 11);
                            } else {
                                viz.screenText('Since ~P leads to contradiction, ~P is false, so P is true.', cx, msgY, viz.colors.text, 11);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain in your own words the difference between proof by contradiction and proof by contrapositive. When would you choose one over the other?',
                    hint: 'Think about the structure of the statement you want to prove. Is it an implication \\(P \\Rightarrow Q\\), or a standalone statement \\(P\\)?',
                    solution: 'Contrapositive proves \\(P \\Rightarrow Q\\) by showing \\(\\neg Q \\Rightarrow \\neg P\\). The goal is specific: derive \\(\\neg P\\). Contradiction proves any statement \\(P\\) by assuming \\(\\neg P\\) and deriving any impossibility. Use contrapositive when the statement is an implication and working backward from \\(\\neg Q\\) is natural. Use contradiction when the statement is not an implication (e.g., "\\(\\sqrt{2}\\) is irrational"), or when the negation gives you strong structural information to exploit.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: The Method
        // ================================================================
        {
            id: 'sec-method',
            title: 'The Method',
            content: `
<h2>The Method</h2>

<div class="env-block definition">
    <div class="env-title">Definition (Proof by Contradiction)</div>
    <div class="env-body">
        <p>To prove that a statement \\(P\\) is true:</p>
        <ol>
            <li>Assume \\(\\neg P\\) (the negation of \\(P\\)).</li>
            <li>Using \\(\\neg P\\) together with known truths (axioms, definitions, previously proven results), reason logically.</li>
            <li>Arrive at a contradiction: a statement of the form \\(R \\wedge \\neg R\\).</li>
            <li>Conclude that \\(\\neg P\\) must be false, hence \\(P\\) is true.</li>
        </ol>
    </div>
</div>

<p>The Latin name for this technique is <em>reductio ad absurdum</em>, "reduction to absurdity." You reduce the negation to an absurd conclusion, thereby establishing the original statement.</p>

<h3>Contradiction for Implications</h3>

<p>When the statement to prove is an implication \\(P \\Rightarrow Q\\), the negation is \\(P \\wedge \\neg Q\\) (since \\(\\neg(P \\Rightarrow Q) \\equiv P \\wedge \\neg Q\\)). So to prove \\(P \\Rightarrow Q\\) by contradiction, you assume both \\(P\\) and \\(\\neg Q\\), and derive a contradiction.</p>

<div class="env-block example">
    <div class="env-title">Example 5.1</div>
    <div class="env-body">
        <p><strong>Claim:</strong> If \\(n^2\\) is even, then \\(n\\) is even.</p>
        <p><strong>Proof.</strong> Suppose for contradiction that \\(n^2\\) is even but \\(n\\) is odd. Then \\(n = 2k + 1\\) for some integer \\(k\\), so:</p>
        \\[n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1,\\]
        <p>which is odd. But we assumed \\(n^2\\) is even. An integer cannot be both even and odd. Contradiction. Therefore if \\(n^2\\) is even, then \\(n\\) is even. \\(\\square\\)</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Recognizing the Right Contradiction</div>
    <div class="env-body">
        <p>You don't get to choose which contradiction appears; the algebra or logic leads you there. Common contradictions include:</p>
        <ul>
            <li>A number is both even and odd</li>
            <li>A number equals zero and is nonzero</li>
            <li>Two integers share a common factor when we assumed they didn't</li>
            <li>A set is both finite and infinite</li>
            <li>A quantity is both positive and non-positive</li>
        </ul>
        <p>The art is in following the consequences of your assumption far enough that the contradiction reveals itself.</p>
    </div>
</div>

<h3>A Simple Number-Theoretic Example</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.1</div>
    <div class="env-body">
        <p>There is no largest even integer.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Suppose for contradiction that there exists a largest even integer \\(N\\). Consider \\(N + 2\\). Since \\(N\\) is even, \\(N = 2k\\) for some integer \\(k\\), so \\(N + 2 = 2(k+1)\\), which is even. But \\(N + 2 > N\\), contradicting the assumption that \\(N\\) is the largest even integer. Therefore no largest even integer exists.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Template for Writing a Contradiction Proof</h3>

<div class="env-block remark">
    <div class="env-title">Writing Template</div>
    <div class="env-body">
        <p>A well-written contradiction proof follows this pattern:</p>
        <ol>
            <li>"Suppose for contradiction that [negation of what you want to prove]."</li>
            <li>State what this assumption gives you concretely (unpack definitions).</li>
            <li>Reason from the assumption, showing each logical step.</li>
            <li>"This contradicts [specific known fact]. Therefore [original statement]."</li>
        </ol>
        <p>Always name the specific contradiction. Do not write "this is a contradiction" without saying what contradicts what.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Prove by contradiction: If \\(n\\) is an integer and \\(n^2\\) is odd, then \\(n\\) is odd.',
                    hint: 'Assume \\(n^2\\) is odd but \\(n\\) is even. What does \\(n = 2k\\) give you for \\(n^2\\)?',
                    solution: 'Suppose for contradiction that \\(n^2\\) is odd and \\(n\\) is even. Then \\(n = 2k\\) for some integer \\(k\\), so \\(n^2 = 4k^2 = 2(2k^2)\\), which is even. But we assumed \\(n^2\\) is odd, and an integer cannot be both even and odd. Contradiction. Therefore \\(n\\) is odd.'
                },
                {
                    question: 'Prove by contradiction: There is no smallest positive rational number.',
                    hint: 'If \\(r\\) is the smallest positive rational, consider \\(r/2\\).',
                    solution: 'Suppose for contradiction that \\(r\\) is the smallest positive rational number. Consider \\(r/2\\). Since \\(r\\) is rational, \\(r = a/b\\) for integers \\(a, b\\) with \\(b \\neq 0\\) and \\(r > 0\\). Then \\(r/2 = a/(2b)\\) is rational, and \\(0 < r/2 < r\\). This contradicts the assumption that \\(r\\) is the smallest positive rational. Therefore no smallest positive rational exists.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: sqrt(2) Is Irrational
        // ================================================================
        {
            id: 'sec-sqrt2',
            title: '\u221A2 Is Irrational',
            content: `
<h2>\\(\\sqrt{2}\\) Is Irrational</h2>

<div class="env-block intuition">
    <div class="env-title">The Most Famous Contradiction Proof</div>
    <div class="env-body">
        <p>This proof, attributed to the Pythagorean school (circa 500 BCE), shocked the ancient Greeks. They believed all quantities could be expressed as ratios of whole numbers. The irrationality of \\(\\sqrt{2}\\) shattered that worldview and, legend has it, the discoverer was thrown overboard at sea for the blasphemy.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Rational and Irrational)</div>
    <div class="env-body">
        <p>A real number \\(x\\) is <strong>rational</strong> if \\(x = a/b\\) for integers \\(a\\) and \\(b\\) with \\(b \\neq 0\\). A real number that is not rational is <strong>irrational</strong>.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.2</div>
    <div class="env-body">
        <p>\\(\\sqrt{2}\\) is irrational.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Suppose for contradiction that \\(\\sqrt{2}\\) is rational. Then \\(\\sqrt{2} = a/b\\) where \\(a\\) and \\(b\\) are integers with \\(b \\neq 0\\). We may assume \\(\\gcd(a, b) = 1\\) (i.e., the fraction is in lowest terms).</p>

        <p>Squaring both sides: \\(2 = a^2/b^2\\), so \\(a^2 = 2b^2\\).</p>

        <p>Since \\(a^2 = 2b^2\\), \\(a^2\\) is even. By the result of Example 5.1, \\(a\\) is even, so \\(a = 2c\\) for some integer \\(c\\).</p>

        <p>Substituting: \\((2c)^2 = 2b^2\\), giving \\(4c^2 = 2b^2\\), hence \\(b^2 = 2c^2\\).</p>

        <p>So \\(b^2\\) is even, which means \\(b\\) is even.</p>

        <p>But if both \\(a\\) and \\(b\\) are even, then \\(\\gcd(a, b) \\geq 2\\), contradicting our assumption that \\(\\gcd(a, b) = 1\\).</p>

        <p>Therefore \\(\\sqrt{2}\\) is irrational. \\(\\square\\)</p>
    </div>
</div>

<h3>Dissecting the Proof</h3>

<p>Let's highlight the key ingredients:</p>
<ol>
    <li><strong>The setup:</strong> We assumed the negation ("\\(\\sqrt{2}\\) is rational") and extracted concrete information: \\(\\sqrt{2} = a/b\\) with \\(\\gcd(a, b) = 1\\).</li>
    <li><strong>The engine:</strong> Squaring transferred the irrationality question into a parity (even/odd) question.</li>
    <li><strong>The parity cascade:</strong> We showed \\(a\\) is even, then \\(b\\) is even. Each step is forced by the algebra.</li>
    <li><strong>The contradiction:</strong> Both \\(a\\) and \\(b\\) even contradicts \\(\\gcd(a,b) = 1\\).</li>
</ol>

<p>This proof is a masterpiece of economy. It uses only the definition of rational numbers, basic algebra, and the fact that a squared even number must have an even root.</p>

<div class="env-block remark">
    <div class="env-title">Generalizing</div>
    <div class="env-body">
        <p>The same technique proves \\(\\sqrt{p}\\) is irrational for any prime \\(p\\). The key property used is that if \\(p \\mid a^2\\) then \\(p \\mid a\\), which holds precisely when \\(p\\) is prime (this is Euclid's lemma).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-sqrt2-proof"></div>
`,
            visualizations: [
                {
                    id: 'viz-sqrt2-proof',
                    title: 'Step-by-Step: \\(\\sqrt{2}\\) Is Irrational',
                    description: 'Walk through the classic proof that \\(\\sqrt{2}\\) is irrational, step by step. Watch the even/odd argument unfold.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 470,
                            originX: 0, originY: 0, scale: 1
                        });

                        var step = 0;
                        var maxStep = 7;
                        var proofSteps = [
                            { text: 'Goal: Prove sqrt(2) is irrational', color: viz.colors.white, symbol: '?' },
                            { text: 'Assume: sqrt(2) = a/b, gcd(a,b) = 1', color: viz.colors.orange, symbol: '~P' },
                            { text: 'Square: 2 = a\u00B2/b\u00B2, so a\u00B2 = 2b\u00B2', color: viz.colors.blue, symbol: '\u00B2' },
                            { text: 'a\u00B2 is even => a is even => a = 2c', color: viz.colors.teal, symbol: 'a' },
                            { text: 'Substitute: (2c)\u00B2 = 2b\u00B2 => 4c\u00B2 = 2b\u00B2', color: viz.colors.purple, symbol: '=' },
                            { text: 'Simplify: b\u00B2 = 2c\u00B2 => b is even', color: viz.colors.teal, symbol: 'b' },
                            { text: 'Both a,b even => gcd(a,b) >= 2', color: viz.colors.red, symbol: '!' },
                            { text: 'Contradicts gcd(a,b)=1. So sqrt(2) is irrational. QED', color: viz.colors.green, symbol: '\u2713' }
                        ];

                        VizEngine.createButton(controls, 'Prev', function() {
                            if (step > 0) { step--; draw(); }
                        });
                        VizEngine.createButton(controls, 'Next', function() {
                            if (step < maxStep) { step++; draw(); }
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            step = 0; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            viz.screenText('Proof: sqrt(2) is Irrational', viz.width / 2, 22, viz.colors.white, 16);

                            var cx = viz.width / 2;
                            var startY = 48;
                            var boxH = 38;
                            var gap = 10;
                            var boxW = 460;

                            for (var i = 0; i <= maxStep; i++) {
                                var y = startY + i * (boxH + gap);
                                var s = proofSteps[i];
                                var active = (i <= step);
                                var current = (i === step);

                                // Arrow
                                if (i > 0 && active) {
                                    ctx.strokeStyle = s.color + '55';
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(cx, y - gap + 1);
                                    ctx.lineTo(cx, y - 1);
                                    ctx.stroke();
                                }

                                // Box
                                var rx = cx - boxW / 2;
                                ctx.fillStyle = active ? (current ? s.color + '33' : '#1a1a3066') : '#0c0c20';
                                ctx.strokeStyle = active ? s.color : '#1a1a40';
                                ctx.lineWidth = current ? 2.5 : 1;
                                ctx.beginPath();
                                ctx.moveTo(rx + 6, y);
                                ctx.lineTo(rx + boxW - 6, y);
                                ctx.quadraticCurveTo(rx + boxW, y, rx + boxW, y + 6);
                                ctx.lineTo(rx + boxW, y + boxH - 6);
                                ctx.quadraticCurveTo(rx + boxW, y + boxH, rx + boxW - 6, y + boxH);
                                ctx.lineTo(rx + 6, y + boxH);
                                ctx.quadraticCurveTo(rx, y + boxH, rx, y + boxH - 6);
                                ctx.lineTo(rx, y + 6);
                                ctx.quadraticCurveTo(rx, y, rx + 6, y);
                                ctx.closePath();
                                ctx.fill();
                                ctx.stroke();

                                // Symbol on left
                                if (active) {
                                    ctx.fillStyle = s.color;
                                    ctx.font = 'bold 14px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(s.symbol, rx + 20, y + boxH / 2);
                                }

                                // Text
                                ctx.fillStyle = active ? (current ? viz.colors.white : s.color + 'bb') : '#333';
                                ctx.font = (current ? 'bold ' : '') + '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(s.text, cx + 10, y + boxH / 2);
                            }

                            // Even/odd visualization on the right
                            if (step >= 3) {
                                var infoX = viz.width - 70;
                                var infoY = startY + 3 * (boxH + gap) + boxH / 2;
                                ctx.fillStyle = viz.colors.teal + '44';
                                ctx.beginPath();
                                ctx.arc(infoX, infoY, 22, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('a=2c', infoX, infoY);
                            }
                            if (step >= 5) {
                                var infoX2 = viz.width - 70;
                                var infoY2 = startY + 5 * (boxH + gap) + boxH / 2;
                                ctx.fillStyle = viz.colors.teal + '44';
                                ctx.beginPath();
                                ctx.arc(infoX2, infoY2, 22, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('b=2d', infoX2, infoY2);
                            }
                            if (step >= 6) {
                                // Big red X
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 3;
                                var xc = viz.width - 70;
                                var yc = startY + 6 * (boxH + gap) + boxH / 2;
                                ctx.beginPath(); ctx.moveTo(xc - 14, yc - 14); ctx.lineTo(xc + 14, yc + 14); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(xc + 14, yc - 14); ctx.lineTo(xc - 14, yc + 14); ctx.stroke();
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText('gcd\u22652', xc, yc + 26);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that \\(\\sqrt{3}\\) is irrational.',
                    hint: 'Follow the same structure as the \\(\\sqrt{2}\\) proof. You will need the fact that if \\(3 \\mid a^2\\) then \\(3 \\mid a\\).',
                    solution: 'Suppose for contradiction that \\(\\sqrt{3} = a/b\\) with \\(\\gcd(a,b) = 1\\). Then \\(3 = a^2/b^2\\), so \\(a^2 = 3b^2\\). Since \\(3 \\mid a^2\\) and 3 is prime, \\(3 \\mid a\\), so \\(a = 3c\\). Substituting: \\(9c^2 = 3b^2\\), giving \\(b^2 = 3c^2\\), so \\(3 \\mid b\\). Both \\(a\\) and \\(b\\) are divisible by 3, contradicting \\(\\gcd(a,b) = 1\\). Therefore \\(\\sqrt{3}\\) is irrational.'
                },
                {
                    question: 'Where does the proof that \\(\\sqrt{4}\\) is irrational break down? (Hint: \\(\\sqrt{4} = 2\\) is rational!)',
                    hint: 'Try to replicate the proof with 4 instead of 2. At which step does the argument fail to produce a contradiction?',
                    solution: 'If \\(a^2 = 4b^2\\), then \\(a^2\\) is divisible by 4. This means \\(a\\) is even, say \\(a = 2c\\). Then \\(4c^2 = 4b^2\\), giving \\(c^2 = b^2\\), so \\(c = \\pm b\\). This does <em>not</em> force \\(b\\) to be even. The "parity cascade" stops: we get \\(a = 2b\\), which is perfectly consistent with \\(\\gcd(a,b) = 1\\) when \\(b\\) is odd. For instance \\(\\sqrt{4} = 2/1\\) with \\(\\gcd(2,1)=1\\). The proof breaks because 4 is a perfect square.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Infinitely Many Primes
        // ================================================================
        {
            id: 'sec-infinite-primes',
            title: 'Infinitely Many Primes',
            content: `
<h2>Infinitely Many Primes</h2>

<div class="env-block intuition">
    <div class="env-title">Euclid's Masterpiece</div>
    <div class="env-body">
        <p>Around 300 BCE, Euclid proved that there are infinitely many prime numbers. His proof, recorded in Book IX of the <em>Elements</em>, is one of the most elegant arguments in all of mathematics. It is a proof by contradiction, and it hinges on a single brilliant construction.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.3 (Euclid)</div>
    <div class="env-body">
        <p>There are infinitely many prime numbers.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Suppose for contradiction that there are only finitely many primes: \\(p_1, p_2, \\ldots, p_n\\). Consider the number:</p>
        \\[N = p_1 \\cdot p_2 \\cdots p_n + 1.\\]
        <p>Since \\(N > 1\\), \\(N\\) has a prime factor \\(p\\) (by the fundamental theorem of arithmetic).</p>
        <p>Now \\(p\\) must be one of \\(p_1, \\ldots, p_n\\) (since those are all the primes). Say \\(p = p_i\\). Then \\(p_i \\mid N\\) and \\(p_i \\mid (p_1 p_2 \\cdots p_n)\\), so \\(p_i \\mid (N - p_1 p_2 \\cdots p_n) = 1\\).</p>
        <p>But no prime divides 1. Contradiction.</p>
        <p>Therefore the assumption that there are finitely many primes is false. There are infinitely many primes. \\(\\square\\)</p>
    </div>
</div>

<h3>Understanding the Construction</h3>

<p>The key insight is the construction of \\(N = p_1 p_2 \\cdots p_n + 1\\). This number is designed so that when you divide it by any of the listed primes, you get remainder 1. So none of the listed primes can divide \\(N\\). But \\(N\\) must have a prime factor. That prime factor is a prime not on the list, contradicting the assumption that the list was complete.</p>

<div class="env-block remark">
    <div class="env-title">Common Misconception</div>
    <div class="env-body">
        <p>The proof does <strong>not</strong> claim that \\(N = p_1 p_2 \\cdots p_n + 1\\) is itself prime. It claims that \\(N\\) has a prime factor not on the list. Sometimes \\(N\\) is prime (e.g., \\(2 \\cdot 3 + 1 = 7\\)), and sometimes it is not (e.g., \\(2 \\cdot 3 \\cdot 5 \\cdot 7 \\cdot 11 \\cdot 13 + 1 = 30031 = 59 \\times 509\\)). The point is that either way, a new prime appears.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-infinite-primes"></div>
`,
            visualizations: [
                {
                    id: 'viz-infinite-primes',
                    title: "Euclid's Proof: Infinitely Many Primes",
                    description: "Watch Euclid's construction unfold. We start with a finite list of primes, form N = product + 1, and discover a prime not on the list.",
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var numPrimes = 3;
                        var allPrimes = VizEngine.sievePrimes(200);
                        var animStep = 0; // 0=list, 1=product, 2=N, 3=factor, 4=contradiction

                        function factorize(n) {
                            var factors = [];
                            for (var d = 2; d * d <= n; d++) {
                                while (n % d === 0) { factors.push(d); n /= d; }
                            }
                            if (n > 1) factors.push(n);
                            return factors;
                        }

                        VizEngine.createButton(controls, 'Fewer primes', function() {
                            if (numPrimes > 2) { numPrimes--; animStep = 0; draw(); }
                        });
                        VizEngine.createButton(controls, 'More primes', function() {
                            if (numPrimes < 8) { numPrimes++; animStep = 0; draw(); }
                        });
                        VizEngine.createButton(controls, 'Next Step', function() {
                            if (animStep < 4) { animStep++; draw(); }
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            animStep = 0; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2;

                            viz.screenText("Euclid's Proof: Infinitely Many Primes", cx, 20, viz.colors.white, 15);

                            var primes = allPrimes.slice(0, numPrimes);
                            var product = 1;
                            for (var i = 0; i < primes.length; i++) product *= primes[i];
                            var N = product + 1;
                            var factors = factorize(N);

                            // Step 0: show the list
                            viz.screenText('Step 1: "Suppose these are ALL the primes:"', cx, 50, viz.colors.text, 12);
                            var listStr = primes.join(', ');
                            viz.screenText('{ ' + listStr + ' }', cx, 75, viz.colors.blue, 18);

                            if (animStep >= 1) {
                                // Step 1: product
                                var prodStr = primes.join(' \u00D7 ') + ' = ' + product;
                                viz.screenText('Step 2: Compute the product:', cx, 110, viz.colors.text, 12);
                                viz.screenText(prodStr, cx, 135, viz.colors.teal, 16);
                            }

                            if (animStep >= 2) {
                                // Step 2: N
                                viz.screenText('Step 3: Form N = product + 1:', cx, 170, viz.colors.text, 12);
                                viz.screenText('N = ' + product + ' + 1 = ' + N, cx, 195, viz.colors.orange, 18);
                            }

                            if (animStep >= 3) {
                                // Step 3: factor N
                                viz.screenText('Step 4: Factor N:', cx, 230, viz.colors.text, 12);
                                var isPrime = factors.length === 1;
                                if (isPrime) {
                                    viz.screenText(N + ' is PRIME! Not in our list!', cx, 258, viz.colors.green, 16);
                                } else {
                                    var factStr = factors.join(' \u00D7 ');
                                    viz.screenText(N + ' = ' + factStr, cx, 255, viz.colors.purple, 16);
                                    // Find a factor not in the list
                                    var newPrimes = [];
                                    for (var j = 0; j < factors.length; j++) {
                                        if (primes.indexOf(factors[j]) === -1 && newPrimes.indexOf(factors[j]) === -1) {
                                            newPrimes.push(factors[j]);
                                        }
                                    }
                                    if (newPrimes.length > 0) {
                                        viz.screenText('New prime(s) found: ' + newPrimes.join(', ') + '  (not in our list!)', cx, 280, viz.colors.green, 14);
                                    }
                                }
                            }

                            if (animStep >= 4) {
                                // Contradiction
                                viz.screenText('CONTRADICTION', cx, 320, viz.colors.red, 20);
                                viz.screenText('We assumed our list contained ALL primes,', cx, 348, viz.colors.text, 12);
                                viz.screenText('but N has a prime factor NOT on the list.', cx, 366, viz.colors.text, 12);
                                viz.screenText('Therefore there are infinitely many primes!', cx, 395, viz.colors.green, 14);

                                // Red X
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 4;
                                ctx.beginPath();
                                ctx.moveTo(cx - 120, 56); ctx.lineTo(cx + 120, 92);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(cx + 120, 56); ctx.lineTo(cx - 120, 92);
                                ctx.stroke();
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(N = 2 \\cdot 3 \\cdot 5 \\cdot 7 + 1\\). Is \\(N\\) prime? Factor it and identify any new primes.',
                    hint: '\\(N = 211\\). Check if 211 is divisible by any primes up to \\(\\sqrt{211} \\approx 14.5\\).',
                    solution: '\\(N = 210 + 1 = 211\\). We check: \\(211/2\\), \\(211/3\\), \\(211/5\\), \\(211/7\\), \\(211/11\\), \\(211/13\\) give no integer quotients. So 211 is prime. This is a new prime not in the list \\(\\{2, 3, 5, 7\\}\\), illustrating Euclid\'s argument.'
                },
                {
                    question: 'Compute \\(N = 2 \\cdot 3 \\cdot 5 \\cdot 7 \\cdot 11 \\cdot 13 + 1\\). Is \\(N\\) prime?',
                    hint: 'Compute \\(N = 30031\\). Try dividing by small primes not in the list.',
                    solution: '\\(N = 30030 + 1 = 30031 = 59 \\times 509\\). Both 59 and 509 are prime, and neither is in the original list \\(\\{2, 3, 5, 7, 11, 13\\}\\). This shows \\(N\\) need not be prime; it just must have a prime factor not on the list.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Proving Existence by Contradiction
        // ================================================================
        {
            id: 'sec-existence',
            title: 'Proving Existence by Contradiction',
            content: `
<h2>Proving Existence by Contradiction</h2>

<p>Contradiction proofs are not limited to irrationality and infinitude. They are also powerful for proving <strong>existence</strong> statements. To prove "there exists an \\(x\\) with property \\(P(x)\\)," assume no such \\(x\\) exists, and derive a contradiction.</p>

<div class="env-block example">
    <div class="env-title">Example 5.2</div>
    <div class="env-body">
        <p><strong>Claim:</strong> For any integer \\(n \\geq 2\\), there exists a prime \\(p\\) with \\(p \\leq n\\) that divides \\(n\\) or divides \\(n!\\).</p>
        <p><strong>Proof.</strong> This follows directly from the fundamental theorem of arithmetic: \\(n \\geq 2\\) has a prime factor \\(p \\leq n\\). More interesting existence proofs require contradiction.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.4</div>
    <div class="env-body">
        <p>If \\(n\\) is a positive integer that is not a perfect square, then \\(\\sqrt{n}\\) is irrational.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof (Sketch)</div>
    <div class="env-body">
        <p>Suppose for contradiction that \\(\\sqrt{n} = a/b\\) in lowest terms. Then \\(n = a^2/b^2\\), so \\(nb^2 = a^2\\). Since \\(\\gcd(a,b) = 1\\), every prime factor of \\(b^2\\) must divide \\(n\\). Careful analysis of prime factorizations (using the fact that \\(n\\) is not a perfect square, so some prime appears to an odd power in \\(n\\)'s factorization) leads to a contradiction with \\(\\gcd(a,b)=1\\). \\(\\square\\)</p>
    </div>
</div>

<h3>Non-Constructive Existence</h3>

<p>A key feature of contradiction proofs for existence is that they are often <strong>non-constructive</strong>. Euclid's proof tells us that infinitely many primes exist, but it does not give us a formula that generates all of them. It proves existence by showing that non-existence leads to absurdity, without ever pointing at a specific new object.</p>

<p>This is both the power and the philosophical controversy of proof by contradiction. The <strong>constructivists</strong> in mathematics (following Brouwer and Bishop) reject proof by contradiction for existence claims, insisting that a valid proof of existence must exhibit a witness. Most mathematicians, however, accept proof by contradiction as fully valid.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 5.5</div>
    <div class="env-body">
        <p>There exist irrational numbers \\(a\\) and \\(b\\) such that \\(a^b\\) is rational.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Consider \\(\\sqrt{2}^{\\sqrt{2}}\\). Either it is rational or irrational.</p>
        <p><strong>Case 1:</strong> If \\(\\sqrt{2}^{\\sqrt{2}}\\) is rational, then take \\(a = b = \\sqrt{2}\\). Both are irrational, and \\(a^b\\) is rational. Done.</p>
        <p><strong>Case 2:</strong> If \\(\\sqrt{2}^{\\sqrt{2}}\\) is irrational, let \\(a = \\sqrt{2}^{\\sqrt{2}}\\) and \\(b = \\sqrt{2}\\). Then:</p>
        \\[a^b = \\left(\\sqrt{2}^{\\sqrt{2}}\\right)^{\\sqrt{2}} = \\sqrt{2}^{\\sqrt{2} \\cdot \\sqrt{2}} = \\sqrt{2}^2 = 2,\\]
        <p>which is rational. Done.</p>
        <p>In either case, such \\(a\\) and \\(b\\) exist. \\(\\square\\)</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Remark</div>
    <div class="env-body">
        <p>This proof is a classic example of a non-constructive existence proof. It tells us that the desired \\(a\\) and \\(b\\) exist, but it does not tell us which case actually holds. (In fact, by the Gelfond-Schneider theorem, \\(\\sqrt{2}^{\\sqrt{2}}\\) is irrational, so Case 2 applies; but the proof works without knowing this.)</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-contradiction-vs-contrapositive"></div>
`,
            visualizations: [
                {
                    id: 'viz-contradiction-vs-contrapositive',
                    title: 'Contradiction vs. Contrapositive: When to Use Which',
                    description: 'A comparison of the two "assume the negation" proof techniques. Click each scenario to see which method fits better and why.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var scenarios = [
                            {
                                statement: 'If n\u00B2 is even, then n is even',
                                type: 'implication',
                                best: 'Contrapositive',
                                bestColor: 'teal',
                                contrapositive: 'Assume n is odd. Then n\u00B2 = (2k+1)\u00B2 is odd. Done.',
                                contradiction: 'Assume n\u00B2 is even AND n is odd. Then n\u00B2 is odd. Contradiction with n\u00B2 even.',
                                why: 'Both work, but contrapositive is cleaner: it targets a specific conclusion (~P).'
                            },
                            {
                                statement: 'sqrt(2) is irrational',
                                type: 'standalone',
                                best: 'Contradiction',
                                bestColor: 'orange',
                                contrapositive: 'N/A: this is not an implication, so contrapositive does not apply directly.',
                                contradiction: 'Assume sqrt(2) is rational. Then sqrt(2) = a/b in lowest terms. Derive both a,b even. Contradiction.',
                                why: 'Not an implication, so only contradiction (or direct proof by exhaustion) works.'
                            },
                            {
                                statement: 'There are infinitely many primes',
                                type: 'standalone',
                                best: 'Contradiction',
                                bestColor: 'orange',
                                contrapositive: 'N/A: this is not an implication.',
                                contradiction: 'Assume finitely many primes. Form N = product + 1. N has a new prime factor. Contradiction.',
                                why: 'An existence/infinitude claim. Contradiction lets you exploit the "finite list" assumption.'
                            },
                            {
                                statement: 'If 3 does not divide n, then 3 does not divide n\u00B2',
                                type: 'implication',
                                best: 'Contrapositive',
                                bestColor: 'teal',
                                contrapositive: 'Assume 3 | n\u00B2. Then 3 | n (Euclid lemma). Done.',
                                contradiction: 'Assume 3 does not divide n AND 3 divides n\u00B2. Contradicts Euclid lemma.',
                                why: 'Contrapositive gives a shorter, more natural argument using Euclid lemma.'
                            }
                        ];

                        var selected = 0;

                        scenarios.forEach(function(s, i) {
                            var btn = VizEngine.createButton(controls, 'Ex ' + (i + 1), function() {
                                selected = i;
                                draw();
                            });
                            btn.style.marginRight = '4px';
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var s = scenarios[selected];
                            var cx = viz.width / 2;

                            // Title
                            viz.screenText('Statement: "' + s.statement + '"', cx, 25, viz.colors.white, 13);
                            viz.screenText('Type: ' + s.type + '  |  Best method: ' + s.best, cx, 48, viz.colors[s.bestColor], 12);

                            // Two columns
                            var colW = 250;
                            var leftX = cx - colW - 15;
                            var rightX = cx + 15;
                            var topY = 72;

                            // Contrapositive column
                            ctx.fillStyle = viz.colors.teal + '22';
                            ctx.fillRect(leftX, topY, colW, 140);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = s.best === 'Contrapositive' ? 2.5 : 1;
                            ctx.strokeRect(leftX, topY, colW, 140);
                            viz.screenText('CONTRAPOSITIVE', leftX + colW / 2, topY + 18, viz.colors.teal, 13);

                            // Word-wrap the contrapositive text
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            wrapText(ctx, s.contrapositive, leftX + colW / 2, topY + 38, colW - 20, 15);

                            // Contradiction column
                            ctx.fillStyle = viz.colors.orange + '22';
                            ctx.fillRect(rightX, topY, colW, 140);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = s.best === 'Contradiction' ? 2.5 : 1;
                            ctx.strokeRect(rightX, topY, colW, 140);
                            viz.screenText('CONTRADICTION', rightX + colW / 2, topY + 18, viz.colors.orange, 13);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            wrapText(ctx, s.contradiction, rightX + colW / 2, topY + 38, colW - 20, 15);

                            // Why box
                            var whyY = topY + 160;
                            ctx.fillStyle = viz.colors.purple + '22';
                            ctx.fillRect(leftX, whyY, colW * 2 + 30, 60);
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(leftX, whyY, colW * 2 + 30, 60);
                            viz.screenText('Why ' + s.best + '?', cx, whyY + 15, viz.colors.purple, 13);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            wrapText(ctx, s.why, cx, whyY + 30, colW * 2, 14);

                            // Decision flowchart at bottom
                            var flowY = whyY + 80;
                            viz.screenText('Quick Decision Guide:', cx, flowY, viz.colors.white, 13);
                            viz.screenText('Is it an implication P => Q?', cx, flowY + 22, viz.colors.text, 11);
                            viz.screenText('YES => Try contrapositive first', cx - 110, flowY + 40, viz.colors.teal, 11);
                            viz.screenText('NO => Use contradiction', cx + 110, flowY + 40, viz.colors.orange, 11);
                        }

                        function wrapText(ctx, text, x, y, maxW, lineH) {
                            var words = text.split(' ');
                            var line = '';
                            var cy = y;
                            for (var i = 0; i < words.length; i++) {
                                var test = line + words[i] + ' ';
                                if (ctx.measureText(test).width > maxW && i > 0) {
                                    ctx.fillText(line.trim(), x, cy);
                                    line = words[i] + ' ';
                                    cy += lineH;
                                } else {
                                    line = test;
                                }
                            }
                            ctx.fillText(line.trim(), x, cy);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove by contradiction that there exist no integers \\(a\\) and \\(b\\) with \\(a^2 - 4b = 2\\).',
                    hint: 'Rearrange to \\(a^2 = 4b + 2 = 2(2b+1)\\). What is the parity of \\(a\\)?',
                    solution: 'Suppose for contradiction that \\(a^2 - 4b = 2\\) for integers \\(a, b\\). Then \\(a^2 = 4b + 2 = 2(2b+1)\\), so \\(a^2\\) is even, hence \\(a\\) is even: \\(a = 2c\\). Then \\(4c^2 = 4b + 2\\), giving \\(2c^2 = 2b + 1\\). The left side is even and the right side is odd. Contradiction. So no such integers exist.'
                },
                {
                    question: 'Prove the following non-constructively: there exist irrational numbers \\(a\\) and \\(b\\) such that \\(a + b\\) is rational.',
                    hint: 'Consider \\(\\sqrt{2}\\) and \\(-\\sqrt{2}\\).',
                    solution: 'Take \\(a = \\sqrt{2}\\) and \\(b = -\\sqrt{2}\\). Both are irrational (if \\(-\\sqrt{2}\\) were rational, then \\(\\sqrt{2} = -(-\\sqrt{2})\\) would be rational, contradiction). Their sum is \\(a + b = 0\\), which is rational. (This is actually constructive; the non-constructive flavor is that we do not need to "search" for such numbers.)'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead</h2>

<h3>What We Have Learned</h3>

<p>Proof by contradiction is a powerful technique that works by <em>reductio ad absurdum</em>: assume the negation of what you want to prove, and show that this assumption leads to a logical impossibility. The technique is particularly useful when:</p>

<ul>
    <li>The statement is not naturally an implication (e.g., "\\(\\sqrt{2}\\) is irrational")</li>
    <li>The negation gives you concrete structural information to exploit (e.g., "suppose there are finitely many primes" gives you a finite list)</li>
    <li>You need to prove that something does not exist or cannot happen</li>
    <li>Direct approaches seem to require checking infinitely many cases</li>
</ul>

<h3>The Proof Toolkit So Far</h3>

<p>We now have three proof techniques for implications and a powerful general-purpose method:</p>

<table style="width:100%;border-collapse:collapse;margin:1em 0;">
    <tr style="border-bottom:2px solid #30363d;">
        <th style="text-align:left;padding:8px;color:var(--accent-blue);">Method</th>
        <th style="text-align:left;padding:8px;color:var(--accent-blue);">To Prove</th>
        <th style="text-align:left;padding:8px;color:var(--accent-blue);">You Assume</th>
        <th style="text-align:left;padding:8px;color:var(--accent-blue);">You Derive</th>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
        <td style="padding:8px;">Direct</td>
        <td style="padding:8px;">\\(P \\Rightarrow Q\\)</td>
        <td style="padding:8px;">\\(P\\)</td>
        <td style="padding:8px;">\\(Q\\)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
        <td style="padding:8px;">Contrapositive</td>
        <td style="padding:8px;">\\(P \\Rightarrow Q\\)</td>
        <td style="padding:8px;">\\(\\neg Q\\)</td>
        <td style="padding:8px;">\\(\\neg P\\)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
        <td style="padding:8px;">Contradiction</td>
        <td style="padding:8px;">\\(P\\)</td>
        <td style="padding:8px;">\\(\\neg P\\)</td>
        <td style="padding:8px;">\\(R \\wedge \\neg R\\)</td>
    </tr>
</table>

<h3>What Comes Next</h3>

<p>In Chapter 6, we will study <strong>proof by cases</strong> (also called proof by exhaustion). When a statement covers multiple scenarios, we split into cases and prove each one separately. This technique combines naturally with direct proof, contrapositive, and contradiction: within each case, you can use whichever method works best.</p>

<p>After that, in Chapter 7, we will encounter <strong>mathematical induction</strong>, a completely different paradigm for proving statements about all natural numbers. Induction is like a row of dominoes: prove the first one falls, and prove that each one knocks over the next.</p>

<div class="env-block remark">
    <div class="env-title">Strategy Summary</div>
    <div class="env-body">
        <p>Before writing a proof, ask yourself:</p>
        <ol>
            <li>Is the statement an implication? If so, try direct proof first.</li>
            <li>Does the conclusion seem hard to reach directly? Try the contrapositive.</li>
            <li>Is the statement not an implication, or does the negation give useful structure? Try contradiction.</li>
            <li>Does the statement break into natural cases? Use proof by cases.</li>
            <li>Is the statement about all natural numbers? Consider induction.</li>
        </ol>
        <p>The master proof-writer keeps all tools sharp and chooses the right one for each job.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-proof-builder-contradiction"></div>
<div class="viz-placeholder" data-viz="viz-famous-contradictions"></div>
`,
            visualizations: [
                {
                    id: 'viz-proof-builder-contradiction',
                    title: 'Proof Builder: Fill in the Contradiction',
                    description: 'Test your understanding! For each proof sketch, choose the correct step to complete the contradiction argument.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var problems = [
                            {
                                title: 'Prove: sqrt(2) is irrational',
                                steps: [
                                    'Assume sqrt(2) = a/b, gcd(a,b) = 1',
                                    'Then a\u00B2 = 2b\u00B2',
                                    'So a is even: a = 2c',
                                    '??? (choose the next step)',
                                    'Contradiction with gcd(a,b)=1'
                                ],
                                blankIdx: 3,
                                options: [
                                    'Then b\u00B2 = 2c\u00B2, so b is even',
                                    'Then c = b, so a = 2b',
                                    'Then a + b is even'
                                ],
                                correct: 0
                            },
                            {
                                title: 'Prove: there is no largest integer',
                                steps: [
                                    'Assume N is the largest integer',
                                    '??? (choose the next step)',
                                    'M > N, but N was supposed to be largest',
                                    'Contradiction!'
                                ],
                                blankIdx: 1,
                                options: [
                                    'Consider N - 1',
                                    'Consider M = N + 1, which is an integer',
                                    'Consider N/2'
                                ],
                                correct: 1
                            },
                            {
                                title: 'Prove: if 3|ab and 3 does not divide a, then 3|b',
                                steps: [
                                    'Assume 3|ab, 3 does not divide a, and 3 does not divide b',
                                    'Since gcd(3,a) = 1, there exist integers x,y with 3x + ay = 1',
                                    '??? (choose the next step)',
                                    'So 3|b, contradicting our assumption'
                                ],
                                blankIdx: 2,
                                options: [
                                    'Multiply both sides by b: 3xb + aby = b. Since 3|3xb and 3|ab, we get 3|b',
                                    'Divide both sides by 3 to get x + ay/3 = 1/3',
                                    'Since a is odd, ay is odd'
                                ],
                                correct: 0
                            }
                        ];

                        var currentProblem = 0;
                        var selectedOption = -1;
                        var submitted = false;

                        VizEngine.createButton(controls, 'Prev Problem', function() {
                            if (currentProblem > 0) { currentProblem--; selectedOption = -1; submitted = false; draw(); }
                        });
                        VizEngine.createButton(controls, 'Next Problem', function() {
                            if (currentProblem < problems.length - 1) { currentProblem++; selectedOption = -1; submitted = false; draw(); }
                        });

                        // Option buttons
                        var optBtns = [];
                        for (var oi = 0; oi < 3; oi++) {
                            (function(idx) {
                                var b = VizEngine.createButton(controls, 'Option ' + (idx + 1), function() {
                                    selectedOption = idx;
                                    submitted = true;
                                    draw();
                                });
                                optBtns.push(b);
                            })(oi);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var p = problems[currentProblem];
                            var cx = viz.width / 2;

                            viz.screenText('Problem ' + (currentProblem + 1) + '/' + problems.length + ': ' + p.title, cx, 22, viz.colors.white, 14);

                            var boxW = 500;
                            var boxH = 32;
                            var gap = 8;
                            var startY = 48;

                            for (var i = 0; i < p.steps.length; i++) {
                                var y = startY + i * (boxH + gap);
                                var isBlank = (i === p.blankIdx);
                                var text = p.steps[i];

                                if (isBlank && submitted) {
                                    text = p.options[selectedOption];
                                }

                                var rx = cx - boxW / 2;
                                if (isBlank && !submitted) {
                                    ctx.fillStyle = viz.colors.yellow + '22';
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 2;
                                    ctx.setLineDash([4, 4]);
                                } else if (isBlank && submitted && selectedOption === p.correct) {
                                    ctx.fillStyle = viz.colors.green + '33';
                                    ctx.strokeStyle = viz.colors.green;
                                    ctx.lineWidth = 2;
                                    ctx.setLineDash([]);
                                } else if (isBlank && submitted) {
                                    ctx.fillStyle = viz.colors.red + '33';
                                    ctx.strokeStyle = viz.colors.red;
                                    ctx.lineWidth = 2;
                                    ctx.setLineDash([]);
                                } else {
                                    ctx.fillStyle = '#1a1a3088';
                                    ctx.strokeStyle = viz.colors.blue + '66';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([]);
                                }

                                ctx.fillRect(rx, y, boxW, boxH);
                                ctx.strokeRect(rx, y, boxW, boxH);
                                ctx.setLineDash([]);

                                ctx.fillStyle = isBlank ? viz.colors.yellow : viz.colors.text;
                                if (isBlank && submitted) ctx.fillStyle = selectedOption === p.correct ? viz.colors.green : viz.colors.red;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(text, cx, y + boxH / 2);

                                // Arrow
                                if (i > 0) {
                                    ctx.strokeStyle = viz.colors.text + '44';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(cx, y - gap + 1);
                                    ctx.lineTo(cx, y - 1);
                                    ctx.stroke();
                                }
                            }

                            // Options below
                            var optY = startY + p.steps.length * (boxH + gap) + 15;
                            viz.screenText('Choose the missing step:', cx, optY, viz.colors.white, 12);

                            for (var j = 0; j < p.options.length; j++) {
                                var oy = optY + 22 + j * 28;
                                var isSelected = (submitted && selectedOption === j);
                                var isCorrectOption = (j === p.correct);

                                if (submitted && isSelected && isCorrectOption) {
                                    ctx.fillStyle = viz.colors.green + '22';
                                } else if (submitted && isSelected && !isCorrectOption) {
                                    ctx.fillStyle = viz.colors.red + '22';
                                } else if (submitted && isCorrectOption) {
                                    ctx.fillStyle = viz.colors.green + '11';
                                } else {
                                    ctx.fillStyle = 'transparent';
                                }
                                ctx.fillRect(cx - 250, oy - 10, 500, 22);

                                var optColor = viz.colors.text;
                                if (submitted && isCorrectOption) optColor = viz.colors.green;
                                else if (submitted && isSelected) optColor = viz.colors.red;

                                ctx.fillStyle = optColor;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('(' + (j + 1) + ') ' + p.options[j], cx, oy);
                            }

                            if (submitted) {
                                var feedbackY = optY + 22 + 3 * 28 + 10;
                                if (selectedOption === p.correct) {
                                    viz.screenText('Correct! The proof is now complete.', cx, feedbackY, viz.colors.green, 13);
                                } else {
                                    viz.screenText('Not quite. The correct step is highlighted in green.', cx, feedbackY, viz.colors.red, 13);
                                }
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-famous-contradictions',
                    title: 'Gallery of Famous Contradiction Proofs',
                    description: 'Browse landmark proofs by contradiction that changed mathematics. Click each to see the key ideas.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 580, height: 420,
                            originX: 0, originY: 0, scale: 1
                        });

                        var proofs = [
                            {
                                title: 'sqrt(2) is Irrational',
                                era: '~500 BCE (Pythagoreans)',
                                color: viz.colors.blue,
                                assume: 'sqrt(2) = a/b in lowest terms',
                                key: 'Parity cascade: a even, then b even',
                                contradiction: 'gcd(a,b) >= 2, but we assumed gcd = 1',
                                impact: 'Shattered the Pythagorean worldview. Not all lengths are rational.'
                            },
                            {
                                title: 'Infinitely Many Primes',
                                era: '~300 BCE (Euclid, Elements IX.20)',
                                color: viz.colors.teal,
                                assume: 'There are finitely many primes: p1, ..., pn',
                                key: 'Form N = p1*p2*...*pn + 1',
                                contradiction: 'N has a prime factor not on the list',
                                impact: 'One of the most elegant proofs ever. Template for many infinitude proofs.'
                            },
                            {
                                title: 'Reals are Uncountable',
                                era: '1891 (Cantor, diagonal argument)',
                                color: viz.colors.orange,
                                assume: 'The reals in [0,1] can be listed: r1, r2, r3, ...',
                                key: 'Construct a new real by flipping the nth digit of rn',
                                contradiction: 'The new real differs from every rn, so it is not on the list',
                                impact: 'Proved that different infinities exist. Revolutionized set theory.'
                            },
                            {
                                title: 'Halting Problem is Undecidable',
                                era: '1936 (Turing)',
                                color: viz.colors.purple,
                                assume: 'A program H(P,I) decides if program P halts on input I',
                                key: 'Build D(P) that halts iff H(P,P) says "does not halt"',
                                contradiction: 'D(D) both halts and does not halt',
                                impact: 'Fundamental limits of computation. Some problems have no algorithmic solution.'
                            }
                        ];

                        var selected = 0;

                        proofs.forEach(function(p, i) {
                            var btn = VizEngine.createButton(controls, (i + 1) + '', function() {
                                selected = i;
                                draw();
                            });
                            btn.style.marginRight = '4px';
                            btn.title = p.title;
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var p = proofs[selected];
                            var cx = viz.width / 2;

                            // Title and era
                            viz.screenText(p.title, cx, 28, p.color, 18);
                            viz.screenText(p.era, cx, 50, viz.colors.text, 12);

                            // Cards
                            var cardW = 480;
                            var cardX = cx - cardW / 2;
                            var labels = ['ASSUME', 'KEY INSIGHT', 'CONTRADICTION', 'IMPACT'];
                            var texts = [p.assume, p.key, p.contradiction, p.impact];
                            var colors = [viz.colors.orange, viz.colors.blue, viz.colors.red, viz.colors.green];
                            var cardH = 55;
                            var cardGap = 14;
                            var startY = 75;

                            for (var i = 0; i < 4; i++) {
                                var y = startY + i * (cardH + cardGap);

                                // Card background
                                ctx.fillStyle = colors[i] + '15';
                                ctx.strokeStyle = colors[i] + '66';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(cardX + 4, y);
                                ctx.lineTo(cardX + cardW - 4, y);
                                ctx.quadraticCurveTo(cardX + cardW, y, cardX + cardW, y + 4);
                                ctx.lineTo(cardX + cardW, y + cardH - 4);
                                ctx.quadraticCurveTo(cardX + cardW, y + cardH, cardX + cardW - 4, y + cardH);
                                ctx.lineTo(cardX + 4, y + cardH);
                                ctx.quadraticCurveTo(cardX, y + cardH, cardX, y + cardH - 4);
                                ctx.lineTo(cardX, y + 4);
                                ctx.quadraticCurveTo(cardX, y, cardX + 4, y);
                                ctx.closePath();
                                ctx.fill();
                                ctx.stroke();

                                // Label
                                ctx.fillStyle = colors[i];
                                ctx.font = 'bold 10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'top';
                                ctx.fillText(labels[i], cardX + 12, y + 8);

                                // Text
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'top';
                                // Simple word wrap
                                var words = texts[i].split(' ');
                                var line = '';
                                var ty = y + 24;
                                for (var w = 0; w < words.length; w++) {
                                    var test = line + words[w] + ' ';
                                    if (ctx.measureText(test).width > cardW - 24 && w > 0) {
                                        ctx.fillText(line.trim(), cardX + 12, ty);
                                        line = words[w] + ' ';
                                        ty += 15;
                                    } else {
                                        line = test;
                                    }
                                }
                                ctx.fillText(line.trim(), cardX + 12, ty);

                                // Arrow between cards
                                if (i < 3) {
                                    ctx.strokeStyle = colors[i] + '44';
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(cx, y + cardH + 2);
                                    ctx.lineTo(cx, y + cardH + cardGap - 2);
                                    ctx.stroke();
                                }
                            }

                            // Navigation hint
                            viz.screenText('Click buttons 1-4 to browse famous proofs', cx, viz.height - 15, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove by contradiction: if \\(a\\) and \\(b\\) are rational numbers with \\(b \\neq 0\\) and \\(r\\) is irrational, then \\(a + br\\) is irrational.',
                    hint: 'Assume \\(a + br\\) is rational and solve for \\(r\\).',
                    solution: 'Suppose for contradiction that \\(a + br\\) is rational. Then \\(a + br = q\\) for some rational \\(q\\). Since \\(a\\) is rational, \\(br = q - a\\) is rational. Since \\(b \\neq 0\\) and \\(b\\) is rational, \\(r = (q - a)/b\\) is rational (rationals are closed under subtraction and division by nonzero). But \\(r\\) is irrational. Contradiction. Therefore \\(a + br\\) is irrational.'
                },
                {
                    question: 'Prove by contradiction: \\(\\log_2 3\\) is irrational.',
                    hint: 'Assume \\(\\log_2 3 = a/b\\) with \\(a, b\\) positive integers. What equation does this give?',
                    solution: 'Suppose for contradiction that \\(\\log_2 3 = a/b\\) for positive integers \\(a, b\\). Then \\(2^{a/b} = 3\\), so \\(2^a = 3^b\\). The left side is even (divisible by 2) and the right side is odd (a power of 3). An integer cannot be both even and odd. Contradiction. Therefore \\(\\log_2 3\\) is irrational.'
                },
                {
                    question: 'Prove: there is no rational number \\(r\\) such that \\(r^2 = 6\\).',
                    hint: 'Assume \\(r = a/b\\) in lowest terms with \\(r^2 = 6\\). Then \\(a^2 = 6b^2\\). What can you say about divisibility by 2 and 3?',
                    solution: 'Suppose \\(r = a/b\\) with \\(\\gcd(a,b) = 1\\) and \\(r^2 = 6\\). Then \\(a^2 = 6b^2 = 2 \\cdot 3 \\cdot b^2\\). So \\(2 \\mid a^2\\), hence \\(2 \\mid a\\), say \\(a = 2c\\). Then \\(4c^2 = 6b^2\\), giving \\(2c^2 = 3b^2\\). So \\(2 \\mid 3b^2\\). Since \\(\\gcd(2,3) = 1\\), we get \\(2 \\mid b^2\\), hence \\(2 \\mid b\\). Both \\(a\\) and \\(b\\) are even, contradicting \\(\\gcd(a,b) = 1\\). Therefore \\(\\sqrt{6}\\) is irrational.'
                }
            ]
        }
    ]
});
