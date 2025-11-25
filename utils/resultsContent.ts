
import { Language } from '../types';

interface SectionContent {
  title: string;
  paragraphs: string[];
}

export const RESULTS_CONTENT: Record<Language, Record<'dashboard' | 'meals' | 'training' | 'shopping', SectionContent[]>> = {
  en: {
    dashboard: [
      {
        title: "The Metabolic Blueprint: Decoding Your Biological Data",
        paragraphs: [
          "Your dashboard is not merely a collection of numbers; it is a real-time snapshot of your metabolic engine. The foundational metric we analyze is your Basal Metabolic Rate (BMR). This represents the absolute energy cost of keeping your body alive—powering the electrical impulses of your heart, the filtration processes of your kidneys, and the ion gradients of your brain cells. Even in a comatose state, you would burn this amount of energy. However, standard calculations often fail because they ignore 'Metabolic Adaptation'. Your result has been adjusted based on your activity history and body fat percentage to mitigate the margin of error typically seen in the Harris-Benedict equation.",
          "We then extrapolate this to your Total Daily Energy Expenditure (TDEE). This is where the science of thermodynamics meets lifestyle. Most people vastly underestimate their caloric intake and overestimate their caloric burn. Our algorithm separates your activity into EAT (Exercise Activity Thermogenesis) and NEAT (Non-Exercise Activity Thermogenesis). Research indicates that NEAT—fidgeting, standing, walking—can account for up to 2000 calories of variance between individuals. Your plan is specifically calibrated to optimize this 'hidden' calorie burn without triggering a stress response.",
          "The body fat percentage displayed is a critical biomarker. It is not just aesthetic; adipose tissue is an active endocrine organ. It secretes leptin, adiponectin, and aromatase (which converts testosterone to estrogen). By targeting a specific body fat range, we are not just revealing your abs; we are optimizing your hormonal environment to favor anabolism (muscle growth) over catabolism (muscle breakdown)."
        ]
      },
      {
        title: "Hormonal Optimization & Insulin Sensitivity",
        paragraphs: [
          "The caloric numbers on this screen are secondary to the hormonal instructions they carry. When you eat is just as important as what you eat. Our goal is to manipulate Insulin Sensitivity. In a healthy state, insulin shuttles nutrients into muscle cells for repair. In a resistant state, it shuttles them into fat cells for storage. Your dashboard metrics suggest a specific carbohydrate timing protocol designed to maximize GLUT-4 transporter activity in muscle tissue while keeping baseline insulin low to facilitate lipolysis (fat burning).",
          "We also monitor the implication of Cortisol. Your stress inputs from the questionnaire have influenced your recovery scores. High chronic cortisol blunts the body's ability to utilize glucose, leading to visceral fat storage even in a caloric deficit. The targets set here act as a physiological buffer, preventing the 'Starvation Mode' response where the thyroid downregulates T3 production to preserve energy."
        ]
      },
      {
        title: "The Path Forward: Linear vs. Non-Linear Progression",
        paragraphs: [
          "Do not expect weight loss or muscle gain to be linear. The body fights homeostasis. You will experience 'whooshes'—sudden drops in weight after a period of stagnation—due to the 'Water Retention Effect' of emptying fat cells. As triglycerides are mobilized, the body often temporarily fills the empty fat cell with water to maintain structural integrity. This dashboard is designed to track trends over weeks, not days. Trust the trendline, ignore the daily fluctuation."
        ]
      }
    ],
    meals: [
      {
        title: "Nutritional Biochemistry: Beyond 'Eating Healthy'",
        paragraphs: [
          "This meal plan is not a menu; it is a pharmacological protocol. Food is information. Every macronutrient triggers a specific biochemical cascade. The proteins selected for you are high in Leucine, the primary amino acid responsible for triggering mTOR—the master switch for muscle protein synthesis. We have prioritized bioavailability, ensuring that the protein you eat is actually absorbed and utilized, rather than just passing through your digestive tract.",
          "The carbohydrate sources are chosen based on their Glycemic Load (GL), not just Glycemic Index (GI). We aim to provide sustained energy release to prevent the hypoglycemic crashes that trigger cravings. By pairing fibrous vegetables with complex starches, we create a 'food matrix' that slows digestion, improves satiety via the release of Cholecystokinin (CCK), and feeds the microbiome. A healthy gut microbiome is essential for the production of serotonin and the absorption of micronutrients.",
          "Fats are essential for steroid hormone production. Your plan includes specific ratios of Monounsaturated (MUFAs), Polyunsaturated (PUFAs), and Saturated fats to support cell membrane integrity and testosterone production. We have specifically excluded inflammatory seed oils in favor of sources rich in Omega-3 fatty acids to balance your Omega-6:3 ratio, reducing systemic inflammation."
        ]
      },
      {
        title: "The Thermic Effect of Food (TEF)",
        paragraphs: [
          "One of the hidden tools in this plan is the manipulation of TEF. Protein has a thermic effect of approximately 20-30%, meaning for every 100 calories of protein you eat, your body burns 25 calories just to digest it. Carbohydrates have a TEF of 5-10%, and fats only 0-3%. By structuring your diet with a higher protein bias, we are effectively increasing your metabolic rate through digestion alone. This 'metabolic advantage' allows you to eat more food while still achieving fat loss results.",
          "Hydration is the final catalyst. Lipolysis (the breakdown of fat) is a hydrolysis reaction—it literally requires water molecules to break the chemical bonds of triglycerides. Even mild dehydration (1-2%) can downregulate fat metabolism. The water targets in this plan are non-negotiable for optimal enzymatic function."
        ]
      }
    ],
    training: [
      {
        title: "Mechanisms of Hypertrophy: Tension, Stress, Damage",
        paragraphs: [
          "Your training plan utilizes the three primary mechanisms of muscle growth: Mechanical Tension, Metabolic Stress, and Muscle Damage. Mechanical Tension is achieved through heavy compound lifts (Squats, Deadlifts) that recruit high-threshold motor units. Metabolic Stress is the 'pump'—the accumulation of metabolites (lactate, hydrogen ions) that triggers cell swelling and growth factor release. Muscle Damage is the micro-tearing of fibers that stimulates satellite cell activation for repair.",
          "We use 'Progressive Overload' as the primary driver. This does not always mean adding weight. It can mean adding reps, decreasing rest periods, improving form, or increasing the Range of Motion (ROM). The algorithm has calculated a specific Weekly Volume (sets × reps × weight) that sits right at your Maximum Recoverable Volume (MRV). Exceeding this leads to systemic fatigue; undershooting it leads to stagnation."
        ]
      },
      {
        title: "Central Nervous System (CNS) Management",
        paragraphs: [
          "Training is a stressor. To the body, a heavy deadlift is not biologically different from running from a predator. It triggers the Sympathetic Nervous System (Fight or Flight). If you stay in this state too long, you enter 'Sympathetic Overtraining'. Your plan includes specific deload protocols and active recovery days to force the body back into a Parasympathetic state (Rest and Digest). This is when growth actually occurs.",
          "We also focus on the 'Mind-Muscle Connection'. Electromyography (EMG) studies show that internal cueing ('squeeze the muscle') can increase muscle activation by up to 60% compared to simply moving the weight. Every rep listed in this plan is intended to be performed with deliberate intent, not just momentum."
        ]
      }
    ],
    shopping: [
      {
        title: "The Economics of Health: Strategic Procurement",
        paragraphs: [
          "The battle for your health is won or lost in the grocery store. If you do not buy it, you cannot eat it. This list is designed to create a 'Barrier of Entry' for bad habits. By stocking your environment with high-satiety, nutrient-dense foods, you reduce the reliance on willpower. Willpower is a finite resource; your environment is a constant.",
          "We have categorized items to optimize your shopping flow, preventing aimless wandering into the processed food aisles. The 'perimeter strategy' suggests that 80% of your shopping should be done on the outer edges of the store where fresh produce, meats, and dairy are kept. The inner aisles are typically preserved, hyper-palatable foods designed to override your satiety signals."
        ]
      },
      {
        title: "Label Literacy & Hidden Ingredients",
        paragraphs: [
          "Understanding food labels is a survival skill. Food manufacturers use over 60 different names for sugar (dextrose, maltodextrin, cane crystals) to hide the true sugar content. This list strictly curates whole ingredients. When buying packaged items, the rule is simple: if a third-grader cannot pronounce the ingredient, your liver probably doesn't know how to process it.",
          "This list also considers the concept of 'Nutrient Density per Dollar'. Eggs, seasonal vegetables, and bulk grains offer the highest return on investment for your biological health. We encourage buying in bulk and meal prepping to reduce the friction of decision-making during the week. When food is ready, you eat what supports your goals. When it isn't, you eat what satisfies your stress."
        ]
      }
    ]
  },
  zh: {
    dashboard: [
      {
        title: "代谢蓝图：解码您的生物数据",
        paragraphs: [
          "您的仪表盘不仅仅是一堆数字的集合；它是您代谢引擎的实时快照。我们分析的基础指标是您的基础代谢率（BMR）。这代表了维持您生命所需的绝对能量成本——驱动心脏的电脉冲、肾脏的过滤过程以及脑细胞的离子梯度。即使处于昏迷状态，您也会消耗这些能量。然而，标准的计算公式往往因为忽略了“代谢适应”而失效。您的结果已经根据您的活动历史和体脂率进行了调整，以减少通常在 Harris-Benedict 公式中出现的误差。",
          "然后我们将此外推到您的每日总能量消耗（TDEE）。这是热力学科学与生活方式相遇的地方。大多数人极大地低估了他们的热量摄入，并高估了他们的热量消耗。我们的算法将您的活动分为 EAT（运动活动热效应）和 NEAT（非运动活动热效应）。研究表明，NEAT——抖腿、站立、走路——在不同个体之间可能占到 2000 卡路里的差异。您的计划经过专门校准，旨在优化这种“隐藏”的卡路里燃烧，而不会引发压力反应。",
          "显示的体脂率是一个关键的生物标志物。它不仅仅关乎美学；脂肪组织是一个活跃的内分泌器官。它分泌瘦素、脂联素和芳香化酶（将睾酮转化为雌激素）。通过设定特定的体脂范围，我们不仅是在让您的腹肌显露；我们是在优化您的荷尔蒙环境，使其有利于合成代谢（肌肉生长）而非分解代谢（肌肉分解）。"
        ]
      },
      {
        title: "荷尔蒙优化与胰岛素敏感性",
        paragraphs: [
          "屏幕上的卡路里数字仅仅是它们所携带的荷尔蒙指令的次要因素。进食的时间与进食的内容同样重要。我们的目标是操控胰岛素敏感性。在健康状态下，胰岛素将营养物质输送到肌肉细胞进行修复。在抵抗状态下，它将营养物质输送到脂肪细胞进行储存。您的仪表盘指标建议采用特定的碳水化合物时机方案，旨在最大化肌肉组织中 GLUT-4 转运蛋白的活性，同时保持基础胰岛素处于低位以促进脂解（脂肪燃烧）。",
          "我们还监测皮质醇的影响。您问卷中的压力输入影响了您的恢复评分。长期的慢性皮质醇会钝化身体利用葡萄糖的能力，导致即使在热量赤字的情况下也会储存内脏脂肪。这里设定的目标充当生理缓冲，防止“饥荒模式”反应，即甲状腺下调 T3 产量以保存能量。"
        ]
      },
      {
        title: "前进之路：线性与非线性进程",
        paragraphs: [
          "不要指望减肥或增肌是线性的。身体会对抗体内平衡。您将经历“呼啸效应”——在一段时间的停滞后体重突然下降——这是由于脂肪细胞排空时的“水分滞留效应”。当甘油三酯被调动时，身体通常会暂时用水填充空的脂肪细胞以维持结构完整性。该仪表盘旨在跟踪数周的趋势，而不是数天。相信趋势线，忽略日常波动。"
        ]
      }
    ],
    meals: [
      {
        title: "营养生物化学：超越“吃得健康”",
        paragraphs: [
          "这份饮食计划不是一份菜单；它是一份药理学方案。食物就是信息。每一种宏量营养素都会触发特定的生化级联反应。为您选择的蛋白质富含亮氨酸，这是负责触发 mTOR（肌肉蛋白质合成的总开关）的主要氨基酸。我们优先考虑生物利用度，确保您吃的蛋白质实际上被吸收和利用，而不仅仅是通过您的消化道。",
          "碳水化合物来源是根据其血糖负荷（GL）而不是仅仅根据血糖指数（GI）选择的。我们的目标是提供持续的能量释放，以防止引发渴望的低血糖崩溃。通过将纤维蔬菜与复合淀粉搭配，我们创造了一种“食物基质”，可以减缓消化，通过释放胆囊收缩素（CCK）提高饱腹感，并喂养微生物组。健康的肠道微生物组对于血清素的产生和微量营养素的吸收至关重要。",
          "脂肪对于类固醇激素的产生至关重要。您的计划包括特定比例的单不饱和脂肪（MUFAs）、多不饱和脂肪（PUFAs）和饱和脂肪，以支持细胞膜完整性和睾酮产生。我们特别排除了炎症性的种子油，转而使用富含 Omega-3 脂肪酸的来源，以平衡您的 Omega-6:3 比例，减少全身性炎症。"
        ]
      },
      {
        title: "食物的热效应 (TEF)",
        paragraphs: [
          "这个计划中隐藏的工具之一是 TEF 的操控。蛋白质的热效应约为 20-30%，这意味着您每吃 100 卡路里的蛋白质，您的身体仅为了消化它就会燃烧 25 卡路里。碳水化合物的 TEF 为 5-10%，而脂肪仅为 0-3%。通过构建蛋白质偏向较高的饮食结构，我们实际上是通过消化本身来提高您的代谢率。这种“代谢优势”使您能够吃更多的食物，同时仍然获得减脂效果。",
          "水合作用是最后的催化剂。脂解（脂肪的分解）是一种水解反应——它实际上需要水分子来破坏甘油三酯的化学键。即使是轻微的脱水（1-2%）也会下调脂肪代谢。此计划中的水目标对于最佳酶功能是不可商量的。"
        ]
      }
    ],
    training: [
      {
        title: "肌肥大的机制：张力、压力、损伤",
        paragraphs: [
          "您的训练计划利用了肌肉生长的三种主要机制：机械张力、代谢压力和肌肉损伤。机械张力是通过募集高阈值运动单位的大重量复合举重（深蹲、硬拉）实现的。代谢压力是“泵感”——代谢物（乳酸、氢离子）的积累，触发细胞肿胀和生长因子的释放。肌肉损伤是纤维的微撕裂，刺激卫星细胞激活以进行修复。",
          "我们使用“渐进负荷”作为主要驱动力。这并不总是意味着增加重量。它可能意味着增加次数、减少休息时间、改善形式或增加运动范围（ROM）。该算法计算了一个特定的周容量（组数 × 次数 × 重量），正好位于您的最大可恢复容量（MRV）处。超过这个会导致全身疲劳；低于这个会导致停滞。"
        ]
      },
      {
        title: "中枢神经系统 (CNS) 管理",
        paragraphs: [
          "训练是一种压力源。对身体来说，沉重的硬拉与逃避捕食者在生物学上没有区别。它触发交感神经系统（战斗或逃跑）。如果您在这种状态下停留太久，您就会进入“交感神经过度训练”。您的计划包括特定的减载方案和积极恢复日，以迫使身体回到副交感神经状态（休息和消化）。这才是生长实际发生的时候。",
          "我们还关注“念动一致”。肌电图（EMG）研究表明，与简单地移动重量相比，内部暗示（“挤压肌肉”）可以将肌肉激活度提高高达 60%。此计划中列出的每一次重复都旨在以刻意的意图执行，而不仅仅是惯性。"
        ]
      }
    ],
    shopping: [
      {
        title: "健康经济学：战略采购",
        paragraphs: [
          "您的健康之战是在杂货店里赢或输的。如果您不买它，您就不能吃它。这份清单旨在为坏习惯建立“进入壁垒”。通过在您的环境中储备高饱腹感、营养密集的食物，您可以减少对意志力的依赖。意志力是一种有限的资源；您的环境是一个常数。",
          "我们对物品进行了分类，以优化您的购物流程，防止在加工食品过道中漫无目的地闲逛。“周边策略”建议您 80% 的购物应该在商店的外围进行，那里存放着新鲜农产品、肉类和乳制品。内部过道通常是保存完好的、超适口的食物，旨在覆盖您的饱腹信号。"
        ]
      },
      {
        title: "标签识字与隐藏成分",
        paragraphs: [
          "理解食品标签是一项生存技能。食品制造商使用 60 多种不同的名称来称呼糖（葡萄糖、麦芽糊精、蔗糖结晶），以隐藏真实的糖含量。这份清单严格筛选全成分。购买包装物品时，规则很简单：如果三年级学生读不出这个成分，您的肝脏可能也不知道如何处理它。",
          "这份清单还考虑了“每一美元的营养密度”概念。鸡蛋、时令蔬菜和散装谷物为您的生物健康提供了最高的投资回报率。我们鼓励批量购买和备餐，以减少一周中决策的摩擦。当食物准备好时，您会吃支持您目标的东西。当没有准备好时，您会吃满足您压力的东西。"
        ]
      }
    ]
  },
  // Placeholders for other languages to prevent crashes, using English content as fallback
  es: { dashboard: [], meals: [], training: [], shopping: [] },
  fr: { dashboard: [], meals: [], training: [], shopping: [] },
  de: { dashboard: [], meals: [], training: [], shopping: [] },
  ja: { dashboard: [], meals: [], training: [], shopping: [] },
  ko: { dashboard: [], meals: [], training: [], shopping: [] },
  pt: { dashboard: [], meals: [], training: [], shopping: [] }
};

// Fill placeholders with EN content to act as fallback
['es', 'fr', 'de', 'ja', 'ko', 'pt'].forEach(lang => {
  // @ts-ignore
  RESULTS_CONTENT[lang] = RESULTS_CONTENT.en;
});
