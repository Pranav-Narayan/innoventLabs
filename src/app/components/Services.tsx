import React from 'react';
import { Cpu, Shield, Glasses, Wifi, Server, Terminal, ArrowRight } from 'lucide-react';

const services = [
    {
        title: "AI Robotics with Reinforcement Learning",
        description: "Empower autonomous systems with advanced reinforcement learning techniques to adapt and thrive.",
        icon: <Cpu className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />,
        glow: "cyan",
        borderGradient: "from-cyan-500 to-blue-600",
    },
    {
        title: "Cybersecurity with Blockchain",
        description: "Secure your digital assets using impenetrable, decentralized blockchain technologies.",
        icon: <Shield className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />,
        glow: "emerald",
        borderGradient: "from-emerald-400 to-teal-600",
    },
    {
        title: "Generative AI for VR/AR",
        description: "Create immersive virtual and augmented reality experiences accelerated by Gen AI models.",
        icon: <Glasses className="w-6 h-6 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors" />,
        glow: "fuchsia",
        borderGradient: "from-fuchsia-500 to-purple-600",
    },
    {
        title: "IoT with Federated Learning",
        description: "Connect devices seamlessly with privacy-preserving federated learning architectures.",
        icon: <Wifi className="w-6 h-6 text-orange-400 group-hover:text-orange-300 transition-colors" />,
        glow: "orange",
        borderGradient: "from-orange-500 to-amber-600",
    },
    {
        title: "Java Cloud Native Stack",
        description: "Build incredibly scalable, resilient enterprise applications using Spring Boot microservices.",
        icon: <Server className="w-6 h-6 text-rose-400 group-hover:text-rose-300 transition-colors" />,
        glow: "rose",
        borderGradient: "from-rose-500 to-red-600",
    },
    {
        title: "Python Cloud Native Stack",
        description: "Develop high-performance APIs and distributed systems in Python with FastAPI and Nameko.",
        icon: <Terminal className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />,
        glow: "amber",
        borderGradient: "from-yellow-400 to-amber-600",
    },
];

export const Services = () => {
    return (
        <section className="py-28 bg-[#030712] relative overflow-hidden font-manrope">
            {/* Extremely subtle animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>

            {/* Glowing orbs for depth */}
            <div className="absolute top-0 left-1/4 w-125 h-125 bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-150 h-150 bg-purple-600/10 rounded-full blur-[150px] translate-y-1/3 mix-blend-screen pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="flex flex-col mb-16 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-medium mb-4 tracking-wide uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                            Core Capabilities
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] whitespace-nowrap font-extrabold text-white mb-4 tracking-tight">
                            Architecting the <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600">Future of Tech</span>
                        </h2>
                        <p className="text-base text-gray-400 font-light leading-relaxed max-w-xl">
                            We don&apos;t just build software. We engineer deep-tech solutions that redefine what&apos;s possible for modern enterprises.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative rounded-3xl bg-gray-900/40 border border-white/5 p-6 transition-all duration-500 hover:bg-gray-800/60 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] overflow-hidden"
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            {/* Hover animated border effect */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-linear-to-br ${service.borderGradient}`}></div>

                            {/* Animated Glow behind icon */}
                            <div className="absolute top-6 left-6 w-10 h-10 bg-white/5 rounded-full blur-xl group-hover:bg-white/20 transition-colors duration-500"></div>

                            <div className="relative flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md relative z-10 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                    {React.cloneElement(service.icon, { className: 'w-5 h-5 ' + (service.icon.props.className.replace('w-6 h-6', '')) })}
                                </div>
                                <div className="text-white/20 group-hover:text-white/60 transition-colors duration-300 -rotate-45 group-hover:rotate-0 group-hover:translate-x-1">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </div>

                            <h4 className="text-xl font-bold text-white mb-2 relative z-10 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300 leading-snug">
                                {service.title}
                            </h4>
                            <p className="text-sm text-gray-400 relative z-10 leading-relaxed font-light group-hover:text-gray-300 transition-colors duration-300">
                                {service.description}
                            </p>

                            {/* Bottom glowing line on hover */}
                            <div className={`absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r ${service.borderGradient} group-hover:w-full transition-all duration-700 ease-out`}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
