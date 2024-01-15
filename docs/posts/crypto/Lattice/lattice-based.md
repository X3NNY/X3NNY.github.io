---
date: 2024/01/15
star: true
isOriginal: true
category:
    - 密码学
tag:
    - Lattice
---
# 再探格密码

关于格密码的学习从很久以前已经开始，本篇博文主要是从头梳理再做一次系统的记录。

## 前言

### 什么是格

我们可以这样定义格，它是一组向量在$n$维空间中有着周期性的点集，或者说对于$n$个线性无关的向量$v_1,v_2,\dots,v_n \in \mathbb{R}^n$，这些向量的整系数组合构成的点集即为一个格，即

$$L(v_1, v_2, \dots, v_n) := \left\{\sum_{i=1}^n{\alpha_iv_i} \Big| \alpha_i\in\mathbb{Z} \right\}$$

我们把$v_1, v_2, \dots, v_n$称为格$L$的一组**基**。

![Fig.1 一个$\mathbb{R}^2$中格的两组基](https://www.nssctf.cn/files/2024/1/14/dd0f0ab294.png) 

从18世纪开始，拉格朗日、高斯和闵可夫斯基等数学家都对格有研究。不过我们主要是看格在密码学中的应用，1996年Ajtai发现格不仅可以用来分析密码还可以来构建密码，同时发现用格来构建密码体系的安全性基于格问题的最坏情况。所以只要解决了某一格密码体系，就可以解决基于此类格问题构建的任何密码（其他密码体系都是基于平均性假设）。

上面这句话的意思就是在格密码体系中我们可以避免很多特殊要求，例如在RSA中，我们构建$N$时要避免选择一些特殊的因子（因为可能会让分解很容易，关于特殊因子导致的RSA分解例子太多了），所以此时我们相当于是一个黑名单机制，不断地选择因子，不断地发现一些因子“不好”，从而避免选择它们。而在格密码中，我们无须考虑这类问题，因为攻击同规格的格问题难度几乎一致。

同时格密码还有下列优势

1. 涉及的计算简单，因为都是有限域运算。
2. 抗量子攻击，这很重要。

### 格问题

SVP（最短向量问题）是格中最主要的问题。其内容为给定一个格基，找出格中的最短非零向量，在高维格中这是一个困难问题，所以我们更多关注它的变体，例如

1. apprSVP（近似最短向量问题），找到近似最短非零向量$s_i$，满足$\lVert s_i\rVert\le \gamma\lVert u\rVert$，其中$u$代表格中其他任意向量。
2. SIVP（最短线性无关向量问题），找到$n$个线性无关向量$s_i$，满足$\lVert s_i\rVert\le \Lambda_n(L)$
3. uSVP（唯一最短向量问题），找到最短非零向量$s_i$，满足它比**所有**其他非平行最短向量短。
4. CVP（最近向量问题），给定目标向量$t\in \mathbb{R}^n$，找到格中非零向量$s_i$，满足$\lVert s_i -t\rVert \le \lVert s_j -t\rVert$，其中$s_j$代表格中其他非零向量。

SVP的难度来自于格中有不同的基，现在我们经常使用的LLL算法难度近似为$2^{O(n)}$，不过它在应用中总是很有效，只能说可能是LLL的界太松了，后续还有很多其他优化后的其他算法，但对于要求SVP的解还是需要$2^{O(n)}$的运算时间。

对于apprSVP，一般我们认为$n^c$-apprSVP当$c\ge\frac{1}{2}$时非常困难，这里的$n^c$为多项式因子，代表随着n的增大，算法所需时间将呈多项式增长。

### 格应用

#### 哈希函数

Ajtai最初提出了一类单向函数 [2]，安全性基于$n^c$-apprSVP的最坏难度，后续的工作都是来减少常数$c$来提高安全上限。

上述内容都是利用格来构造哈希函数提高抗碰撞能力，因为这不是我的研究方向，故在此不做深究。

#### 公钥密码

Ajtai在上述的基础上又和Dwork构建了一个公钥密码体系，其安全性基于uSVP的最坏难度，这里我们只看一下改进后的该密码系统 [3]

给定大整数$N$，选取私钥$h\in[\sqrt{N}, 2\sqrt{N}]$，公钥为从$0,1,\dots,N-1$中选取$m$（$m=O(\log N)$）个数$a_1,\dots,a_m$，并且要求他们满足都接近$N/h$的整数倍，并且包含一个索引$i_0\in [m]$要求$a_{i_0}$接近$N/h$的奇数倍。

加密时进行按位加密，对于比特0，将$\{a_1,\dots,a_m\}$的随机子集求和并模$N$，对于比特1，则在求和时加上$\lfloor a_{i_0}/2\rfloor$。

解密时则将$w$模$N/h$，如果余数很小则为0，否则为1。

正确性证明：$a_1,\dots,a_m$都接近$N/h$整数倍，所以任意子集之和也接近$N/h$整数倍，所以对于0的加密结果模$N/h$的余数很小，同理$\lfloor a_{i_0}/2\rfloor$不接近$N/h$整数倍，所以1的加密结果模$N/h$余数很大。

安全性证明涉及到上述抗碰撞哈希函数的安全性证明，大致就是像格中添加足够的高斯噪音，得到一个接近均匀分布的分布，再从这个分布的统计距离来分析格问题的困难度，详细可参照 [1] 中第六节内容。

很明显上述密码体系相对于如今的格密码体系效率非常之低，用$n$维的格就需要$O(n^4)$大小的公钥，且每个加密比特都会变成$O(n^2)$大小，显然不符合如今的加密系统需求。

后续Regev提出了基于格基的LWE问题密码体系 [4]，关于LWE不会在本篇做过多介绍，后面可能我会写单独的博文，它基于SVP的最坏情况量子难度，也就是说破解该密码就能有高效的量子算法攻击apprSVP，不过注意上述两个密码系统安全性无法比较优劣，一是第一个基于uSVP而不是SVP，二是LWE显示出SVP可能有量子算法。不过目前还没有量子算法可以超越经典算法解决格问题，所以我们依然可以任务在量子情况下格问题也是困难的。

## 格的性质

上面我们介绍了一些关于格的基本定义和历史工作，从这里开始我们将系统性学习格相关理论和性质。

### 格定义

在群论中，我们通常将格定义为$\mathbb{R}^n$的离散子群，它们的具体定义如下：

离散性：设$D$是$\mathbb{R}^n$的一个子集，当它没有聚点时，即任意$x\in D$，都存在$r>0$使得$\mathcal{B}(x, r)\cap D = \{x\}$，其中$\mathcal{B}(x, r) = \{y\in \mathbb{R}^n: \lVert x - y\rVert < r\}$，简单点说就是以该点为圆心半径为$r$的球内没有其他点。

格：$(\mathbb{R}^n, +)$的加法子群，如果它具有离散性则称为格

关于格结构的抽象定义我们只了解到此，我们更关注计算上的内容。在前面我们已经描述了使用线性无关的向量组作为一组基来表示或者说生成格，对于基向量构成的矩阵$B$成为格的格基，则格的表示可以写为

$$
L(B) := \{Bx : x\in\mathbb{Z}^n\}
$$

接下来我们来考虑格的秩，格的秩$d$即子空间$\mathrm{span}(L)$的维度，注意格并不一定是满秩的，因为并不要求这组线性无关向量的个数是$n$，当且仅当$d=n$时格才是满秩的。

还要注意的是，格基一定是构成子空间的一个极大无关向量组，但子空间的每个极大无关向量组不一定能构成格基。对于$\mathbb{R}^n$中的秩为$d$的格，如果$B=(b_1,\dots,b_d)$是$d$个无关向量，当且仅当不存在非零格向量$x\in L$使得$x\in P(B)$时$B$为$L$的一组基。其中$P(B)$代表一组向量生成的最小线性子空间（parallelepiped span），或者说n维平行空间。

$$P(B) = \left\{\sum_{i=1}^m{\lambda_i b_i} : |\lambda_i|<1\right\}$$

充分必要证明：因为$B$是格基，则每个向量都可以由$B$的整系数组合构成，也就是$x = \sum_{i=1}^d{\lambda_i b_i},\ \lambda_i\in\mathbb{Z}$，如果$x\in P(B)$，则$|\lambda_i|<1$，此时只有格点即零向量在$P(b)$中。反之如果$B$不是格基，则格中存在非零向量$x\in P(B)$，因为此时$x$不是$B$的整系数线性组合，又因为$B$也是$L$中$d$个无关向量，$\mathrm{span}(L) = \mathrm{span}(B)$，所以$x$能被$B$表示（但系数不全是整数）,记

$$
x = \sum_{i=1}^d{\lambda_i b_i}
$$

同时我们考虑对$\lambda_i$取整，记

$$
x^{'} = \sum_{i=1}^d{\lfloor\lambda_i\rfloor b_i}
$$

因为$x^{'}$是格向量组的整系数组合，所以定然有$x^{'}\in L$，又因为$L$是一个加法子群，则他们的差也属于格$L$（封闭性），则有

$$y=x-x^{'}=\sum_{i=1}^{d}(\lambda_i-\lfloor\lambda_i\rfloor)b_i$$

又因为$0\le\lambda - \lfloor\lambda_i\rfloor<1$，所以$y\in P(b)$，并且$y$还不能是零向量，因为之前说了$\lambda_i$不全是整数。引用一下 [5]中的例图，下图$b_1,b_2$虽然是$\mathbb{Z}^2$的极大线性无关组，但因为存在非零向量属于$P(B)$，所以$B$不能作为$\mathbb{Z}^2$的格基，其实也就是有些点无法被覆盖（整系数线性表示）到，如果上面的数学描述看不懂的话看图应该就很轻松了。

![$b_1$和$b_2$张成的格和$\mathbb{Z}^2$的区别](https://www.nssctf.cn/files/2024/1/14/0b3e3e4da1.png) 

实际上上面阐述的内容简单点理解就是不仅需要极大无关向量组，还需要这组向量是完备的，能够表示格中的其他任意向量。

从这里我们还能得到一个性质就是一定可以从一组极大无关向量组$b_1,\dots,b_d$中找出一组格基，存在$d\times d$的下三角矩阵$(u_{ij}\in \mathbb{R}^{d\times d})$能够构造向量组$c_i=\sum_{j=1}^i{u_{ij}b_j}$使得$(c_1,\dots,c_d)$是$L$的一组基（因为下三角阵乘上$B$不改变线性无关性，所以总是能从中构造出一组基）。由此可以得出结论，$\mathbb{R}^n$空间中的格一定至少有一组基。

### 模体积（Volume）

对于秩为$d$的格$L$，一组格基为$B = (b_1,\dots,b_d)$，则

$$
\mathrm{vol}(L) = \Delta(b_1, \dots, b_d)^{1/2} = \sqrt{\det(B^TB)}
$$

简单点说，格的模体积就是格基矩阵行列式的绝对值。对于格中的不同格基，都可以通过乘上一个行列式为$\pm 1$的单位矩阵来进行变换，所以同一个格无论取哪一组格基，其$\mathrm{vol}(L)$都不变，反过来说属于不同格的格基其$\mathrm{vol}(L)$不相同。

还有另一种定义模体积的方式，对于$\mathbb{R}^n$中的满秩格$L$，有$r>0$

$$
\mathrm{vol}(L) = \lim_{r\rightarrow\infty}{\frac{V_{r}}{|\mathcal{B}(0, r)\cap L|}}
$$

这里就是说记以格点为中心半径为$r$的$n$维球$\mathcal{B}(0, r)$中的格点数为$N(r)$，$n$维球的体积是$V_{r}$，根据测度理论，$r$足够大时，$\mathcal{B}(0, r)$中的格点数近似等于其中的向量数，因此有上述模体积的定义。

### 派生格

- 子格

    如果格$L\in\mathbb{R}^n$的子集$M\subset L$且$M$也是格，则$M$称为$L$的子格。每个子格都是子群，同时每个具有离散性的子群也都是子格，当$\dim(M)=\dim(L)$是称为全秩子格（full-rank）。

    不同于子空间，子格和$L$能有相同的秩但不等于$L$，此时考虑商集$L/M$，其中的元素个数我们称为群指数（group index），记为$[L: M]$，对于全秩子格$M$来说，有

    $$
    \mathrm{vol}(M) = \mathrm{vol}(L)[L: M]
    $$

    不是全秩子格的秩严格小于$d$，所以群指数无限大，则没有上述关系。

    还有一个重要的子格关系为原始子格（primitive sublattice），对于秩为$d$的格$L$，当且仅当秩为$k$的子格$M$的基$B$可以通过添加$d-k$个向量扩充为原格的一个基，则称$M$为原始子格。

- 投影格（Projected lattices）

    将格投影到某个子空间上形成投影格，当然投影时仍需保证结果是离散的。对于秩为$d$的格$L$，选取一个秩为$r$的原始子格$M\subset L$，定义投影$\pi_M := \pi_{\mathrm{span}(M)}$为投影在包含$M$的最小子空间的正交补（orthogonal complement）上，则$\pi_M(L)\in \mathbb{R}^n$是一个秩为$d-r$的投影格，且模体积为$\mathrm{vol}(L)/\mathrm{vol}(M)$。

    这里还有关于投影格得到降秩的推论，不过此类内容还是遇到投影格的应用再写吧。

- 对偶格（Dual lattice）

    一个格的每个元素都能视作另一个格的元素，对于格$L$，对偶格$L^{\times}$为

    $$
    L^{\times} = \{y\in \mathrm{span}(L) : \langle x,y\rangle\in\mathbb{Z}\ |\ x\in L\}
    $$

    如果$L$满秩，设$B$是格$L$的基，任何格向量都可以写成$x=Bx^{'},\ x^{'}\in \mathbb{Z}^n$。相反$\mathbb{Z}^n$中的每个$x^{'}$都能变成一个格向量，对于对偶向量$y$，则

    $$
    \langle x,y\rangle = \langle Bx^{'},y\rangle = \langle x^{'},B^T y\rangle \in \mathbb{Z}
    $$

    即内积$\langle x,y\rangle$为整数。此时考虑$x^{'}$为单位向量，显然可以得到分量$B^T y$也是整数，所以$y^{'}=B^T y$是一个整数向量，等价于对于$y = (B^T)^{-1}y^{'}$，有$L^{\times}\sube \{(B^T)^{-1}y^{'}|y^{'}\in\mathbb{Z}^n\}$。即每个$y^{'}$也能得到一组对偶向量，即

    $$
    \langle x^{'},y^{'}\rangle = \langle x^{'},(B^T)(B^T)^{-1}y^{'}\rangle = \langle Bx^{'},(B^T)^{-1}y^{'}\rangle = \langle x, y \rangle
    $$
    
    对偶格的模体积为$\mathrm{vol}(L)^{-1}$，在对偶格中，可以把问题转化为另一种形式来简化问题进行求解，在格攻击的例子中或许我会写道对偶格的用法。

    其中还有一类特殊的格与正交格很相似，称为正交格（orthogonal lattice），对于不满秩的整格$L$，正交格定义为

    $$
    L^{\bot} = \{y\in\mathbb{R}^{n}:\langle x,y\rangle = 0 | x \in L\}
    $$

### Gram Schmidt正交化

这个理论上在学线代的时候就都学过了，这里就不再记录分享了。简单来说就是将向量组变成正交向量组的一种方法，因为后续会提到GSO（Gram Schmidt Orthogonalization）向量这里写一下。

## 再究格问题

之前我们已经介绍过格问题的定义，这里我们将深入讲解这些问题之间的联系以及如何解决它们。

### SVP归约为CVP

一般我们认为同维度下CVP比SVP更难，如果解决了CVP都能解决相应的SVP，因为SVP可以按照下列方法转为CVP求解。

设格基为$B = [b_1, \dots, b_d]$，定义格基$B^{(j)} = [b_1, \dots, b_j-1, 2b_j, b_{j+1}, \dots, b_d]$，此时假设有个CVP预言机，给定$(B^{(j)}, b_j)$代表格基为$B^{(j)}$目标向量为$b_j$求解CVP，返回为$v_j$，对所有的$1\le j \le d$ 都做这个操作，最后我们可以得到$v_1-b_1,\dots,v_d-b_d$便是格$L(B)$的最短向量。

这个思路非常巧妙，显然$v_i$是格中的向量，由于封闭性$v_i-b_i$也是格中向量，又由于它们两两非常接近，很大概率它们就是SVP的解。证明如下

1. 对于$u = \sum{\lambda_i b_i}$是格的最短非零向量，则至少存在一个$\lambda_i$为奇数

2. 考虑$v=u+b_j$是格$L(B^{(j)})$中向量（显然）且二者距离$\mathrm{dist}(v,b_j) = \lVert u\rVert$

3. 构造$v=\lambda_j(2b_j) + \sum_{i\not = j}\lambda_ib_i$符合上述要求且是格中向量。

考虑$u = v - b_j = (2\lambda_j-1)b_j + \sum_{i\not = j}\lambda_ib_i - b_j$是$L(B)$的最短向量，因为根据(1)得至少存在一个奇系数。根据(2)有对于参数$(B^{(j)}, b_j)$CVP的解$v$要满足到$b_j$的距离不能超过$\mathrm{dist}(v,b_j) = \lVert u\rVert$，而最短向量长度等于这个距离差值，也就代表在所有的参数$(B^{(j)}, b_j)$CVP的解中至少有一个解是SVP的解。上述三个命题的证明就不再说了，详细证明可见 [5]

### 量化嵌入

同理我们还可以考虑是否有方法将CVP转化为SVP，存在一种启发式方法利用嵌入技术（Embedding technique）将CVP转化为SVP，由Goldreich、Goldwasser和Halevi在1997年提出，详见 [7]

对于格$L(B)$，其中格基$B = [b_1, \dots, b_n]$，对于CVP的目标向量为$c$，则我们可以构造

$$
B^{'} = \begin{pmatrix}
    \vert&\vert&&\vert\\
    c&b_1&\cdots&b_n\\
    \vert&\vert&&\vert\\
    1&0&\dots&0
\end{pmatrix}
$$

显然$B^{'}$行列式与$B$相同，所以$L(B^{'})$的模体积也与$L$相同。我们考虑上述CVP的解为$x=\sum{\lambda_ib_i}$，则此时$(c-x,1)$（因为$L(B^{'})$秩是$n+1$）便是$L(B^{'})$的SVP解，反过来找到了这个格的SVP解便可以得到对于格$L$、目标项链为$c$的CVP解。

## 格基归约

格基归约的目的是为了找到最短向量，1982年，Lenstra、Lenstra和Lov´asz发表了Lenstra-Lenstra-Lov´asz算法（LLL），这是一种基于Hermite不等式的格子基底缩减算法，能够找到一个近似最短非零向量的短向量。在了解下面的解决问题方法前我们需要先阐述一些定义和理论。

- 第$i$小向量模长：对于秩为$d$的格$L$，定义第$i$小向量模长$\lambda_i(L)$为

    $$\lambda_i(L) = \underset{u_1,\dots,u_i\in L}{\min}\max_{1\le j\le i}{\lVert u_j\rVert}$$

    其中$u_1,\dots,u_i$线性无关，也就是取最长向量的第$i$个最小值。此时得到的序列$\{\lambda_i\}$是非递减的，因为可能有多个无关向量同时取最小值。而我们要做的就是找到这样的格基使得整个序列全局最小，这样我们便可以取解决一些列最短向量问题。

    但是有些时候这些无关向量并不一定是格基，且对于高维格，同时达到最小值得基可能不一定存在，所以此时我们还需要使用不同的方法来确定格中最小向量长度。

    之前我们使用测度理论定义了格的模体积，我们去掉极限号，将等式变为

    $$
    \frac{V_r}{\mathrm{vol}(L)} \approx |\mathcal{B}(0,r)\cap L|
    $$

    此时我们可以用很巧妙的方法来找到最短向量，对于最短向量，也就意味着以最短向量模长为半径的$n$维球体内只包含一个向量，即等式的右边取值为1，则此时我们可以使用斯特林公式去近似$n$维球体积中参数（这里涉及$n$维球体积公式，在此不做介绍）来得到半径的近似解

    $$
    r \approx \sqrt{\frac{n}{2\pi e}}(\mathrm{vol}(L))^{1/n}
    $$

    由此我们可以得到一种新的方式定义格$L$中最短向量长度的定义

    $$
    \sigma(L) = \sqrt{\frac{n}{2\pi e}}(\mathrm{vol}(L))^{1/n}
    $$

这很cool，意味着我们终于能够知道要找的最短模长是多长了，不过不好的消息的上述内容是高斯启发（Gaussian Heuristic），因为我们是“期望”格$L$在$C\in \mathbb{R^n}$的数量$L\cap C$是$\mathrm{vol}(C)/\mathrm{vol}(L)$，但很多时候所构造的格并不满足这一特征，所以我们需要继续了解其他人的工作。

Hermite首次证明了最短向量模长的上界，在他的原始工作研究基于格的二次型，中定义了Hermite常数$\gamma_d$是所有秩为$d$的格中$\lambda_1(L)^2/\mathrm{vol}(L)^{2/d}$，由此可以得到最短向量模长上界为

$$
\lambda_i(L) \le \sqrt{\gamma_d}\mathrm{vol}(L)^{1/d}
$$

不过这又引出了新的问题，$\gamma_d$的值是多少，实际上在高维格中求$\gamma_d$的值也是一个困难问题，但Hermite给出了`Hermite不等式`证明了$\gamma_d$的上界

Hermite不等式：$\gamma_d  \le \gamma_2^{d-1}$，对于$d\ge 2$时，$\gamma_2 = \sqrt{4/3}$。证明详见 [6]

后续基于Minkowski凸体的定理还可以得到关于$\gamma_d$的线性上下界，在此不在一一介绍，

### 一些思路

- Size-reduction

    不适用特殊情况，不过后续会用到这里的内容，还是在这里写一下

    一组基当GSO-投影系数满足$|\mu_{ij}\le 1/2|$时称为`size-reduced`

- Gauss-reduction

    在18世纪末，Lagrange和Gauss都发明了一种将秩为2的格基二次型归约算法。 它包含如下步骤

    1. 选取两个基向量$b_1,b_2$，若$\langle b_1, b_2\rangle \not = 0$，则进行正交化得到正交向量。

    2. 对上述得到的正交向量进行单位化，作为格的新格基

    （学过线代的应该对这一套流程非常熟悉）

- HKZ-reduction（Hermite-Korkine-Zolotarev-reduce）

    对于一组基当满足`size-reduced`的基础且$\lVert b_i^{*}\rVert = \lambda_i(\pi_i(L))$时称为HKZ-reduced，其中$b_i^{*}$代表$b_i$的GSO-投影

    然后我们可以得到如下结论

    $$
    \frac{4}{i+3}\le \left(\frac{\lVert b_i\rVert}{\lambda_i(L)}\right)^2\le \frac{i+3}{4}
    $$

    上述不等式的上下界分别由可见 [8]，[9]。最后这些HKZ归约得到的$b_i^{*}$便是新格基。

### 归约算法

上述思路部分的算法我们就不再介绍了，这里我们主要介绍今天常用的LLL算法。

对于格基$[b_1,\dots,b_d]$，当因子$\delta\in(\frac{1}{4}, 1)$且能`size-reduced`且满足

$$
\delta\lVert b_i^{*}\rVert^2\le \lVert b_{i+1}^{*} + \mu_{i+1,i}b_{i}^{*}\rVert^2
$$

时称为LLL-reduced，这个不等式也叫做Lovász条件。

![LLL算法](https://www.nssctf.cn/files/2024/1/15/7b32f63bb1.png)

其实也就是不断地进行GSO，然后将替换符合Lovász条件的向量继续GSO。LLL算法是一个多项式时间复杂度的算法，由于它的出现，后续有了非常多基于格归约的密码攻击方法。

### Babai方法和BKZ算法

Babai在1986年发表了两种求解CVP近似解的方法，可以将LLL应用于给定的格基来减少基向量模长从而得到CVP的解。详细可见Babai原始论文 [10]。

对于格基$B$，目标向量为$c$的CVP，Babai具体操作为

  1. 对格基进行LLL得到新的格基$B^{'}$
  2. 找到线性组合满足$w = \sum{\lambda_i b^{'}_i}$最接近$c$
  3. 将线性组合系数取整得到$\{\lambda_i^{'}\}$
  4. 返回结果$v = \sum{\lambda_i^{'}b^{'}_i}$即为CVP的一个近似解。

后续Schnorr在Babai等的基础上提出了BKZ归约算法（Block-Korkine-Zolotarev reduction），它主要工作便是在HKZ和LLL中进行折中选择，增加运行时间提高解的精度。

对于一组格基$[b_1, \dots, b_d]$，系数$2 \le \beta \le d$，当可`size-reduced`且满足

$$
\delta\lVert b_i^{*}\rVert^2 \le \lambda_1(\pi_i(L(b_1, \dots, b_{\min(i+\beta-1, d)})))^2
$$

时称为`BKZ-reduced`，便可以以此得到一组新的格基，具体算法如下。

![BKZ格归约算法](https://www.nssctf.cn//files/2024/1/15/858261e590.png) 

## 格基密码

下面内容主要展示一些利用格基归约来攻击这些密码算法的方式，以及其中关于分析模长和配平的一些操作。关于每种密码的详细介绍可能会开新的博文单独撰写。

### 背包密码（Knapsack）

这里只对背包密码算法做一个简单的介绍

私钥为一个超递增序列$\{a_n\}$，满足$a_i > \sum_{k=1}^{i-1}{a_k}$，模数$m$，满足$m > \sum_{i=1}^{n}{a_i}$，乘数$w$，满足$\gcd(w,m)=1$。

公钥为$\{b_i\}$，满足$b_i \equiv wa_i \pmod{m}$

加密：设明文为$\{v_i\}, v_i\in\{0,1\}$，则密文

$$
c \equiv \sum_{i=1}^{n}{b_iv_i}\pmod{m}
$$

解密：明文为

$$
v = w^{-1}c \equiv \sum_{i=1}^{n}{v_ia_i} \pmod{m}
$$

可以构造格

$$
L = \begin{pmatrix}
    1&0&0&\cdots&0&b_1\\
    0&1&0&\cdots&0&b_2\\
    0&0&1&\cdots&0&b_2\\
    \vdots&\vdots&\vdots&\ddots&\vdots&\vdots\\
    0&0&0&\cdots&1&b_n\\
    0&0&0&\cdots&0&-c\\
\end{pmatrix}
$$

其中$v = (v_1, v_2, \dots, v_n, 0)$是一个格点，接下来要做的便是证明它是最短非零向量，这样我们才可以用LLL求解得到。

显然这个格的模体积$\mathrm{vol}(L) = c$，则有

$$
\sigma(L(B)) \ge \sqrt{\frac{n}{2\pi e}}c^{1/(n+1)}
$$

也就是只要$\lVert v\rVert \le \sigma(L(B))$，说明我们构造的$v$便是SVP的解（或者说近似解），而在01背包中$\lVert v\rVert \approx \sqrt{n/2}$，也就是当$\frac{1}{\pi e} c^{1/(n+1)}\ge 1$时便很大概率可以通过LLL找到这组解，但是到此我们的分析并没有那么精确，关于这里具体取何值能够攻击成功可以参考 [12]。

对于背包密码的工作不止于此，后续Coster、Joux等人还在这个格的基础上再次优化，提高了攻击上限，详情可见 [13]。

### NTRU

关于NTRU的详细介绍可见 [14]，它是一种安全性基于多项式环上的SVP构造的公钥密码体系，目前也是后量子密码的热点算法，因为其相比其他后量子公钥密码速度很快。

![一维NTRU](https://www.nssctf.cn/files/2024/1/15/fe0fa2b28a.png) 

这里直接引用的是 [15]中对NTRU介绍的例子，生成了一个一维NTRU公私钥。显然可以构造格

$$
L = \begin{pmatrix}
    1&h\\
    0&q
\end{pmatrix}
$$

则有格点$v = (f, g)$，模长为$\sqrt{f^2+g^2} < \sqrt{q}$，显然这里的最短向量期望为

$$
\sigma(L) = \mathrm{vol}(L)^{1/2} = \sqrt{q}
$$

所以我们可以认为$v$就是SVP的解或近似解，从而可以通过LLL得到私钥。不过实际上我们在攻击时目标可能并不完全符合密码标准或者说是一类自定义的密码体系，例如对于这个例子，如果我们让$f$的值变得更大，就会导致$\lVert v\rVert > \sigma(L)$，从而不一定能够从LLL得到解，所以很多时候在实际攻击时我们需要对构造的格进行配平。

所谓配平，核心就是在不影响格点关系的情况下增大格的模体积，使得最短向量期望值变得更大，从而让我们想要的目标向量变成SVP的解或近似解，我们可以给原格点较小的一列乘上一个数$D$，例如现在是

$$
(f, -k)L = (f, g)
$$

则我们变成

$$
(f, -k)\begin{pmatrix}
    1&Dh\\
    0&Dq
\end{pmatrix} = (f, Dg)
$$

此时我们的目标向量变成$(f, Dg)$，而$D$的取值和$f$与$g$的插值有关，一般来说我们的目的就是让向量在每个方向的长度都一致，即变得“更平”。因为对于最短向量来说，某列乘上一个数对模长的影响是累加的，而对格模体积的影响是累乘的，这样我们就可以在原做法的基础上得到一个更大的解的上界。

### LWE

本想是在这里写LWE的简单介绍以及上述关于SVP、CVP问题相互转换的实际应用在格攻击LWE密码算法中的体现，不过写的时候发现干脆和RLWE一起介绍。所以准备等介绍格在多项式中应用时再来讲这些内容吧。

## SVP因子测量

鸽了，现在还停留在应用层面，之后如果涉及到要进行问题难度分析在来写这个吧，以及前面提到的“添加足够的高斯噪音”分析困难度的内容。

## 后记

本篇博客本只写了“前言”部分的内容，写完再回顾发现很多内容并没有说清楚，故干脆将那些内容作为“前言”部分进行普及格知识以及发展历史，后续从格的性质开始介绍格的各种属性以及各类问题的解决方式。最后讲了一点实际的攻击例子。

作为新博客的第一篇博文，顺便在这里提及一下关于“密码学”栏目的构成，在这里我不会写太多CTF中实际题目的应用及代码，更多的是从历史论文中学习各类知识的历史的本质。关于CTF中的密码题目我可能会新开一个栏目专门只写题目WP。

## Reference

[1] Regev O. Lattice-based cryptography[C]//Annual International Cryptology Conference. Berlin, Heidelberg: Springer Berlin Heidelberg, 2006: 131-141.

[2] Ajtai, M.: Generating hard instances of lattice problems. In: Proc. 28th ACM Symp. on Theory of Computing. (1996) 99–108 Available from ECCC at http://www.uni-trier.de/eccc/.

[3] Regev, O.: New lattice-based cryptographic constructions. Journal of the ACM 51(6) (2004) 899–942 Preliminary version in STOC’03.

[4] Regev, O.: On lattices, learning with errors, random linear codes, and cryptography. In: Proc. 37th ACM Symp. on Theory of Computing (STOC). (2005) 84–93

[5] van de Pol J. Lattice-based cryptography[J]. Eindhoven University of Technology, Department of Mathematics and Computer Science, 2011.

[6] C. Hermite. Extraits de lettres de M. Ch. Hermite a M. Jacobi sur differents objets de la th´eorie des nombres, Deuxi`eme lettre du 6 aoˆut 1845. J. Reine Angew. Math, 40:279–290, 1850.

[7] O. Goldreich, S. Goldwasser, and S. Halevi. Public-key cryptosystems from lattice reduction problems. In B. Kaliski, editor, Advances in Cryptology - CRYPTO’97, volume 1294 of Lecture Notes in Computer Science, pages 112–131. Springer Berlin / Heidelberg, 1997.

[8] K. Mahler. A theorem on inhomogeneous diophantine inequalities. In Nederl. Akad. Wetensch., Proc, volume 41, pages 634–637, 1938

[9] J.C. Lagarias, H.W. Lenstra, and C.P. Schnorr. Korkin-zolotarev bases and successive minima of a lattice and its reciprocal lattice. Combinatorica, 10(4):333–348, 1990.

[10] L. Babai. On Lovász lattice reduction and the nearest lattice point problem. Combinatorica, 6(1):1–13, 1986.

[11] C.P. Schnorr. A hierarchy of polynomial time lattice basis reduction algorithms. Theoretical computer science, 53(2-3):201–224, 1987

[12] J.C. Lagarias and A.M. Odlyzko. Solving low-density subset sum problems. J. ACM, 32(1):229–246, 1985.

[13] M.J. Coster, A. Joux, B.A. LaMacchia, A.M. Odlyzko, C.P. Schnorr, and J. Stern. Improved low-density subset sum algorithms. Computational Complexity, 2(2):111–128, 1992.

[14] Hoffstein, J., Pipher, J., Silverman, J.H.: NTRU: a ring-based public key cryptosystem. In: Algorithmic number theory (ANTS). Volume 1423 of Lecture Notes in Comput. Sci. Springer (1998) 267–288

[15] Hoffstein J, Pipher J, Silverman J H, et al. An Introduction to Cryptography[M]. Springer New York, 2014.