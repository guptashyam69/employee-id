import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Zap, ChevronRight, LogOut, Sparkles, Rocket, Code, Gamepad2, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2026-01-16T11:00:00");

const calculateTimeLeft = () => {
  const now = new Date();
  const difference = EVENT_DATE.getTime() - now.getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary) / 0.3) 0%, transparent 50%), 
                       radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, hsl(var(--secondary) / 0.2) 0%, transparent 50%)`,
        }}
      />
      
      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-[10%] w-4 h-4 bg-primary rounded-full blur-sm animate-float opacity-60" />
      <div className="absolute top-40 right-[20%] w-6 h-6 bg-secondary rounded-full blur-sm animate-float opacity-40" style={{ animationDelay: '-2s' }} />
      <div className="absolute bottom-40 left-[30%] w-3 h-3 bg-accent rounded-full blur-sm animate-float opacity-50" style={{ animationDelay: '-4s' }} />
      <div className="absolute top-[60%] right-[15%] w-5 h-5 bg-primary rounded-full blur-sm animate-float opacity-30" style={{ animationDelay: '-1s' }} />
      
      {/* Large Glowing Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none" style={{ animationDelay: '-1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Scan Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan-line" />
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent animate-scan-line" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Horizontal Lines Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{ 
              top: `${20 + i * 15}%`,
              left: '-100%',
              right: '100%',
              animation: `slideRight ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center box-glow-cyan group-hover:scale-110 transition-transform duration-300">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-display font-bold text-glow-cyan text-primary">
            TECHKRITI
          </span>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground font-body hidden sm:block">
                {user.email}
              </span>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="border-border hover:border-primary hover:bg-primary/10 font-body"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-display font-semibold box-glow-cyan hover:scale-105 transition-transform"
            >
              LOGIN / REGISTER
            </Button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-32">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-body text-sm uppercase tracking-wider">
              Coming Soon • 2026
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black mb-6 leading-tight">
            <span className="gradient-text inline-block animate-fade-in" style={{ animationDelay: '0.1s' }}>TECHKRITI</span>
            <br />
            <span className="text-foreground inline-block animate-fade-in" style={{ animationDelay: '0.2s' }}>2026</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground font-body max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            The ultimate tech fest where innovation meets imagination. 
            <span className="text-primary"> Code. Create. Conquer.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-display font-semibold px-8 h-14 text-lg box-glow-cyan group hover:scale-105 transition-transform"
              onClick={() => navigate("/events")}
            >
              EXPLORE EVENTS
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-primary hover:bg-primary/10 font-display font-semibold px-8 h-14 text-lg hover:scale-105 transition-transform"
            >
              LEARN MORE
            </Button>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mb-32">
          <h3 className="text-center text-muted-foreground font-body uppercase tracking-wider text-sm mb-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Event Starts In
          </h3>
          <div className="grid grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" },
            ].map((unit, index) => (
              <div
                key={unit.label}
                className="glass-card rounded-2xl p-4 md:p-6 text-center group hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:box-glow-cyan animate-fade-in"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-1 tabular-nums">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="text-muted-foreground font-body uppercase tracking-wider text-xs md:text-sm">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Immersive Experience Section */}
        <div className="relative mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4 animate-fade-in">
              Enter The <span className="text-primary text-glow-cyan">Future</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
              Experience innovation like never before
            </p>
          </div>

          {/* Hexagon Grid */}
          <div className="relative h-[500px] flex items-center justify-center">
            {/* Central Hexagon */}
            <div className="absolute w-48 h-48 md:w-64 md:h-64 animate-pulse-glow">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-xl border border-primary/30 rounded-3xl rotate-45 flex items-center justify-center group hover:border-primary/60 transition-all duration-500 hover:scale-110 cursor-pointer">
                <div className="-rotate-45 text-center p-4">
                  <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-3 group-hover:animate-spin" style={{ animationDuration: '3s' }} />
                  <span className="text-foreground font-display font-bold text-lg md:text-xl block">INNOVATE</span>
                  <span className="text-muted-foreground font-body text-sm">Shape Tomorrow</span>
                </div>
              </div>
            </div>

            {/* Orbiting Elements */}
            <div className="absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] animate-spin" style={{ animationDuration: '30s' }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-32 h-32 md:w-40 md:h-40 glass-card rounded-2xl flex items-center justify-center group hover:border-primary/50 transition-all cursor-pointer hover:scale-110" style={{ animation: 'counter-spin 30s linear infinite' }}>
                  <div className="text-center">
                    <Rocket className="w-8 h-8 md:w-10 md:h-10 text-secondary mx-auto mb-2 group-hover:text-glow-magenta" />
                    <span className="text-foreground font-display font-semibold text-sm md:text-base block">LAUNCH</span>
                    <span className="text-muted-foreground font-body text-xs">Your Ideas</span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                <div className="w-32 h-32 md:w-40 md:h-40 glass-card rounded-2xl flex items-center justify-center group hover:border-accent/50 transition-all cursor-pointer hover:scale-110" style={{ animation: 'counter-spin 30s linear infinite' }}>
                  <div className="text-center">
                    <Code className="w-8 h-8 md:w-10 md:h-10 text-accent mx-auto mb-2 group-hover:text-glow-magenta" />
                    <span className="text-foreground font-display font-semibold text-sm md:text-base block">BUILD</span>
                    <span className="text-muted-foreground font-body text-xs">The Future</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -left-6 -translate-y-1/2">
                <div className="w-32 h-32 md:w-40 md:h-40 glass-card rounded-2xl flex items-center justify-center group hover:border-primary/50 transition-all cursor-pointer hover:scale-110" style={{ animation: 'counter-spin 30s linear infinite' }}>
                  <div className="text-center">
                    <Gamepad2 className="w-8 h-8 md:w-10 md:h-10 text-primary mx-auto mb-2" />
                    <span className="text-foreground font-display font-semibold text-sm md:text-base block">COMPETE</span>
                    <span className="text-muted-foreground font-body text-xs">& Dominate</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-6 -translate-y-1/2">
                <div className="w-32 h-32 md:w-40 md:h-40 glass-card rounded-2xl flex items-center justify-center group hover:border-secondary/50 transition-all cursor-pointer hover:scale-110" style={{ animation: 'counter-spin 30s linear infinite' }}>
                  <div className="text-center">
                    <Trophy className="w-8 h-8 md:w-10 md:h-10 text-secondary mx-auto mb-2 group-hover:text-glow-purple" />
                    <span className="text-foreground font-display font-semibold text-sm md:text-base block">CONQUER</span>
                    <span className="text-muted-foreground font-body text-xs">Every Challenge</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Connection Lines */}
            <svg className="absolute w-[500px] h-[500px] md:w-[650px] md:h-[650px] pointer-events-none opacity-30" viewBox="0 0 650 650">
              <circle cx="325" cy="325" r="250" fill="none" stroke="url(#gradient-line)" strokeWidth="1" strokeDasharray="10 10" className="animate-spin" style={{ animationDuration: '60s', transformOrigin: 'center' }} />
              <circle cx="325" cy="325" r="200" fill="none" stroke="url(#gradient-line)" strokeWidth="1" strokeDasharray="5 5" className="animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse', transformOrigin: 'center' }} />
              <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="50%" stopColor="hsl(var(--secondary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center glass-card rounded-3xl p-12 md:p-16 relative overflow-hidden group hover:border-primary/50 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 group-hover:opacity-100 opacity-50 transition-opacity" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
          
          <h2 className="relative text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Ready to <span className="gradient-text">Begin?</span>
          </h2>
          <p className="relative text-muted-foreground font-body text-lg mb-8 max-w-lg mx-auto">
            Join thousands of innovators and make your mark at Techkriti 2026
          </p>
          <Button
            size="lg"
            className="relative bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-display font-semibold px-10 h-14 text-lg box-glow-cyan group/btn hover:scale-105 transition-transform"
            onClick={() => navigate("/auth")}
          >
            REGISTER NOW
            <ChevronRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground font-body">
            © 2026 Techkriti. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Custom Keyframes */}
      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes counter-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};

export default Index;
