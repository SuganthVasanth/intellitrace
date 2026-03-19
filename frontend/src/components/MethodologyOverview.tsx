import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, ShieldCheck, Share2, Zap, RotateCcw, BarChart3, BellRing, MonitorPlay } from "lucide-react";

const steps = [
  { title: "Data Integration", description: "Collect all supplier & transaction data", icon: Database },
  { title: "Entity Verification", description: "Check if suppliers are genuine", icon: ShieldCheck },
  { title: "Network Mapping", description: "Map relationships between companies", icon: Share2 },
  { title: "AI Pattern Detection", description: "Detect abnormal transactions", icon: Zap },
  { title: "Circular Trading", description: "Find fraud loops automatically", icon: RotateCcw },
  { title: "Risk Scoring", description: "Assign fraud probability scores", icon: BarChart3 },
  { title: "Alert Generation", description: "Send warnings instantly", icon: BellRing },
  { title: "Monitoring", description: "Continuous 24/7 tracking", icon: MonitorPlay },
];

export function MethodologyOverview() {
  return (
    <Card className="glass-panel border-none">
      <CardHeader>
        <CardTitle className="text-lg font-bold">FraudShield 360° Methodology</CardTitle>
        <p className="text-sm text-muted-foreground">Our 8-step AI-powered detection engine</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-3 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
              <p className="text-[11px] text-muted-foreground leading-tight">{step.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
