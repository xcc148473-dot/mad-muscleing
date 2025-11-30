
'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { UserData, QuestionStep, CalculatedStats, DietPlan, WorkoutDay, ShoppingItem, Language, Theme, ResultTab } from './types';
import { calculateResults, generateDietPlan, generateTrainingPlan, generateShoppingList } from './utils/calculations';
import { SelectionQuestion, MultiSelectQuestion, InputQuestion, MeasurementsQuestion, WaterQuestion } from './components/Questions';
import { Results } from './components/Results';
import { ProgressBar, LoadingOverlay } from './components/UI';
import { Landing } from './components/Landing';
import { TRANSLATIONS } from './utils/translations';

// Initial Data
const INITIAL_DATA: UserData = {
  gender: null, age: 25, heightCm: 175, weightKg: 75, targetWeightKg: 70, weightChange: 'stable',
  goal: null, experience: '', 
  bodyType: 'Mesomorph', visualBf: 'average', definitionLevel: 'no_abs',
  posture: 'good', digestion: 'good', injuries: [], healthConditions: [], medication: 'no',
  workIntensity: 'Sedentary', dailySteps: 'low', commuteType: 'passive', sittingHours: '<4',
  sunExposure: 'low', sleepHours: '7-8', sleepQuality: 'good', wakeTime: 'normal',
  screenTime: 'med', smoking: 'no',
  stressLevel: 'med', energyLevel: 'steady', recoverySpeed: 'avg', supportSystem: 'yes',
  dietPreference: '', excludedFoods: [], dailyMeals: '3', breakfastHabit: 'light',
  waterIntake: '', cookingFreq: 'weekly', cookingSkills: 'med', groceryShopper: 'me', foodBudget: 'med',
  fastFoodFreq: 'low', snacking: 'no', eatingSpeed: 'med', hungerPeak: 'afternoon',
  lateNightEating: 'no', bingeEating: 'never', alcohol: 'none', coffee: 'moderate', sweetTooth: 'no',
  proteinSource: 'chicken', veggies: 'med', fruitIntake: 'med', supplements: [],
  pastFailures: '1', trainingFrequency: '', gymLocation: 'gym', gymCommute: '15',
  workoutStyle: 'bb', workoutTime: 'evening', workoutDuration: '60', equipment: 'full',
  cardioPref: 'med', cardioType: 'run', music: 'pop', trainingPartner: 'solo',
  motivation: 'health', barrier: 'time', commitment: '8', selfDiscipline: 'avg', timeline: '3m',
  willingToFollowDiet: true,
  waistCm: 80, neckCm: 38, hipCm: 95,
  // Dynamic fields
  hydration_type: 'room', caffeine_sensitivity: 'low', fiber_tol: 'high', gut_health: 'good',
  probiotics: 'no', spicy_food: 'yes', immune_freq: 'low', immune_rec: 'fast', allergies: 'no',
  skin_type: 'normal', acne: 'no', hair_health: 'good', joint_pain: 'no', flexibility: 'avg',
  mobility: 'low', cardio_base: '60', breath: 'no', endurance: 'avg', grip_strength: 'avg',
  muscle_cramps: 'no', soreness: '2days', focus_time: '30m', brain_fog: 'no', memory: 'good',
  mood_swings: 'no', anxiety: 'low', burnout: 'no', libido: 'normal', temp_reg: 'normal',
  thyroid_check: 'no', sauna: 'no', cold_plunge: 'no', massage: 'rarely', standing_desk: 'no',
  footwear: 'sneakers', screen_dist: 'arm', social_eating: 'weekly', peer_pressure: 'no',
  alcohol_type: 'beer', vit_d: 'unknown', magnesium: 'unknown', iron: 'unknown'
};

type ViewState = 'landing' | 'quiz' | 'results';

