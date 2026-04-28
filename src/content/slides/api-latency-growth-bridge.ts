import { defineSlide } from './_factory';

export const apiLatencyGrowthBridge = defineSlide({
  id: 'api-latency-growth-bridge',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.92,
      1.08
    ]
  },
  content: {
    'pt-br': {
      title: `Imagine uma API no horário de pico`,
      body: `Imagine a seguinte situação: você lançou uma API de recomendações para um app de delivery. De manhã, quase ninguém usa, e tudo responde rápido. Mas, quando chega o almoço, as requisições começam a se acumular e cada novo usuário pesa mais do que o anterior.

1. **O que a função linear assume:** \`latencia = m * usuarios + b\` embute uma ideia forte demais: cada usuário a mais sempre custa quase o mesmo.

2. **O que acontece de verdade:** com pouca carga, a latência sobe pouco; perto do limite, fila, CPU, locks, banco e cache fazem o custo crescer mais rápido.

3. **O aviso está nos dados:** de 10 para 20 usuários a latência sobe só \`5 ms\`, mas de 70 para 80 sobe \`180 ms\`. O impacto de mais um usuário depende da carga já existente.

| Usuários simultâneos | Latência média |
| --- | --- |
| 10 | 105 ms |
| 20 | 110 ms |
| 30 | 118 ms |
| 40 | 130 ms |
| 50 | 155 ms |
| 60 | 210 ms |
| 70 | 320 ms |
| 80 | 500 ms |

> Aqui a régua já não cresce de forma constante. A curva começa suave e depois acelera.

---

### Leitura rápida
- \`reta linear\`: imagina aumento constante por usuário.
- \`latência real\`: depende do estado atual do sistema.
- \`crescimento\`: começa pequeno e depois dispara.

### Ideia principal
A linearidade falha porque o custo de cada usuário extra muda conforme o sistema vai enchendo.`,
    },
    'en-us': {
      title: `Imagine an API at peak traffic`,
      body: `Imagine this situation: you launched a recommendation API for a delivery app. In the morning, almost nobody is using it, and everything responds quickly. Then lunch hour hits, requests start piling up, and each new user weighs more than the one before.

1. **What the linear function assumes:** \`latency = m * users + b\` hides a very strong idea: each extra user always costs about the same.

2. **What really happens:** with low load, latency rises a little; near the limit, queueing, CPU contention, locks, the database, and cache pressure make the cost grow faster.

3. **The warning is in the data:** from 10 to 20 users, latency rises only \`5 ms\`, but from 70 to 80 it rises \`180 ms\`. The impact of one more user depends on the load already in the system.

| Concurrent users | Average latency |
| --- | --- |
| 10 | 105 ms |
| 20 | 110 ms |
| 30 | 118 ms |
| 40 | 130 ms |
| 50 | 155 ms |
| 60 | 210 ms |
| 70 | 320 ms |
| 80 | 500 ms |

> The ruler is no longer adding a constant amount. The curve starts gently and then accelerates.

---

### Quick read
- \`linear line\`: assumes a constant increase per user.
- \`real latency\`: depends on the system’s current state.
- \`growth\`: starts small and then spikes.

### Main idea
Linearity fails because the cost of one more user changes as the system fills up.`,
    },
  },
  visual: {
    id: 'api-latency-growth',
    copy: {
      "pt-br": {
        "eyebrow": "Latência sob carga",
        "title": "Mais usuários, mais fila, mais latência",
        "description": "A latência parece controlada no início, mas dispara quando a API se aproxima do limite.",
        "xLabel": "Usuários simultâneos",
        "yLabel": "Latência média (ms)",
        "curveLabel": "curva real da API",
        "referenceLabel": "reta linear de referência",
        "lowLoadLabel": "Carga baixa: o impacto ainda é pequeno",
        "saturationLabel": "Saturação: a fila começa a crescer",
        "explosionLabel": "Explosão: a latência acelera de verdade",
        "legendTitle": "Leitura do gráfico",
        "metrics": [
          {
          "title": "Início da carga",
          "value": "+5 ms",
          "description": "de 10 para 20 usuários",
          "accent": "#00e5ff"
        },
          {
          "title": "Meio da fila",
          "value": "+55 ms",
          "description": "de 50 para 60 usuários",
          "accent": "#ff2e97"
        },
          {
          "title": "Zona crítica",
          "value": "+180 ms",
          "description": "de 70 para 80 usuários",
          "accent": "#fbbf24"
        }
        ],
        "points": [
          {
          "users": 10,
          "latency": 105,
          "label": "10 / 105",
          "accent": "#00e5ff"
        },
          {
          "users": 20,
          "latency": 110,
          "label": "20 / 110",
          "accent": "#38bdf8"
        },
          {
          "users": 30,
          "latency": 118,
          "label": "30 / 118",
          "accent": "#60a5fa"
        },
          {
          "users": 40,
          "latency": 130,
          "label": "40 / 130",
          "accent": "#a855f7"
        },
          {
          "users": 50,
          "latency": 155,
          "label": "50 / 155",
          "accent": "#ff2e97"
        },
          {
          "users": 60,
          "latency": 210,
          "label": "60 / 210",
          "accent": "#fb7185"
        },
          {
          "users": 70,
          "latency": 320,
          "label": "70 / 320",
          "accent": "#f97316"
        },
          {
          "users": 80,
          "latency": 500,
          "label": "80 / 500",
          "accent": "#fbbf24"
        }
        ],
        "footer": "A regressão linear tenta forçar uma única inclinação em dados que já estão curvando perto do limite."
      },
      "en-us": {
        "eyebrow": "Latency under load",
        "title": "More users, more queueing, more latency",
        "description": "Latency looks stable at first, then spikes as the API nears its limit.",
        "xLabel": "Concurrent users",
        "yLabel": "Average latency (ms)",
        "curveLabel": "real API curve",
        "referenceLabel": "linear reference line",
        "lowLoadLabel": "Low load: the impact is still small",
        "saturationLabel": "Saturation: the queue starts growing",
        "explosionLabel": "Explosion: latency really accelerates",
        "legendTitle": "Chart reading",
        "metrics": [
          {
          "title": "Load starts",
          "value": "+5 ms",
          "description": "from 10 to 20 users",
          "accent": "#00e5ff"
        },
          {
          "title": "Queue middle",
          "value": "+55 ms",
          "description": "from 50 to 60 users",
          "accent": "#ff2e97"
        },
          {
          "title": "Critical zone",
          "value": "+180 ms",
          "description": "from 70 to 80 users",
          "accent": "#fbbf24"
        }
        ],
        "points": [
          {
          "users": 10,
          "latency": 105,
          "label": "10 / 105",
          "accent": "#00e5ff"
        },
          {
          "users": 20,
          "latency": 110,
          "label": "20 / 110",
          "accent": "#38bdf8"
        },
          {
          "users": 30,
          "latency": 118,
          "label": "30 / 118",
          "accent": "#60a5fa"
        },
          {
          "users": 40,
          "latency": 130,
          "label": "40 / 130",
          "accent": "#a855f7"
        },
          {
          "users": 50,
          "latency": 155,
          "label": "50 / 155",
          "accent": "#ff2e97"
        },
          {
          "users": 60,
          "latency": 210,
          "label": "60 / 210",
          "accent": "#fb7185"
        },
          {
          "users": 70,
          "latency": 320,
          "label": "70 / 320",
          "accent": "#f97316"
        },
          {
          "users": 80,
          "latency": 500,
          "label": "80 / 500",
          "accent": "#fbbf24"
        }
        ],
        "footer": "Linear regression forces one slope onto data that bends as the system nears its limit."
      }
    },
  },
});
