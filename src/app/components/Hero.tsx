'use client'
import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Database, Zap, ShieldCheck, Play } from "lucide-react";

/* ---------- Interactive particle network (data constellation) ---------- */
function DataCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const mouse = { x: -9999, y: -9999 };
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 14000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 1.2,
      }));
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const LINK = 130;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        // gentle attraction toward the cursor
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 180 && dist > 0.001) {
          n.vx += (dx / dist) * 0.012;
          n.vy += (dy / dist) * 0.012;
        }
        n.vx *= 0.985;
        n.vy *= 0.985;
        // keep a minimum drift
        if (Math.abs(n.vx) < 0.05) n.vx += (Math.random() - 0.5) * 0.02;
        if (Math.abs(n.vy) < 0.05) n.vy += (Math.random() - 0.5) * 0.02;

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]!;
          const b = nodes[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            const alpha = (1 - d / LINK) * 0.22;
            ctx.strokeStyle = `oklch(0.55 0.21 262.9 / ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const near = Math.hypot(mouse.x - n.x, mouse.y - n.y) < 120;
        ctx.fillStyle = near
          ? "oklch(0.55 0.21 262.9 / 0.9)"
          : "oklch(0.55 0.21 262.9 / 0.45)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r * 1.6 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />;
}

/* ---------- Animated pipeline card ---------- */
const stages = [
  { title: "Ingest", sub: "Kafka streams", icon: Database },
  { title: "Transform", sub: "dbt models", icon: Zap },
  { title: "Serve", sub: "Live dashboards", icon: ShieldCheck },
];

function PipelineCard() {
  const [active, setActive] = useState(0);
  const [rows, setRows] = useState([
    { label: "events_ingested", value: "42.3k/s", pct: 86 },
    { label: "models_refreshed", value: "128", pct: 64 },
    { label: "dashboards_live", value: "24", pct: 45 },
  ]);

  useEffect(() => {
    const stageTimer = setInterval(() => setActive((a) => (a + 1) % stages.length), 3000);
    const rowTimer = setInterval(() => {
      setRows((rs) =>
        rs.map((r) => ({
          ...r,
          pct: Math.max(30, Math.min(96, r.pct + (Math.random() - 0.5) * 18)),
          value:
            r.label === "events_ingested"
              ? `${(38 + Math.random() * 9).toFixed(1)}k/s`
              : r.value,
        })),
      );
    }, 1200);
    return () => {
      clearInterval(stageTimer);
      clearInterval(rowTimer);
    };
  }, []);

  return (
    <div className="relative w-full min-w-0 max-w-md rounded-2xl border border-white/60 bg-white/80 p-6 shadow-2xl shadow-blue-500/15 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-semibold text-slate-900">
          Live Data Pipeline
        </p>
        <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Healthy
        </span>
      </div>

      {/* flow: stage · line · stage · line · stage (always fits the card) */}
      <div className="my-6 grid grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto] items-start gap-x-2">
        {stages.map((s, i) => {
          const Icon = s.icon;
          const isActive = active === i;
          return (
            <Fragment key={s.title}>
              <div className="flex w-21 flex-col items-center text-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500 ${
                    isActive
                      ? "scale-110 bg-linear-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/40"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p
                  className={`mt-2 text-xs font-semibold transition-colors ${
                    isActive ? "text-blue-600" : "text-slate-900"
                  }`}
                >
                  {s.title}
                </p>
                <p className="whitespace-nowrap text-[11px] leading-tight text-slate-500">
                  {s.sub}
                </p>
              </div>

              {i < stages.length - 1 && (
                <div className="flex h-12 items-center">
                  <div
                    className={`w-full border-t-2 border-dashed transition-colors duration-500 ${
                      active > i ? "border-blue-500" : "border-blue-300"
                    }`}
                  />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      {/* metric rows */}
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-500">{r.label}</span>
              <span className="font-semibold text-slate-900">{r.value}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-blue-100">
              <div
                className="h-full rounded-full bg-linear-to-r from-blue-600 to-sky-400 transition-all duration-1000 ease-out"
                style={{ width: `${r.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Typing headline word ---------- */
const words = ["Data Engineering", "Streaming Pipelines", "Cloud Lakehouses", "AI-Ready Data"];

function useTypewriter() {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx]!;
    const full = text === word;
    const delay = !deleting && full ? 1400 : deleting ? 45 : 85;

    const t = setTimeout(() => {
      if (!deleting) {
        if (full) setDeleting(true);
        else setText(word.slice(0, text.length + 1));
      } else if (text.length > 0) {
        setText(word.slice(0, text.length - 1));
      } else {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, wordIdx]);

  return text;
}

/* ---------- Hero ---------- */
export function Hero() {
  const typed = useTypewriter();

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-300/50 via-white to-white">
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-136 w-136 rounded-full bg-blue-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-112 w-md rounded-full bg-sky-300/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex min-h-140 items-center">
        <DataCanvas />
        <div className="container-page relative grid items-center gap-14 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-blue-600 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
              Software Development · Data Engineering
            </span>

            <h1 className="font-display mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[4rem]">
              We build <br />
              <span className="inline-block min-h-[1.15em] bg-linear-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent">
                {typed}
                <span className="animate-pulse text-blue-500">|</span>
              </span>
              <br />
              that moves your business forward.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              InnoventLab designs and ships data pipelines, lakehouses and
              analytics platforms — so every team can act on clean, trusted,
              real-time data.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-sky-500 px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-blue-500/35 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Start a Project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-[15px] font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <Play className="h-4 w-4 text-blue-600" />
                See Our Work
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {[
                { value: "120+", label: "Pipelines shipped" },
                { value: "40TB/day", label: "Data processed" },
                { value: "99.98%", label: "Platform uptime" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-blue-600">
                    {s.value}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden min-w-0 justify-center lg:flex">
            <div className="w-full max-w-md animate-float">
              <PipelineCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}