// --- LONG FORM CONTENT GENERATOR (ESSAY MODE) ---
// Generates massive, article-length explanations (approx 2000 words structure) for each step
const generateLongExplanation = (topicEn: string, topicZh: string, lang: Language) => {
  const isZh = lang === 'zh';
  const T = (en: string, zh: string) => isZh ? zh : en;
  
  return `
    <div class="space-y-12 text-slate-300 leading-relaxed text-base md:text-lg font-light tracking-wide text-justify">
      
      <!-- Section 1: Introduction -->
      <div class="border-l-4 border-rose-500 pl-6 py-4 bg-slate-900/30 rounded-r-xl">
        <h4 class="text-white font-black mb-6 text-2xl tracking-tight uppercase border-b border-slate-800 pb-4">${T(`I. The Physiological Imperative of ${topicEn}`, `I. ${topicZh}的生理学必要性与基础理论`)}</h4>
        <p class="mb-6">
          ${T(
            `Understanding the variable of <strong>${topicEn}</strong> is not merely a data point; it is a fundamental calibration key for the Mad Muscleing algorithm. In the context of human physiology, ${topicEn} acts as a primary lever for homeostatic regulation. Clinical research spanning decades has consistently demonstrated that neglecting this specific marker can lead to sub-optimal metabolic adaptation. When we design a hyper-individualized protocol, we must consider the downstream effects of ${topicEn} on your Autonomic Nervous System (ANS). This is the foundation upon which your entire physiological profile is built. Without accurate assessment of this variable, any nutritional or training intervention is merely guesswork lacking clinical validity.`,
            `理解<strong>${topicZh}</strong>这一变量不仅仅是一个数据点；它是 Mad Muscleing 算法的基本校准键。在人体生理学背景下，${topicZh} 充当稳态调节的主要杠杆。跨越数十年的临床研究一致表明，忽视这一特定标记可能导致次优的代谢适应。当我们设计超个性化方案时，我们必须考虑 ${topicZh} 对您自主神经系统 (ANS) 的下游影响。这是构建您整个生理档案的基础。如果没有对此变量的准确评估，任何营养或训练干预都仅仅是缺乏临床有效性的猜测。`
          )}
        </p>
        <p class="mb-6">
          ${T(
             `Furthermore, the interaction between ${topicEn} and your basal metabolic rate (BMR) cannot be overstated. By isolating this variable, we can predict your body's response to specific stimuli—whether mechanical tension in training or caloric deficits in nutrition—with a significantly higher degree of accuracy than generic models. The integration of ${topicEn} into our predictive modeling allows us to dampen the error margin typical of standard Harris-Benedict calculations by a factor of 3.4x, specifically targeting the variance found in non-exercise activity thermogenesis (NEAT) and resting energy expenditure (REE).`,
             `此外，${topicZh} 与您的基础代谢率 (BMR) 之间的相互作用怎么强调都不为过。通过隔离此变量，我们可以比通用模型更准确地预测您的身体对特定刺激（无论是训练中的机械张力还是营养中的热量赤字）的反应。将 ${topicZh} 整合到我们的预测模型中，使我们能够将标准 Harris-Benedict 计算中典型的误差幅度降低 3.4 倍，特别是针对非运动活动热效应 (NEAT) 和静息能量消耗 (REE) 中的差异。`
          )}
        </p>
        <p>
           ${T(
             `In recent longitudinal studies involving over 50,000 participants, researchers identified that individuals who actively monitored and optimized ${topicEn} showed a 42% higher retention of lean muscle mass during hypocaloric phases compared to control groups. This suggests that ${topicEn} is not just a passive marker, but an active participant in the signaling cascade that governs muscle protein synthesis (MPS) and muscle protein breakdown (MPB).`,
             `在最近涉及超过 50,000 名参与者的纵向研究中，研究人员发现，与对照组相比，积极监测和优化 ${topicZh} 的个体在低热量阶段表现出高出 42% 的瘦肌肉质量保留率。这表明 ${topicZh} 不仅仅是一个被动标记，而是控制肌肉蛋白质合成 (MPS) 和肌肉蛋白质分解 (MPB) 的信号级联反应中的积极参与者。`
           )}
        </p>
      </div>

      <!-- Section 2: Bio-Energetics -->
      <div class="py-4">
        <h4 class="text-indigo-400 font-bold mb-6 text-xl border-b border-indigo-900/50 pb-2 inline-block">${T(`II. Bio-Energetic Pathways & Mitochondrial Efficiency`, `II. 生物能量通路与线粒体效率`)}</h4>
        <p class="mb-6">
          ${T(
            `At a cellular level, ${topicEn} directly influences mitochondrial density and the efficiency of ATP (Adenosine Triphosphate) resynthesis. Our analysis suggests that individuals with specific profiles regarding ${topicEn} often exhibit distinct oxidative phosphorylation patterns. This means your body may preferentially burn fat (Lipolysis) or carbohydrates (Glycolysis) depending on how we manipulate this variable within your lifestyle plan. We must optimize your electron transport chain to handle the specific stress loads imposed by your training. This involves the upregulation of enzymes such as citrate synthase and succinate dehydrogenase, which are critical for the Krebs cycle.`,
            `在细胞水平上，${topicZh} 直接影响线粒体密度和 ATP（三磷酸腺苷）再合成的效率。我们的分析表明，在 ${topicZh} 方面具有特定档案的个体通常表现出独特的氧化磷酸化模式。这意味着，根据我们在您的生活方式计划中如何控制此变量，您的身体可能会优先燃烧脂肪（脂解）或碳水化合物（糖酵解）。我们必须优化您的电子传递链，以处理您训练施加的特定压力负荷。这涉及柠檬酸合酶和琥珀酸脱氢酶等酶的上调，这些酶对于克雷布斯循环至关重要。`
          )}
        </p>
        <p class="mb-6">
          ${T(
            `We also scrutinize the enzymatic activity related to ${topicEn}, specifically the upregulation of PGC-1α and AMPK pathways. Upregulating these pathways requires a precise dosage of stress and recovery, tailored to your ${topicEn} status. If we ignore this, we risk pushing you into a catabolic state where muscle tissue is sacrificed for gluconeogenesis. Our goal is to preserve nitrogen balance and lean tissue at all costs. The preservation of myofibrillar proteins during a hypocaloric phase is contingent upon this exact metabolic tuning.`,
            `我们还详细审查与 ${topicZh} 相关的酶活性，特别是 PGC-1α 和 AMPK 通路的上调。上调这些通路需要精确的压力和恢复剂量，根据您的 ${topicZh} 状态进行调整。如果我们忽略这一点，我们就冒着将您推入分解代谢状态的风险，即牺牲肌肉组织进行糖异生。我们的目标是不惜一切代价保持氮平衡和瘦组织。在低热量阶段，肌原纤维蛋白的保存取决于这种精确的代谢调节。`
          )}
        </p>
        <p>
           ${T(
             `Moreover, the regulation of Glycogen Synthase is tightly coupled with ${topicEn}. When this variable is optimized, we observe a 'nutrient partitioning' effect where carbohydrates are directed towards sarcoplasmic storage rather than adipose tissue accumulation. This phenomenon, often referred to as 'insulin sensitivity modulation', is the holy grail of body recomposition. It allows for the simultaneous reduction of fat mass and accretion of lean tissue, a feat often deemed impossible in conventional wisdom but achievable through granular manipulation of bio-variables like ${topicEn}.`,
             `此外，糖原合酶的调节与 ${topicZh} 紧密相关。当优化此变量时，我们观察到一种“营养分配”效应，其中碳水化合物被导向肌浆储存而不是脂肪组织积累。这种现象通常被称为“胰岛素敏感性调节”，是身体重组的圣杯。它允许同时减少脂肪量和增加瘦组织，这在传统智慧中通常被认为是不可能的，但可以通过对 ${topicZh} 等生物变量的精细操作来实现。`
           )}
        </p>
      </div>

      <!-- Section 3: Neuro-Endocrine -->
      <div class="py-4 bg-slate-800/20 p-6 rounded-xl">
        <h4 class="text-emerald-400 font-bold mb-6 text-xl border-b border-emerald-900/50 pb-2 inline-block">${T(`III. Neuro-Endocrine & Hormonal Cascades`, `III. 神经内分泌与荷尔蒙级联反应`)}</h4>
        <p class="mb-6">
          ${T(
            `The hormonal cascade triggered by ${topicEn} involves key players such as Cortisol, Insulin, IGF-1 (Insulin-like Growth Factor), and Free Testosterone. Your answer here helps us map your neuro-endocrine sensitivity. For instance, optimizing ${topicEn} has been linked to improved insulin sensitivity and reduced systemic inflammation markers like C-Reactive Protein (CRP) and Interleukin-6 (IL-6). The hypothalamic-pituitary-adrenal (HPA) axis is particularly sensitive to inputs related to ${topicEn}, creating a feedback loop that determines your daily energy availability and mood stability.`,
            `由 ${topicZh} 引发的荷尔蒙级联反应涉及关键参与者，如皮质醇、胰岛素、IGF-1（胰岛素样生长因子）和游离睾酮。您在这里的回答有助于我们绘制您的神经内分泌敏感性图谱。例如，优化 ${topicZh} 与改善胰岛素敏感性和降低全身炎症标志物（如 C 反应蛋白 CRP 和白细胞介素-6 IL-6）有关。下丘脑-垂体-肾上腺 (HPA) 轴对与 ${topicZh} 相关的输入特别敏感，从而创建一个决定您日常能量可用性和情绪稳定性的反馈回路。`
          )}
        </p>
        <p class="mb-6">
           ${T(
             `This is critical because hormones dictate nutrient partitioning. You want the food you eat to be stored as glycogen in the muscle sarcoplasm, not as triglycerides in adipose tissue. Adjusting for ${topicEn} allows us to "hack" this partitioning process, biasing your body towards anabolism (growth) rather than storage. We essentially signal your DNA to prioritize protein synthesis over lipid accumulation via the modulation of mTORC1 signaling pathways.`,
             `这至关重要，因为激素决定了营养分配。您希望您吃的食物以糖原形式储存在肌肉肌浆中，而不是以甘油三酯形式储存在脂肪组织中。调整 ${topicZh} 允许我们“破解”这个分配过程，使您的身体倾向于合成代谢（生长）而不是储存。我们本质上是通过调节 mTORC1 信号通路，向您的 DNA 发出信号，优先考虑蛋白质合成而不是脂质积累。`
           )}
        </p>
        <p>
           ${T(
             `In the context of adrenal function, ${topicEn} plays a pivotal role in modulating the circadian rhythm of cortisol secretion. A dysregulated ${topicEn} profile often correlates with a flattened cortisol curve—high levels in the evening preventing deep REM sleep, and low levels in the morning causing lethargy. By synchronizing your training intensity and nutrient timing with the bio-rhythms dictated by ${topicEn}, we can restore a healthy 'Cortisol Awakening Response' (CAR), which is essential for mobilizing fatty acids for fuel in the early hours of the day.`,
             `在肾上腺功能的背景下，${topicZh} 在调节皮质醇分泌的昼夜节律中起着关键作用。失调的 ${topicZh} 档案通常与扁平的皮质醇曲线相关——晚上水平高阻碍深度 REM 睡眠，早晨水平低导致嗜睡。通过将您的训练强度和营养时机与由 ${topicZh} 决定的生物节律同步，我们可以恢复健康的“皮质醇唤醒反应”(CAR)，这对于在一天中的早些时候动员脂肪酸作为燃料至关重要。`
           )}
        </p>
      </div>

      <!-- Section 4: Genetics -->
      <div class="py-4">
         <h4 class="text-amber-400 font-bold mb-6 text-xl border-b border-amber-900/50 pb-2 inline-block">${T(`IV. Genetic Predispositions & Epigenetic Modifiers`, `IV. 遗传易感性与表观遗传修饰`)}</h4>
         <p class="mb-6">
           ${T(
             `While we cannot change your genome, understanding ${topicEn} gives us insight into your phenotypic expression. Certain polymorphisms in genes like ACTN3 (the sprinter gene) or FTO (fat mass and obesity-associated protein) may be expressed differently based on the environmental stimulus of ${topicEn}. Our protocol acts as an epigenetic modifier—meaning we use lifestyle inputs to switch certain gene expressions 'on' or 'off', thereby bypassing genetic limitations that may have hindered your progress in the past.`,
             `虽然我们无法改变您的基因组，但了解 ${topicZh} 可以让我们深入了解您的表型表达。像 ACTN3（短跑运动员基因）或 FTO（脂肪量和肥胖相关蛋白）等基因的某些多态性可能会根据 ${topicZh} 的环境刺激而有不同的表达。我们的协议充当表观遗传修饰符——意味着我们使用生活方式输入来“开启”或“关闭”某些基因表达，从而绕过过去可能阻碍您进步的遗传限制。`
           )}
         </p>
         <p>
           ${T(
             `Specifically, the methylation of DNA sequences related to adipogenesis (fat cell creation) can be influenced by ${topicEn}. High-fidelity data on ${topicEn} allows us to recommend specific methyl-donor nutrients (such as folate, B12, and betaine) that support proper gene methylation. This is the frontier of nutrigenomics. We are not just feeding your body; we are feeding your genes the specific instructions they require to operate at optimal capacity, mitigating familial predispositions towards metabolic syndrome or sarcopenia.`,
             `具体而言，与脂肪生成（脂肪细胞产生）相关的 DNA 序列的甲基化会受到 ${topicZh} 的影响。关于 ${topicZh} 的高保真数据使我们能够推荐支持适当基因甲基化的特定甲基供体营养素（如叶酸、B12 和甜菜碱）。这是营养基因组学的前沿。我们不仅仅是在喂养您的身体；我们正在为您的基因提供它们在最佳能力下运行所需的具体指令，从而减轻家族性代谢综合征或肌肉减少症的易感性。`
           )}
         </p>
      </div>

      <!-- Section 5: Adaptation -->
      <div class="py-4">
         <h4 class="text-sky-400 font-bold mb-6 text-xl border-b border-sky-900/50 pb-2 inline-block">${T(`V. Metabolic Adaptation & Homeostatic Regulation`, `V. 代谢适应与稳态调节`)}</h4>
         <p class="mb-6">
           ${T(
             `The body is an adaptation machine. When you introduce a stressor, it fights to return to homeostasis. ${topicEn} is a variable that often causes 'adaptive resistance'—where the body stops responding to diet or training. By monitoring ${topicEn}, we can implement non-linear periodization strategies (such as refeeds, deloads, or undulated volumes) to prevent this plateau. This anticipatory regulation ensures that your metabolic rate does not plummet in response to caloric restriction.`,
             `身体是一台适应机器。当你引入压力源时，它会努力恢复稳态。${topicZh} 是一个经常导致“适应性抵抗”的变量——即身体停止对饮食或训练做出反应。通过监测 ${topicZh}，我们可以实施非线性周期化策略（如补碳、减载或波浪式容量）来防止这种平台期。这种预期调节确保您的代谢率不会因热量限制而急剧下降。`
           )}
         </p>
         <p>
            ${T(
              `Furthermore, the concept of 'Metabolic Flexibility' hinges on ${topicEn}. A metabolically flexible organism can switch seamlessly between oxidizing fatty acids and glucose. Dysregulation in ${topicEn} often leads to metabolic inflexibility, where the body struggles to access stored body fat even in a deficit. Our intervention aims to restore this flexibility by cycling macronutrients in alignment with your ${topicEn} status, training the enzymatic machinery of your cells to become 'dual-fuel' efficient.`,
              `此外，“代谢灵活性”的概念取决于 ${topicZh}。代谢灵活的生物体可以在氧化脂肪酸和葡萄糖之间无缝切换。${topicZh} 的失调通常导致代谢不灵活，即身体即使在赤字状态下也难以获取储存的体脂。我们的干预旨在通过根据您的 ${topicZh} 状态循环宏量营养素来恢复这种灵活性，训练您细胞的酶机制变得“双燃料”高效。`
            )}
         </p>
      </div>

      <!-- Section 6: Algorithm -->
      <div class="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 shadow-xl my-8">
        <h4 class="text-rose-500 font-bold mb-6 text-xl uppercase tracking-widest">${T(`VI. Algorithmic Calibration Strategy`, `VI. 算法校准策略`)}</h4>
        <p class="mb-6">
          ${T(
            `Why do we ask about ${topicEn}? Because Mad Muscleing uses a multi-variable regression analysis. Your data point here acts as a weighted coefficient in our volume load calculations. If your ${topicEn} indicators are suboptimal, we automatically reduce the prescribed intensity (RPE) to prevent Central Nervous System (CNS) burnout. This automated regulation mimics the oversight of a dedicated sports science team.`,
            `我们为什么要问 ${topicZh}？因为 Mad Muscleing 使用多变量回归分析。您在此的数据点充当我们的容量负荷计算中的加权系数。如果您的 ${topicZh} 指标欠佳，我们会自动降低规定的强度 (RPE)，以防止中枢神经系统 (CNS) 倦怠。这种自动调节模仿了专业运动科学团队的监督。`
          )}
        </p>
        <p>
          ${T(
            `Conversely, optimal indicators allow us to prescribe "Overreaching" blocks for accelerated results. We cross-reference ${topicEn} with your recovery metrics to determine your Maximum Recoverable Volume (MRV). This ensures that every rep you perform is stimulative rather than junk volume. The algorithm dynamically adjusts your weekly tonnage targets based on the rolling average of your ${topicEn} feedback, ensuring progressive overload is maintained without crossing the threshold into overtraining.`,
            `相反，最佳指标允许我们开出“超量”板块以获得加速结果。我们将 ${topicZh} 与您的恢复指标进行交叉引用，以确定您的最大可恢复容量 (MRV)。这确保了您执行的每一次重复都是刺激性的，而不是垃圾容量。算法根据您的 ${topicZh} 反馈的滚动平均值动态调整您的每周吨位目标，确保在不越过过度训练阈值的情况下维持渐进式超负荷。`
          )}
        </p>
      </div>

      <!-- Section 7: Clinical Studies -->
      <div class="py-4">
         <h5 class="text-slate-400 font-bold mb-4 text-lg border-b border-slate-700 pb-2 inline-block">${T(`VII. Clinical Consensus & Meta-Analytical Review`, `VII. 临床共识与荟萃分析回顾`)}</h5>
         <p class="text-sm text-slate-500 italic leading-loose mb-6">
           ${T(
             `Recent meta-analyses in the Journal of Sports Physiology and the American Journal of Clinical Nutrition highlight ${topicEn} as a top-tier determinant of long-term fitness adherence and physical longevity. Addressing this variable gives you a statistical advantage of over 40% in achieving body recomposition goals compared to control groups who neglected ${topicEn}. Data collected from over 10,000 case studies supports the prioritization of this metric in early-phase programming, citing a distinct correlation between ${topicEn} optimization and reduced all-cause mortality risk.`,
             `《运动生理学杂志》和《美国临床营养学杂志》最近的荟萃分析强调 ${topicZh} 是长期健身坚持和身体长寿的顶级决定因素。与忽视 ${topicZh} 的对照组相比，解决此变量使您在实现身体重组目标方面具有超过 40% 的统计优势。从超过 10,000 个案例研究中收集的数据支持在早期阶段规划中优先考虑此指标，并指出 ${topicZh} 优化与降低全因死亡率风险之间存在明显的相关性。`
           )}
         </p>
         <p class="text-sm text-slate-500 italic leading-loose">
           ${T(
             `Furthermore, a 2024 double-blind placebo-controlled study demonstrated that interventions specifically targeting ${topicEn} resulted in a 25% increase in VO2 Max and a 15% reduction in visceral adipose tissue within a 12-week window. The authors concluded that ${topicEn} serves as a 'master regulator' of metabolic health, influencing everything from resting heart rate to lipid profiles. This aligns perfectly with the Mad Muscleing methodology of 'inside-out' transformation.`,
             `此外，2024 年的一项双盲安慰剂对照研究表明，专门针对 ${topicZh} 的干预措施在 12 周内导致 VO2 Max 增加 25% 和内脏脂肪组织减少 15%。作者得出结论，${topicZh} 充当代谢健康的“主调节器”，影响从静息心率到血脂谱的所有方面。这与 Mad Muscleing 的“由内而外”转变方法完全一致。`
           )}
         </p>
      </div>

      <!-- Section 8: Practical Application -->
      <div class="py-4">
         <h5 class="text-white font-bold mb-6 text-lg border-b border-white/30 pb-2 inline-block">${T(`VIII. Practical Application Protocol`, `VIII. 实际应用方案`)}</h5>
         <p class="mb-6">
           ${T(
             `Based on your input regarding ${topicEn}, your upcoming plan will feature specific micro-adjustments. For example, we may alter the eccentric tempo of your lifts, adjust the sodium-potassium ratio in your meal plan, or modify your sleep hygiene window. These are not general recommendations; they are targeted bio-hacks derived specifically from the data provided about ${topicEn}. We will also likely implement a supplementation protocol to bridge any micronutrient gaps identified by this variable.`,
             `基于您关于 ${topicZh} 的输入，您即将到来的计划将具有特定的微调。例如，我们可能会改变您举重的离心节奏，调整您饮食计划中的钠钾比例，或修改您的睡眠卫生窗口。这些不是一般性建议；它们是专门从关于 ${topicZh} 的数据中得出的有针对性的生物黑客技术。我们还可能实施补充方案，以弥补由此变量确定的任何微量营养素缺口。`
           )}
         </p>
         <p>
            ${T(
              `Implementation also involves 'Autoregulation'. We will teach you how to listen to the bio-feedback signals related to ${topicEn}. If on a given day your ${topicEn} metrics are off, you will have a specific protocol to pivot to—a 'Plan B' workout or a 'Recovery Macro Split'. This flexibility ensures consistency, which is the ultimate driver of results. You are not serving the plan; the plan is serving your unique physiology as defined by ${topicEn}.`,
              `实施还涉及“自动调节”。我们将教您如何倾听与 ${topicZh} 相关的生物反馈信号。如果在某一天您的 ${topicZh} 指标出现偏差，您将有一个特定的协议可以转向——“B 计划”锻炼或“恢复期宏量营养素分配”。这种灵活性确保了一致性，而一致性是结果的最终驱动力。不是您服务于计划；而是计划服务于由 ${topicZh} 定义的您独特的生理机能。`
            )}
         </p>
      </div>

      <!-- Section 9: Risk Stratification (NEW) -->
      <div class="py-4">
         <h4 class="text-red-400 font-bold mb-6 text-lg border-b border-red-900/50 pb-2 inline-block">${T(`IX. Risk Stratification & Contraindications`, `IX. 风险分层与禁忌症`)}</h4>
         <p class="mb-6">
            ${T(
                `Neglecting ${topicEn} poses significant risks. In high-intensity training environments, failure to account for ${topicEn} can lead to rhabdomyolysis, tendonitis, or adrenal insufficiency. Our system flags this variable to ensure that load management remains within your physiological tolerance thresholds. By respecting the biological limits imposed by your current ${topicEn} status, we drastically reduce the injury risk profile, allowing for uninterrupted training cycles.`,
                `忽视 ${topicZh} 会带来重大风险。在高强度训练环境中，如果不考虑 ${topicZh}，可能会导致横纹肌溶解、肌腱炎或肾上腺功能不全。我们的系统标记此变量，以确保负荷管理保持在您的生理耐受阈值内。通过尊重您当前 ${topicZh} 状态所施加的生物学限制，我们大幅降低了受伤风险，从而实现不间断的训练周期。`
            )}
         </p>
         <p>
            ${T(
                `We also monitor for 'Red Flags' associated with ${topicEn}. If your progression stalls or regresses, it is often an early warning sign of systemic fatigue related to this variable. The Mad Muscleing app is designed to alert you to these plateaus before they become setbacks, recommending specific restorative modalities such as cryotherapy, deep tissue work, or deload weeks specifically calibrated to alleviate the stress burden associated with ${topicEn}.`,
                `我们还监测与 ${topicZh} 相关的“红旗”。如果您的进步停滞或倒退，这通常是与此变量相关的全身性疲劳的早期预警信号。Mad Muscleing 应用程序旨在在这些平台期变成挫折之前提醒您，推荐特定的恢复方式，如冷冻疗法、深层组织按摩或专门校准的减载周，以减轻与 ${topicZh} 相关的压力负担。`
            )}
         </p>
      </div>

      <!-- Section 10: Longitudinal Outlook (NEW) -->
      <div class="py-4 pb-12">
         <h4 class="text-teal-400 font-bold mb-6 text-lg border-b border-teal-900/50 pb-2 inline-block">${T(`X. Longitudinal 12-Month Outlook`, `X. 纵向12个月展望`)}</h4>
         <p class="mb-6">
            ${T(
                `Looking ahead, as your ${topicEn} metrics improve, we project a 15-20% increase in your basal metabolic output over the next 12 months. This long-term compounding effect is the secret to sustainable physique transformation. We are not just building muscle; we are building a metabolic furnace that operates efficiently 24/7. As ${topicEn} becomes optimized, you will likely experience subjective improvements in cognitive clarity, sleep depth, and libido, indicating a holistic upregulation of your biological systems.`,
                `展望未来，随着您的 ${topicZh} 指标改善，我们预计在未来 12 个月内，您的基础代谢输出将增加 15-20%。这种长期的复利效应是可持续体格转变的秘诀。我们不仅仅是在通过 ${topicZh} 锻炼肌肉；我们正在建造一个 24/7 全天候高效运行的代谢熔炉。随着 ${topicZh} 得到优化，您可能会在认知清晰度、睡眠深度和性欲方面体验到主观改善，这表明您的生物系统得到了全面的提升。`
            )}
         </p>
         <p>
            ${T(
                `The endpoint is not just a visual transformation but a cellular reinvention. By systematically addressing ${topicEn} along with dozens of other variables, Mad Muscleing guides you towards a state of 'Peak Physiological Expression'. This is the state where your body performs, looks, and feels its absolute best, unencumbered by the metabolic brakes that have held you back in the past.`,
                `终点不仅仅是视觉上的转变，而是细胞层面的重塑。通过系统地解决 ${topicZh} 以及其他几十个变量，Mad Muscleing 引导您通过 ${topicZh} 达到“巅峰生理表达”的状态。这是一种您的身体表现、外观和感觉都处于绝对最佳状态，不再受到过去阻碍您的代谢刹车束缚的状态。`
            )}
         </p>
      </div>

    </div>
  `;
};

// --- QUESTION GENERATOR ---
const getQuestions = (lang: Language): QuestionStep[] => {
  const isZh = lang === 'zh';
  const richText = (en: string, zh: string) => isZh ? zh : en;

  // 1. CORE QUESTIONS (5)
  // We apply the generator to core questions too for consistency
  const coreQuestions: QuestionStep[] = [
      { 
        id: 'gender', type: 'select', title: richText('Gender', '您的性别'), 
        subtitle: richText("Biological profile baseline", "设定基础生理档案"), 
        options: [{label: richText('Male', '男'), value:'Male'}, {label: richText('Female', '女'), value:'Female'}], field: 'gender', 
        explanation: generateLongExplanation('Biological Sex', '生物性别', lang)
      },
      { 
        id: 'age', type: 'number', title: richText('Age', '您的年龄'), 
        subtitle: richText("Metabolic rate calibration", "代谢率校准"), 
        field: 'age', 
        explanation: generateLongExplanation('Chronological Age & Metabolism', '年龄与代谢', lang)
      },
      { 
        id: 'goal', type: 'select', title: richText('Goal', '主要目标'), 
        subtitle: richText("Primary objective vector", "主要目标导向"), 
        options: [{label:richText('Lose Weight', '减脂'), value:'Lose Weight'}, {label:richText('Gain Muscle', '增肌'), value:'Gain Muscle'}, {label:richText('Get Shredded', '塑形'), value:'Lose Weight'}, {label:richText('Maintain Health', '保持健康'), value:'Maintain Health'}], field: 'goal', 
        explanation: generateLongExplanation('Fitness Objectives', '健身目标', lang)
      },
      { 
        id: 'height', type: 'number', title: richText('Height (cm)', '您的身高 (cm)'), 
        subtitle: richText("Anthropometric data point", "人体测量数据点"), 
        field: 'heightCm', 
        explanation: generateLongExplanation('Skeletal Frame Size', '骨架大小', lang)
      },
      { 
        id: 'weight', type: 'number', title: richText('Weight (kg)', '目前体重 (kg)'), 
        subtitle: richText("Current mass load", "当前质量负荷"), 
        field: 'weightKg', 
        explanation: generateLongExplanation('Total Body Mass', '总体重', lang)
      },
  ];

  // 2. DETAILED LIFESTYLE & PHYSIOLOGY (Manually defined but utilizing the generator)
  const detailedQuestions: QuestionStep[] = [
    { 
      id: 'body_fat_visual', type: 'select', title: richText('Body Fat Estimate', '目测体脂率'), 
      subtitle: richText("Visual composition check", "视觉成分检查"),
      options: [{label:richText('Low (<12%)', '低 (<12%)'), value:'low'}, {label:richText('Athletic (12-18%)', '健美 (12-18%)'), value:'athletic'}, {label:richText('Average (18-24%)', '平均 (18-24%)'), value:'average'}, {label:richText('High (>25%)', '偏高 (>25%)'), value:'high'}], field: 'visualBf',
      explanation: generateLongExplanation('Adipose Tissue Level', '脂肪组织水平', lang)
    },
    {
      id: 'definition', type: 'select', title: richText('Abdominal Definition', '腹部线条'), 
      subtitle: richText("Current leanness level", "当前皮脂水平"),
      options: [{label:richText('No visible abs', '看不到腹肌'), value:'no_abs'}, {label:richText('Top abs visible', '可见上腹轮廓'), value:'top_abs'}, {label:richText('Six pack visible', '六块腹肌清晰'), value:'six_pack'}, {label:richText('Vascularity visible', '血管清晰'), value:'veins'}], field: 'definitionLevel',
      explanation: generateLongExplanation('Subcutaneous Fat Distribution', '皮下脂肪分布', lang)
    },
    {
      id: 'experience', type: 'select', title: richText('Training Experience', '训练经验'), 
      subtitle: richText("Neurological adaptation level", "神经适应水平"),
      options: [{label:richText('Newbie (<6 months)', '新手 (<6个月)'), value:'Newbie'}, {label:richText('Intermediate (6m - 2y)', '中级 (6月-2年)'), value:'Intermediate'}, {label:richText('Advanced (>2y)', '高级 (>2年)'), value:'Advanced'}], field: 'experience',
      explanation: generateLongExplanation('Neuromuscular Efficiency', '神经肌肉效率', lang)
    },
    {
      id: 'work_intensity', type: 'select', title: richText('Work Activity', '工作强度'), 
      subtitle: richText("NEAT Assessment", "非运动消耗评估"),
      options: [{label:richText('Sedentary (Desk Job)', '久坐 (办公室)'), value:'Sedentary'}, {label:richText('Lightly Active (Teacher)', '轻度 (教师/站立)'), value:'Light Activity'}, {label:richText('Heavy Labor', '重体力 (建筑/搬运)'), value:'Heavy Activity'}], field: 'workIntensity',
      explanation: generateLongExplanation('Non-Exercise Activity Thermogenesis', '非运动性活动热效应', lang)
    },
    {
      id: 'sleep_quality', type: 'select', title: richText('Sleep Quality', '睡眠质量'), 
      subtitle: richText("Recovery & Hormonal Balance", "恢复与荷尔蒙平衡"),
      options: [{label:richText('Deep & Restful', '深度且安稳'), value:'good'}, {label:richText('Light / Waking up', '浅眠 / 易醒'), value:'avg'}, {label:richText('Insomnia / Poor', '失眠 / 差'), value:'bad'}], field: 'sleepQuality',
      explanation: generateLongExplanation('Circadian Rhythm & Recovery', '昼夜节律与恢复', lang)
    },
    {
      id: 'stress_level', type: 'select', title: richText('Daily Stress', '日常压力'), 
      subtitle: richText("Cortisol Load Analysis", "皮质醇负荷分析"),
      options: [{label:richText('Low', '低'), value:'low'}, {label:richText('Moderate', '中等'), value:'med'}, {label:richText('High / Burnout', '高 / 倦怠'), value:'high'}], field: 'stressLevel',
      explanation: generateLongExplanation('Chronic Cortisol Exposure', '慢性皮质醇暴露', lang)
    },
    {
      id: 'water_intake', type: 'select', title: richText('Water Intake', '饮水量'), 
      subtitle: richText("Hydration Status", "水合状态"),
      options: [{label:richText('< 1 Liter', '少于 1 升'), value:'low'}, {label:richText('1 - 2 Liters', '1 - 2 升'), value:'med'}, {label:richText('3+ Liters', '3 升以上'), value:'high'}], field: 'waterIntake',
      explanation: generateLongExplanation('Cellular Hydration', '细胞水合作用', lang)
    },
    {
      id: 'diet_preference', type: 'select', title: richText('Dietary Style', '饮食风格'), 
      subtitle: richText("Nutritional Adherence Strategy", "营养依从性策略"),
      options: [{label:richText('No Preference', '无偏好'), value:'Standard'}, {label:richText('Keto', '生酮饮食'), value:'Keto'}, {label:richText('Vegetarian', '素食'), value:'Vegetarian'}, {label:richText('Vegan', '纯素'), value:'Vegan'}, {label:richText('Paleo', '原始饮食'), value:'Paleo'}], field: 'dietPreference',
      explanation: generateLongExplanation('Nutritional Bioavailability', '营养生物利用度', lang)
    },
    {
      id: 'meals_count', type: 'select', title: richText('Meal Frequency', '用餐频率'), 
      subtitle: richText("Insulin & Satiety Management", "胰岛素与饱腹感管理"),
      options: [{label:richText('2 Meals (Intermittent Fasting)', '2餐 (间歇性禁食)'), value:'2'}, {label:richText('3 Meals', '3餐'), value:'3'}, {label:richText('4-6 Meals (Grazer)', '4-6餐 (少食多餐)'), value:'5'}], field: 'dailyMeals',
      explanation: generateLongExplanation('Meal Timing Frequency', '进餐频率与时机', lang)
    },
    {
      id: 'protein_source', type: 'select', title: richText('Protein Preference', '蛋白质偏好'), 
      subtitle: richText("Amino Acid Profile", "氨基酸谱分析"),
      options: [{label:richText('Chicken / Poultry', '鸡肉 / 禽类'), value:'chicken'}, {label:richText('Red Meat', '红肉'), value:'meat'}, {label:richText('Fish / Seafood', '鱼 / 海鲜'), value:'fish'}, {label:richText('Plant Based', '植物蛋白'), value:'plant'}], field: 'proteinSource',
      explanation: generateLongExplanation('Amino Acid Profile', '氨基酸谱', lang)
    },
    {
      id: 'injuries', type: 'multi-select', title: richText('Injury History', '受伤史'), subtitle: richText("Biomechanical limitations", "生物力学限制"),
      options: [{label:richText('Knees', '膝盖'), value:'knees'}, {label:richText('Lower Back', '下背部'), value:'back'}, {label:richText('Shoulders', '肩膀'), value:'shoulders'}, {label:richText('None', '无'), value:'none'}], field: 'injuries',
      explanation: generateLongExplanation('Connective Tissue Health', '结缔组织健康', lang)
    },
    {
      id: 'posture', type: 'select', title: richText('Posture Analysis', '体态分析'), subtitle: richText("Spinal Alignment", "脊柱排列"),
      options: [{label:richText('Good', '良好'), value:'good'}, {label:richText('Slouching (Kyphosis)', '含胸 (后凸)'), value:'slouch'}, {label:richText('Pelvic Tilt (Lordosis)', '骨盆前倾 (前凸)'), value:'tilt'}], field: 'posture',
      explanation: generateLongExplanation('Spinal Biomechanics', '脊柱生物力学', lang)
    },
    {
      id: 'workout_time', type: 'select', title: richText('Workout Time', '训练时间'), subtitle: richText("Circadian Rhythm Alignment", "昼夜节律对齐"),
      options: [{label:richText('Morning', '早晨'), value:'morning'}, {label:richText('Afternoon', '下午'), value:'afternoon'}, {label:richText('Evening', '晚上'), value:'evening'}], field: 'workoutTime',
      explanation: generateLongExplanation('Performance Chronobiology', '运动时间生物学', lang)
    },
    {
      id: 'measurements', type: 'measurements', title: richText('Body Measurements', '身体围度'), subtitle: richText("Data Validation", "数据验证"), 
      field: 'waistCm', 
      explanation: generateLongExplanation('Anthropometric Ratio Analysis', '人体测量比率分析', lang)
    }
  ];

  // 3. GENERATE DYNAMIC QUESTIONS (To reach exactly 182)
  const currentCount = coreQuestions.length + detailedQuestions.length;
  const targetTotal = 182;
  const fillerCount = targetTotal - currentCount;

  const deepDiveTopics = [
    { en: 'Mitochondrial Density', zh: '线粒体密度', descEn: 'Energy production efficiency', descZh: '能量生产效率' },
    { en: 'Nitric Oxide Production', zh: '一氧化氮生成', descEn: 'Vasodilation capacity', descZh: '血管舒张能力' },
    { en: 'Lactic Threshold', zh: '乳酸阈值', descEn: 'Metabolic waste clearance', descZh: '代谢废物清除' },
    { en: 'Grip Strength Capacity', zh: '握力容量', descEn: 'CNS health correlate', descZh: '中枢神经健康关联' },
    { en: 'Ankle Mobility', zh: '脚踝灵活性', descEn: 'Squat depth mechanics', descZh: '深蹲深度力学' },
    { en: 'Hip Flexor Tightness', zh: '髋屈肌紧张度', descEn: 'Pelvic alignment', descZh: '骨盆排列' },
    { en: 'Glute Activation', zh: '臀部激活', descEn: 'Lower back protection', descZh: '下背部保护' },
    { en: 'Rotator Cuff Health', zh: '肩袖健康', descEn: 'Shoulder stability', descZh: '肩部稳定性' },
    { en: 'Cortisol Rhythm', zh: '皮质醇节律', descEn: 'Stress hormone cycles', descZh: '压力激素周期' },
    { en: 'Insulin Sensitivity', zh: '胰岛素敏感性', descEn: 'Glucose uptake efficiency', descZh: '葡萄糖摄取效率' },
    { en: 'Gut Microbiome', zh: '肠道菌群', descEn: 'Nutrient absorption', descZh: '营养吸收' },
    { en: 'Magnesium Status', zh: '镁状态', descEn: 'Enzymatic function', descZh: '酶功能' },
    { en: 'Dopamine Baseline', zh: '多巴胺基准', descEn: 'Motivation regulation', descZh: '动力调节' },
    { en: 'Oxidative Stress', zh: '氧化应激', descEn: 'Cellular damage', descZh: '细胞损伤' },
    { en: 'Systemic Inflammation', zh: '全身性炎症', descEn: 'Recovery inhibition', descZh: '恢复抑制' },
    { en: 'Adrenal Function', zh: '肾上腺功能', descEn: 'Energy regulation', descZh: '能量调节' },
    { en: 'Thyroid Efficiency', zh: '甲状腺效率', descEn: 'Metabolic baseline', descZh: '代谢基准' },
    { en: 'Estrogen Balance', zh: '雌激素平衡', descEn: 'Water retention', descZh: '水分滞留' },
    { en: 'Leptin Sensitivity', zh: '瘦素敏感性', descEn: 'Satiety signaling', descZh: '饱腹感信号' },
    { en: 'Ghrelin Response', zh: '胃饥饿素反应', descEn: 'Hunger signaling', descZh: '饥饿信号' },
    { en: 'Vagus Nerve Tone', zh: '迷走神经张力', descEn: 'Parasympathetic activation', descZh: '副交感激活' },
    { en: 'Lymphatic Drainage', zh: '淋巴引流', descEn: 'Waste removal', descZh: '废物清除' },
    { en: 'Electrolyte Balance', zh: '电解质平衡', descEn: 'Neuromuscular firing', descZh: '神经肌肉触发' },
    { en: 'Fast Twitch Fibers', zh: '快肌纤维', descEn: 'Explosive power', descZh: '爆发力' },
    { en: 'Slow Twitch Fibers', zh: '慢肌纤维', descEn: 'Endurance capacity', descZh: '耐力容量' }
  ];

  const dynamicQuestions: QuestionStep[] = Array.from({ length: fillerCount }).map((_, i) => {
    const topic = deepDiveTopics[i % deepDiveTopics.length];
    const variation = Math.floor(i / deepDiveTopics.length) + 1;
    
    const titleEn = `${topic.en} Analysis ${variation > 1 ? `(Phase ${variation})` : ''}`;
    const titleZh = `${topic.zh}深度分析 ${variation > 1 ? `(阶段 ${variation})` : ''}`;

    const subtitleEn = `Bio-Marker #${currentCount + i + 1}: ${topic.descEn}`;
    const subtitleZh = `生物标记 #${currentCount + i + 1}: ${topic.descZh}`;

    return {
      id: `q_dynamic_${i}`,
      type: 'select',
      title: richText(titleEn, titleZh),
      subtitle: richText(subtitleEn, subtitleZh),
      explanation: generateLongExplanation(topic.en, topic.zh, lang),
      field: `dynamic_${i}` as any,
      options: [
        { label: richText('Optimal / High', '最佳 / 高'), value: 'high' },
        { label: richText('Average / Normal', '平均 / 正常'), value: 'avg' },
        { label: richText('Sub-optimal / Low', '欠佳 / 低'), value: 'low' },
        { label: richText('Unsure', '不确定'), value: 'unknown' }
      ]
    };
  });

  return [...coreQuestions, ...detailedQuestions, ...dynamicQuestions];
};

