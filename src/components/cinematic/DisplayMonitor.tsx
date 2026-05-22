"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface DisplayStatusItem {
  label: string;
  value: string;
}

export interface DisplayChannelDef {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface DisplayMonitorProps {
  className?: string;
  channels?: DisplayChannelDef[];
  active?: boolean;
  pulseKey?: number;
  statusItems?: DisplayStatusItem[];
  defaultChannel?: string;
  children?: React.ReactNode;
}

export function DisplayMonitor({
  className,
  channels = [],
  active = false,
  pulseKey = 0,
  statusItems = [],
  defaultChannel,
  children,
}: DisplayMonitorProps) {
  const [activeChannel, setActiveChannel] = useState(
    defaultChannel || channels[0]?.id || "",
  );
  const [powerState, setPowerState] = useState<"off" | "powering" | "online">(
    "off",
  );
  const [channelTransition, setChannelTransition] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const prevPulseKey = useRef(pulseKey);

  useEffect(() => {
    if (active) {
      const t1 = setTimeout(() => setPowerState("powering"), 0);
      const t2 = setTimeout(() => setPowerState("online"), 300);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      const t3 = setTimeout(() => setPowerState("off"), 0);
      const t4 = setTimeout(() => setActiveChannel(defaultChannel || channels[0]?.id || ""), 0);
      return () => { clearTimeout(t3); clearTimeout(t4); };
    }
  }, [active, channels, defaultChannel]);

  const handleChannelChange = (id: string) => {
    if (id === activeChannel || powerState !== "online") return;
    setChannelTransition(true);
    const t = setTimeout(() => {
      setActiveChannel(id);
      setChannelTransition(false);
    }, 200);
    return () => clearTimeout(t);
  };

  useEffect(() => {
    if (prevPulseKey.current !== pulseKey && powerState === "online") {
      setPulseActive(true);
      const t = setTimeout(() => setPulseActive(false), 400);
      prevPulseKey.current = pulseKey;
      return () => clearTimeout(t);
    }
  }, [pulseKey, powerState]);

  return (
    <div
      className={cn(
        "display-monitor",
        powerState === "powering" && "display-monitor--powering",
        powerState === "online" && "display-monitor--online",
        pulseActive && "display-monitor--pulse",
        className,
      )}
    >
      <div className="display-monitor__cavity">
        <div
          className={cn(
            "display-monitor__screen",
            channelTransition && "display-monitor__screen--transitioning",
          )}
        >
          {channels.length > 0
            ? channels.find((c) => c.id === activeChannel)?.content
            : children || (
                <span className="text-mono-sm text-muted opacity-25">
                  NO SIGNAL
                </span>
              )}
        </div>
        <div className="display-monitor__glass" />
        <div className="display-monitor__noise" />
      </div>

      <div className="display-monitor__glow" />

      {statusItems.length > 0 && (
        <div className="display-monitor__status">
          {statusItems.map((item) => (
            <span key={item.label} className="display-monitor__status-item">
              <span className="display-monitor__status-label">
                {item.label}:
              </span>
              <span className="display-monitor__status-value">
                {item.value}
              </span>
            </span>
          ))}
        </div>
      )}

      {channels.length > 1 && powerState === "online" && (
        <div className="display-monitor__channels">
          {channels.map((ch) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => handleChannelChange(ch.id)}
              className={cn(
                "display-channel",
                activeChannel === ch.id && "display-channel--active",
              )}
            >
              {ch.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
