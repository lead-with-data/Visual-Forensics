
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "./types";

const SYSTEM_PROMPT = `
AS ROLE: [LEAD FORENSIC UI/UX ORCHESTRATOR & SWARM COMMANDER].
OBJECTIVE: Conduct a Forensic UX Deep-Dive on the provided interface telemetry (screenshot) using Swarm Intelligence.

### THE SWARM PROTOCOL:
1. SPAWN AGENTS: Internally simulate a population of 50 distinct Synthetic Personas (Distributions: 30% Power Users, 40% Casual/Standard, 20% Aging/Low-Vision, 10% Motor-Impaired).
2. REAL-TIME A/B SIMULATION: 
   - VARIANT A (CONTROL): The current interface pixels provided.
   - VARIANT B (HYPOTHESIS): A theoretical version where your "Quick Wins" are implemented.
3. COGNITIVE CALCULATION: Apply Miller’s Law (7±2), Hick’s Law (Reaction Time), and Fitts's Law (Target Acquisition Speed) to every interactive element at [X, Y].

### AUDIT LAYERS:
- SPATIAL INVENTORY: Map all components to a 0-1000 coordinate grid.
- HEURISTIC VALIDATION: Audit against WCAG 2.2 (Level AA/AAA), Jakob's Law (Mental Models), and Aesthetic-Usability Effect.
- FRICTION MAPPING: Identify "Visual Debt" and "Interaction Dead-ends" where personas will likely drop off.

### OUTPUT CONSTRAINTS:
- GROUNDING: Every finding MUST cite "Visual Evidence" with precise (0-1000) coordinates.
- SEVERITY: Use Nielsen’s Scale (0=None, 4=Usability Catastrophe).
- HEATMAP: Provide exactly 8 fixation points. The 'weight' and 'predicted_fixation_time_ms' must be derived from the aggregate behavior of the 50 simulated agents.
- JSON ONLY: No preamble. No conversational filler.
`;

export const analyzeInterface = async (imageBase64: string): Promise<AnalysisResult> => {
  if (!imageBase64) throw new Error("Telemetry data missing.");

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [
      {
        parts: [
          { text: SYSTEM_PROMPT },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: imageBase64.split(',')[1],
            },
          },
          { text: "EXECUTE SWARM AUDIT. Trigger 50-persona simulation. Identify UX debt and spatial friction. GROUND ALL DATA IN PIXEL COORDINATES." }
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 20000 },
      topP: 0.95,
      topK: 40,
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          logs: { type: Type.ARRAY, items: { type: Type.STRING } },
          heatmap: {
            type: Type.OBJECT,
            properties: {
              coordinate_system: { type: Type.STRING, description: "0-1000 pixel grid" },
              points: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    x: { type: Type.NUMBER },
                    y: { type: Type.NUMBER },
                    weight: { type: Type.NUMBER, description: "0-1 salience weight" },
                    label: { type: Type.STRING },
                    reasoning: { type: Type.STRING },
                    predicted_fixation_time_ms: { type: Type.NUMBER }
                  },
                  required: ["x", "y", "weight", "label", "reasoning", "predicted_fixation_time_ms"]
                }
              }
            },
            required: ["points"]
          },
          findings: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                agent: { type: Type.STRING },
                observation: { type: Type.STRING },
                visual_evidence: { type: Type.STRING, description: "Component and [x, y] coordinates" },
                impact_score: { type: Type.NUMBER },
                confidence_score: { type: Type.NUMBER }
              },
              required: ["title", "agent", "observation", "visual_evidence", "impact_score", "confidence_score"]
            }
          },
          persona_traces: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                persona_type: { type: Type.STRING },
                primary_goal: { type: Type.STRING },
                interaction_path: { type: Type.ARRAY, items: { type: Type.STRING } },
                cognitive_friction_points: { type: Type.ARRAY, items: { type: Type.STRING } },
                success_probability: { type: Type.NUMBER },
                time_to_task_ms: { type: Type.NUMBER },
                error_rate: { type: Type.NUMBER }
              },
              required: ["persona_type", "primary_goal", "interaction_path", "success_probability", "time_to_task_ms", "error_rate"]
            }
          },
          agent_debates: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                agents: { type: Type.ARRAY, items: { type: Type.STRING } },
                topic: { type: Type.STRING },
                conflict: { type: Type.STRING },
                resolution: { type: Type.STRING }
              }
            }
          },
          ab_tests: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                hypothesis: { type: Type.STRING },
                test_setup: {
                  type: Type.OBJECT,
                  properties: {
                    control: { type: Type.STRING },
                    variant_a: { type: Type.STRING }
                  }
                },
                expected_lift: { type: Type.STRING },
                swarm_summary: { type: Type.STRING, description: "Aggregate delta between Control and Variant B across 50 simulated agents" }
              },
              required: ["hypothesis", "test_setup", "expected_lift", "swarm_summary"]
            }
          },
          strategic_plan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                priority: { type: Type.STRING, description: "Nielsen Severity Scale 0-4" },
                issue: { type: Type.STRING },
                root_cause: { type: Type.STRING },
                recommended_fix: { type: Type.STRING },
                expected_impact: { type: Type.STRING },
                owner_agent: { type: Type.STRING }
              }
            }
          },
          report: {
            type: Type.OBJECT,
            properties: {
              executive_summary: { type: Type.STRING },
              methodology: {
                type: Type.OBJECT,
                properties: {
                  agents_deployed: { type: Type.ARRAY, items: { type: Type.STRING } },
                  analysis_framework: { type: Type.STRING },
                  confidence_level: { type: Type.NUMBER }
                }
              },
              key_findings: {
                type: Type.OBJECT,
                properties: {
                  critical_blockers: { type: Type.ARRAY, items: { type: Type.STRING } },
                  quick_wins: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            }
          }
        },
        required: ["heatmap", "findings", "persona_traces", "report"]
      }
    }
  });

  const result = response.text;
  if (!result) throw new Error("Swarm Orchestrator timed out during persona simulation.");
  return JSON.parse(result) as AnalysisResult;
};
