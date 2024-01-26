const s=JSON.parse('{"key":"v-83d79bb4","path":"/posts/crypto/PRNG/MT19937.html","title":"MT19937分析","lang":"zh-CN","frontmatter":{"date":"2024/01/26","star":true,"isOriginal":true,"category":["密码学"],"tag":["PRNG","MT19937"],"description":"MT19937分析 前言 本内容是2022发在cryptography-wiki上的文章了，现在转回到blog上 正文 MT19937即梅森旋转算法（Mersenne twister）由松本眞（日语：松本真）和西村拓士在1997年开发，基于二进制有限域F2\\\\mathbb{F}_2F2​上的矩阵线性递归，可以快速产生高质量的伪随机数。 该算法的周期为219937−12^{19937}-1219937−1，故名为MT19937。该算法具有以下优点 周期非常长，为219937−12^{19937}-1219937−1 在1≤k≤6231\\\\le k \\\\le 6231≤k≤623都满足kkk-分布 能比硬件实现的方法更快产生随机数 kkk-分布：一个周期为PPP的www位整数的伪随机数序列xix_ixi​，如果下列成立则称其vvv-比特精度的kkk-分布成立。 令truncv(x)\\\\mathrm{trunc_v(x)}truncv​(x)表示由xxx的前vvv位形成的数，并考虑PPP中kkk个vvv位向量。 (truncv(xi),truncv(xi+1),…,truncv(xi+k−1))&nbsp;(0≤i&lt;P) (\\\\mathrm{trunc_v(x_i)},\\\\mathrm{trunc_v(x_{i+1})},\\\\dots,\\\\mathrm{trunc_v(x_{i+k-1})})\\\\ (0\\\\le i&lt; P) (truncv​(xi​),truncv​(xi+1​),…,truncv​(xi+k−1​))&nbsp;(0≤i&lt;P) 然后，2kv2^{kv}2kv个组合中每一个都在一个周期内出现次数相同（全0组合出现次数较少除外）。","head":[["meta",{"property":"og:url","content":"https://xenny.wiki/posts/crypto/PRNG/MT19937.html"}],["meta",{"property":"og:site_name","content":"Xenny 的博客"}],["meta",{"property":"og:title","content":"MT19937分析"}],["meta",{"property":"og:description","content":"MT19937分析 前言 本内容是2022发在cryptography-wiki上的文章了，现在转回到blog上 正文 MT19937即梅森旋转算法（Mersenne twister）由松本眞（日语：松本真）和西村拓士在1997年开发，基于二进制有限域F2\\\\mathbb{F}_2F2​上的矩阵线性递归，可以快速产生高质量的伪随机数。 该算法的周期为219937−12^{19937}-1219937−1，故名为MT19937。该算法具有以下优点 周期非常长，为219937−12^{19937}-1219937−1 在1≤k≤6231\\\\le k \\\\le 6231≤k≤623都满足kkk-分布 能比硬件实现的方法更快产生随机数 kkk-分布：一个周期为PPP的www位整数的伪随机数序列xix_ixi​，如果下列成立则称其vvv-比特精度的kkk-分布成立。 令truncv(x)\\\\mathrm{trunc_v(x)}truncv​(x)表示由xxx的前vvv位形成的数，并考虑PPP中kkk个vvv位向量。 (truncv(xi),truncv(xi+1),…,truncv(xi+k−1))&nbsp;(0≤i&lt;P) (\\\\mathrm{trunc_v(x_i)},\\\\mathrm{trunc_v(x_{i+1})},\\\\dots,\\\\mathrm{trunc_v(x_{i+k-1})})\\\\ (0\\\\le i&lt; P) (truncv​(xi​),truncv​(xi+1​),…,truncv​(xi+k−1​))&nbsp;(0≤i&lt;P) 然后，2kv2^{kv}2kv个组合中每一个都在一个周期内出现次数相同（全0组合出现次数较少除外）。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-25T18:10:51.000Z"}],["meta",{"property":"article:author","content":"Xenny"}],["meta",{"property":"article:tag","content":"PRNG"}],["meta",{"property":"article:tag","content":"MT19937"}],["meta",{"property":"article:published_time","content":"2024-01-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-25T18:10:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MT19937分析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-26T00:00:00.000Z\\",\\"dateModified\\":\\"2024-01-25T18:10:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Xenny\\",\\"url\\":\\"https://xenny.wiki\\"}]}"]]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"正文","slug":"正文","link":"#正文","children":[]},{"level":2,"title":"代码实现","slug":"代码实现","link":"#代码实现","children":[]},{"level":2,"title":"安全分析","slug":"安全分析","link":"#安全分析","children":[{"level":3,"title":"逆向extract_number函数","slug":"逆向extract-number函数","link":"#逆向extract-number函数","children":[]},{"level":3,"title":"预测随机数","slug":"预测随机数","link":"#预测随机数","children":[]},{"level":3,"title":"逆向twist函数","slug":"逆向twist函数","link":"#逆向twist函数","children":[]},{"level":3,"title":"逆向init函数","slug":"逆向init函数","link":"#逆向init函数","children":[]}]},{"level":2,"title":"扩展","slug":"扩展","link":"#扩展","children":[{"level":3,"title":"情况一","slug":"情况一","link":"#情况一","children":[]},{"level":3,"title":"情况二","slug":"情况二","link":"#情况二","children":[]},{"level":3,"title":"情况三","slug":"情况三","link":"#情况三","children":[]}]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1706206251000,"updatedTime":1706206251000,"contributors":[{"name":"X3NNY","email":"xenny@vip.qq.com","commits":1}]},"readingTime":{"minutes":13.79,"words":3309},"filePathRelative":"posts/crypto/PRNG/MT19937.md","localizedDate":"2024年1月26日","excerpt":"<h1> MT19937分析</h1>\\n<h2> 前言</h2>\\n<ul>\\n<li>本内容是2022发在cryptography-wiki上的文章了，现在转回到blog上</li>\\n</ul>\\n<h2> 正文</h2>\\n<ul>\\n<li>\\n<p>MT19937即梅森旋转算法（Mersenne twister）由松本眞（日语：松本真）和西村拓士在1997年开发，基于二进制有限域<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><msub><mi mathvariant=\\"double-struck\\">F</mi><mn>2</mn></msub></mrow><annotation encoding=\\"application/x-tex\\">\\\\mathbb{F}_2</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.8389em;vertical-align:-0.15em;\\"></span><span class=\\"mord\\"><span class=\\"mord mathbb\\">F</span><span class=\\"msupsub\\"><span class=\\"vlist-t vlist-t2\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.3011em;\\"><span style=\\"top:-2.55em;margin-left:0em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mtight\\">2</span></span></span></span><span class=\\"vlist-s\\">​</span></span><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.15em;\\"><span></span></span></span></span></span></span></span></span></span>上的矩阵线性递归，可以快速产生高质量的伪随机数。</p>\\n<p>该算法的周期为<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><msup><mn>2</mn><mn>19937</mn></msup><mo>−</mo><mn>1</mn></mrow><annotation encoding=\\"application/x-tex\\">2^{19937}-1</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.8974em;vertical-align:-0.0833em;\\"></span><span class=\\"mord\\"><span class=\\"mord\\">2</span><span class=\\"msupsub\\"><span class=\\"vlist-t\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.8141em;\\"><span style=\\"top:-3.063em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mtight\\"><span class=\\"mord mtight\\">19937</span></span></span></span></span></span></span></span></span><span class=\\"mspace\\" style=\\"margin-right:0.2222em;\\"></span><span class=\\"mbin\\">−</span><span class=\\"mspace\\" style=\\"margin-right:0.2222em;\\"></span></span><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.6444em;\\"></span><span class=\\"mord\\">1</span></span></span></span>，故名为MT19937。该算法具有以下优点</p>\\n<ol>\\n<li>周期非常长，为<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><msup><mn>2</mn><mn>19937</mn></msup><mo>−</mo><mn>1</mn></mrow><annotation encoding=\\"application/x-tex\\">2^{19937}-1</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.8974em;vertical-align:-0.0833em;\\"></span><span class=\\"mord\\"><span class=\\"mord\\">2</span><span class=\\"msupsub\\"><span class=\\"vlist-t\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.8141em;\\"><span style=\\"top:-3.063em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mtight\\"><span class=\\"mord mtight\\">19937</span></span></span></span></span></span></span></span></span><span class=\\"mspace\\" style=\\"margin-right:0.2222em;\\"></span><span class=\\"mbin\\">−</span><span class=\\"mspace\\" style=\\"margin-right:0.2222em;\\"></span></span><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.6444em;\\"></span><span class=\\"mord\\">1</span></span></span></span></li>\\n<li>在<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mn>1</mn><mo>≤</mo><mi>k</mi><mo>≤</mo><mn>623</mn></mrow><annotation encoding=\\"application/x-tex\\">1\\\\le k \\\\le 623</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.7804em;vertical-align:-0.136em;\\"></span><span class=\\"mord\\">1</span><span class=\\"mspace\\" style=\\"margin-right:0.2778em;\\"></span><span class=\\"mrel\\">≤</span><span class=\\"mspace\\" style=\\"margin-right:0.2778em;\\"></span></span><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.8304em;vertical-align:-0.136em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.03148em;\\">k</span><span class=\\"mspace\\" style=\\"margin-right:0.2778em;\\"></span><span class=\\"mrel\\">≤</span><span class=\\"mspace\\" style=\\"margin-right:0.2778em;\\"></span></span><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.6444em;\\"></span><span class=\\"mord\\">623</span></span></span></span>都满足<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mi>k</mi></mrow><annotation encoding=\\"application/x-tex\\">k</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.6944em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.03148em;\\">k</span></span></span></span>-分布</li>\\n<li>能比硬件实现的方法更快产生随机数</li>\\n</ol>\\n</li>\\n<li>\\n<p><strong><span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mi>k</mi></mrow><annotation encoding=\\"application/x-tex\\">k</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.6944em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.03148em;\\">k</span></span></span></span>-分布</strong>：一个周期为<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mi>P</mi></mrow><annotation encoding=\\"application/x-tex\\">P</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.6833em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.13889em;\\">P</span></span></span></span>的<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mi>w</mi></mrow><annotation encoding=\\"application/x-tex\\">w</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.4306em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.02691em;\\">w</span></span></span></span>位整数的伪随机数序列<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><msub><mi>x</mi><mi>i</mi></msub></mrow><annotation encoding=\\"application/x-tex\\">x_i</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.5806em;vertical-align:-0.15em;\\"></span><span class=\\"mord\\"><span class=\\"mord mathnormal\\">x</span><span class=\\"msupsub\\"><span class=\\"vlist-t vlist-t2\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.3117em;\\"><span style=\\"top:-2.55em;margin-left:0em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mathnormal mtight\\">i</span></span></span></span><span class=\\"vlist-s\\">​</span></span><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.15em;\\"><span></span></span></span></span></span></span></span></span></span>，如果下列成立则称其<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mi>v</mi></mrow><annotation encoding=\\"application/x-tex\\">v</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.4306em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.03588em;\\">v</span></span></span></span>-比特精度的<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mi>k</mi></mrow><annotation encoding=\\"application/x-tex\\">k</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.6944em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.03148em;\\">k</span></span></span></span>-分布成立。</p>\\n<p>令<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mi mathvariant=\\"normal\\">t</mi><mi mathvariant=\\"normal\\">r</mi><mi mathvariant=\\"normal\\">u</mi><mi mathvariant=\\"normal\\">n</mi><msub><mi mathvariant=\\"normal\\">c</mi><mi mathvariant=\\"normal\\">v</mi></msub><mo stretchy=\\"false\\">(</mo><mi mathvariant=\\"normal\\">x</mi><mo stretchy=\\"false\\">)</mo></mrow><annotation encoding=\\"application/x-tex\\">\\\\mathrm{trunc_v(x)}</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:1em;vertical-align:-0.25em;\\"></span><span class=\\"mord\\"><span class=\\"mord mathrm\\">trun</span><span class=\\"mord\\"><span class=\\"mord mathrm\\">c</span><span class=\\"msupsub\\"><span class=\\"vlist-t vlist-t2\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.1514em;\\"><span style=\\"top:-2.55em;margin-left:0em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mathrm mtight\\" style=\\"margin-right:0.01389em;\\">v</span></span></span></span><span class=\\"vlist-s\\">​</span></span><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.15em;\\"><span></span></span></span></span></span></span><span class=\\"mopen\\">(</span><span class=\\"mord mathrm\\">x</span><span class=\\"mclose\\">)</span></span></span></span></span>表示由<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mi>x</mi></mrow><annotation encoding=\\"application/x-tex\\">x</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.4306em;\\"></span><span class=\\"mord mathnormal\\">x</span></span></span></span>的前<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mi>v</mi></mrow><annotation encoding=\\"application/x-tex\\">v</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.4306em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.03588em;\\">v</span></span></span></span>位形成的数，并考虑<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mi>P</mi></mrow><annotation encoding=\\"application/x-tex\\">P</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.6833em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.13889em;\\">P</span></span></span></span>中<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mi>k</mi></mrow><annotation encoding=\\"application/x-tex\\">k</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.6944em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.03148em;\\">k</span></span></span></span>个<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><mi>v</mi></mrow><annotation encoding=\\"application/x-tex\\">v</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.4306em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.03588em;\\">v</span></span></span></span>位向量。</p>\\n<p v-pre=\\"\\" class=\\"katex-block\\"><span class=\\"katex-display\\"><span class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\" display=\\"block\\"><semantics><mrow><mo stretchy=\\"false\\">(</mo><mrow><mi mathvariant=\\"normal\\">t</mi><mi mathvariant=\\"normal\\">r</mi><mi mathvariant=\\"normal\\">u</mi><mi mathvariant=\\"normal\\">n</mi><msub><mi mathvariant=\\"normal\\">c</mi><mi mathvariant=\\"normal\\">v</mi></msub><mo stretchy=\\"false\\">(</mo><msub><mi mathvariant=\\"normal\\">x</mi><mi mathvariant=\\"normal\\">i</mi></msub><mo stretchy=\\"false\\">)</mo></mrow><mo separator=\\"true\\">,</mo><mrow><mi mathvariant=\\"normal\\">t</mi><mi mathvariant=\\"normal\\">r</mi><mi mathvariant=\\"normal\\">u</mi><mi mathvariant=\\"normal\\">n</mi><msub><mi mathvariant=\\"normal\\">c</mi><mi mathvariant=\\"normal\\">v</mi></msub><mo stretchy=\\"false\\">(</mo><msub><mi mathvariant=\\"normal\\">x</mi><mrow><mi mathvariant=\\"normal\\">i</mi><mo>+</mo><mn>1</mn></mrow></msub><mo stretchy=\\"false\\">)</mo></mrow><mo separator=\\"true\\">,</mo><mo>…</mo><mo separator=\\"true\\">,</mo><mrow><mi mathvariant=\\"normal\\">t</mi><mi mathvariant=\\"normal\\">r</mi><mi mathvariant=\\"normal\\">u</mi><mi mathvariant=\\"normal\\">n</mi><msub><mi mathvariant=\\"normal\\">c</mi><mi mathvariant=\\"normal\\">v</mi></msub><mo stretchy=\\"false\\">(</mo><msub><mi mathvariant=\\"normal\\">x</mi><mrow><mi mathvariant=\\"normal\\">i</mi><mo>+</mo><mi mathvariant=\\"normal\\">k</mi><mo>−</mo><mn>1</mn></mrow></msub><mo stretchy=\\"false\\">)</mo></mrow><mo stretchy=\\"false\\">)</mo><mtext>&nbsp;</mtext><mo stretchy=\\"false\\">(</mo><mn>0</mn><mo>≤</mo><mi>i</mi><mo>&lt;</mo><mi>P</mi><mo stretchy=\\"false\\">)</mo></mrow><annotation encoding=\\"application/x-tex\\">\\n(\\\\mathrm{trunc_v(x_i)},\\\\mathrm{trunc_v(x_{i+1})},\\\\dots,\\\\mathrm{trunc_v(x_{i+k-1})})\\\\ (0\\\\le i&lt; P)\\n</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:1em;vertical-align:-0.25em;\\"></span><span class=\\"mopen\\">(</span><span class=\\"mord\\"><span class=\\"mord mathrm\\">trun</span><span class=\\"mord\\"><span class=\\"mord mathrm\\">c</span><span class=\\"msupsub\\"><span class=\\"vlist-t vlist-t2\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.1514em;\\"><span style=\\"top:-2.55em;margin-left:0em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mathrm mtight\\" style=\\"margin-right:0.01389em;\\">v</span></span></span></span><span class=\\"vlist-s\\">​</span></span><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.15em;\\"><span></span></span></span></span></span></span><span class=\\"mopen\\">(</span><span class=\\"mord\\"><span class=\\"mord mathrm\\">x</span><span class=\\"msupsub\\"><span class=\\"vlist-t vlist-t2\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.3175em;\\"><span style=\\"top:-2.55em;margin-left:0em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mathrm mtight\\">i</span></span></span></span><span class=\\"vlist-s\\">​</span></span><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.15em;\\"><span></span></span></span></span></span></span><span class=\\"mclose\\">)</span></span><span class=\\"mpunct\\">,</span><span class=\\"mspace\\" style=\\"margin-right:0.1667em;\\"></span><span class=\\"mord\\"><span class=\\"mord mathrm\\">trun</span><span class=\\"mord\\"><span class=\\"mord mathrm\\">c</span><span class=\\"msupsub\\"><span class=\\"vlist-t vlist-t2\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.1514em;\\"><span style=\\"top:-2.55em;margin-left:0em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mathrm mtight\\" style=\\"margin-right:0.01389em;\\">v</span></span></span></span><span class=\\"vlist-s\\">​</span></span><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.15em;\\"><span></span></span></span></span></span></span><span class=\\"mopen\\">(</span><span class=\\"mord\\"><span class=\\"mord mathrm\\">x</span><span class=\\"msupsub\\"><span class=\\"vlist-t vlist-t2\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.3175em;\\"><span style=\\"top:-2.55em;margin-left:0em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mtight\\"><span class=\\"mord mathrm mtight\\">i</span><span class=\\"mbin mtight\\">+</span><span class=\\"mord mathrm mtight\\">1</span></span></span></span></span><span class=\\"vlist-s\\">​</span></span><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.2083em;\\"><span></span></span></span></span></span></span><span class=\\"mclose\\">)</span></span><span class=\\"mpunct\\">,</span><span class=\\"mspace\\" style=\\"margin-right:0.1667em;\\"></span><span class=\\"minner\\">…</span><span class=\\"mspace\\" style=\\"margin-right:0.1667em;\\"></span><span class=\\"mpunct\\">,</span><span class=\\"mspace\\" style=\\"margin-right:0.1667em;\\"></span><span class=\\"mord\\"><span class=\\"mord mathrm\\">trun</span><span class=\\"mord\\"><span class=\\"mord mathrm\\">c</span><span class=\\"msupsub\\"><span class=\\"vlist-t vlist-t2\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.1514em;\\"><span style=\\"top:-2.55em;margin-left:0em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mathrm mtight\\" style=\\"margin-right:0.01389em;\\">v</span></span></span></span><span class=\\"vlist-s\\">​</span></span><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.15em;\\"><span></span></span></span></span></span></span><span class=\\"mopen\\">(</span><span class=\\"mord\\"><span class=\\"mord mathrm\\">x</span><span class=\\"msupsub\\"><span class=\\"vlist-t vlist-t2\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.3361em;\\"><span style=\\"top:-2.55em;margin-left:0em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mtight\\"><span class=\\"mord mathrm mtight\\">i</span><span class=\\"mbin mtight\\">+</span><span class=\\"mord mathrm mtight\\">k</span><span class=\\"mbin mtight\\">−</span><span class=\\"mord mathrm mtight\\">1</span></span></span></span></span><span class=\\"vlist-s\\">​</span></span><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.2083em;\\"><span></span></span></span></span></span></span><span class=\\"mclose\\">)</span></span><span class=\\"mclose\\">)</span><span class=\\"mspace\\">&nbsp;</span><span class=\\"mopen\\">(</span><span class=\\"mord\\">0</span><span class=\\"mspace\\" style=\\"margin-right:0.2778em;\\"></span><span class=\\"mrel\\">≤</span><span class=\\"mspace\\" style=\\"margin-right:0.2778em;\\"></span></span><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.6986em;vertical-align:-0.0391em;\\"></span><span class=\\"mord mathnormal\\">i</span><span class=\\"mspace\\" style=\\"margin-right:0.2778em;\\"></span><span class=\\"mrel\\">&lt;</span><span class=\\"mspace\\" style=\\"margin-right:0.2778em;\\"></span></span><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:1em;vertical-align:-0.25em;\\"></span><span class=\\"mord mathnormal\\" style=\\"margin-right:0.13889em;\\">P</span><span class=\\"mclose\\">)</span></span></span></span></span></p>\\n<p>然后，<span v-pre=\\"\\" class=\\"katex\\"><span class=\\"katex-mathml\\"><math xmlns=\\"http://www.w3.org/1998/Math/MathML\\"><semantics><mrow><msup><mn>2</mn><mrow><mi>k</mi><mi>v</mi></mrow></msup></mrow><annotation encoding=\\"application/x-tex\\">2^{kv}</annotation></semantics></math></span><span class=\\"katex-html\\" aria-hidden=\\"true\\"><span class=\\"base\\"><span class=\\"strut\\" style=\\"height:0.8491em;\\"></span><span class=\\"mord\\"><span class=\\"mord\\">2</span><span class=\\"msupsub\\"><span class=\\"vlist-t\\"><span class=\\"vlist-r\\"><span class=\\"vlist\\" style=\\"height:0.8491em;\\"><span style=\\"top:-3.063em;margin-right:0.05em;\\"><span class=\\"pstrut\\" style=\\"height:2.7em;\\"></span><span class=\\"sizing reset-size6 size3 mtight\\"><span class=\\"mord mtight\\"><span class=\\"mord mathnormal mtight\\" style=\\"margin-right:0.03148em;\\">k</span><span class=\\"mord mathnormal mtight\\" style=\\"margin-right:0.03588em;\\">v</span></span></span></span></span></span></span></span></span></span></span></span>个组合中每一个都在一个周期内出现次数相同（全0组合出现次数较少除外）。</p>\\n</li>\\n</ul>","autoDesc":true}');export{s as data};