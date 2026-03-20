window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch08',
    number: 8,
    title: 'Strong Induction & Well-Ordering',
    subtitle: 'Using all previous cases',
    sections: [
        // ============================================================
        // SECTION 1: Motivation — Why Weak Induction Isn't Always Enough
        // ============================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `

<div class="env-block intuition">
    <div class="env-title">Why Do We Need More?</div>
    <div class="env-body">
        <p>In Chapter 7 we proved statements by assuming \\(P(k)\\) and deducing \\(P(k+1)\\). That works beautifully when each case depends only on the immediately preceding one. But many natural statements require us to reach further back: \\(P(k+1)\\) might depend on \\(P(k-1)\\), or \\(P(k-3)\\), or even on <em>all</em> of \\(P(1), P(2), \\ldots, P(k)\\) at once.</p>
    </div>
</div>

<p class="section-roadmap"><strong>Section goal:</strong> See concrete examples where weak induction fails or becomes awkward, motivating the need for a stronger induction hypothesis.</p>

<h2>When One Step Isn't Enough</h2>

<h3>The Fibonacci Recurrence</h3>

<p>The Fibonacci sequence is defined by \\(F_1 = 1\\), \\(F_2 = 1\\), and \\(F_n = F_{n-1} + F_{n-2}\\) for \\(n \\ge 3\\). Suppose we want to prove that \\(F_n < 2^n\\) for all \\(n \\ge 1\\).</p>

<p>In the inductive step we need to show \\(F_{k+1} < 2^{k+1}\\). Since \\(F_{k+1} = F_k + F_{k-1}\\), we need bounds on <em>both</em> \\(F_k\\) and \\(F_{k-1}\\). Knowing only \\(P(k)\\) is not enough; we also need \\(P(k-1)\\).</p>

<h3>Prime Factorization</h3>

<p>Every integer \\(n \\ge 2\\) is a product of primes. If \\(n\\) is prime, we are done. If \\(n\\) is composite, then \\(n = ab\\) where \\(2 \\le a, b < n\\). We need both \\(a\\) and \\(b\\) to be products of primes, but neither \\(a\\) nor \\(b\\) need equal \\(n-1\\). We must assume \\(P(j)\\) for <em>all</em> \\(j < n\\).</p>

<div class="env-block remark">
    <div class="env-title">The Pattern</div>
    <div class="env-body">
        <p>In both examples the inductive step for \\(P(k+1)\\) requires information about cases <em>strictly smaller</em> than \\(k+1\\), but not necessarily the single predecessor \\(k\\). This is exactly the situation that <strong>strong induction</strong> is designed for.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-strong-vs-weak"></div>

`,
            visualizations: [
                {
                    id: 'viz-strong-vs-weak',
                    title: 'Weak vs. Strong Induction',
                    description: 'Weak induction uses only the previous step (k) to prove k+1. Strong induction can use all steps from the base case up to k. Click on a domino to see which predecessors it relies on.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 400, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var mode = 'weak';
                        var selectedDomino = 5;
                        var totalDominoes = 10;

                        VizEngine.createButton(controls, 'Weak Induction', function() { mode = 'weak'; draw(); });
                        VizEngine.createButton(controls, 'Strong Induction', function() { mode = 'strong'; draw(); });

                        var dominoW = 40, dominoH = 80, gap = 22, baseY = 200;
                        var startX = 50;

                        viz.canvas.addEventListener('click', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;
                            for (var i = 0; i < totalDominoes; i++) {
                                var dx = startX + i * (dominoW + gap);
                                if (mx >= dx && mx <= dx + dominoW && my >= baseY - dominoH && my <= baseY) {
                                    selectedDomino = i;
                                    draw();
                                    break;
                                }
                            }
                        });

                        function draw() {
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(mode === 'weak' ? 'Weak Induction: P(k) \u2192 P(k+1)' : 'Strong Induction: P(1)\u2227\u2026\u2227P(k) \u2192 P(k+1)', viz.width / 2, 40);

                            // Draw dominoes
                            for (var i = 0; i < totalDominoes; i++) {
                                var dx = startX + i * (dominoW + gap);
                                var dy = baseY - dominoH;
                                var isSelected = (i === selectedDomino);
                                var isUsed = false;
                                if (mode === 'weak') {
                                    isUsed = (i === selectedDomino - 1);
                                } else {
                                    isUsed = (i < selectedDomino && i >= 0);
                                }

                                // Domino body
                                var fillColor;
                                if (isSelected) fillColor = viz.colors.orange;
                                else if (isUsed) fillColor = viz.colors.blue;
                                else if (i === 0) fillColor = viz.colors.green;
                                else fillColor = '#1a1a40';

                                ctx.fillStyle = fillColor;
                                roundRect(ctx, dx, dy, dominoW, dominoH, 6);
                                ctx.fill();

                                ctx.strokeStyle = isSelected ? viz.colors.orange : (isUsed ? viz.colors.blue : viz.colors.axis);
                                ctx.lineWidth = isSelected ? 3 : 1.5;
                                roundRect(ctx, dx, dy, dominoW, dominoH, 6);
                                ctx.stroke();

                                // Label
                                ctx.fillStyle = (isSelected || isUsed || i === 0) ? viz.colors.white : viz.colors.text;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('P(' + (i + 1) + ')', dx + dominoW / 2, dy + dominoH / 2);
                            }

                            // Draw arrows showing dependencies
                            if (selectedDomino > 0) {
                                var targetX = startX + selectedDomino * (dominoW + gap) + dominoW / 2;
                                var arrowY = baseY + 30;

                                if (mode === 'weak') {
                                    // Single arrow from k to k+1
                                    var srcX = startX + (selectedDomino - 1) * (dominoW + gap) + dominoW / 2;
                                    drawArrow(ctx, srcX, arrowY, targetX, arrowY, viz.colors.blue, 2);
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.font = '13px -apple-system,sans-serif';
                                    ctx.fillText('uses P(' + selectedDomino + ')', (srcX + targetX) / 2, arrowY + 20);
                                } else {
                                    // Multiple arrows from all predecessors
                                    for (var j = 0; j < selectedDomino; j++) {
                                        var sx = startX + j * (dominoW + gap) + dominoW / 2;
                                        var ay = arrowY + j * 6;
                                        drawArrow(ctx, sx, ay, targetX, ay, viz.colors.blue + '99', 1.5);
                                    }
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.font = '13px -apple-system,sans-serif';
                                    ctx.fillText('uses P(1), ..., P(' + selectedDomino + ')', (startX + targetX) / 2, arrowY + selectedDomino * 6 + 16);
                                }

                                // Target indicator
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillText('\u25BC prove P(' + (selectedDomino + 1) + ')', targetX, baseY - dominoH - 16);
                            }

                            // Legend
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            var ly = viz.height - 50;
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillRect(20, ly, 14, 14);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Base case', 40, ly + 10);

                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(130, ly, 14, 14);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Assumed true', 150, ly + 10);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(270, ly, 14, 14);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('To prove', 290, ly + 10);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Click a domino to select it', viz.width / 2, viz.height - 12);
                        }

                        function roundRect(c, x, y, w, h, r) {
                            c.beginPath();
                            c.moveTo(x + r, y);
                            c.lineTo(x + w - r, y);
                            c.quadraticCurveTo(x + w, y, x + w, y + r);
                            c.lineTo(x + w, y + h - r);
                            c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
                            c.lineTo(x + r, y + h);
                            c.quadraticCurveTo(x, y + h, x, y + h - r);
                            c.lineTo(x, y + r);
                            c.quadraticCurveTo(x, y, x + r, y);
                            c.closePath();
                        }

                        function drawArrow(c, x1, y1, x2, y2, color, lw) {
                            var dx = x2 - x1, dy = y2 - y1;
                            var angle = Math.atan2(dy, dx);
                            c.strokeStyle = color;
                            c.lineWidth = lw;
                            c.beginPath();
                            c.moveTo(x1, y1);
                            c.lineTo(x2 - 8 * Math.cos(angle), y2 - 8 * Math.sin(angle));
                            c.stroke();
                            c.fillStyle = color;
                            c.beginPath();
                            c.moveTo(x2, y2);
                            c.lineTo(x2 - 10 * Math.cos(angle - 0.4), y2 - 10 * Math.sin(angle - 0.4));
                            c.lineTo(x2 - 10 * Math.cos(angle + 0.4), y2 - 10 * Math.sin(angle + 0.4));
                            c.closePath();
                            c.fill();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: []
        },

        // ============================================================
        // SECTION 2: Strong Induction
        // ============================================================
        {
            id: 'sec-strong',
            title: 'Strong Induction',
            content: `

<h2>Strong Induction</h2>

<div class="env-block definition">
    <div class="env-title">Principle of Strong Induction</div>
    <div class="env-body">
        <p>Let \\(P(n)\\) be a statement for each integer \\(n \\ge n_0\\). Suppose:</p>
        <ol>
            <li><strong>Base case(s):</strong> \\(P(n_0)\\) is true (and possibly \\(P(n_0 + 1), \\ldots, P(n_0 + j)\\) as needed).</li>
            <li><strong>Inductive step:</strong> For every \\(k \\ge n_0\\), if \\(P(n_0), P(n_0+1), \\ldots, P(k)\\) are all true, then \\(P(k+1)\\) is true.</li>
        </ol>
        <p>Then \\(P(n)\\) is true for all \\(n \\ge n_0\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Comparison with Weak Induction</div>
    <div class="env-body">
        <p>In <strong>weak induction</strong>, the inductive hypothesis is just \\(P(k)\\). In <strong>strong induction</strong>, the inductive hypothesis is the conjunction \\(P(n_0) \\wedge P(n_0+1) \\wedge \\cdots \\wedge P(k)\\). The hypothesis is strictly stronger, which makes the step potentially easier to carry out.</p>
        <p>In practice, you may not use every previous case in the inductive step. The point is that they are all <em>available</em> to you.</p>
    </div>
</div>

<h3>The Proof Template</h3>

<div class="env-block example">
    <div class="env-title">Template for Strong Induction Proof</div>
    <div class="env-body">
        <p><strong>Claim:</strong> For all \\(n \\ge n_0\\), \\(P(n)\\).</p>
        <p><em>Proof.</em> We proceed by strong induction on \\(n\\).</p>
        <p><strong>Base case:</strong> [Verify \\(P(n_0)\\), and possibly \\(P(n_0+1), \\ldots\\) as needed.]</p>
        <p><strong>Inductive step:</strong> Let \\(k \\ge n_0\\) and suppose \\(P(j)\\) holds for every \\(n_0 \\le j \\le k\\). We prove \\(P(k+1)\\).</p>
        <p>[Argument using one or more of \\(P(n_0), \\ldots, P(k)\\).]</p>
        <p>By strong induction, \\(P(n)\\) holds for all \\(n \\ge n_0\\). \\(\\square\\)</p>
    </div>
</div>

<h3>How Many Base Cases?</h3>

<p>In weak induction we always need exactly one base case. In strong induction, we sometimes need multiple base cases. The rule: if the inductive step for \\(P(k+1)\\) reaches back to \\(P(k+1-d)\\) at most, then we need base cases \\(P(n_0), P(n_0+1), \\ldots, P(n_0 + d - 1)\\).</p>

<div class="env-block example">
    <div class="env-title">Example 8.1</div>
    <div class="env-body">
        <p>The Fibonacci recurrence \\(F_n = F_{n-1} + F_{n-2}\\) reaches back 2 steps. So we need two base cases: \\(P(1)\\) and \\(P(2)\\).</p>
    </div>
</div>

`,
            visualizations: [],
            exercises: [
                {
                    question: 'Explain why weak induction is actually a special case of strong induction. That is, any proof by weak induction is automatically a valid proof by strong induction.',
                    hint: 'In strong induction, you assume P(n_0), ..., P(k). What happens if you simply ignore all but P(k)?',
                    solution: 'In strong induction, the inductive hypothesis gives us \\(P(n_0), P(n_0+1), \\ldots, P(k)\\). If we only use \\(P(k)\\) from this collection (ignoring the rest), then the argument reduces to exactly a weak induction proof. Since we are allowed to use fewer assumptions than we have, every weak induction proof is a valid strong induction proof.'
                },
                {
                    question: 'Suppose you are proving \\(P(n)\\) by strong induction, and the inductive step for \\(P(k+1)\\) uses \\(P(\\lfloor k/2 \\rfloor)\\). How many base cases do you need, and why?',
                    hint: 'When \\(k+1\\) is small, \\(\\lfloor k/2 \\rfloor\\) might not be covered by the inductive hypothesis unless you have enough base cases.',
                    solution: 'We need just the single base case \\(P(n_0)\\) (assuming \\(n_0 \\ge 1\\)). The inductive step assumes \\(P(j)\\) for all \\(n_0 \\le j \\le k\\). Since \\(\\lfloor k/2 \\rfloor \\le k\\), the value \\(P(\\lfloor k/2 \\rfloor)\\) is always among the assumed cases, provided \\(\\lfloor k/2 \\rfloor \\ge n_0\\). For \\(n_0 = 1\\) and \\(k \\ge 1\\), \\(\\lfloor k/2 \\rfloor \\ge 0\\), so we may need \\(P(0)\\) or \\(P(1)\\) depending on the starting index. In practice, one base case suffices because the step only references values in \\(\\{n_0, \\ldots, k\\}\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Classic Examples
        // ============================================================
        {
            id: 'sec-examples',
            title: 'Classic Examples',
            content: `

<h2>Classic Examples</h2>

<p>We illustrate strong induction with three celebrated results: the Fundamental Theorem of Arithmetic (existence of prime factorizations), the Fibonacci bound, and the postage stamp problem.</p>

<h3>Example 1: Every Integer \\(\\ge 2\\) Is a Product of Primes</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.2 (Existence of Prime Factorization)</div>
    <div class="env-body">
        <p>Every integer \\(n \\ge 2\\) can be written as a product of one or more primes.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>We use strong induction on \\(n\\).</p>
        <p><strong>Base case:</strong> \\(n = 2\\). Since 2 is prime, it is (trivially) a product of primes.</p>
        <p><strong>Inductive step:</strong> Let \\(k \\ge 2\\) and suppose every integer \\(j\\) with \\(2 \\le j \\le k\\) is a product of primes. We prove the claim for \\(k + 1\\).</p>
        <ul>
            <li><em>Case 1:</em> \\(k+1\\) is prime. Then \\(k+1\\) is itself a product of primes (with one factor).</li>
            <li><em>Case 2:</em> \\(k+1\\) is composite. Then \\(k+1 = ab\\) for some integers \\(a, b\\) with \\(2 \\le a, b \\le k\\). By the inductive hypothesis, both \\(a\\) and \\(b\\) are products of primes. Therefore \\(k+1 = ab\\) is also a product of primes.</li>
        </ul>
        <p>By strong induction, every \\(n \\ge 2\\) is a product of primes. \\(\\square\\)</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-fta-induction"></div>

<h3>Example 2: Fibonacci Bound</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.3</div>
    <div class="env-body">
        <p>For all \\(n \\ge 1\\), \\(F_n < 2^n\\), where \\(F_n\\) is the \\(n\\)-th Fibonacci number.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>We use strong induction on \\(n\\).</p>
        <p><strong>Base cases:</strong> \\(F_1 = 1 < 2 = 2^1\\) and \\(F_2 = 1 < 4 = 2^2\\). \\(\\checkmark\\)</p>
        <p><strong>Inductive step:</strong> Let \\(k \\ge 2\\) and suppose \\(F_j < 2^j\\) for all \\(1 \\le j \\le k\\). Then:</p>
        \\[F_{k+1} = F_k + F_{k-1} < 2^k + 2^{k-1} = 2^{k-1}(2 + 1) = 3 \\cdot 2^{k-1} < 4 \\cdot 2^{k-1} = 2^{k+1}.\\]
        <p>By strong induction, \\(F_n < 2^n\\) for all \\(n \\ge 1\\). \\(\\square\\)</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-fibonacci-strong"></div>

<h3>Example 3: The Postage Stamp Problem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.4</div>
    <div class="env-body">
        <p>Every integer \\(n \\ge 12\\) can be written as \\(n = 4a + 5b\\) for some non-negative integers \\(a, b\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>We use strong induction on \\(n\\), with base cases \\(n = 12, 13, 14, 15\\).</p>
        <p><strong>Base cases:</strong></p>
        <ul>
            <li>\\(12 = 4 \\cdot 3 + 5 \\cdot 0\\)</li>
            <li>\\(13 = 4 \\cdot 2 + 5 \\cdot 1\\)</li>
            <li>\\(14 = 4 \\cdot 1 + 5 \\cdot 2\\)</li>
            <li>\\(15 = 4 \\cdot 0 + 5 \\cdot 3\\)</li>
        </ul>
        <p><strong>Inductive step:</strong> Let \\(k \\ge 15\\) and suppose every integer \\(j\\) with \\(12 \\le j \\le k\\) can be written as \\(4a + 5b\\). Since \\(k + 1 \\ge 16\\), we have \\(k + 1 - 4 = k - 3 \\ge 12\\). By the inductive hypothesis, \\(k - 3 = 4a + 5b\\) for some \\(a, b \\ge 0\\). Then \\(k + 1 = 4(a+1) + 5b\\). \\(\\checkmark\\)</p>
        <p>By strong induction, every \\(n \\ge 12\\) is representable. \\(\\square\\)</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-postage-stamp"></div>

`,
            visualizations: [
                {
                    id: 'viz-fta-induction',
                    title: 'Prime Factorization via Strong Induction',
                    description: 'Watch how a composite number is broken into factors, and how the strong inductive hypothesis guarantees each factor has a prime factorization. Use the slider to pick a number.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 420, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var n = 30;

                        VizEngine.createSlider(controls, 'n = ', 2, 60, 30, 1, function(val) {
                            n = Math.round(val);
                            draw();
                        });

                        function factorTree(num) {
                            if (num <= 1) return { val: num, children: [] };
                            for (var d = 2; d * d <= num; d++) {
                                if (num % d === 0) {
                                    return { val: num, children: [factorTree(d), factorTree(num / d)] };
                                }
                            }
                            return { val: num, children: [] };
                        }

                        function isPrime(num) {
                            if (num < 2) return false;
                            for (var d = 2; d * d <= num; d++) {
                                if (num % d === 0) return false;
                            }
                            return true;
                        }

                        function treeWidth(node) {
                            if (node.children.length === 0) return 1;
                            var w = 0;
                            for (var i = 0; i < node.children.length; i++) w += treeWidth(node.children[i]);
                            return w;
                        }

                        function drawTree(node, cx, cy, spread) {
                            var prime = (node.children.length === 0);
                            // Draw node
                            var r = 22;
                            ctx.beginPath();
                            ctx.arc(cx, cy, r, 0, Math.PI * 2);
                            ctx.fillStyle = prime ? viz.colors.green + '44' : viz.colors.blue + '33';
                            ctx.fill();
                            ctx.strokeStyle = prime ? viz.colors.green : viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            ctx.fillStyle = prime ? viz.colors.green : viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('' + node.val, cx, cy);

                            if (node.children.length === 2) {
                                var totalW = treeWidth(node);
                                var leftW = treeWidth(node.children[0]);
                                var rightW = treeWidth(node.children[1]);
                                var leftCx = cx - spread * rightW / totalW;
                                var rightCx = cx + spread * leftW / totalW;
                                var childY = cy + 65;

                                // Draw edges
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(cx, cy + r);
                                ctx.lineTo(leftCx, childY - r);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(cx, cy + r);
                                ctx.lineTo(rightCx, childY - r);
                                ctx.stroke();

                                // Multiplication sign
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText('\u00d7', cx, cy + 32);

                                drawTree(node.children[0], leftCx, childY, spread * 0.45);
                                drawTree(node.children[1], rightCx, childY, spread * 0.45);
                            }
                        }

                        function getLeaves(node) {
                            if (node.children.length === 0) return [node.val];
                            var leaves = [];
                            for (var i = 0; i < node.children.length; i++) {
                                leaves = leaves.concat(getLeaves(node.children[i]));
                            }
                            return leaves;
                        }

                        function draw() {
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            var tree = factorTree(n);
                            drawTree(tree, viz.width / 2, 50, 260);

                            var leaves = getLeaves(tree);
                            leaves.sort(function(a, b) { return a - b; });
                            var factStr = leaves.join(' \u00d7 ');

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(n + ' = ' + factStr, viz.width / 2, viz.height - 35);

                            if (isPrime(n)) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillText(n + ' is prime (base case)', viz.width / 2, viz.height - 12);
                            } else {
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillText('Each factor < ' + n + ', so inductive hypothesis applies', viz.width / 2, viz.height - 12);
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-fibonacci-strong',
                    title: 'Fibonacci Numbers vs. Powers of 2',
                    description: 'The Fibonacci sequence grows exponentially, but slower than \\(2^n\\). The strong induction proof uses both \\(F_k\\) and \\(F_{k-1}\\) to bound \\(F_{k+1}\\).',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 380, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var nMax = 12;

                        VizEngine.createSlider(controls, 'n max = ', 5, 18, 12, 1, function(val) {
                            nMax = Math.round(val);
                            draw();
                        });

                        function fib(n) {
                            if (n <= 0) return 0;
                            if (n <= 2) return 1;
                            var a = 1, b = 1;
                            for (var i = 3; i <= n; i++) {
                                var c = a + b;
                                a = b;
                                b = c;
                            }
                            return b;
                        }

                        function draw() {
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            var padL = 70, padR = 30, padT = 50, padB = 60;
                            var plotW = viz.width - padL - padR;
                            var plotH = viz.height - padT - padB;

                            var maxVal = Math.pow(2, nMax);
                            var logMax = Math.log2(maxVal);

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(padL, padT);
                            ctx.lineTo(padL, padT + plotH);
                            ctx.lineTo(padL + plotW, padT + plotH);
                            ctx.stroke();

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('F\u2099 vs 2\u207f (log scale)', viz.width / 2, 25);

                            // Y-axis labels (log scale)
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            for (var p = 0; p <= logMax; p += 2) {
                                var yy = padT + plotH - (p / logMax) * plotH;
                                ctx.fillText('2^' + p, padL - 8, yy + 4);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.beginPath();
                                ctx.moveTo(padL, yy);
                                ctx.lineTo(padL + plotW, yy);
                                ctx.stroke();
                            }

                            // X-axis labels
                            ctx.textAlign = 'center';
                            for (var i = 1; i <= nMax; i++) {
                                var xx = padL + (i / nMax) * plotW;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('' + i, xx, padT + plotH + 18);
                            }
                            ctx.fillText('n', padL + plotW / 2, padT + plotH + 40);

                            // Plot 2^n
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 1; i <= nMax; i++) {
                                var xx = padL + (i / nMax) * plotW;
                                var logVal = i;
                                var yy = padT + plotH - (logVal / logMax) * plotH;
                                if (i === 1) ctx.moveTo(xx, yy);
                                else ctx.lineTo(xx, yy);
                            }
                            ctx.stroke();

                            // Plot F_n
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 1; i <= nMax; i++) {
                                var xx = padL + (i / nMax) * plotW;
                                var fn = fib(i);
                                var logVal = fn > 0 ? Math.log2(fn) : 0;
                                var yy = padT + plotH - (logVal / logMax) * plotH;
                                if (i === 1) ctx.moveTo(xx, yy);
                                else ctx.lineTo(xx, yy);
                            }
                            ctx.stroke();

                            // Data points
                            for (var i = 1; i <= nMax; i++) {
                                var xx = padL + (i / nMax) * plotW;
                                // 2^n point
                                var yy2 = padT + plotH - (i / logMax) * plotH;
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.arc(xx, yy2, 4, 0, Math.PI * 2);
                                ctx.fill();

                                // F_n point
                                var fn = fib(i);
                                var logFn = fn > 0 ? Math.log2(fn) : 0;
                                var yyf = padT + plotH - (logFn / logMax) * plotH;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath();
                                ctx.arc(xx, yyf, 4, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Legend
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(padL + 20, padT + 10, 20, 3);
                            ctx.fillText('2\u207f', padL + 46, padT + 16);

                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(padL + 20, padT + 28, 20, 3);
                            ctx.fillText('F\u2099', padL + 46, padT + 34);

                            // Show gap
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var lastFib = fib(nMax);
                            var lastPow = Math.pow(2, nMax);
                            ctx.fillText('F\u2081' + '\u2082 = ' + lastFib + '  vs  2\xB9\xB2 = ' + lastPow, viz.width / 2, padT + plotH + 52);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-postage-stamp',
                    title: 'Postage Stamp Problem: 4\u00a2 and 5\u00a2 Stamps',
                    description: 'Every amount \\(\\ge 12\\) cents can be made with 4-cent and 5-cent stamps. Click a value to see its decomposition and which base case or inductive step is used.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 380, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var selected = 20;

                        viz.canvas.addEventListener('click', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;
                            // Grid of cells
                            for (var val = 0; val <= 30; val++) {
                                var col = val % 10;
                                var row = Math.floor(val / 10);
                                var cx = 60 + col * 62;
                                var cy = 60 + row * 56;
                                if (mx >= cx - 28 && mx <= cx + 28 && my >= cy - 22 && my <= cy + 22) {
                                    selected = val;
                                    draw();
                                    return;
                                }
                            }
                        });

                        function decompose(n) {
                            if (n < 0) return null;
                            // Try to write n = 4a + 5b
                            for (var b = Math.floor(n / 5); b >= 0; b--) {
                                var rem = n - 5 * b;
                                if (rem >= 0 && rem % 4 === 0) {
                                    return { a: rem / 4, b: b };
                                }
                            }
                            return null;
                        }

                        function draw() {
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Grid header
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Postage values 0\u201330: click a cell', viz.width / 2, 25);

                            // Draw grid
                            for (var val = 0; val <= 30; val++) {
                                var col = val % 10;
                                var row = Math.floor(val / 10);
                                var cx = 60 + col * 62;
                                var cy = 60 + row * 56;

                                var d = decompose(val);
                                var canMake = d !== null;
                                var isBase = (val >= 12 && val <= 15);
                                var isSelected = (val === selected);

                                var bgColor;
                                if (isSelected) bgColor = viz.colors.orange + '66';
                                else if (val >= 12 && canMake) bgColor = viz.colors.green + '33';
                                else if (canMake) bgColor = viz.colors.blue + '22';
                                else bgColor = viz.colors.red + '22';

                                ctx.fillStyle = bgColor;
                                ctx.fillRect(cx - 28, cy - 22, 56, 44);

                                var borderColor;
                                if (isSelected) borderColor = viz.colors.orange;
                                else if (isBase) borderColor = viz.colors.teal;
                                else if (val >= 12) borderColor = viz.colors.green;
                                else borderColor = viz.colors.axis;

                                ctx.strokeStyle = borderColor;
                                ctx.lineWidth = isSelected ? 2.5 : 1;
                                ctx.strokeRect(cx - 28, cy - 22, 56, 44);

                                ctx.fillStyle = canMake ? viz.colors.white : viz.colors.red;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('' + val, cx, cy - 4);

                                if (canMake) {
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '9px -apple-system,sans-serif';
                                    ctx.fillText(d.a + '\u00d74+' + d.b + '\u00d75', cx, cy + 12);
                                } else {
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.font = '9px -apple-system,sans-serif';
                                    ctx.fillText('\u2717', cx, cy + 12);
                                }
                            }

                            // Detail for selected
                            var detailY = 240;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var dec = decompose(selected);

                            if (selected < 12) {
                                if (dec) {
                                    ctx.fillText(selected + ' = ' + dec.a + '\u00d74 + ' + dec.b + '\u00d75   (below the threshold, but happens to work)', viz.width / 2, detailY);
                                } else {
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.fillText(selected + ' cannot be represented as 4a + 5b', viz.width / 2, detailY);
                                }
                            } else if (selected <= 15) {
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('Base case: ' + selected + ' = ' + dec.a + '\u00d74 + ' + dec.b + '\u00d75', viz.width / 2, detailY);
                            } else {
                                ctx.fillText('Inductive step: ' + selected + ' = (' + (selected - 4) + ') + 4', viz.width / 2, detailY);
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = '14px -apple-system,sans-serif';
                                var prev = decompose(selected - 4);
                                if (prev) {
                                    ctx.fillText('Since ' + (selected - 4) + ' = ' + prev.a + '\u00d74 + ' + prev.b + '\u00d75, we get ' + selected + ' = ' + (prev.a + 1) + '\u00d74 + ' + prev.b + '\u00d75', viz.width / 2, detailY + 26);
                                }
                                ctx.fillStyle = viz.colors.blue;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillText('Uses P(' + (selected - 4) + ') from the strong inductive hypothesis', viz.width / 2, detailY + 52);
                            }

                            // Stamps visualization
                            if (dec && selected > 0) {
                                var stampY = detailY + 85;
                                var totalStamps = dec.a + dec.b;
                                var stampW = 36, stampH = 24, stampGap = 4;
                                var totalW = totalStamps * (stampW + stampGap);
                                var stampStartX = (viz.width - totalW) / 2;

                                for (var i = 0; i < dec.a; i++) {
                                    var sx = stampStartX + i * (stampW + stampGap);
                                    ctx.fillStyle = viz.colors.blue + '88';
                                    ctx.fillRect(sx, stampY, stampW, stampH);
                                    ctx.strokeStyle = viz.colors.blue;
                                    ctx.lineWidth = 1;
                                    ctx.strokeRect(sx, stampY, stampW, stampH);
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = 'bold 11px -apple-system,sans-serif';
                                    ctx.fillText('4\u00a2', sx + stampW / 2, stampY + stampH / 2);
                                }
                                for (var i = 0; i < dec.b; i++) {
                                    var sx = stampStartX + (dec.a + i) * (stampW + stampGap);
                                    ctx.fillStyle = viz.colors.orange + '88';
                                    ctx.fillRect(sx, stampY, stampW, stampH);
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 1;
                                    ctx.strokeRect(sx, stampY, stampW, stampH);
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = 'bold 11px -apple-system,sans-serif';
                                    ctx.fillText('5\u00a2', sx + stampW / 2, stampY + stampH / 2);
                                }
                            }

                            // Legend
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            var ly = viz.height - 18;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('\u25a0 Base cases (12\u201315)', 20, ly);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('\u25a0 Proved by induction (\u226516)', 200, ly);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('\u25a0 Not representable', 430, ly);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use strong induction to prove that every integer \\(n \\ge 2\\) has a prime divisor.',
                    hint: 'Base case: 2 is prime. If n is prime, n divides itself. If n is composite, write n = ab with a < n, and apply the hypothesis to a.',
                    solution: '<strong>Base case:</strong> \\(n = 2\\) is prime, so 2 is a prime divisor of itself. <br><strong>Inductive step:</strong> Suppose every integer \\(j\\) with \\(2 \\le j \\le k\\) has a prime divisor. Consider \\(k+1\\). If \\(k+1\\) is prime, it divides itself. If not, \\(k+1 = ab\\) with \\(2 \\le a < k+1\\). By the inductive hypothesis, \\(a\\) has a prime divisor \\(p\\). Then \\(p \\mid a\\) and \\(a \\mid k+1\\), so \\(p \\mid k+1\\). \\(\\square\\)'
                },
                {
                    question: 'Prove by strong induction that every amount of postage \\(\\ge 8\\) cents can be formed using 3-cent and 5-cent stamps.',
                    hint: 'You need three base cases: 8 = 3+5, 9 = 3+3+3, 10 = 5+5. In the inductive step, use P(k-2).',
                    solution: '<strong>Base cases:</strong> \\(8 = 3 + 5\\), \\(9 = 3 + 3 + 3\\), \\(10 = 5 + 5\\). <br><strong>Inductive step:</strong> Let \\(k \\ge 10\\) and suppose every integer from 8 to \\(k\\) is representable. Since \\(k+1 \\ge 11\\), we have \\(k + 1 - 3 = k - 2 \\ge 8\\). By hypothesis, \\(k - 2 = 3a + 5b\\). Then \\(k + 1 = 3(a+1) + 5b\\). \\(\\square\\)'
                }
            ]
        },

        // ============================================================
        // SECTION 4: The Well-Ordering Principle
        // ============================================================
        {
            id: 'sec-well-ordering',
            title: 'Well-Ordering Principle',
            content: `

<h2>The Well-Ordering Principle</h2>

<div class="env-block definition">
    <div class="env-title">The Well-Ordering Principle (WOP)</div>
    <div class="env-body">
        <p>Every nonempty subset of \\(\\mathbb{N} = \\{0, 1, 2, \\ldots\\}\\) has a <strong>least element</strong>.</p>
    </div>
</div>

<p>This sounds obvious for finite sets (just scan through the elements), but it is a deep structural fact about the natural numbers. It is <em>not</em> true for \\(\\mathbb{Z}\\) (the set of negative integers has no least element), nor for \\(\\mathbb{Q}\\) (the set \\(\\{q \\in \\mathbb{Q} : q > 0\\}\\) has no least element).</p>

<h3>Proof Technique: Smallest Counterexample</h3>

<p>The Well-Ordering Principle gives us a powerful proof strategy: to prove \\(P(n)\\) for all \\(n \\ge n_0\\), assume for contradiction that the set of counterexamples</p>
\\[S = \\{n \\ge n_0 : P(n) \\text{ is false}\\}\\]
<p>is nonempty. By the Well-Ordering Principle, \\(S\\) has a smallest element \\(m\\). Then derive a contradiction, often by showing \\(P(m)\\) must actually be true.</p>

<div class="env-block example">
    <div class="env-title">Example 8.5 (Prime factorization via WOP)</div>
    <div class="env-body">
        <p><strong>Claim:</strong> Every integer \\(n \\ge 2\\) is a product of primes.</p>
        <p><em>Proof.</em> Suppose not. Let \\(S = \\{n \\ge 2 : n \\text{ is not a product of primes}\\}\\). By WOP, \\(S\\) has a least element \\(m\\). Since \\(m \\in S\\), \\(m\\) is not a product of primes. In particular, \\(m\\) is not prime (since a prime is a product of one prime). So \\(m = ab\\) with \\(2 \\le a, b < m\\). Since \\(a, b < m\\) and \\(m\\) is the <em>smallest</em> counterexample, \\(a, b \\notin S\\), meaning both \\(a\\) and \\(b\\) are products of primes. But then \\(m = ab\\) is also a product of primes, contradicting \\(m \\in S\\). \\(\\square\\)</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">The "Smallest Counterexample" Template</div>
    <div class="env-body">
        <ol>
            <li>Assume the claim fails; let \\(S\\) be the set of counterexamples.</li>
            <li>By WOP, \\(S\\) has a least element \\(m\\).</li>
            <li>Use the fact that \\(m\\) is minimal (every smaller value satisfies \\(P\\)) to derive a contradiction.</li>
        </ol>
        <p>Notice this is exactly the content of a strong induction proof, repackaged as a contradiction argument!</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-well-ordering"></div>

`,
            visualizations: [
                {
                    id: 'viz-well-ordering',
                    title: 'Smallest Counterexample Argument',
                    description: 'The well-ordering principle guarantees a least element in any nonempty subset of N. Watch the "smallest counterexample" strategy in action: if a counterexample exists, the smallest one leads to a contradiction.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 380, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var step = 0;
                        var maxSteps = 4;

                        VizEngine.createButton(controls, '\u25c0 Back', function() { step = Math.max(0, step - 1); draw(); });
                        VizEngine.createButton(controls, 'Next \u25b6', function() { step = Math.min(maxSteps, step + 1); draw(); });
                        VizEngine.createButton(controls, 'Reset', function() { step = 0; draw(); });

                        var stageTexts = [
                            'Suppose some natural numbers fail property P.',
                            'Let S = {n : P(n) is false}. S is nonempty.',
                            'By Well-Ordering, S has a least element m.',
                            'Every n < m satisfies P(n) (since m is the smallest failure).',
                            'But then P(m) must also hold (contradiction!). So S is empty.'
                        ];

                        function draw() {
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            // Number line
                            var lineY = 160;
                            var lineStartX = 50;
                            var lineEndX = viz.width - 50;
                            var numPoints = 15;
                            var spacing = (lineEndX - lineStartX) / (numPoints - 1);

                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(lineStartX, lineY);
                            ctx.lineTo(lineEndX, lineY);
                            ctx.stroke();

                            // Hypothetical counterexamples at positions 5, 8, 11
                            var counterexamples = [5, 8, 11, 13];
                            var smallestCE = 5;

                            for (var i = 0; i < numPoints; i++) {
                                var px = lineStartX + i * spacing;
                                var isCE = counterexamples.indexOf(i) >= 0;
                                var isSmallest = (i === smallestCE);
                                var isBeforeSmallest = (i < smallestCE);

                                var r = 14;
                                if (step === 0) {
                                    // Just show all numbers
                                    ctx.fillStyle = viz.colors.axis + '44';
                                    ctx.beginPath();
                                    ctx.arc(px, lineY, r, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.strokeStyle = viz.colors.axis;
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.arc(px, lineY, r, 0, Math.PI * 2);
                                    ctx.stroke();
                                } else if (step === 1) {
                                    // Mark counterexamples in red
                                    ctx.fillStyle = isCE ? viz.colors.red + '55' : viz.colors.green + '33';
                                    ctx.beginPath();
                                    ctx.arc(px, lineY, r, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.strokeStyle = isCE ? viz.colors.red : viz.colors.green;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.arc(px, lineY, r, 0, Math.PI * 2);
                                    ctx.stroke();
                                } else if (step >= 2) {
                                    // Highlight smallest counterexample
                                    var fillC, strokeC;
                                    if (isSmallest && step >= 2) {
                                        fillC = viz.colors.orange + '66';
                                        strokeC = viz.colors.orange;
                                    } else if (isCE) {
                                        fillC = viz.colors.red + '33';
                                        strokeC = viz.colors.red;
                                    } else if (isBeforeSmallest && step >= 3) {
                                        fillC = viz.colors.green + '55';
                                        strokeC = viz.colors.green;
                                    } else {
                                        fillC = viz.colors.axis + '22';
                                        strokeC = viz.colors.axis;
                                    }

                                    if (step === 4 && isCE) {
                                        // Flash contradiction
                                        fillC = viz.colors.green + '55';
                                        strokeC = viz.colors.green;
                                    }

                                    ctx.fillStyle = fillC;
                                    ctx.beginPath();
                                    ctx.arc(px, lineY, r, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.strokeStyle = strokeC;
                                    ctx.lineWidth = isSmallest && step >= 2 ? 3 : 1.5;
                                    ctx.beginPath();
                                    ctx.arc(px, lineY, r, 0, Math.PI * 2);
                                    ctx.stroke();
                                }

                                // Number label
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('' + i, px, lineY);
                            }

                            // "m" pointer
                            if (step >= 2) {
                                var mX = lineStartX + smallestCE * spacing;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('m = ' + smallestCE, mX, lineY - 28);
                                ctx.fillText('\u25bc', mX, lineY - 42);
                            }

                            // All < m satisfy P
                            if (step >= 3) {
                                var bracketEnd = lineStartX + (smallestCE - 1) * spacing;
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(lineStartX, lineY + 30);
                                ctx.lineTo(bracketEnd, lineY + 30);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillText('All satisfy P (no counterexample here)', (lineStartX + bracketEnd) / 2, lineY + 48);
                            }

                            // Stage text
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(stageTexts[step], viz.width / 2, 40);

                            // Step indicator
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Step ' + (step + 1) + ' / ' + (maxSteps + 1), viz.width / 2, viz.height - 16);

                            // Conclusion at step 4
                            if (step === 4) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillText('\u2714 Contradiction! No counterexamples exist. P(n) holds for all n.', viz.width / 2, viz.height - 60);
                            }

                            // Legend
                            if (step >= 1) {
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                var ly = viz.height - 36;
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('\u25cf P(n) true', 20, ly);
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('\u25cf P(n) false (counterexample)', 150, ly);
                                if (step >= 2) {
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.fillText('\u25cf Smallest counterexample m', 380, ly);
                                }
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the Well-Ordering Principle to prove that \\(\\sqrt{2}\\) is irrational. (Hint: assume \\(\\sqrt{2} = a/b\\) with \\(a, b \\in \\mathbb{N}\\), and consider the smallest possible \\(b\\).)',
                    hint: 'If \\(\\sqrt{2} = a/b\\), then \\(2b^2 = a^2\\), so \\(a^2\\) is even, hence \\(a\\) is even. Write \\(a = 2c\\) and simplify.',
                    solution: 'Suppose \\(\\sqrt{2}\\) is rational. Let \\(S = \\{b \\in \\mathbb{N} : b \\ge 1,\\; \\sqrt{2} = a/b \\text{ for some } a \\in \\mathbb{N}\\}\\). By WOP, \\(S\\) has a least element \\(b_0\\), with \\(\\sqrt{2} = a_0/b_0\\). Then \\(2b_0^2 = a_0^2\\), so \\(a_0\\) is even; write \\(a_0 = 2c\\). Then \\(2b_0^2 = 4c^2\\), so \\(b_0^2 = 2c^2\\), meaning \\(b_0\\) is even; write \\(b_0 = 2d\\). Then \\(\\sqrt{2} = 2c/(2d) = c/d\\) with \\(d = b_0/2 < b_0\\), contradicting the minimality of \\(b_0\\). \\(\\square\\)'
                },
                {
                    question: 'Give an example of a nonempty subset of \\(\\mathbb{Z}\\) that has no least element. Explain why the Well-Ordering Principle does not apply.',
                    hint: 'Consider the set of all negative integers.',
                    solution: 'The set \\(S = \\{-1, -2, -3, \\ldots\\} = \\mathbb{Z}_{<0}\\) has no least element, because for any \\(n \\in S\\), \\(n - 1 \\in S\\) and \\(n - 1 < n\\). The WOP applies only to subsets of \\(\\mathbb{N}\\) (the non-negative integers), not to \\(\\mathbb{Z}\\).'
                }
            ]
        },

        // ============================================================
        // SECTION 5: Three Equivalent Principles
        // ============================================================
        {
            id: 'sec-equivalence',
            title: 'Three Equivalent Principles',
            content: `

<h2>Three Equivalent Principles</h2>

<p>We have now seen three proof tools:</p>
<ol>
    <li><strong>Weak Induction (WI):</strong> Base case + \\(P(k) \\Rightarrow P(k+1)\\).</li>
    <li><strong>Strong Induction (SI):</strong> Base case(s) + \\([P(n_0) \\wedge \\cdots \\wedge P(k)] \\Rightarrow P(k+1)\\).</li>
    <li><strong>Well-Ordering Principle (WOP):</strong> Every nonempty subset of \\(\\mathbb{N}\\) has a least element.</li>
</ol>

<p>A remarkable fact is that these three principles are <strong>logically equivalent</strong>. Any one of them implies the other two.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 8.6 (Equivalence)</div>
    <div class="env-body">
        <p>The following are equivalent over a base theory of arithmetic:</p>
        <p>(i) Weak Induction &ensp; (ii) Strong Induction &ensp; (iii) Well-Ordering Principle</p>
    </div>
</div>

<h3>Sketch of the Equivalence</h3>

<div class="env-block proof">
    <div class="env-title">WI \\(\\Rightarrow\\) SI</div>
    <div class="env-body">
        <p>Define \\(Q(n) = P(n_0) \\wedge P(n_0+1) \\wedge \\cdots \\wedge P(n)\\). A strong induction on \\(P\\) is the same as a weak induction on \\(Q\\): the base case \\(Q(n_0) = P(n_0)\\) is the same, and the step \\(Q(k) \\Rightarrow Q(k+1)\\) says "if \\(P(n_0) \\wedge \\cdots \\wedge P(k)\\), then \\(P(k+1)\\)", which is exactly the strong induction step for \\(P\\). Since \\(Q(n) \\Rightarrow P(n)\\), we conclude \\(P(n)\\) for all \\(n\\). \\(\\square\\)</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">SI \\(\\Rightarrow\\) WOP</div>
    <div class="env-body">
        <p>Suppose \\(S \\subseteq \\mathbb{N}\\) is nonempty and has no least element. We show \\(S = \\emptyset\\) (contradiction). Let \\(P(n)\\) be "\\(n \\notin S\\)". </p>
        <p><strong>Base case:</strong> If \\(0 \\in S\\), then 0 would be the least element (since \\(0 \\le n\\) for all \\(n \\in \\mathbb{N}\\)). Contradiction. So \\(P(0)\\) holds.</p>
        <p><strong>Strong inductive step:</strong> Suppose \\(P(0), \\ldots, P(k)\\) all hold, meaning \\(0, 1, \\ldots, k \\notin S\\). If \\(k+1 \\in S\\), then \\(k+1\\) would be the least element of \\(S\\) (since nothing smaller is in \\(S\\)). Contradiction. So \\(P(k+1)\\) holds.</p>
        <p>By strong induction, \\(P(n)\\) holds for all \\(n\\), i.e., \\(S = \\emptyset\\). \\(\\square\\)</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">WOP \\(\\Rightarrow\\) WI</div>
    <div class="env-body">
        <p>Suppose we have a base case \\(P(0)\\) and an inductive step \\(P(k) \\Rightarrow P(k+1)\\). We show \\(P(n)\\) for all \\(n\\).</p>
        <p>Let \\(S = \\{n \\in \\mathbb{N} : \\neg P(n)\\}\\). Suppose \\(S \\neq \\emptyset\\). By WOP, \\(S\\) has a least element \\(m\\). Since \\(P(0)\\) holds, \\(m \\neq 0\\), so \\(m \\ge 1\\). Then \\(m - 1 \\notin S\\), so \\(P(m-1)\\) holds. By the inductive step, \\(P(m)\\) holds. Contradiction. \\(\\square\\)</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-three-principles"></div>

`,
            visualizations: [
                {
                    id: 'viz-three-principles',
                    title: 'Equivalence of Three Principles',
                    description: 'Weak induction, strong induction, and the well-ordering principle are logically equivalent. Click an arrow to see the proof idea for that implication.',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, { width: 700, height: 400, scale: 1, originX: 0, originY: 0 });
                        var ctx = viz.ctx;
                        var selectedEdge = -1;

                        // Triangle layout
                        var cx = viz.width / 2, cy = 170;
                        var R = 130;
                        var nodes = [
                            { x: cx, y: cy - R, label: 'Weak\nInduction', short: 'WI' },
                            { x: cx + R * Math.cos(Math.PI / 6), y: cy + R * Math.sin(Math.PI / 6), label: 'Well-Ordering\nPrinciple', short: 'WOP' },
                            { x: cx - R * Math.cos(Math.PI / 6), y: cy + R * Math.sin(Math.PI / 6), label: 'Strong\nInduction', short: 'SI' }
                        ];

                        // Edges: [from, to, proof idea]
                        var edges = [
                            { from: 0, to: 2, idea: 'WI \u21d2 SI: Define Q(n) = P(1)\u2227\u2026\u2227P(n).\nStrong induction on P becomes weak induction on Q.' },
                            { from: 2, to: 1, idea: 'SI \u21d2 WOP: Given nonempty S \u2286 N with no min,\nprove P(n) = "n \u2209 S" by strong induction.\nForces S = \u2205, contradiction.' },
                            { from: 1, to: 0, idea: 'WOP \u21d2 WI: Let S = {n : \u00acP(n)}.\nIf S \u2260 \u2205, its least element m\u22651 gives\nP(m\u22121) true, so P(m) true. Contradiction.' }
                        ];

                        viz.canvas.addEventListener('click', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;

                            // Check proximity to each edge midpoint
                            for (var i = 0; i < edges.length; i++) {
                                var f = nodes[edges[i].from];
                                var t = nodes[edges[i].to];
                                var midX = (f.x + t.x) / 2;
                                var midY = (f.y + t.y) / 2;
                                var dist = Math.sqrt((mx - midX) * (mx - midX) + (my - midY) * (my - midY));
                                if (dist < 40) {
                                    selectedEdge = (selectedEdge === i) ? -1 : i;
                                    draw();
                                    return;
                                }
                            }
                            selectedEdge = -1;
                            draw();
                        });

                        function draw() {
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, viz.width, viz.height);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Three Equivalent Principles', cx, 24);

                            // Draw edges
                            for (var i = 0; i < edges.length; i++) {
                                var f = nodes[edges[i].from];
                                var t = nodes[edges[i].to];
                                var isSel = (i === selectedEdge);

                                // Offset slightly to avoid overlap with reverse arrow
                                var dx = t.x - f.x, dy = t.y - f.y;
                                var len = Math.sqrt(dx * dx + dy * dy);
                                var nx = -dy / len, ny = dx / len;
                                var off = 8;
                                var x1 = f.x + nx * off, y1 = f.y + ny * off;
                                var x2 = t.x + nx * off, y2 = t.y + ny * off;

                                // Shorten for node radius
                                var nr = 45;
                                var ux = (x2 - x1) / len, uy = (y2 - y1) / len;
                                var sx = x1 + ux * nr, sy = y1 + uy * nr;
                                var ex = x2 - ux * nr, ey = y2 - uy * nr;

                                ctx.strokeStyle = isSel ? viz.colors.orange : viz.colors.teal;
                                ctx.lineWidth = isSel ? 3 : 2;
                                ctx.beginPath();
                                ctx.moveTo(sx, sy);
                                ctx.lineTo(ex, ey);
                                ctx.stroke();

                                // Arrowhead
                                var angle = Math.atan2(ey - sy, ex - sx);
                                ctx.fillStyle = isSel ? viz.colors.orange : viz.colors.teal;
                                ctx.beginPath();
                                ctx.moveTo(ex, ey);
                                ctx.lineTo(ex - 12 * Math.cos(angle - 0.35), ey - 12 * Math.sin(angle - 0.35));
                                ctx.lineTo(ex - 12 * Math.cos(angle + 0.35), ey - 12 * Math.sin(angle + 0.35));
                                ctx.closePath();
                                ctx.fill();

                                // "\u21d2" label at midpoint
                                var midX = (sx + ex) / 2 + nx * 14;
                                var midY = (sy + ey) / 2 + ny * 14;
                                ctx.fillStyle = isSel ? viz.colors.orange : viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('\u21d2', midX, midY);
                            }

                            // Draw nodes
                            for (var i = 0; i < nodes.length; i++) {
                                var nd = nodes[i];
                                ctx.fillStyle = viz.colors.blue + '33';
                                ctx.beginPath();
                                ctx.arc(nd.x, nd.y, 42, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(nd.x, nd.y, 42, 0, Math.PI * 2);
                                ctx.stroke();

                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                var lines = nd.label.split('\n');
                                for (var j = 0; j < lines.length; j++) {
                                    ctx.fillText(lines[j], nd.x, nd.y - 7 + j * 16);
                                }
                            }

                            // Show selected proof idea
                            if (selectedEdge >= 0) {
                                var idea = edges[selectedEdge].idea;
                                var ideaLines = idea.split('\n');
                                var boxY = 310;
                                ctx.fillStyle = '#1a1a40';
                                ctx.fillRect(40, boxY - 8, viz.width - 80, ideaLines.length * 20 + 20);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(40, boxY - 8, viz.width - 80, ideaLines.length * 20 + 20);
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                for (var j = 0; j < ideaLines.length; j++) {
                                    ctx.fillText(ideaLines[j], viz.width / 2, boxY + 10 + j * 20);
                                }
                            } else {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Click an arrow to see the proof idea', viz.width / 2, viz.height - 20);
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In the proof that WI \\(\\Rightarrow\\) SI, we defined \\(Q(n) = P(n_0) \\wedge \\cdots \\wedge P(n)\\). Verify that \\(Q(n_0) \\Leftrightarrow P(n_0)\\) and that \\(Q(k) \\Rightarrow Q(k+1)\\) is equivalent to the strong induction step for \\(P\\).',
                    hint: 'Write out what Q(k) and Q(k+1) mean, and note that Q(k+1) = Q(k) \\wedge P(k+1).',
                    solution: '\\(Q(n_0) = P(n_0)\\) (the conjunction of a single term). For the step: \\(Q(k+1) = Q(k) \\wedge P(k+1) = [P(n_0) \\wedge \\cdots \\wedge P(k)] \\wedge P(k+1)\\). So \\(Q(k) \\Rightarrow Q(k+1)\\) is the same as: "assuming \\(P(n_0) \\wedge \\cdots \\wedge P(k)\\), prove \\(P(k+1)\\)," which is exactly the strong induction step.'
                },
                {
                    question: 'The Well-Ordering Principle fails for \\(\\mathbb{Q}_{>0}\\). Find a nonempty subset of the positive rationals with no least element.',
                    hint: 'Consider \\(S = \\{1/n : n \\in \\mathbb{N}, n \\ge 1\\}\\).',
                    solution: 'Let \\(S = \\{1/n : n \\ge 1\\} = \\{1, 1/2, 1/3, 1/4, \\ldots\\}\\). For any \\(1/n \\in S\\), we have \\(1/(n+1) \\in S\\) and \\(1/(n+1) < 1/n\\). So \\(S\\) has no least element. (Note: \\(\\inf S = 0\\), but \\(0 \\notin S\\).)'
                }
            ]
        },

        // ============================================================
        // SECTION 6: Looking Ahead
        // ============================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `

<h2>Looking Ahead</h2>

<div class="env-block intuition">
    <div class="env-title">What We've Gained</div>
    <div class="env-body">
        <p>Strong induction and the well-ordering principle give us strictly more proof power than weak induction alone, even though all three are logically equivalent. In practice, having the full inductive hypothesis available makes many arguments cleaner and more natural.</p>
    </div>
</div>

<h3>Where These Tools Appear Next</h3>

<ul>
    <li><strong>Sets and cardinality (Chapters 9-10):</strong> Well-ordering is crucial for defining ordinals and comparing infinite cardinalities.</li>
    <li><strong>Functions (Chapter 12):</strong> Recursive definitions are justified by strong induction. Defining a function by \\(f(n) = g(f(0), \\ldots, f(n-1))\\) requires the full strength of SI.</li>
    <li><strong>Number theory:</strong> The Fundamental Theorem of Arithmetic (uniqueness of prime factorization) uses both strong induction and the division algorithm.</li>
    <li><strong>Algorithm analysis:</strong> Correctness proofs for divide-and-conquer algorithms (merge sort, binary search) naturally use strong induction, since the recursive calls operate on strictly smaller inputs.</li>
</ul>

<h3>Chapter Summary</h3>

<div class="env-block remark">
    <div class="env-title">Key Ideas</div>
    <div class="env-body">
        <ol>
            <li><strong>Strong induction</strong> lets you assume \\(P(n_0), P(n_0+1), \\ldots, P(k)\\) when proving \\(P(k+1)\\). You may need multiple base cases.</li>
            <li>The <strong>Well-Ordering Principle</strong> says every nonempty subset of \\(\\mathbb{N}\\) has a least element. It enables "smallest counterexample" proofs.</li>
            <li>Weak induction, strong induction, and WOP are <strong>logically equivalent</strong>. Choose whichever makes your proof cleanest.</li>
        </ol>
    </div>
</div>

<h3>When to Use Which?</h3>

<table style="width:100%;border-collapse:collapse;margin:12px 0;">
<thead>
<tr style="border-bottom:2px solid #30363d;">
    <th style="text-align:left;padding:6px 10px;color:#8b949e;">Technique</th>
    <th style="text-align:left;padding:6px 10px;color:#8b949e;">Use when...</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:6px 10px;">Weak induction</td>
    <td style="padding:6px 10px;">\\(P(k+1)\\) follows from \\(P(k)\\) alone</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:6px 10px;">Strong induction</td>
    <td style="padding:6px 10px;">\\(P(k+1)\\) depends on cases before \\(P(k)\\), or you don't know exactly which prior case you'll need</td>
</tr>
<tr>
    <td style="padding:6px 10px;">Well-Ordering / smallest counterexample</td>
    <td style="padding:6px 10px;">A contradiction argument is more natural, or you want to avoid spelling out the inductive structure</td>
</tr>
</tbody>
</table>

`,
            visualizations: [],
            exercises: [
                {
                    question: 'Prove by strong induction: every integer \\(n \\ge 1\\) can be written as a sum of distinct powers of 2 (binary representation).',
                    hint: 'Base case: \\(1 = 2^0\\). For the inductive step, consider whether \\(k+1\\) is even or odd.',
                    solution: '<strong>Base case:</strong> \\(1 = 2^0\\). <br><strong>Inductive step:</strong> Suppose every \\(j\\) with \\(1 \\le j \\le k\\) has a binary representation. Consider \\(k + 1\\).<br>If \\(k+1\\) is odd, then \\(k+1 = k + 1\\) where \\(k\\) is even: \\(k = 2m\\), and \\(m \\le k\\), so \\(m\\) has a binary representation \\(m = 2^{a_1} + \\cdots + 2^{a_r}\\). Then \\(k = 2^{a_1+1} + \\cdots + 2^{a_r+1}\\) uses distinct powers \\(\\ge 2^1\\), and \\(k+1 = 2^0 + 2^{a_1+1} + \\cdots + 2^{a_r+1}\\) uses distinct powers.<br>If \\(k+1\\) is even, write \\(k+1 = 2m\\) where \\(1 \\le m \\le k\\). By hypothesis \\(m = 2^{a_1} + \\cdots + 2^{a_r}\\), so \\(k+1 = 2^{a_1+1} + \\cdots + 2^{a_r+1}\\). \\(\\square\\)'
                },
                {
                    question: 'Use the well-ordering principle to prove that there is no integer between 0 and 1.',
                    hint: 'Assume S = {n in N : 0 < n < 1} is nonempty. What does the least element of S tell you?',
                    solution: 'Suppose \\(S = \\{n \\in \\mathbb{N} : 0 < n < 1\\}\\) is nonempty. By WOP, \\(S\\) has a least element \\(m\\). Then \\(0 < m < 1\\), so \\(0 < m^2 < m < 1\\), meaning \\(m^2 \\in S\\) and \\(m^2 < m\\), contradicting the minimality of \\(m\\). (Here we used that \\(m^2 \\in \\mathbb{N}\\) requires \\(m \\in \\mathbb{N}\\), but the more direct argument: if \\(0 < m < 1\\) then \\(m\\) is not a natural number at all, since \\(\\mathbb{N} = \\{0,1,2,\\ldots\\}\\), so \\(S = \\emptyset\\).) \\(\\square\\)'
                }
            ]
        }
    ]
});