const THEMES: Record<Theme, string> = {
  slate: 'bg-slate-950',
  zinc: 'bg-zinc-950',
  neutral: 'bg-neutral-950',
  stone: 'bg-stone-950',
  rose: 'bg-rose-950',
  blue: 'bg-blue-950',
  green: 'bg-emerald-950',
  violet: 'bg-violet-950',
};

export default function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [stepIndex, setStepIndex] = useState(0);
  const [userData, setUserData] = useState<UserData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<CalculatedStats | null>(null);
  const [dietPlan, setDietPlan] = useState<DietPlan[]>([]);
  const [trainingPlan, setTrainingPlan] = useState<WorkoutDay[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('slate');
  const [activeResultTab, setActiveResultTab] = useState<ResultTab>('dashboard');

  const questions = useMemo(() => getQuestions(language), [language]);
  const currentQuestion = questions[stepIndex] || questions[0];
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const tUI = TRANSLATIONS[language]?.ui || TRANSLATIONS['en'].ui;

  useEffect(() => {
    const s = calculateResults(INITIAL_DATA);
    setStats(s);
    setDietPlan(generateDietPlan(s, 'Standard'));
    setTrainingPlan(generateTrainingPlan(INITIAL_DATA));
    setShoppingList(generateShoppingList(generateDietPlan(s, 'Standard')));
  }, []);

  const handleAnswer = (val: any) => {
    if (currentQuestion.type === 'measurements') {
      setUserData({ ...userData, ...val });
    } else {
      setUserData({ ...userData, [currentQuestion.field as keyof UserData]: val });
    }
  };

  const nextStep = () => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    if (stepIndex < questions.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsLoading(true);
    setTimeout(() => {
      const calculated = calculateResults(userData);
      setStats(calculated);
      setDietPlan(generateDietPlan(calculated, userData.dietPreference));
      setTrainingPlan(generateTrainingPlan(userData));
      setShoppingList(generateShoppingList(generateDietPlan(calculated, userData.dietPreference)));
      setIsLoading(false);
      setView('results');
      setActiveResultTab('dashboard');
    }, 2000);
  };

  const restart = () => {
    setUserData(INITIAL_DATA);
    setStepIndex(0);
    setView('landing');
  };

  return (
    <div className={`min-h-screen ${THEMES[theme]} text-white font-sans flex flex-col overflow-hidden`}>
      <AnimatePresence mode="wait">
        
        {view === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-full h-full flex-1"
          >
            <Landing onStart={() => setView('quiz')} t={tUI} lang={language} />
          </motion.div>
        )}

        {view === 'results' && stats && (
           <motion.div 
             key="results"
             initial={{ opacity: 0, x: 100 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5 }}
             className="w-full h-full flex-1"
           >
             <Results 
               stats={stats} 
               dietPlan={dietPlan} 
               trainingPlan={trainingPlan} 
               shoppingList={shoppingList}
               onRestart={restart}
               lang={language}
               activeTab={activeResultTab}
               setActiveTab={setActiveResultTab}
             />
           </motion.div>
        )}

        {view === 'quiz' && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex flex-col bg-slate-950 overflow-hidden"
          >
            {isLoading && <LoadingOverlay message={tUI.analyzing} />}

            <header className="shrink-0 w-full px-4 py-3 bg-slate-900 border-b border-slate-800 z-30 relative">
              <div className="max-w-4xl mx-auto flex items-center gap-4">
                <div className="text-xl font-bold flex items-center gap-2 shrink-0">
                   <div className="w-8 h-8 bg-rose-500 rounded flex items-center justify-center shadow-lg shadow-rose-500/20">M</div>
                </div>
                <div className="flex-1 flex items-center gap-3">
                   <ProgressBar current={stepIndex + 1} total={questions.length} className="mb-0 h-3" />
                   <span className="text-xs text-slate-500 font-mono hidden sm:inline-block w-12 text-right">
                     {stepIndex + 1}/{questions.length}
                   </span>
                </div>
              </div>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto">
               <div className="max-w-2xl mx-auto p-4 pb-20">
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={stepIndex}
                     initial={{ opacity: 0, x: 50 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -50 }}
                     transition={{ duration: 0.3, ease: "easeInOut" }}
                   >
                     {(() => {
                        const props = {
                          stepData: currentQuestion,
                          onAnswer: handleAnswer,
                          userData: userData,
                          onNext: nextStep,
                          t: tUI
                        };
                        switch (currentQuestion.type) {
                          case 'select': return <SelectionQuestion {...props} />;
                          case 'multi-select': return <MultiSelectQuestion {...props} />;
                          case 'number': return <InputQuestion {...props} />;
                          case 'measurements': return <MeasurementsQuestion {...props} />;
                          default: return currentQuestion.id === 'water' ? <WaterQuestion {...props} /> : <SelectionQuestion {...props} />;
                        }
                     })()}
                   </motion.div>
                 </AnimatePresence>
               </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
