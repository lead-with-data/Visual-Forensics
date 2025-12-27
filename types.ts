
export interface HeatmapPoint {
  x: number;
  y: number;
  weight: number;
  label: string;
  reasoning: string;
  predicted_fixation_time_ms: number;
}

export interface SaliencyMap {
  coordinate_system: string;
  confidence_level: string;
  points: HeatmapPoint[];
}

export interface PersonaTrace {
  persona_type: string;
  primary_goal: string;
  interaction_path: string[];
  cognitive_friction_points: string[];
  success_probability: number;
  time_to_task_ms: number; // New forensic metric
  error_rate: number; // New forensic metric (0-1)
}

export interface EvidenceBasedFinding {
  title: string;
  agent: string;
  observation: string;
  visual_evidence: string;
  impact_score: number;
  confidence_score: number;
}

export interface ABTestProposal {
  id: string;
  hypothesis: string;
  test_setup: {
    control: string;
    variant_a: string;
  };
  expected_lift: string;
  priority: string;
  swarm_summary: string;
}

export interface StrategicAction {
  priority: string;
  issue: string;
  root_cause: string;
  recommended_fix: string;
  expected_impact: string;
  owner_agent: string;
}

export interface ResearchReport {
  executive_summary: string;
  methodology: {
    agents_deployed: string[];
    analysis_framework: string;
    confidence_level: number;
  };
  key_findings: {
    critical_blockers: string[];
    quick_wins: string[];
  };
}

export interface AgentDebate {
  agents: string[];
  topic: string;
  conflict: string;
  resolution: string;
}

export interface AnalysisResult {
  logs: string[];
  heatmap: SaliencyMap;
  findings: EvidenceBasedFinding[];
  persona_traces: PersonaTrace[];
  audit_hierarchy: string;
  audit_bible: string;
  audit_cognitive: string;
  audit_accessibility: string;
  audit_persona: string;
  audit_mobile: string;
  agent_debates: AgentDebate[];
  ab_tests: ABTestProposal[];
  strategic_plan: StrategicAction[];
  report: ResearchReport;
}
