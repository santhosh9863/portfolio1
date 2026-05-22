"use client";

import { cn } from "@/lib/utils";

export interface ArchFlowNode {
  name: string;
  role: string;
}

interface ArchitectureFlowProps {
  nodes: ArchFlowNode[];
  className?: string;
}

export function ArchitectureFlow({ nodes, className }: ArchitectureFlowProps) {
  return (
    <div className={cn("arch-flow", className)}>
      {nodes.map((node, i) => (
        <div key={i} className="flex flex-col items-center w-full">
          <div className="arch-node">
            <div className="arch-node__info">
              <span className="arch-node__name">{node.name}</span>
              <span className="arch-node__role">{node.role}</span>
            </div>
            <span className="arch-node__led" />
          </div>
          {i < nodes.length - 1 && (
            <div className="arch-connector">
              <div className="arch-connector__pulse" />
              <div className="arch-connector__line" />
              <div className="arch-connector__arrow" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
